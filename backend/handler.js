const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const s3 = new aws.S3({apiVersion: '2012-08-10'});
const upload = require('./upload.js').upload;

module.exports.upload = (event, context, callback) => {
    context.dynamo = dynamo;
    context.s3 = s3;
    upload(event, context, callback);
}

