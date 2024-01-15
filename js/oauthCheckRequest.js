var querystring = require('querystring');
var request = require('request');
var url = require( "url" );
const {dbconn, dbstmt} = require('idb-connector'); 

 
 
 
 
 
 
function oauthCheck(setletter, idasuser, applicatie) {
	
	return new Promise(function(responseHttp) {
var clientid = '' ;
var clientsecret = '';
var granttype = '';
var granttypeRefresh = '';
var resource = '';
var scope = '';
var urlAuth = '';
var redirectUrl = '';


for (t=0; t < jsonVCNLKEYF.length; t++)
	{
	  if (jsonVCNLKEYF[t].VKKEYN.trim() == 'client_id' )
	  {
		clientid = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
      if (jsonVCNLKEYF[t].VKKEYN.trim() == 'client_secret' )
	  {
		clientsecret = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }       
	    if (jsonVCNLKEYF[t].VKKEYN.trim() == 'grant_type' )
	  {
		granttype = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'grant_type_refresh' )
	  {
		granttypeRefresh = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'resource' )
	  {
		resource = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'scope' )
	  {
		scope = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'URLAUTH' )
	  {
		urlAuth = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'redirect_url' )
	  {
		redirectUrl = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
    }	
	
//console.log(clientsecret);
var form = {};
if (scope !== ''){
	
    form = {
    client_id: clientid,
    scope: scope,
    client_secret: clientsecret,
	grant_type: granttype
    
};
} else { 

	
    form = {
    client_id: clientid,
    resource: resource,
    client_secret: clientsecret,
	grant_type: granttype
    
};
} 



//console.log("form 1");
var formData = querystring.stringify(form);

//console.log(formData);
var contentLength = formData.length;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error
urlstring = urlAuth;
//var urlstring = "https://vcamauth.global.volvocars.biz/nidp/saml2/sso";
var parsedurl = url.parse( urlstring );
var options = {
  hostname: parsedurl.hostname,
  url: parsedurl,
 // proxy: "http://127.0.0.1:8888",   // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
  port: ( parsedurl.port || 443 ), // 80 by default
  method: 'POST',
  path: parsedurl.path,
   headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  body : formData,
};

request(options, function (error, response, body) {
    if (!error) {
   //console.log(response.headers);
	//console.log("body "+body);
	//console.log(response.statusCode)
	responseHttp(body);
	
	//deleteOauthTkn(setletter, idasuser, applicatie, responseHttp);
    	
	//console.log(response)
	}
  
  });
  
});
}


function deleteOauthTkn(setletter, idasuser, applicatie, responseHttp) {
	return new Promise(function(response) {
	const sSql = 'DELETE dasfp@v.oauthtkn where setletter =\'' +setletter + '\' and idasuser =\'' +idasuser + '\''  + ' and applicatie=\'' + applicatie + '\' with NONE';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.execSync(sSql, (x) => {
   //  console.log(JSON.stringify(x));
	 
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   // console.log('oauthValidate gereed!');
	});
	response('klaar');
	});
}

 function insertOauthTkn(setletter, idasuser, applicatie, responseHttp) {
	return new Promise(function(response) {
	var now = new Date();
	var milliseconds = now.getMilliseconds();
	if (milliseconds < 100){
	   milliseconds = milliseconds * 10000;
	} else {
		milliseconds = milliseconds * 1000;
	}
	var datumtijd =  now.getFullYear() +'-' + (now.getMonth()+1) +'-'+ now.getDate() + ' ' + now.getHours() +':'+ now.getMinutes() +':'+now.getSeconds()+'.' +milliseconds;
	//var datum =  datumtijd.substr(1,10);
	//var tijd  =  datumtijd.substr(11,15);
	
     
	//responseHttp = 'leeg';
	const sSql = 'INSERT INTO  dasfp@v.oauthtkn VALUES ( \'' +setletter + '\', \'' +idasuser + '\' , \'' + applicatie + '\' , \''+ datumtijd+ '\', \''+ responseHttp+ '\') with NONE';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
     statement.execSync(sSql, (x) => {
    // console.log(JSON.stringify(x));
   
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
   //  insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
  // console.log('Net na insert');
  // console.log('datumtijd: '+ datumtijd);
		//console.log('datum '+datum + ' tijd ' + tijd);
	
	 });
	 response('Klaar');
	});	
}



module.exports = {
  oauthCheck: oauthCheck,
  
  
  };
