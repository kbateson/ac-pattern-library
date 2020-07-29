const uuid = require('uuid').v4;

module.exports.upload = async (event, context, callback) => {
    console.log(event.body);

    if (!event.body)
        return callback(null, { statusCode: 400, body: 'You done fucked up sir' });
    const body = JSON.parse(event.body);

    const imageName = `${uuid()}.png`;

    const pattern = {
        patternId: body.pattern.patternId,
        creatorId: body.pattern.creatorId,
        patternName: body.pattern.patternName,
        tags: body.pattern.tags,
        imageName: imageName
    }

    console.log(JSON.stringify(pattern));

    var params = {
        Body: body.pattern.image,
        Bucket: 'nookwill-files',
        ContentEncoding: 'base64',
        ContentType: 'image/png',
        Key: imageName
    };

    try {
        let dynamoResponse = context.dynamo.put({
            TableName: 'nookwill-user-patterns',
            Item: pattern
        }).promise();
        let s3Response = context.s3.putObject(params).promise();
        const responses = await Promise.all([dynamoResponse, s3Response]);
    } catch(err) {
        console.log(err);
    }

    return callback(null, { statusCode: 200, body: 'you did the thing!!!?!' });
}