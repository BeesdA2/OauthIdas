var querystring = require('querystring');
var request = require('request');
var url = require( "url" );
const {dbconn, dbstmt} = require('idb-connector'); 




function oauthRequestOauthkeyf(jsonOAUTHKEYF) {
	
	return new Promise(function(responseHttp) {
var clientid = '' ;
var clientsecret = '';
var granttype = '';
var granttypeRefresh = '';
var resource = '';
var scope = '';
var urlAuth = '';
var redirectUrl = '';
var gebruiker = '';
var wachtwoord = '';
var code = '';
var x_api_key = '';
var bearer = '';


for (t=0; t < jsonOAUTHKEYF.length; t++)
	{
	  if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'client_id' )
	  {
		clientid = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
      if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'client_secret' )
	  {
		clientsecret = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }       
	    if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'grant_type' )
	  {
		granttype = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'grant_type_refresh' )
	  {
		granttypeRefresh = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'resource' )
	  {
		resource = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'scope' )
	  {
		scope = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'URLAUTH' )
	  {
		urlAuth = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'redirect_url' )
	  {
		redirectUrl = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'code' )
	  {
		code = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	  if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'user' )
	  {
		gebruiker = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	  if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'password' )
	  {
		wachtwoord = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	   if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'x-api-key' )
	  {
		x_api_key = jsonOAUTHKEYF[t].OAKEYV.trim();  
	  }
	  if (jsonOAUTHKEYF[t].OAKEYN.trim() == 'Bearer' )
	  {
		bearer = jsonOAUTHKEYF[t].OAKEYV.trim();  
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
} else if (code !== ''){
	
    form = {
    code: code,
    grant_type: granttype   
			};

} else if (wachtwoord !== ''){
	console.log('wachtwoord: '+ wachtwoord);
    form = {
    client_id: clientid,
    client_secret: clientsecret,
	username: gebruiker,
    password: wachtwoord,
    resource: resource,	
	grant_type: granttype
			};

} else  { 

	
    form = {
    client_id: clientid,
    resource: resource,
    client_secret: clientsecret,
	grant_type: granttype
    
};
} 



//console.log("form 1");
var formData = querystring.stringify(form);

console.log("form: " + formData);
var contentLength = formData.length;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error
urlstring = urlAuth;
//var urlstring = "https://vcamauth.global.volvocars.biz/nidp/saml2/sso";
var parsedurl = url.parse( urlstring );
var options = { };
if ( granttype === 'urn:ietf:params:oauth:grant-type:jwt-bearer') {
options = {
  hostname: parsedurl.hostname,
  url: parsedurl,
 // proxy: "http://127.0.0.1:8888",   // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
  port: ( parsedurl.port || 443 ), // 80 by default
  method: 'POST',
  path: parsedurl.path,
   headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
	  'Authorization' : 'Bearer ' + bearer
    },
  body : 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&x-api-key='+x_api_key
  };
} else {
	options = {
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
}	
console.log(options);

request(options, function (error, response, body) {
    if (!error) {
   //console.log(response.headers);
	console.log("body "+body);
	//console.log(response.statusCode)
	responseHttp(body);
	
	//deleteOauthTkn(setletter, idasuser, applicatie, responseHttp);
    	
	//console.log(response)
	}
  
  });
  
});
}

function oauthRequestVcnlkeyf(jsonVCNLKEYF) {
	
	return new Promise(function(responseHttp) {
var clientid = '' ;
var clientsecret = '';
var granttype = '';
var granttypeRefresh = '';
var resource = '';
var scope = '';
var code = '';
var urlAuth = '';
var redirectUrl = '';
var gebruiker = '';
var wachtwoord = '';


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
	   if (jsonVCNLKEYF[t].VKKEYN.trim() == 'code' )
	  {
		code = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	  if (jsonVCNLKEYF[t].VKKEYN.trim() == 'gebruiker' )
	  {
		gebruiker = jsonVCNLKEYF[t].VKKEYV.trim();  
	  }
	  if (jsonVCNLKEYF[t].VKKEYN.trim() == 'wachtwoord' )
	  {
		wachtwoord = jsonVCNLKEYF[t].VKKEYV.trim();  
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
} else if (code !== ''){
	
    form = {
    code: code,
    grant_type: granttype   
};
} else if (wachtwoord !== ''){
	
    form = {
    client_id: clientid,
    resource: resource,
    client_secret: clientsecret,
	grant_type: granttype,
    user: gebruiker,
    password: wachtwoord	
};

} else  { 

	
    form = {
    client_id: clientid,
    resource: resource,
    client_secret: clientsecret,
	grant_type: granttype
    
};
} 



//console.log("form 1");
var formData = querystring.stringify(form);

console.log("form: " + formData);
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
	console.log("body "+body);
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
  oauthRequestVcnlkeyf: oauthRequestVcnlkeyf,
  oauthRequestOauthkeyf: oauthRequestOauthkeyf,
  deleteOauthTkn: deleteOauthTkn,
  insertOauthTkn: insertOauthTkn,
  
  };
