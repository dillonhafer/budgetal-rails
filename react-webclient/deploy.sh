set -e
source .env
API_URL=$API_URL WEBPACK_HOSTNAME=$WEBPACK_HOSTNAME yarn run build
aws s3 sync static s3://$S3_BUCKET_NAME --cache-control max-age=315360000
aws s3 sync build s3://$S3_BUCKET_NAME --exclude "*.html" --cache-control max-age=315360000
aws s3 sync build s3://$S3_BUCKET_NAME --exclude "*" --include "index.html"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /index.html
rm -rf build
