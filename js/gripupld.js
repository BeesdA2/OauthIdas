const {dbconn, dbstmt} = require('idb-connector');
 


 
 function gripUploadSelect (setletter) {
	 
  return new Promise(function(resolve)
  {
 
 
    const sSql = 'SELECT RRN(A) as rrnGripUpload, A.* from dasfp'+setletter + '.gripupld A where gdidas =\'N\'';
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
 
function gripUploadUpdate (setletter, gripUploadJson, responseHttpBody) {
	 
  return new Promise(function(resolve)
  {
 
    var rrnGripUpload = gripUploadJson.RRNGRIPUPLOAD;
	var responseBody = JSON.parse(responseHttpBody);
	var idasverwerkt;
	if (responseBody.statusCode !== 200)
	{
		//console.log('responseBody.statusCode != 200 ' + responseBody.statusCode);		
		idasverwerkt = 'E';
	}
	if (responseBody.statusCode === 200)
	{
       // console.log('responseBody.statusCode 200 ' + responseBody.statusCode);		
		idasverwerkt = 'J';
	}
	if (responseBody.statusCode === 503)
	{
		//console.log('responseBody.statusCode 503 ' + responseBody.statusCode);		
		idasverwerkt = 'X';
	}
	if (responseBody.statusCode === 401)
	{
		//console.log('responseBody.statusCode 503 ' + responseBody.statusCode);		
		idasverwerkt = 'N';
	}
	
	var now = new Date();
	   var milliseconds = now.getMilliseconds();
	if (milliseconds < 100){
	   milliseconds = milliseconds * 10000;
	} else {
		milliseconds = milliseconds * 1000;
	}
	   var currentTimeStamp =  now.getFullYear() +'-' + ('0' + (now.getMonth()+1)).slice(-2) +'-'+ ('0' + now.getDate()).slice(-2)  + ' ' + ('0' + now.getHours()).slice(-2) +':'+ ('0' + now.getMinutes()).slice(-2) +':'+now.getSeconds()+'.' +milliseconds;
	   //var currentTimeStamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), milliseconds);
	//console.log('currentTimeStamp ' + currentTimeStamp);
	
    const sSql = 'UPDATE dasfp'+setletter + '.gripupld A set response=\'' + responseHttpBody +'\' , responsecode=\'' + responseBody.statusCode + '\' , responsemessage=\''+ responseBody.statusMessage+'\' ,  verwerkingsdatum =\''+ currentTimeStamp + '\',  idasverwerkt=\''+ idasverwerkt + '\'  where RRN(A)=' + rrnGripUpload;
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
   //  console.log('x :' +x);
	// console.log('x json :' +JSON.stringify(x));
	
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
	//uitlezen(x);
	//testen(x);
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	resolve('Ja');    
	});
  });
 }
  
 
function uitlezen (jsonfile) {
//console.log('jsonFile '+ jsonfile);	
//console.log(JSON.stringify(jsonfile));
//console.log('object ' + jsonfile[3].VKKEYN);
//console.log('object ' + jsonfile[3].VKKEYV);
}

function testen (jsonfile) {
	for (t=0; t < jsonfile.length; t++)
	{
	 	console.log('----- GRIPUPLD.JS ----- APPLICATIE ' + jsonfile[t].APPLICATIE.trim() );
        //console.log('GRIPJSON ' + jsonfile[t].GRIPJSON.trim() );
    }	
}
 
 module.exports = {
  gripUploadSelect: gripUploadSelect,
  gripUploadUpdate: gripUploadUpdate
  };
