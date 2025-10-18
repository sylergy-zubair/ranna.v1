const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-west-2'
});

const s3 = new AWS.S3({
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  }
});

module.exports = {
  s3,
  bucketName: process.env.AWS_BUCKET_NAME
};
