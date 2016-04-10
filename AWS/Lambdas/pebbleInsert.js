console.log('Loading function');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

module.exports.handler = function(event, context) {
  var timestamp = new Date().getTime().toString();
  var put_params = {
      TableName: 'BlogPosts',
      Item: {
          channel: {
              S: 'default'
          },
          message: {
              S: event.message
          },
          timestamp: {
              N: timestamp
          }
      }
  };
  dynamodb.putItem(put_params, function(err, data) {
      if (err){
        context.fail(err);
    	} else {
        context.succeed({
        	inserted: true
        });
      }
  });
};
