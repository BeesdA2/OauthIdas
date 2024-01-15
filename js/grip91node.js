const { gripUploadSelect } = require("./gripupld.js");
const { gripUploadUpdate } = require("./gripupld.js");
const { custcdbSelect } = require("./custcdb.js");
const { custcdbInsert } = require("./custcdb.js");
const { custcdbUpdate } = require("./custcdb.js");
const { vcnlkeyf       } = require("./vcnlkeyf.js");
const { getVcnlkeyfKeyValue   } = require("./vcnlkeyf.js");
const { oauthRequest } = require("./oauthRequest.js");
const { deleteOauthTkn } = require("./oauthRequest.js");
const { insertOauthTkn } = require("./oauthRequest.js");
const { getAccessToken } = require("./getAccessToken.js");
const { cdbRequest } = require("./cdbRequest.js");
const {dbconn, dbstmt} = require('idb-connector');

const replacer = (key, value) =>
  typeof value === 'undefined' ? null : value;
  
console.log('//////////////////////////////////// Begin grip91node /////////////////');


//parameter 1 ophalen
	 var setletter = process.argv[2];
	//  console.log('setletter '+setletter);
	  
	
	// Parameter 2 ophalen
	  var idasuser = process.argv[3];
	//  console.log('idasuser '+idasuser); 
	  
	  // Parameter 3 ophalen
	  var applicatie = process.argv[4];
	  console.log('applicatie '+applicatie); 
 
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
  
 var jsonVCNLKEYF;
 var responseHttp;
 var accessToken;
 var urlAuth;
 var registrationKey;
 var apiVersion;
 var keyName;


 oauth20CheckAccessToken();  


/////////////////////////////////--- AccessToken Ophalen           ----------------
 
function oauth20Vcnlkeyf() {
 var initializePromiseMain = vcnlkeyf(setletter, idasuser, applicatie);
    initializePromiseMain.then(function(result) {
        jsonVCNLKEYF = result;
       // console.log('Node Oauth Validate '+ result);
        // Use user details from here
       // console.log(userDetails);
	  oauth20Request(jsonVCNLKEYF);
    }, function(err) {
        console.log(err);
    });


}	




function oauth20Request (jsonVCNLKEYF) {
	var initializePromise2 = oauthRequest(jsonVCNLKEYF);
    initializePromise2.then(function(result) {
        responseHttp = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log('net voor delete ' + result);
	   
	   oauth20DeleteToken(responseHttp);
    }, function(err) {
        console.log(err);
    });
}
	
	var resultaat;

function oauth20DeleteToken (responseHttp) {
	var initializePromise3 = deleteOauthTkn(setletter, idasuser, applicatie, responseHttp);
    initializePromise3.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	//  console.log('Net voor oauth20InsertToken ' + resultaat); 
	  oauth20InsertToken(responseHttp);
    }, function(err) {
        console.log(err);
    });
}


function oauth20InsertToken (responseHttp) {
	 
	var initializePromise4 = insertOauthTkn(setletter, idasuser, applicatie, responseHttp);
   initializePromise4.then(function(result) {
        resultaat = result;
        //console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  //checkAccessToken();
	  oauth20CheckAccessToken(responseHttp);
	  //console.log(' Programma OauthValidate ' + resultaat);
    }, function(err) {
        console.log(err);
    });
}

