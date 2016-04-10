require('./aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:5a64f561-2b39-45ef-9a68-3e1163bb09f3'
});

var post;
var lambda = new AWS.Lambda();

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage', function(e) {
    console.log('AppMessage received!');
    post = e.payload["1"];
	console.log(post);

	var input={
	  message: post  
	};

	lambda.invoke({
		FunctionName: "pebbleInsert",
		Payload: JSON.stringify(input)
		}, function(err, data) {
			if(!err) {
				console.log('No Error!');	
				console.log(data);
			} else {
			  console.log(err);
			}
	});
});


