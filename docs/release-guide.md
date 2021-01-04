---
id: release-guide
title: Release Guide
---

## GPG Settings

### Install GPG

Download GnuPG from https://gnupg.org/download/index.html. There are differences between the 1.x and 2.x versions of the GnuPG commands, and the following descriptions are based on the GnuPG 2.x versions.

After the installation is complete, execute the following command to check the version.

```sh
$ gpg --version
```

### Create Key

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

Note: Please use Apache email address to generate the GPG Key.

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

`pool.sks-keyservers.net` is one of pub key servers,the pub key will be automatically synchronized between each server, just choose any one.

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

### Login id.apache.org and submit Key Fingerprint

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

Export the public key and append to the KEYS file.

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
Transmitting file data .
Committed revision 37434.
```

### Make source code package and upload to Apache SVN

Here's an example of preparing a 1.0 version. Before you make package, make sure you have branch v1.0 ready on github.

```sh
# Create a new version number directory and enter, for example: 1.0
$ mkdir 1.0 && cd 1.0

# download repo
git clone -b v1.0 git@github.com:apache/apisix.git apache-apisix-1.0

# check version
$ cd apache-apisix-1.0 && ./utils/check-version.sh 1.0 && cd ..

# delete .git
$ rm -rf apache-apisix-1.0/.git

# make tar package
$ tar zcvf apache-apisix-1.0-src.tar.gz apache-apisix-1.0

# Signature (this brings up a dialog box that prompts you to enter the password you entered when generating the gpg)
$ gpg --armor --detach-sign apache-apisix-1.0-src.tar.gz

# Generate sha512 checksum file
$ shasum -a512 apache-apisix-1.0-src.tar.gz > apache-apisix-1.0-src.tar.gz.sha512

# remove apache-apisix-1.0
$ rm -rf apache-apisix-1.0

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

### Send VOTE thread to dev mailinglist

Click [here](https://lists.apache.org/thread.html/rf534952a6b2d23ed6efdd61f15b40fa9e4de230164a1ccf168176734%40%3Cdev.apisix.apache.org%3E) to view the reference emailThere is a minimum wait of 72 hours before statistical voting results. If you get -1 vote, you need to solve the problem before you can continue.

### Send VOTE RESULT thread to dev mailinglist

Click [here](https://lists.apache.org/thread.html/r9153da737a4590dbbba7272acc004cf4bc7abefa488069810d790643%40%3Cdev.apisix.apache.org%3E) to view the reference email at least 3 `+1` [binding votes](https://www.apache.org/foundation/voting.html#binding-votes) is required, then send the vote result to dev@apisix.apache.org.

### Send ANNOUNCE

Click [here](https://lists.apache.org/thread.html/r6e90ffb7964314605c082ac3ae204303ad94f0f71087542c33fcd7bf%40%3Cdev.apisix.apache.org%3E) to view the reference email send announce email to dev@apisix.apache.org and announce@apache.org

### Move package from dev to dist

Move KEYS and package to `release` branch.

### Update Download page

update address , source repo is https://github.com/apache/apisix-website
