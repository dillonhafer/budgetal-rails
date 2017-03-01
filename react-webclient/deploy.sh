set -e
source .env
API_URL=$API_URL WEBPACK_HOSTNAME=$WEBPACK_HOSTNAME yarn run build
rsync -avzh --include='static/' --include='build/' $RSYNC_REMOTE_PARAM
rm -rf build
