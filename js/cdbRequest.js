var querystring = require('querystring');
var request = require('request');
var url = require( "url" );
const {dbconn, dbstmt} = require('idb-connector'); 

 
 
 
 
 
 
function cdbRequest(urlAuth, registrationKey,apiVersion,accessToken, httpBody) {
	
	return new Promise(function(responseHttp) {
 
 
 


//console.log(clientsecret);

var form = {}; 
 form = httpBody;




//console.log("form 1");
var formData = querystring.stringify(httpBody);
formData = httpBody;
//console.log('form data:' +formData);
var contentLength = formData.length;
var bearerAccessToken = 'Bearer '+ accessToken;
//console.log('bearer '+ bearerAccessToken);
var test = 'test '+ urlAuth;
//console.log('cdbRequest urlAuth ' +urlAuth);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error
var urlstring = '"' +urlAuth+ '"';
//console.log('urlstring '+ urlstring);
//var urlstring = "https://vcamauth.global.volvocars.biz/nidp/saml2/sso";
var parsedurl = url.parse( urlAuth );
//console.log('parsedurl ' +JSON.stringify(parsedurl));
var options = {
  hostname: parsedurl.hostname,
  url: parsedurl,
 // proxy: "http://127.0.0.1:8888",   // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
  port: ( parsedurl.port || 443 ), // 80 by default
  method: 'POST',
  path: parsedurl.path,
   headers: {
	  'Api-Version': apiVersion,
      'Content-Length': contentLength,
      'Content-Type': 'application/json',
	  //'Accept-Encoding': 'gzip,deflate,',
	  'Accept': 'application/json',
	  'Ocp-Apim-Subscription-key': registrationKey.trim(),
	  'Authorization':  bearerAccessToken
    },
  body : formData,
};
//console.log('httpBody: ' + JSON.stringify(httpBody));
//console.log('Options '+ JSON.stringify(options));
request(options, function (error, response, body) {
    if (!error) {
   //console.log(response.headers);
	//console.log("body "+body);
	//console.log(response.statusCode);
	//console.log(response.statusMessage);
	//console.log(body[0].responseDetails);
	
	responseHttp(body);
	//console.log('CDB gripupldGRIPJSON '+ JSON.stringify(gripUploadJson));
	//jsonGripUpload(gripUploadJson);
	//deleteOauthTkn(setletter, idasuser, applicatie, responseHttp);
    
	//console.log(response)
	}
	if (error){
		
		console.log('cdbRequest error ' +error);
		console.log('//////////////////////////////////// Einde grip91node ERROR /////////////////');
	} 
  
  });
  
});
}




module.exports = {
  cdbRequest: cdbRequest
  
  };
