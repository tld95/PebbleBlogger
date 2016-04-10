var aws = XMLHttpRequest('aws-sdk.min');
aws.config.region = 'us-east-1';
aws.config.credentials = new aws.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:5a64f561-2b39-45ef-9a68-3e1163bb09f3'
});

var lambda = new aws.Lambda();

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
	if (xhr.readyState==4 && xhr.status==200) {
 	  callback(this.responseText);
	} else {
	  console.log(xhr.readyState + " " + xhr.status);	
	}
  };
  xhr.open(type, url);
  xhr.send();
};

Pebble.addEventListener('ready', function(e) {
  console.log('JavaScript app ready and running!');
  console.log('Test!');
});

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage', function(e) {
    console.log('AppMessage received!');
    var post = e.payload["1"];
});


