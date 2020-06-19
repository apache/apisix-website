---
title: "Release Guide"
date: 2020-01-07T11:46:04+08:00
include_footer: true
---

<div class="release-guide">
  <section>
    <h2 class="title">GPG Settings</h2>
    <br />
    <h3 class="subtitle">Install GPG</h3>
    <p>Download GnuPG from https://gnupg.org/download/index.html. There are differences between the 1.x and 2.x versions of the GnuPG commands, and the following descriptions are based on the GnuPG 2.x versions.</p>
    <p>After the installation is complete, execute the following command to check the version.</p>
    {{< highlight go "linenos=table" >}}
    gpg --version
    {{< / highlight >}}
    <h3 class="subtitle">Create Key</h3>
    <p>Execute the following command to create the key:</p>
    <p>GnuPG-2.x：</p>
    {{< highlight go "linenos=table" >}}
    gpg --full-gen-key
    {{< / highlight >}}
    <p>GnuPG-1.x：</p>
    {{< highlight go "linenos=table" >}}
    gpg --gen-key
    {{< / highlight >}}
    <p>Follow the instructions to generate key：</p>
    <p class="warning">Note: Please use Apache email address to generate the GPG Key.</p>
    {{< highlight go "linenos=table" >}}
    {{% contribute/release/gpg-key-generator %}}
    {{< / highlight >}}
    <h3 class="subtitle">View the generated key:</h3>
    {{< highlight go "linenos=table" >}}
    gpg --list-keys
    {{< / highlight >}}
    <p>The example result：</p>
    {{< highlight go "linenos=table" >}}
    $ gpg --list-keys
    /home/resty/.gnupg/pubring.gpg
    ------------------------------
    pub   4096R/30B5FD72 2020-01-02
    uid   Yuansheng Wang <membphis@apache.org>
    sub   4096R/3D2F913D 2020-01-02
    {{< / highlight >}}
    <p>And `30B5FD72` is the ID of pub key</p>
    <h3 class="subtitle">Synchronizing the public key to the server</h3>
    <p>The steps are as follows:</p>
    {{< highlight go "linenos=table" >}}
    // The last parameter is the public key ID generated above
    $ gpg --keyserver hkp://pool.sks-keyservers.net --send-key 30B5FD72
    gpg: sending key 30B5FD72 to hkp server pool.sks-keyservers.net
    {{< / highlight >}}
    <p>pool.sks-keyservers.net is one of <a href="https://sks-keyservers.net/status/" target="_blank">pub key servers,</a>the pub key will be automatically synchronized between each server, just choose any one.</p>
    <h3 class="subtitle">Add `Key Fingerprint` to id.apache.org </h3>
    <p>get Key Fingerprint</p>
    {{< highlight go "linenos=table" >}}
    # Note the `Key fingerprint` section below.
    $ gpg --list-keys --fingerprint
    /home/resty/.gnupg/pubring.gpg
    ------------------------------
    pub   4096R/30B5FD72 2020-01-02
          Key fingerprint = 0F91 BE0A 55A7 B22F DE1A  CEEC 3352 48FD 30B5 FD72
    uid                  Yuansheng Wang <membphis@apache.org>
    sub   4096R/3D2F913D 2020-01-02
    {{< / highlight >}}
    <h3 class="subtitle">Login id.apache.org and submit Key Fingerprint</h3>
    <h3 class="subtitle">Add your GPG key to Apache svn</h3>
    <p>download APISIX svn</p>
    {{< highlight go "linenos=table" >}}
    $ svn --username=${Apache username} co https://dist.apache.org/repos/dist/dev/incubator/apisix
    {{< / highlight >}}
    {{< highlight go "linenos=table" >}}
    $ cd apisix
    $ ls
    KEYS
    {{< / highlight >}}
    <p>Export the public key and append to the KEYS file.</p>
    {{< highlight go "linenos=table" >}}
    $ gpg -a --export ${GPG username}  >> KEYS
    {{< / highlight >}}
    <p>Commit the modified KEYS file, saving the public key to the svn server.</p>
    {{< highlight go "linenos=table" >}}
    $ svn --username=${Apache username} commit -m "added ${Apache email} gpg pub key"
    Authentication realm: <https://dist.apache.org:443> ASF Committers
    Password for 'membphis': # input password
    Store password unencrypted (yes/no)? yes
    Sending        KEYS
    Transmitting file data .
    Committed revision 37434.
    {{< / highlight >}}
    <h3 class="subtitle">Make source code package and upload to Apache SVN</h3>
    <p>Here's an example of preparing a 1.0-rc1 version. Before you make package, make sure you have branch v1.0 ready on github.</p>
    {{< highlight go "linenos=table" >}}

    # Create a new version number directory and enter, for example: 1.0-rc1
    $ mkdir 1.0-rc1 && cd 1.0-rc1

    # download repo
    git clone -b v1.0 git@github.com:apache/incubator-apisix.git apache-apisix-1.0-incubating

    # check version
    $ cd apache-apisix-1.0-incubating && ./utils/check-version.sh 1.0 && cd ..

    # delete .git
    $ rm -rf apache-apisix-1.0-incubating/.git

    # make tar package
    $ tar zcvf apache-apisix-1.0-rc1-incubating-src.tar.gz apache-apisix-1.0-incubating

    # Signature (this brings up a dialog box that prompts you to enter the password you entered when generating the gpg)
    $ gpg --armor --detach-sign apache-apisix-1.0-rc1-incubating-src.tar.gz

    # Generate sha512 checksum file
    $ shasum -a512 apache-apisix-1.0-rc1-incubating-src.tar.gz > apache-apisix-1.0-rc1-incubating-src.tar.gz.sha512

    # remove apache-apisix-1.0-rc1-incubating
    $ rm -rf apache-apisix-1.0-incubating

    # check files
    $ cd .. && tree
    .
    ├── 1.0-rc1
    │   ├── apache-apisix-1.0-rc1-incubating-src.tar.gz
    │   ├── apache-apisix-1.0-rc1-incubating-src.tar.gz.asc
    │   └── apache-apisix-1.0-rc1-incubating-src.tar.gz.sha512
    └── KEYS

    1 directory, 4 files

    # add files to SVN
    $ svn add *
    A         1.0-rc1
    A  (bin)  1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz.asc
    A  (bin)  1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz
    A         1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz.sha512
    svn: warning: W150002: '/home/resty/git/apache_svn/apisix/KEYS' is already under version control
    svn: E200009: Could not add all targets because some targets are already versioned
    svn: E200009: Illegal target for the requested operation

    # commit to Apache SVN
    $ svn --username=${Apache username} commit -m "release 1.0-rc1"
    Adding         1.0-rc1
    Adding  (bin)  1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz
    Adding  (bin)  1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz.asc
    Adding         1.0-rc1/apache-apisix-1.0-rc1-incubating-src.tar.gz.sha512
    Transmitting file data ...
    Committed revision 37435.
    {{< / highlight >}}
    <h3 class="subtitle">Send vote thread to dev mailinglist</h3>
    <p><a href="https://lists.apache.org/thread.html/4d45dcbeecd0bb70f8010db3d075a5624817a5783beee66f392ae5e0%40%3Cdev.apisix.apache.org%3E">Click here to view the reference email</a>There is a minimum wait of 72 hours before statistical voting results. If you get -1 vote, you need to solve the problem before you can continue. </p>
    <h3 class="subtitle">Send vote result thread to dev mailinglist</h3>
    <p><a href="https://lists.apache.org/thread.html/r8c6e14ea1a0c79b5dfb1dba0e1b6bc919a4797a0c4664f8add3b045c%40%3Cdev.apisix.apache.org%3E">Click here to view the reference email</a> at least 3 `+1` votes is required, then send the vote result to dev@apisix.apache.org. </p>
    <h3 class="subtitle">Send vote thread to the incubator mailing list</h3>
    <p><a href="http://mail-archives.apache.org/mod_mbox/incubator-general/202004.mbox/%3cCABZgMXH7e-CfxXBr5fuPsEAsfMXU4jGs4L7EM2qz+zTcHP=u1w@mail.gmail.com%3e">Click here to view the reference email</a> send vote thread to general@incubator.apache.org and add link of vote result of dev@apisix.apache.org in this new thread.</p>
    <h3 class="subtitle">Send vote result</h3>
    <p><a href="http://mail-archives.apache.org/mod_mbox/incubator-general/202004.mbox/%3cCABZgMXFAL247-9u4ehaBxrEzHKjYkzhH2iZuiU2jdTx7zG4bzw@mail.gmail.com%3e">Click here to view the reference email</a> There is a minimum wait of 72 hours before statistical voting results, and You need at least 3 binding `+1` votes from IPMCs(If there are less than 3 binding votes, the result email cannot be sent), then you can sent the result to general@incubator.apache.org. </p>
    <h3 class="subtitle">send announce</h3>
    <p><a href="https://lists.apache.org/thread.html/r67093ed9a5fbe106dc5066c283f225544f5ae14248df061019d1062e%40%3Cgeneral.incubator.apache.org%3E">Click here to view the reference email</a> send announce email to dev@apisix.apache.org and general@incubator.apache.org </p>
    <h3 class="subtitle">move package from dev to dist</h3>
    <p>Remove `rc` from the package name, and move to <a href="https://dist.apache.org/repos/dist/release/incubator/apisix/"></a></p>
    <h3 class="subtitle">update download page</h3>
    <p>update <a href="http://apisix.apache.org/downloads/"> address </a>, source repo is https://github.com/apache/incubator-apisix-website</p>
  </section>
</div>
