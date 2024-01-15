const {dbconn, dbstmt} = require('idb-connector');
const { deleteOauthTkn } = require("./oauthRequest.js"); 


 
 function getAccessToken (setletter, idasuser, applicatie, responseHttp) {
	 
  return new Promise(function(resolve)
  {
 
     
    const sSql = 'SELECT * from dasfp@v.oauthtkn where setletter =\'' +setletter + '\' and idasuser =\'' +idasuser + '\''  + ' and applicatie=\'' + applicatie + '\' with NONE';
	//console.log('sSQL '+sSql); 
	
	//console.log('responseHttp ' + httpResponse);
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
	const httpResponse = responseHttp;
    //console.log('x :' +JSON.stringify(x));
	// console.log('net voor teruggeven AccessToken :' +JSON.stringify(x));
	var jsonGRIPUPLD = x;
	//console.log('VKKEYN '+ x[0].access_token);
	//uitlezen(x);
	var accessToken;
	//console.log('Lengte x: '+ x.length);
	if (x.length !== 0)
	{
	 accessToken = checkToken(x, setletter, idasuser, applicatie, responseHttp);
	// console.log('AccessToken 2: ' +accessToken);
	//console.log('accessToken '+ accessToken);
	}  else {
		
	 accessToken = null;
	// console.log('accessToken '+ accessToken);
	}
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve(accessToken);    
	});
  });
 }
 
 


function checkToken (jsonfile, setletter, idasuser, applicatie, responseHttp) {
	for (t=0; t < jsonfile.length; t++)
	{
	 	// console.log('Timestamp ' + jsonfile[t].TOKENCREATEDTIMESTAMP );
       // console.log('OauthTkn ' + jsonfile[t].OAUTHTOKEN.trim() );
	   
	   var tokenCreatedTimeStamp = jsonfile[t].TOKENCREATEDTIMESTAMP ;
	   var jaar = tokenCreatedTimeStamp.substr(0,4);
	   var maand = (tokenCreatedTimeStamp.substr(5,2)-1);
	   var dag   = tokenCreatedTimeStamp.substr(8,2); 
	   var uren  = tokenCreatedTimeStamp.substr(11,2);
	   var minuten = tokenCreatedTimeStamp.substr(14,2);
       var seconden = tokenCreatedTimeStamp.substr(17,2);
	   var milsec = tokenCreatedTimeStamp.substr(20,6);
	    
     var jsonResponseHttp= JSON.parse(jsonfile[t].OAUTHTOKEN.trim());
     var expires_in = jsonResponseHttp.expires_in;
	 //console.log('expires in ' + expires_in);  
	 
	 var newTokenCreatedTimeStamp = new Date(jaar,maand, dag, uren, minuten, seconden);
	 //console.log('newTokenCreatedTimeStamp ' + newTokenCreatedTimeStamp);
	 newTokenCreatedTimeStamp.setSeconds(newTokenCreatedTimeStamp.getSeconds() + 3600);
	 var tokenValidateTo = new Date(newTokenCreatedTimeStamp);
	 
	// console.log('tokenCreatedTimeStamp ' + jaar + ' maand '+ maand + ' dag ' + dag  + ' uren ' + uren + ' minuten ' + minuten + ' seconden ' + seconden + ' milliseconden ' + milsec );
	// console.log('tokenValidateTo '+ tokenValidateTo);
	   var accessToken= '';
	   var now = new Date();
	   var milliseconds = now.getMilliseconds();
	if (milliseconds < 100){
	   milliseconds = milliseconds * 10000;
	} else {
		milliseconds = milliseconds * 1000;
	}
	   //var currentTimeStamp =  now.getFullYear() +'-' + (now.getMonth()+1) +'-'+ now.getDate() + ' ' + now.getHours() +':'+ now.getMinutes() +':'+now.getSeconds()+'.' +milliseconds;
	   var currentTimeStamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), milliseconds);
	  // console.log('tokenCreatedTimeStamp ' + tokenCreatedTimeStamp);
	   //console.log('currentTimeStamp ' + currentTimeStamp);
	   var unixCurrentTimeStamp = currentTimeStamp.getTime()/1000;
	   //console.log('unixCurrentTimeStamp: '+unixCurrentTimeStamp);
	   var unixTokenValidateTo = tokenValidateTo.getTime()/1000;
	   //console.log('unixTokenValidateTo: '+unixTokenValidateTo);
	  if (unixCurrentTimeStamp > unixTokenValidateTo)
	  {	  
        //console.log('current timestamp '+ currentTimeStamp + ' tokenValidateTo ' + tokenValidateTo);
	    deleteOauthTkn(setletter, idasuser, applicatie, responseHttp)
	    accessToken = 'Leeg';
		//ccessToken= jsonResponseHttp.access_token;
	  } else {
	    accessToken= jsonResponseHttp.access_token;
	  } 
	//  console.log('AccessToken : ' + jsonResponseHttp.access_token);
	  //accessToken= jsonResponseHttp.access_token;
	return accessToken;
    }	
}
 
 module.exports = {
  getAccessToken: getAccessToken
  };