function oauth20CheckAccessToken (responseHttp) {
	
	var initializePromise5 = getAccessToken(setletter, idasuser, applicatie, responseHttp);
   initializePromise5.then(function(result) {
        resultaat = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  //checkAccessToken();
	   //console.log('result getAccessToken '+ JSON.stringify(result));
	 // console.log('resultaat '+ resultaat);
	  var isAccessTokenValid=checkIsAccessTokenValid(resultaat);
	//console.log('isAccessTokenValid '+ isAccessTokenValid);
	  if ( isAccessTokenValid == null)
		  
	  {   
	      var initializePromiseMain = vcnlkeyf(setletter, idasuser, applicatie);
    initializePromiseMain.then(function(result) {
        jsonVCNLKEYF = result;
       // console.log('Node Oauth Validate '+ result);
        // Use user details from here
       // console.log(userDetails);
	  oauth20Request(jsonVCNLKEYF);
     	 // var initializePromise6 = getAccessToken(setletter, idasuser, applicatie, responseHttp);
         // initializePromise5.then(function(result6) {
		 // console.log('Net voor oauth20Vcnlkeyf');
		 // accessToken= result6;
		 //  console.log('Access Token net voor getGripUploadSelect '+accessToken);
	     // getGripUploadSelect(accessToken);  
		 console.log('Token niet geldig');
	     // });
	});
	  } else { 
	   
		 console.log('Token wel geldig'); 
	 // console.log(' Programma OauthValidate ' + resultaat);
	  accessToken = resultaat;
	 // console.log('Access Token net voor getGripUploadSelect '+accessToken);
	  getGripUploadSelect(accessToken);
	  }
    }, function(err) {
        console.log(err);
    });
}
	
function checkIsAccessTokenValid(resultaat) {
	 
	var isAccessTokenValid ;
	if (resultaat ===null)
	{
		isAccessTokenValid=null;
		//console.log('isAccessTokenValid wel leeg: ' +isAccessTokenValid);
	} else {
	 
	
		isAccessTokenValid=resultaat;
		//console.log('isAccessTokenValid niet leeg: ' +isAccessTokenValid);
	}
	return(isAccessTokenValid);
}
	
	
//////////////////////////////////////////- Hieronder begint het eigenlijke programma             ////////////////////////////
// In oauth20CheckAccessToken na accessToken het programma plaatsen welke aangeroepen moet worden

var jsonGRIPUPLOADSelectArray;
 
function getGripUploadSelect(accessToken) {
    var initializePromiseSelect = gripUploadSelect(setletter);
    initializePromiseSelect.then(function(result) {
        jsonGRIPUPLOADSelectArray = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
     //   console.log('RESULT : ' + result);
	 //  oauth20Request(jsonVCNLKEYF);
	 
	 //console.log('jsonGRIPUPLOADSelect '+jsonGRIPUPLOADSelect);
	// console.log('Access Token '+accessToken  );
	 //getURLAuth(jsonGRIPUPLOADSelect,accessToken);
	 for (t=0; t < jsonGRIPUPLOADSelectArray.length; t++)
	{
		
		 
		//console.log('result trim:  '+ JSON.stringify(result[t]).trim());
		//console.log('result APPLICATIE:  '+ JSON.stringify(jsonGRIPUPLOADSelectArray[t].APPLICATIE));
		var gripupldApplicatie = JSON.stringify(jsonGRIPUPLOADSelectArray[t].APPLICATIE);
		
		
		//console.log('gripUploadJson '+ gripUploadJson[0].APPLICATIE);
		var gripupldApplicatie = checkApplicatie(jsonGRIPUPLOADSelectArray[t]);
		
		var x=0;
		
		var initializePromiseURL = getVcnlkeyfKeyValue (setletter, idasuser, gripupldApplicatie.trim(), 'URL');
        initializePromiseURL.then(function(result) {
        //console.log('getUrlAuth '+ result); 
		var gripUploadJson = jsonGRIPUPLOADSelectArray[x];
		var gripupldGRIPJSON   = checkGRIPJSON(jsonGRIPUPLOADSelectArray[x]);
		var gripupldRRN        = checkRRNGRIPUPLOAD(jsonGRIPUPLOADSelectArray[x]);
		//console.log('gripupldRRN '+ gripupldRRN); 
		//console.log('gripupldGRIPJSON '+ gripupldGRIPJSON); 
		//console.log('gripupldAPPLICATIE '+ gripupldApplicatie); 
		//urlAuth= JSON.stringify(result);
		urlAuth = result;
      // console.log('urlAuth: ' +urlAuth );
        // Use user details from here
       // console.log(userDetails);
	 //  oauth20Request(jsonVCNLKEYF);
	   getRegistrationKey(gripupldGRIPJSON, accessToken, gripupldApplicatie, urlAuth, gripUploadJson);
       x++;
	   
		  
	   
	  
    }, function(err) {
        console.log('error getUrlAuth ' +err);
    
    });
	//console.log('Wat is t: ' +t);
	}	
	 
	  // getAzureResponse(jsonGRIPUPLOADSelect);
    }, function(err) {
        console.log(err);
    });
}

