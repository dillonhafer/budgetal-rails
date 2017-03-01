#!/usr/local/bin/bash
set -e
source .env
API_URL=$API_URL WEBPACK_HOSTNAME=$WEBPACK_HOSTNAME yarn run build
rsync -az static/ "$RSYNC_USER"@"$RSYNC_SERVER":"$RSYNC_PATH"
rsync -az build/  "$RSYNC_USER"@"$RSYNC_SERVER":"$RSYNC_PATH"
rm -rf build
