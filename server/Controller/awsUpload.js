// const express = require('express');
// const aws = require('aws-sdk');
import aws from "aws-sdk"
import { v4 as uuidv4} from "uuid"


// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 instance
const s3 = new aws.S3();

// Generate pre-signed URL for uploading
export const getPresignedUrl=(req, res) => {
  const filename = `${uuidv4()}_${req.query.filename}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: filename,
    Expires: 60, // URL expiration time in seconds
    ContentType: req.query.filetype,
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Error generating pre-signed URL:', err);
      return res.status(500).json({ error: 'Failed to generate URL' });
    }
    res.json({ url });
  });
};


export const awsConf =(req, res) => {
    const awsConfig = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      s3BucketName: process.env.AWS_S3_BUCKET_NAME,
    };
    res.json(awsConfig);
  };

