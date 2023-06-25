#!/usr/bin/env bash

# This script generates a poster card for every page.

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")/..

cp ${SCRIPTPATH}/config/event-poster-card.json ${SCRIPTPATH}/website/src/theme/Footer/
cp ${SCRIPTPATH}/website/src/theme/Footer/event-poster-card.json ${SCRIPTPATH}/doc/src/theme/Footer/
cp ${SCRIPTPATH}/website/src/theme/Footer/* ${SCRIPTPATH}/blog/src/theme/Footer/