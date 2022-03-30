---
id: release-guide
title: Release Guide
keywords:
- API gateway
- APISIX
- Apache APISIX
- Release Guide
description: This article explains Apache APISIX's release flow and GPG Settings.
---

## Release flow

The release flow of Apache APISIX follows [GitLab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html), instead of Git flow or Github flow. Furthermore, [Release branches with GitLab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html#release-branches-with-gitlab-flow) is the preferred way. The chart below will take the release `v2.3` of [apache/apisix-dashboard](https://github.com/apache/apisix-dashboard) as an example to illustrate the details.

![Release Flow](/img/release_flow.png)

The entire flow is comprised of the following four phases.

### Planning phase

This phase will decide if a feature is ready to be released as well as the release time.

- A new target milestone will be created in Github. (e.g. [`2.3`](https://github.com/apache/apisix-dashboard/milestone/6)).
- A discussion will be started on dev mailing list dev@apisix.apache.org for gathering ideas for the next release.
- Maintainer team will then mark the issues and pull requests with the target milestone.

### Development phase

This phase is for developing new features and fixing bugs.

- Maintainer team and contributors will work on the issues targeted to release milestone.
- Every single new issue is required to be recognized if it should be included in the next release. If yes, the milestone needs to be set for the issue.

### Release phase

This phase will be throughout the entire Release Time Window.

- A new branch (e.g. [`v2.3`](https://github.com/apache/apisix-dashboard/tree/v2.3)) for release is created from the `master` branch, which is also considered as the start of the Release Time Window.
- Set corresponding configurations for the new release branch, please see the chart above for details.
- As complying with **Upstream first**, each commit needs to be merged into the `master` branch first. Afterward, it will be backported to the new release branch if the relevant pull request is with the `need backport` label attached.
- At the end of the Release Time Window, the `CHANGELOG` for the new release will be added.
- Tag the last commit and release the assets via the following section [GPG Settings](#gpg-settings).

### Maintenance phase

Once a version is released, it will enter the maintenance mode and will only accept the security and critical bug patches backported from the `master` branch. A new version will be released soon after significant bugs got fixed, with patch version increment (e.g. `2.3.1`). In this case, all users are recommended to upgrade to the latest release to avoid potential risk to the stability.

## GPG settings

### Install GPG

Download GnuPG from https://gnupg.org/download/index.html. There are differences between the 1.x and 2.x versions of the GnuPG commands, and the following descriptions are based on the GnuPG 2.x versions.

After the installation is complete, execute the following command to check the version.

```sh
$ gpg --version
```

### Create key

Execute the following command to create the key:

#### GnuPG-2.x：

```sh
$ gpg --full-gen-key
```

#### GnuPG-1.x：

```sh
gpg --gen-key
```

Follow the instructions to generate key：

Note: Please use the Apache email address to generate the GPG Key.

```sh
gpg (GnuPG) 2.0.12; Copyright (C) 2009 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
(1) RSA and RSA (default)
(2) DSA and Elgamal
(3) DSA (sign only)
(4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
0 = key does not expire
<n> = key expires in n days
<n>w = key expires in n weeks
<n>m = key expires in n months
<n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: ${Enter your username}
Email address: ${Enter your email address}
Comment: ${Enter comments}
You selected this USER-ID:
  "${Entered username} (${Entered comments}) &lt;${Entered email address}>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. # Enter passphrase
```

### View the generated key:

```sh
gpg --list-keys
```

The example result：

```sh
$ gpg --list-keys

/home/resty/.gnupg/pubring.gpg
------------------------------
pub 4096R/30B5FD72 2020-01-02
uid Yuansheng Wang <membphis@apache.org>
sub 4096R/3D2F913D 2020-01-02
```

And `30B5FD72` is the ID of pub key

### Synchronizing the public key to the server

The steps are as follows:

```sh
# The last parameter is the public key ID generated above
$ gpg --keyserver hkp://pool.sks-keyservers.net --send-key 30B5FD72

gpg: sending key 30B5FD72 to hkp server pool.sks-keyservers.net
```

`pool.sks-keyservers.net` is one of the pub key servers, the pub key will be automatically synchronized between each server, just choose anyone.

### Add `Key Fingerprint` to id.apache.org

get Key Fingerprint

```sh
# Note the `Key fingerprint` section below.
$ gpg --list-keys --fingerprint

/home/resty/.gnupg/pubring.gpg
------------------------------
pub 4096R/30B5FD72 2020-01-02
Key fingerprint = 0F91 BE0A 55A7 B22F DE1A CEEC 3352 48FD 30B5 FD72
uid Yuansheng Wang <membphis@apache.org>
sub 4096R/3D2F913D 2020-01-02
```

### Login id.apache.org and submit key fingerprint

### Add your GPG key to Apache svn

download APISIX svn

```sh
$ svn --username=${Apache username} co https://dist.apache.org/repos/dist/dev/apisix
```

```sh
$ cd apisix

$ ls

KEYS
```

Export the public key and append it to the KEYS file.

```sh
$ gpg -a --export ${GPG username} >> KEYS
```

Commit the modified KEYS file, saving the public key to the svn server.

```sh
$ svn --username=${Apache username} commit -m "added \${Apache email} gpg pub key"
Authentication realm: <https://dist.apache.org:443> ASF Committers
Password for 'membphis': # input password
Store password unencrypted (yes/no)? yes
Sending KEYS
Transmitting file data.
Committed revision 37434.
```

### Make source code package and upload to Apache SVN

Here's an example of preparing a 1.0 version. Before you make the package, make sure you have branch v1.0 ready on GitHub.

```sh
# Create a new version number directory and enter, for example: 1.0
$ export APISIX_VERSION=1.0
$ mkdir $APISIX_VERSION && cd $APISIX_VERSION

# download repo
git clone -b v$APISIX_VERSION git@github.com:apache/apisix.git apache-apisix-$APISIX_VERSION

# check version
$ cd apache-apisix-$APISIX_VERSION && ./utils/check-version.sh $APISIX_VERSION && cd ..

# make tar package / asc / sha512
$ cd apache-apisix-$APISIX_VERSION && make release-src VERSION=$APISIX_VERSION
$ mv ./release/* ../ && cd ..

# remove apache-apisix-1.0
$ rm -rf apache-apisix-$APISIX_VERSION

# check files
$ cd .. && tree
.
├── 1.0
│   ├── apache-apisix-1.0-src.tar.gz
│   ├── apache-apisix-1.0-src.tar.gz.asc
│   └── apache-apisix-1.0-src.tar.gz.sha512
└── KEYS

1 directory, 4 files

# add files to SVN
$ svn add *
A         1.0
A  (bin)  1.0/apache-apisix-1.0-src.tar.gz.asc
A  (bin)  1.0/apache-apisix-1.0-src.tar.gz
A         1.0/apache-apisix-1.0-src.tar.gz.sha512
svn: warning: W150002: '/home/resty/git/apache_svn/apisix/KEYS' is already under version control
svn: E200009: Could not add all targets because some targets are already versioned
svn: E200009: Illegal target for the requested operation

# commit to Apache SVN
$ svn --username=${Apache username} commit -m "release 1.0"
Adding         1.0
Adding  (bin)  1.0/apache-apisix-1.0-src.tar.gz
Adding  (bin)  1.0/apache-apisix-1.0-src.tar.gz.asc
Adding         1.0/apache-apisix-1.0-src.tar.gz.sha512
Transmitting file data ...
Committed revision 37435.
```

### Send VOTE thread to the dev mailing list

There is a minimum wait of 72 hours before statistical voting results. If you get -1 vote, you need to solve the problem before you can continue. An email example is as shown below.

```
Hello, Community,
This is a call for the vote to release Apache APISIX version 2.0.

Release notes:

https://github.com/apache/apisix/blob/2.4/CHANGELOG.md#240

The release candidates:

https://dist.apache.org/repos/dist/dev/apisix/2.4/

Git tag for the release:

https://github.com/apache/apisix/tree/2.4

Release Commit ID:

https://github.com/apache/apisix/commit/b94d3fc3b298df593ba6fe5c7b285768b567991e

Keys to verify the Release Candidate:

https://dist.apache.org/repos/dist/dev/apisix/KEYS

Steps to validating the release:

1. Download the release

wget https://dist.apache.org/repos/dist/dev/apisix/2.4/apache-apisix-2.4-src.tgz


2. Checksums and signatures

wget https://dist.apache.org/repos/dist/dev/apisix/KEYS

wget https://dist.apache.org/repos/dist/dev/apisix/2.4/apache-apisix-2.4-src.tgz.asc

wget https://dist.apache.org/repos/dist/dev/apisix/2.4/apache-apisix-2.4-src.tgz.sha512

gpg --import KEYS

shasum -c apache-apisix-2.4-src.tgz.sha512

gpg --verify apache-apisix-2.4-src.tgz.asc apache-apisix-2.4-src.tgz

3. Unzip and Check files

tar zxvf apache-apisix-2.4-src.tgz

4. Build Apache APISIX:

https://github.com/apache/apisix/blob/release/2.4/docs/en/latest/how-to-build.md#installation-via-source-release

The vote will be open for at least 72 hours or until necessary number of
votes are reached.

Please vote accordingly:

[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove with the reason

```

### Send VOTE RESULT thread to the dev mailing list

Click [here](https://lists.apache.org/thread.html/r9153da737a4590dbbba7272acc004cf4bc7abefa488069810d790643%40%3Cdev.apisix.apache.org%3E) to view the reference email at least 3 `+1` [binding votes](https://www.apache.org/foundation/voting.html#binding-votes) is required, then send the vote result to dev@apisix.apache.org.

### Move package from dev to dist

Invite [PMCs](https://apisix.apache.org/team/) to move KEYS and package under the [`release`](https://dist.apache.org/repos/dist/release/apisix/) directory.

### Update Download page

The [Download](https://apisix.apache.org/downloads) page contains links for Apache APISIX, Apache APISIX Dashboard, and other sources, and we need to update its contents [here](https://github.com/apache/apisix-website/blob/master/website/docusaurus.config.js).

### Send announcement email

Click [here](https://lists.apache.org/thread.html/r6e90ffb7964314605c082ac3ae204303ad94f0f71087542c33fcd7bf%40%3Cdev.apisix.apache.org%3E) to view the reference email send the announcement email to dev@apisix.apache.org and announce@apache.org
