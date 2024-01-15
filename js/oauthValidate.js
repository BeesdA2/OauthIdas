const { oauthRequestVcnlkeyf } = require("./oauthRequest.js");
const { oauthRequestOauthkeyf } = require("./oauthRequest.js");
const { deleteOauthTkn } = require("./oauthRequest.js");
const { insertOauthTkn } = require("./oauthRequest.js");
const { vcnlkeyf     } = require("./vcnlkeyf.js");
const { oauthkeyf     } = require("./oauthkeyf.js");
 



//var urlstring = "https://login.microsoftonline.com/cb946d01-f0cb-4562-b9e2-0dd3f9d52131/oauth2/v2.0/token";
//var clientid = "86d4b8b0-0d01-4e19-a654-5b70c203b3dd";
//var clientsecret = "fO4YgmkBx_qX4CljN.USvIKGCG_fG61["
//var scope="https://outlook.office.com/.default"
//var granttype = "client_credentials";
//var resource ='';


//console.log("net voor oauthRequest");
//oauthRequest(urlstring, clientid, clientsecret, scope, granttype);
//var setletter = 'A';
//var applicatie = 'GEDDA';
//var idasuser = 'MVM';
//parameter 1 ophalen
	
//vcnlkeyf(setletter,applicatie, function(err, marco) {
 //   console.log('Test ' +marco)
 // });
  
	 
 

  

async function oauthValidate(setletter, idasuser, applicatie) {
	let jsonOauthRequest = {};
	try {
		
    const respOauthkeyf =  await oauthkeyf(setletter, idasuser, applicatie);
	let   jsonOAUTHKEYF =  await respOauthkeyf;
	
	
	const respVcnlkeyf =  await vcnlkeyf(setletter, idasuser, applicatie);
	let   jsonVCNLKEYF =  await respVcnlkeyf;
	
	//let jsonOauthRequest = {};
	if (jsonOAUTHKEYF.length !== 0 )
	{
	const respOauthRequest = await oauthRequestOauthkeyf(jsonOAUTHKEYF);
	jsonOauthRequest = await respOauthRequest;
	
	const respDeleteOauthToken = await deleteOauthTkn(setletter, idasuser, applicatie, jsonOauthRequest);
	let   jsonDeleteOauthToken = await respDeleteOauthToken;
	
	const respInsertOauthToken = await insertOauthTkn(setletter, idasuser, applicatie, jsonOauthRequest);
	let   jsonInsertOauthToken = await respInsertOauthToken;
	
	} else {	
	const respOauthRequest = await oauthRequestVcnlkeyf(jsonVCNLKEYF);
	jsonOauthRequest = await respOauthRequest;
	
	const respDeleteOauthToken = await deleteOauthTkn(setletter, idasuser, applicatie, jsonOauthRequest);
	let   jsonDeleteOauthToken = await respDeleteOauthToken;
	
	const respInsertOauthToken = await insertOauthTkn(setletter, idasuser, applicatie, jsonOauthRequest);
	let   jsonInsertOauthToken = await respInsertOauthToken;
	}
	
    
    } catch (e) {
        console.error(e);
    } finally {
        console.log('OauthValidate cleanup');
		return jsonOauthRequest;
    }
}



async function handleOauthValidate(setletter, idasuser, applicatie)
{
    try{	
	console.log('setletter: ' + setletter);
	console.log('idasuser: ' + idasuser);
	console.log('applicatie: ' + applicatie);
	
	
	
	var resolve = await oauthValidate(setletter, idasuser, applicatie);
	
	return (resolve);
    }
	catch(err) {}
	
}




module.exports = {
  handleOauthValidate : handleOauthValidate,
  oauthValidate: oauthValidate
};
 
 
  


  



	 