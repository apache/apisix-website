#!/usr/bin/env bash
# remove <!--\s*markdown-link-check-disable\s*--> and <!--\s*markdown-link-check-enable\s*-->
# in /apisix-ingress-controller/references/v2.mdx
# after synced docs

BASEDIR=$(dirname $0)/..

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sed -i '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs/apisix-ingress-controller/references/v2.mdx
  sed -i '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/references/v2.mdx
  sed -i '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs-apisix-ingress-controller_versioned_docs/version-1.8.0/references/v2.mdx
elif [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs/apisix-ingress-controller/references/v2.mdx
  sed -i '' '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/references/v2.mdx
  sed -i '' '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' $BASEDIR/doc/docs-apisix-ingress-controller_versioned_docs/version-1.8.0/references/v2.mdx
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi
