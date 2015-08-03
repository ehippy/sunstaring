console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(event, context) {

    var timeWindowStart = new Date().getTime() - 60*1000; //60 seconds ago

    var params = {};
    params.TableName = "solar_sleeper";
    params.KeyConditions = [dynamo.Condition("panelId", "EQ", "alpha"),
        dynamo.Condition("timestamp", "GT", timeWindowStart)];

    dynamo.query(params, function(err, data) {
        console.log('result!');
        console.log(err);
        console.log(data);
        context.succeed(data.Count>0);
    });

    console.log('queried');
};