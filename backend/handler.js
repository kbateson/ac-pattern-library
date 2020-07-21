const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const upload = require('./upload.js').upload;

module.exports.upload = (event, context, callback) => {
    context.dynamo = dynamo;
    upload(event, context, callback);
}