function checkApplicatie (jsonfile) {
	var gripupldApplicatie = jsonfile.APPLICATIE;
	//console.log(gripupldApplicatie);
	
	return (gripupldApplicatie);
}

function checkGRIPJSON (jsonfile) {
	var gripupldGRIPJSON = jsonfile.GRIPJSON;
	//console.log('gripupldGRIPJSON ' +gripupldGRIPJSON);
	
	return (gripupldGRIPJSON);
}	

function checkRRNGRIPUPLOAD (jsonfile) {
	var gripupldRRN = jsonfile.RRNGRIPUPLOAD;
	//console.log('gripupldGRIPJSON ' +gripupldGRIPJSON);
	
	return (gripupldRRN);
}	

	

function getCDBRequest(urlAuth,registrationKey,apiVersion,accessToken,gripupldGRIPJSON,UploadJson) {	
	
	
	
	  
	 	//console.log('----Azure------APPLICATIE ' + jsonGRIPUPLOADSelect[t].APPLICATIE.trim() );
        //console.log('GRIPJSON ' + jsonGRIPUPLOADSelect[t].GRIPJSON.trim() );
		//console.log('Net voor cdbRequest' +urlAuth);
		//console.log('Net voor cdbRequest gripjson ' +gripupldGRIPJSON.trim());
		//getURLAuth(jsonGRIPUPLOADSelect[t].applicatie.trim());
		
		var initializePromiseAzure = cdbRequest(urlAuth,registrationKey,apiVersion,accessToken, gripupldGRIPJSON);
        initializePromiseAzure.then(function(responseHttpBody, jsonGripUpload) {
        //console.log('Na check Access : ' +responseHttpBody);
		//checkResponseHttpBody(JSON.parse(responseHttpBody));
		//console.log('net voor checkGripUploadJson ' + JSON.stringify(gripUploadJson));
		 //checkGripUploadJson(gripUploadJson);
		setGripUploadUpdate(setletter, UploadJson, responseHttpBody) 
		//console.log(urlAuth);
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	 //  oauth20Request(jsonVCNLKEYF);
	   
	  
    }, function(err) {
        console.log(err);
    });
		
   	
	
}

function setGripUploadUpdate(setletter, UploadJson, responseHttpBody) {
    var initializePromiseUpdate = gripUploadUpdate(setletter, UploadJson, responseHttpBody);
    initializePromiseUpdate.then(function(result) {
        //console.log('gripuploadUpdate uitgevoerd ' + result);
		//console.log('UploadJson ' + UploadJson.cdbcust);
		getCustCDBSelect(setletter, UploadJson, responseHttpBody);
	}, function(err) {
        console.log(err);
    });
}

function getCustCDBSelect(setletter, UploadJson, responseHttpBody) {
    var initializePromiseCDBSelect = custcdbSelect(setletter, UploadJson, responseHttpBody);
    initializePromiseCDBSelect.then(function(result) {
		
      //  console.log('getCustCDBSelect ' + JSON.stringify(result));
	doesCDBCustIDexist = checkCDBCustIDexist(result);
    if (doesCDBCustIDexist === null)
	{
	 //console.log('CDBCustID bestaat niet; Insert');	
	 setCustCDBInsert(setletter, UploadJson, responseHttpBody);
	 
	} else {
	// console.log('CDBCustID bestaat; Update');	
	 setCustCDBUpdate(setletter, UploadJson, responseHttpBody);
	}
 console.log('//////////////////////////////////// Einde grip91node /////////////////');		
	}, function(err) {
        console.log(err);
    });
}


