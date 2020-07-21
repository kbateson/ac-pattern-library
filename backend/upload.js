const uuid = require('uuid').v4;

module.exports.upload = async (event, context, callback) => {
    console.log(event.body);

    const body = JSON.parse(event.body);

    if(!body)
        return callback({ code: 400, message: 'You done fucked up sir' });

    // pattern code - string
    // user code - string
    // pattern name - string
    // pattern image - img
    // qr code image - img
    // tags - array strings

    const imageName = `${uuid()}.png`;

    const pattern = {
        patternId: body.pattern.patternId,
        creatorId: body.pattern.creatorId,
        patternName: body.pattern.patternName,
        tags: body.pattern.tags,
        imageName: imageName
    }

    console.log(JSON.stringify(pattern));
    
    await context.dynamo.put({
        TableName: 'nookwill-user-patterns',
        Item: pattern
    }).promise();

    return callback(null, { code: 200, message: 'you did the thing!!!?!' });
}