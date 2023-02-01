#!/usr/bin/env sh
# remove <!--\s*markdown-link-check-disable\s*--> and <!--\s*markdown-link-check-enable\s*-->
# in /apisix-ingress-controller/references/v2.mdx
# after synced docs

BASEDIR=$(dirname $0)/..

sed -i '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs/apisix-ingress-controller/references/v2.mdx
