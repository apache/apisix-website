#!/usr/bin/env bash

# This script generates a poster card for every page.

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")/..

cp ${SCRIPTPATH}/website/src/theme/Footer/* ${SCRIPTPATH}/doc/src/theme/Footer/
cp ${SCRIPTPATH}/website/src/theme/Footer/* ${SCRIPTPATH}/blog/src/theme/Footer/