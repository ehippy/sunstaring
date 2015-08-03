console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    var operation = event.operation;
    delete event.operation;

    var time = new Date().getTime();

    console.log(time);

    switch (operation) {
        case 'wakeup':
            dynamo.putItem({"TableName": "solar_sleeper", "Item": {"panelId": "alpha", "timestamp": time, "event": "wakeup"}}, context.done);
            break;
        case 'checkin':
            dynamo.putItem({"TableName": "solar_sleeper", "Item": {"panelId": "alpha", "timestamp": time, "event": "checkin"}}, context.done);
            break;
        case 'ping':
            context.succeed('pong');
            break;
        default:
            context.fail(new Error('Unrecognized operation "' + operation + '"'));
    }
};