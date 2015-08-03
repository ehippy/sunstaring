console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(event, context) {

    var timeWindowStart = new Date().getTime() - 24*60*60*1000; //24 hrs

    var params = {};
    params.TableName = "solar_sleeper";
    params.KeyConditions = [dynamo.Condition("panelId", "EQ", "alpha"),
        dynamo.Condition("timestamp", "GT", timeWindowStart)];

    dynamo.query(params, function(err, data) {
        console.log('result!');
        console.log(err);
        console.log("Count: " + data.Count);
        context.succeed(data.Items);
    });

    console.log('queried');
};