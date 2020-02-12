---
title: "下载"
date: 2019-11-26T23:48:02+08:00
include_footer: true
---

<div class="downloads">
  <section>
    <h2 class="title">Releases</h2>
    <p class="description">
      Apache APISIX is released as source code tarballs. The downloads are distributed via mirror sites and should be
      checked for tampering using GPG or SHA-512.
    </p>
    <div class="table-container" role="table" aria-label="Destinations">
      <div class="flex-table header" role="rowgroup">
        <div class="flex-row first" role="columnheader">Version</div>
        <div class="flex-row" role="columnheader">Release date</div>
        <div class="flex-row" role="columnheader">Source download</div>
      </div>
      <div class="flex-table row" role="rowgroup">
        <div class="flex-row first" role="cell"><span class="flag-icon flag-icon-gb"></span>0.9</div>
        <div class="flex-row" role="cell">2019 November 24</div>
        <div class="flex-row" role="cell">
          <a href="https://dist.apache.org/repos/dist/release/incubator/apisix/0.9/">source</a>
          (
          <a href="http://www.apache.org/dist/incubator/apisix/0.9/apache-apisix-0.9-incubating-src.tar.gz.asc">asc</a>
          <a
            href="http://www.apache.org/dist/incubator/apisix/0.9/apache-apisix-0.9-incubating-src.tar.gz.sha512">sha512</a>
          )
        </div>
      </div>
    </div>
  </section>
  <section>
    <h2 class="title">Verify the releases</h2>
    <a href="https://www.apache.org/dist/incubator/apisix/KEYS">PGP signatures KEYS</a>
    <p>
      It is essential that you verify the integrity of the downloaded files using the PGP or SHA signatures. The PGP
      signatures can be verified using GPG or PGP. Please download the KEYS as well as the asc signature files for
      relevant distribution. It is recommended to get these files from the main distribution directory and not from the
      mirrors.
    </p>

    {{< highlight go "linenos=table" >}}
    gpg -i KEYS
    {{< / highlight >}}

    <p>
      or
    </p>

    {{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
    pgpk -a KEYS
    {{< / highlight >}}

    <p>
      or
    </p>

    {{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
    pgp -ka KEYS
    {{< / highlight >}}

    <p>
      To verify the binaries/sources you can download the relevant asc files for it from main distribution directory and
      follow the below guide.
    </p>

    {{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
    gpg --verify apache-apisix-incubating-********.asc apache-apisix-incubating-*********
    {{< / highlight >}}

    <p>
      or
    </p>

    {{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
    pgpv apache-apisix-incubating-********.asc
    {{< / highlight >}}

    <p>
      or
    </p>

    {{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
    pgp apache-apisix-incubating-********.asc
    {{< / highlight >}}
    <p />
  </section>
  <section>
    <h2 class="title">Disclaimer</h2>
    <p>
      Apache APISIX (incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF),
      sponsored by the Apache Incubator PMC. Incubation is required of all newly accepted projects until a further
      review indicates that the infrastructure, communications, and decision making process have stabilized in a manner
      consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the
      completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.
    </p>
  </section>
</div>