function checkCDBCustIDexist(resultaat) {
	 
	var doesCDBCustIDexist ;
	if (resultaat.length === 0)
	{
		doesCDBCustIDexist=null;
		//console.log('doesCDBCustIDexist wel leeg: ' +doesCDBCustIDexist);
	} else {
	 
	
		doesCDBCustIDexist=resultaat;
		//console.log('doesCDBCustIDexist niet leeg: ' +doesCDBCustIDexist);
	}
	return(doesCDBCustIDexist);
}

function setCustCDBInsert(setletter, UploadJson, responseHttpBody) {
    var initializePromiseCDBInsert = custcdbInsert(setletter, UploadJson, responseHttpBody);
    initializePromiseCDBInsert.then(function(result) {
		
     //console.log('custCDBInsert ' + JSON.stringify(result));
	
	}, function(err) {
        console.log(err);
    });
}

function setCustCDBUpdate(setletter, UploadJson, responseHttpBody) {
    var initializePromiseCDBUpdate = custcdbUpdate(setletter, UploadJson, responseHttpBody);
    initializePromiseCDBUpdate.then(function(result) {
		
     //console.log('custCDBUpdate ' + JSON.stringify(result));
	
	}, function(err) {
        console.log(err);
    });
}

function checkGripUploadJson(jsonfile)
{
	console.log('aanmaak datum '+ jsonfile.AANMAAKDATUM);
	console.log('compleet jsonfile  '+ jsonfile.RRNGRIPUPLOAD);
	//console.log('checkGripUploadJson '+ JSON.stringify(jsonfile));
}	
function checkResponseHttpBody (responseHttp)
{ 
     if (responseHttp.statusCode === 200)
	 {	 
	 var responseDetails = responseHttp.responseDetails;
	 var consumerIds = responseDetails.consumerId.id;
	 //console.log('consumerId Ids' + JSON.stringify(consumerIds));
	 for (t=0; t < consumerIds.length; t++)
	{
		//console.log('Type : ' + consumerIds[t].type); 
		//console.log('Value : ' + consumerIds[t].value); 
	}
	} else {
		//console.log('statusCode '+ responseHttp.statusCode);
		//console.log('statusMessage '+ responseHttp.statusMessage);
		//console.log('errorMessage '+ responseHttp.errorMessage);
	} 	
}



function getRegistrationKey(gripupldGRIPJSON, accessToken, gripupldApplicatie, urlAuth, gripUploadJson) {
    var initializePromiseRegistrationKey = getVcnlkeyfKeyValue (setletter, idasuser, 'CDB', 'ApiKeyHeader');
        initializePromiseRegistrationKey.then(function(result) {
         
		registrationKey=result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	 //  oauth20Request(jsonVCNLKEYF);
	  // console.log('urlAuth: ' +urlAuth + ' registrationKey  ' + registrationKey);
	  //console.log('Registrationkey gripUploadJson  '+ gripUploadJson);
	  getApiVersion(gripupldGRIPJSON, accessToken, gripupldApplicatie, urlAuth, registrationKey, gripUploadJson);
    }, function(err) {
        console.log(err);
    });
}

function getApiVersion(gripupldGRIPJSON, accessToken, gripupldApplicatie,urlAuth ,registrationKey, gripUploadJson) {
    var initializePromiseApiVersion = getVcnlkeyfKeyValue (setletter, idasuser, gripupldApplicatie.trim(), 'ApiVersion');
        initializePromiseApiVersion.then(function(result) {
		 
		apiVersion=JSON.stringify(result, replacer);
		//console.log('apiVersion ' + apiVersion);
		if (apiVersion == 'null') { 
		apiVersion='2.0';	
		//console.log('ApiVersion '+ apiVersion);
		}	
		
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	 //  oauth20Request(jsonVCNLKEYF);
	// console.log('urlAuth: ' +urlAuth + ' registrationKey  ' + registrationKey + ' Api version '+ apiVersion);
	 getCDBRequest(urlAuth,registrationKey,apiVersion,accessToken,gripupldGRIPJSON, gripUploadJson);
	  
    }, function(err) {
        console.log(err);
    });
}


	 