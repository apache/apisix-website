---
id: release-guide
title: Release Guide
---
## Release Flow

The release flow of Apache APISIX follows [GitLab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html), instead of Git flow or Github flow. Furthermore, [Release branches with GitLab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html#release-branches-with-gitlab-flow) is the preferred way. The chart below will take the release `v2.3` of [apache/apisix-dashboard](https://github.com/apache/apisix-dashboard) as an example to illustrate the details.

![Release Flow](/img/release_flow.png)

The entire flow is comprised of the following four phases.

### Planning Phase

This phase will decide if a feature is ready to be released as well as the release time.

-   A new target milestone will be created in Github. (e.g. [`2.3`](https://github.com/apache/apisix-dashboard/milestone/6)).
-   A discussion will be started on dev mailing list [dev@apisix.apache.org](dev@apisix.apache.org) for gathering ideas for the next release.
-   Maintainer team will then mark the issues and pull requests with the target milestone.

### Development Phase

This phase is for developing new features and fixing bugs.

-   Maintainer team and contributors will work on the issues targeted to release milestone.
-   Every single new issue is required to be recognized if it should be included in the next release. If yes, the milestone needs to be set for the issue.

### Release Phase

This phase will be throughout the entire Release Time Window.

-   A new branch (e.g. [`v2.3`](https://github.com/apache/apisix-dashboard/tree/v2.3)) for release is created from the `master` branch, which is also considered as the start of the Release Time Window.
-   Set corresponding configurations for the new release branch, please see the chart above for details.
-   As complying with **Upstream first**, each commit needs to be merged into the `master` branch first. Afterward, it will be backported to the new release branch if the relevant pull request is with the `need backport` label attached.
-   At the end of the Release Time Window, the `CHANGELOG` for the new release will be added.
-   Tag the last commit and release the assets via the following section [GPG Settings](#gpg-settings).

### Maintenance Phase

Once a version is released, it will enter the maintenance mode and will only accept the security and critical bug patches backported from the `master` branch. A new version will be released soon after significant bugs got fixed, with patch version increment (e.g. `2.3.1`). In this case, all users are recommended to upgrade to the latest release to avoid potential risk to the stability.

## GPG Settings

### Install GPG

Download GnuPG from https:. There are differences between the 1.x and 2.x versions of the GnuPG commands, and the following descriptions are based on the GnuPG 2.x versions.

After the installation is complete, execute the following command to check the version.

```sh



```

### Create Key

Execute the following command to create the key:

#### GnuPG-2.x：

```sh



```

#### GnuPG-1.x：

```sh



```

Follow the instructions to generate key：

Note: Please use the Apache email address to generate the GPG Key.

```sh



```

### View the generated key:

```sh



```

The example result：

```sh



```

And `` is the ID of pub key

### Synchronizing the public key to the server

The steps are as follows:

```sh



```

`` is one of the pub key servers, the pub key will be automatically synchronized between each server, just choose anyone.

### Add `` to id.apache.org

get Key Fingerprint

```sh



```

### Login id.apache.org and submit Key Fingerprint

### Add your GPG key to Apache svn

download APISIX svn

```sh



```

```sh



```

Export the public key and append it to the KEYS file.

```sh



```

Commit the modified KEYS file, saving the public key to the svn server.

```sh



```

### Make source code package and upload to Apache SVN

Here's an example of preparing a 1.0 version. Before you make the package, make sure you have branch v1.0 ready on GitHub.

```sh



```

### Send VOTE thread to the dev mailing list

Click [here](https://lists.apache.org/thread.html/rf534952a6b2d23ed6efdd61f15b40fa9e4de230164a1ccf168176734%40%3Cdev.apisix.apache.org%3E) to view the reference email. There is a minimum wait of 72 hours before statistical voting results. If you get -1 vote, you need to solve the problem before you can continue.

### Send VOTE RESULT thread to the dev mailing list

Click [here](https://lists.apache.org/thread.html/r9153da737a4590dbbba7272acc004cf4bc7abefa488069810d790643%40%3Cdev.apisix.apache.org%3E) to view the reference email at least 3 `` [binding votes](https://www.apache.org/foundation/voting.html#binding-votes) is required, then send the vote result to [dev@apisix.apache.org](mailto:dev@apisix.apache.org).

### Move package from dev to dist

Invite [PMCs](https://apisix.apache.org/team/) to move KEYS and package under the [``](https://dist.apache.org/repos/dist/release/apisix/) directory.

### Update Download page

The [Download](https://github.com/apache/apisix-website) page contains links for Apache APISIX, Apache APISIX Dashboard, and other sources, and we need to update its contents [here](https://github.com/apache/apisix-website/blob/master/docs/download.md).

### Send ANNOUNCE

Click [here](https://lists.apache.org/thread.html/r6e90ffb7964314605c082ac3ae204303ad94f0f71087542c33fcd7bf%40%3Cdev.apisix.apache.org%3E) to view the reference email send announce email to [dev@apisix.apache.org](mailto:dev@apisix.apache.org) and [announce@apache.org](mailto:announce@apache.org)
