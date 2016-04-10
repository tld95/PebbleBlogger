console.log('Loading function');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({
    region: "us-east-1", // Region for our Database
    params: {
        TableName: "BlogPosts" // The table name for our Database
    }
 });
module.exports.handler = function(event, context) {
  var params = { // query for where the Hash Key channel == "default"
          "KeyConditions": {
              "channel": {
                  "AttributeValueList": [{
                      "S": "default"
                  }],
                  "ComparisonOperator": "EQ"
              }
          },
          "Limit": 100, // Then get the last 100 entries
              "ScanIndexForward":false
      }

  dynamodb.query(params, function(err, response) {
      if (err) {
        return context.fail(err);
      } else {
        var out = [];
        var items = response.Items; // DynamoDB returns a response object with a Items property which
        for(var i = 0; i < items.length; i++) { // an array of objects (items)
        	var item =  { 
            channel: items[i].channel.S, // DynamoDB wraps each type in an object and the key is the type
            message: items[i].message.S, // more details at http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property
            timestamp: items[i].timestamp.N
          };
          out.push(item);
        }
        context.succeed(out);
      }
  });
};
