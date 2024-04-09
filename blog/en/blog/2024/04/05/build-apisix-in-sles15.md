---
title: "How to build APISIX in SLES 15"
authors:
  - name: "Oier Saizar"
    title: "Author"
    url: "https://github.com/osaizar"
    image_url: "https://avatars.githubusercontent.com/u/9879984"
keywords: 
- Apache APISIX
- SLES
- SUSE
description: By reading this article, you will learn how to build Apache APISIX for SUSE Linux Enterprise 15
tags: [Ecosystem]
---

> By reading this article you will learn how to build Apache APISIX SLES 15 from source code.
> The build process will be done in the [SLE BCI 15 SP5 Base Container](https://registry.suse.com/categories/bci/repositories/bci-bci-base-15sp5)

<!--truncate-->

## Install dependencies

Before starting to build APISIX we need to install some dependencies needed to launch the build process:

```shell
zypper install -y git sudo make vim
```

## Clone the APISIX repository

Next, we can clone the APISIX repository:

```shell
git clone https://github.com/apache/apisix.git
cd apisix
```

## Modify the utils/install-dependencies.sh script

Currently the `utils/install-dependencies.sh` script does not support SLES 15, so we will need to modify it slightly to add support for this distro.

Copy the next script:

```bash
#!/usr/bin/env bash

#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -ex

function detect_aur_helper() {
    if [[ $(command -v yay) ]]; then
        AUR_HELPER=yay
    elif [[ $(command -v pacaur) ]]; then
        AUR_HELPER=pacaur
    else
        echo No available AUR helpers found. Please specify your AUR helper by AUR_HELPER.
        exit 255
    fi
}

function install_dependencies_with_aur() {
    detect_aur_helper
    $AUR_HELPER -S openresty --noconfirm
    sudo pacman -S openssl --noconfirm

    export OPENRESTY_PREFIX=/opt/openresty

    sudo mkdir $OPENRESTY_PREFIX/openssl
    sudo ln -s /usr/include $OPENRESTY_PREFIX/openssl/include
    sudo ln -s /usr/lib $OPENRESTY_PREFIX/openssl/lib
}

# Install dependencies on centos and fedora
function install_dependencies_with_yum() {
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo "https://openresty.org/package/${1}/openresty.repo"
    if [[ "${1}" == "centos" ]]; then
        sudo yum -y install centos-release-scl
        sudo yum -y install devtoolset-9 patch wget
        set +eu
        source scl_source enable devtoolset-9
        set -eu
    fi
    sudo yum install -y  \
        gcc gcc-c++ curl wget unzip xz gnupg perl-ExtUtils-Embed cpanminus patch \
        perl perl-devel pcre pcre-devel openldap-devel \
        openresty-zlib-devel openresty-pcre-devel
}

# Install dependencies on ubuntu and debian
function install_dependencies_with_apt() {
    # add OpenResty source
    sudo apt-get update
    sudo apt-get -y install software-properties-common wget lsb-release gnupg patch
    wget -qO - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
    arch=$(uname -m | tr '[:upper:]' '[:lower:]')
    arch_path=""
    if [[ $arch == "arm64" ]] || [[ $arch == "aarch64" ]]; then
        arch_path="arm64/"
    fi
    if [[ "${1}" == "ubuntu" ]]; then
        sudo add-apt-repository -y "deb http://openresty.org/package/${arch_path}ubuntu $(lsb_release -sc) main"
    elif [[ "${1}" == "debian" ]]; then
        sudo add-apt-repository -y "deb http://openresty.org/package/${arch_path}debian $(lsb_release -sc) openresty"
    fi
    sudo apt-get update

    # Install some compilation tools
    sudo apt-get install -y curl make gcc g++ cpanminus libpcre3 libpcre3-dev libldap2-dev unzip openresty-zlib-dev openresty-pcre-dev
}

# Install dependencies on SLES
function install_dependencies_with_zypper() {
    sudo rm -f /etc/zypp/repos.d/openresty.repo 2> /dev/null
    sudo rpm --import https://openresty.org/package/pubkey.gpg
    sudo zypper ar -g --refresh --check "https://openresty.org/package/sles/openresty.repo"
    sudo zypper mr -G openresty
    sudo zypper refresh

    sudo zypper install -y  \
        awk git gcc gcc-c++ curl wget unzip xz patch \
        perl libpcre1 pcre-devel pcre-tools openldap2-devel \
        openresty-zlib-devel openresty-pcre-devel

    curl -L https://cpanmin.us | perl - --sudo App::cpanminus
}

# Identify the different distributions and call the corresponding function
function multi_distro_installation() {
    if grep -Eqi "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
        install_dependencies_with_yum "centos"
    elif grep -Eqi -e "Red Hat" -e "rhel" /etc/*-release; then
        install_dependencies_with_yum "rhel"
    elif grep -Eqi "Fedora" /etc/issue || grep -Eq "Fedora" /etc/*-release; then
        install_dependencies_with_yum "fedora"
    elif grep -Eqi "Debian" /etc/issue || grep -Eq "Debian" /etc/*-release; then
        install_dependencies_with_apt "debian"
    elif grep -Eqi "Ubuntu" /etc/issue || grep -Eq "Ubuntu" /etc/*-release; then
        install_dependencies_with_apt "ubuntu"
    elif grep -Eqi "Arch" /etc/issue || grep -Eqi "EndeavourOS" /etc/issue || grep -Eq "Arch" /etc/*-release; then
        install_dependencies_with_aur
    elif grep -Eqi "SUSE" /etc/os-release; then
        install_dependencies_with_zypper
    else
        echo "Non-supported distribution, APISIX is only supported on Linux-based systems"
        exit 1
    fi
    install_apisix_runtime
}

function multi_distro_uninstallation() {
    if grep -Eqi "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
        sudo yum autoremove -y openresty-zlib-devel openresty-pcre-devel
    elif grep -Eqi -e "Red Hat" -e "rhel" /etc/*-release; then
        sudo yum autoremove -y openresty-zlib-devel openresty-pcre-devel
    elif grep -Eqi "Fedora" /etc/issue || grep -Eq "Fedora" /etc/*-release; then
        sudo yum autoremove -y openresty-zlib-devel openresty-pcre-devel
    elif grep -Eqi "Debian" /etc/issue || grep -Eq "Debian" /etc/*-release; then
        sudo apt-get autoremove -y openresty-zlib-dev openresty-pcre-dev
    elif grep -Eqi "Ubuntu" /etc/issue || grep -Eq "Ubuntu" /etc/*-release; then
        sudo apt-get autoremove -y openresty-zlib-dev openresty-pcre-dev
    elif grep -Eqi "SUSE" /etc/os-release; then
        sudo zypper remove -y openresty-zlib-dev openresty-pcre-dev
    else
        echo "Non-supported distribution, APISIX is only supported on Linux-based systems"
        exit 1
    fi
}

function install_apisix_runtime() {
    export runtime_version=${APISIX_RUNTIME:?}
    wget "https://raw.githubusercontent.com/api7/apisix-build-tools/apisix-runtime/${APISIX_RUNTIME}/build-apisix-runtime.sh"
    chmod +x build-apisix-runtime.sh
    ./build-apisix-runtime.sh latest
    rm build-apisix-runtime.sh
}

# Install LuaRocks
function install_luarocks() {
    if [ -f "./utils/linux-install-luarocks.sh" ]; then
        ./utils/linux-install-luarocks.sh
    elif [ -f "./linux-install-luarocks.sh" ]; then
        ./linux-install-luarocks.sh
    else
        echo "Installing luarocks from remote master branch"
        curl https://raw.githubusercontent.com/apache/apisix/master/utils/linux-install-luarocks.sh -sL | bash -
    fi
}

# Entry
function main() {
    OS_NAME=$(uname -s | tr '[:upper:]' '[:lower:]')
    if [[ "$#" == 0 ]]; then
        if [[ "${OS_NAME}" == "linux" ]]; then
            multi_distro_installation
            install_luarocks
            return
        else
            echo "Non-supported distribution, APISIX is only supported on Linux-based systems"
            exit 1
        fi
    fi

    case_opt=$1
    case "${case_opt}" in
        "install_luarocks")
            install_luarocks
        ;;
        "uninstall")
            if [[ "${OS_NAME}" == "linux" ]]; then
                multi_distro_uninstallation
            else
                echo "Non-supported distribution, APISIX is only supported on Linux-based systems"
            fi
        ;;
        *)
            echo "Unsupported method: ${case_opt}"
        ;;
    esac
}

main "$@"
```

And paste it in `utils/install-dependencies.sh` using vim or your text editor of choice:

```shell
vim install-dependencies.sh
# Copy and paste the script
mv install-dependencies.sh utils/install-dependencies.sh
chmod 755 utils/install-dependencies.sh
```

This will add an `install_dependencies_with_zypper` function to the script that will handle all the needed dependencies for SLES 15.

## Build APISIX from source

We are ready to follow the [Building APISIX from source](https://apisix.apache.org/docs/apisix/next/building-apisix/) documentation.

We can launch the next commands to build and install APISIX:

```shell
make deps
make install
```

## Install etcd

APISIX needs etcd to work, we can install etcd following the [official documentation](https://apisix.apache.org/docs/apisix/next/building-apisix/#installing-etcd)

```shell
ETCD_VERSION='3.4.18'
wget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz
tar -xvf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz && \
  cd etcd-v${ETCD_VERSION}-linux-amd64 && \
  sudo cp -a etcd etcdctl /usr/bin/
  cd ..
nohup etcd >/tmp/etcd.log 2>&1 &
```

## Create a nobody user and group

Before launching APISIX we need to create a user and a group both called `nobody`.
This is necessary for `openresty` to launch correctly.

```shell
useradd nobody -U
```

## Run APISIX

Finally APISIX can be initialized and started:

```shell
apisix init
apisix start
```
