const {dbconn, dbstmt} = require('idb-connector');
 


 
 function custcdbSelect (setletter, gripUploadJson, responseHttpBody) {
	 
  return new Promise(function(resolve)
  {
    
    var cdbCustID  = gripUploadJson.CDBCUST;

	
    const sSql = 'SELECT * from dasfp'+setletter + '.custcdb A where cdbcust =' + cdbCustID;
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	var x;
    statement.exec(sSql, (x) => {
   //  console.log('x :' +x);
	// console.log('x json :' +JSON.stringify(x));
	var jsonGRIPUPLD = x;
	//console.log('x van CustCDBSelect ' + JSON.stringify(x));
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
	//uitlezen(x);
	//testen(x);
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve(x);    
	});
	 
  });
 }
 
 function custcdbInsert (setletter, gripUploadJson, responseHttpBody) {
	 
  return new Promise(function(resolve)
  {
    
    var cdbCustID        = gripUploadJson.CDBCUST;
	
    var responseBody     = JSON.parse(responseHttpBody);
	var globalConsumerId = checkResponseHttpBody(responseBody,'GlobalConsumerId');
	//console.log('globalConsumerId '+ globalConsumerId); 
	var vDDN_ID          = checkResponseHttpBody(responseBody,'VDDN_ID');
	//console.log('vDDN_ID '+ vDDN_ID);
	var iDAS_ID          = checkResponseHttpBody(responseBody,'IDAS_ID');
	//console.log('iDAS '+ iDAS_ID);
	var consumerId       = checkResponseHttpBody(responseBody,'ConsumerId');
	//console.log('consumerId '+ consumerId);
	
	const sSql = 'INSERT INTO dasfp'+setletter + '.custcdb VALUES('+cdbCustID + ', ' + consumerId + ', ' + globalConsumerId +', \'' + vDDN_ID + '\')';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
   //  console.log('x :' +x);
	// console.log('x json :' +JSON.stringify(x));
	var jsonGRIPUPLD = x;
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
	//uitlezen(x);
	//testen(x);
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve(x);    
	});
	
     
 });
 }
 
 
 
 
 function custcdbUpdate (setletter, gripUploadJson, responseHttpBody){
 return new Promise(function(resolve)
  {	 
  var cdbCustID        = gripUploadJson.CDBCUST;
	
    var responseBody     = JSON.parse(responseHttpBody);
	var globalConsumerId = checkResponseHttpBody(responseBody,'GlobalConsumerId');
	//console.log('globalConsumerId '+ globalConsumerId); 
	var vDDN_ID          = checkResponseHttpBody(responseBody,'VDDN_ID');
	//console.log('vDDN_ID '+ vDDN_ID);
	var iDAS_ID          = checkResponseHttpBody(responseBody,'IDAS_ID');
	//console.log('iDAS '+ iDAS_ID);
	var consumerId       = checkResponseHttpBody(responseBody,'ConsumerId');
	//console.log('consumerId '+ consumerId);
	
	const sSql = 'update dasfp'+setletter + '.custcdb set CDBID = '+ consumerId + ', set  CDBGCID= '+ globalConsumerId + ', set  CDBVDDN=\''+ vDDN_ID + '\' where CDBCUST=' + cdbCustID;
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
   //  console.log('x :' +x);
	// console.log('x json :' +JSON.stringify(x));
	var jsonGRIPUPLD = x;
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
	//uitlezen(x);
	//testen(x);
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve(x);    
	});
	
 }); 
 }

 function checkResponseHttpBody (responseHttp, consumerId)
{ 
     if (responseHttp.statusCode === 200)
	 {	 
	 var responseDetails = responseHttp.responseDetails;
	 var consumerIds = responseDetails.consumerId.id;
	 //console.log('consumerId Ids' + JSON.stringify(consumerIds));
	 var returnConsumerId = '';
	 
	 
	 for (t=0; t < consumerIds.length; t++)
	{
		//console.log('Type : ' + consumerIds[t].type); 
		//console.log('Value : ' + consumerIds[t].value); 
		if ( consumerIds[t].type === consumerId)
		{
			returnConsumerId = consumerIds[t].value;
		}
        
		
	}
	} else {
		//console.log('statusCode '+ responseHttp.statusCode);
		//console.log('statusMessage '+ responseHttp.statusMessage);
		//console.log('errorMessage '+ responseHttp.errorMessage);
	} 	
	return(returnConsumerId);
}
 
 module.exports = {
  custcdbSelect: custcdbSelect,
  custcdbInsert: custcdbInsert,
  custcdbUpdate: custcdbUpdate
  };
