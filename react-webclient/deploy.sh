source .env
API_URL=$API_URL npm run build
aws s3 sync static s3://$S3_BUCKET_NAME
aws s3 sync build s3://$S3_BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /index.html