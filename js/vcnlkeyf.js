const {dbconn, dbstmt} = require('idb-connector');
 


 
 function vcnlkeyf (setletter, idasuser, applicatie) {
	 
  return new Promise(function(resolve)
  {
 
 
    const sSql = 'SELECT * from dasfp'+setletter + '.vcnlkeyf where UCASE(vkappl) =UCASE(\'' +applicatie + '\')';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
    // console.log('x :' +x);
	 //console.log('x json :' +JSON.stringify(x));
	//var jsonVCNLKEYF = x;
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
 
 
function getVcnlkeyfKeyValue (setletter, idasuser, applicatie, keyName) {
	 
  return new Promise(function(keyValue)
  {
 
 
    const sSql = 'SELECT * from dasfp'+setletter + '.vcnlkeyf where vkappl =\'' +applicatie + '\' and  vkkeyn=\'' +keyName + '\'';
	//console.log('sSQL '+sSql); 
    const connection = new dbconn();
    connection.conn('*LOCAL');
    const statement = new dbstmt(connection);
     
	
    statement.exec(sSql, (x) => {
   //  console.log('x :' +x);
	 //console.log('keyValue :' +JSON.stringify(x));
	 
	//console.log('VKKEYN '+ jsonVCNLKEYF[0].VKKEYN);
	//uitlezen(x);
	//testen(x);
	 
	 var sleutelwaarde = checkKeyValue(x);
	 
  // console.log(jsonVcnlkeyf);
    statement.close();
      connection.disconn();
      connection.close();
   // console.log('test' +jsonVcnlkeyf);
     
  // console.log('Net voor jsonvcnl return');
     
	  keyValue(sleutelwaarde); 
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
	 	//console.log('VKKEYN ' + jsonfile[t].VKKEYN.trim() );
       // console.log('VKKEYV ' + jsonfile[t].VKKEYV.trim() );
    }	
}

 function checkKeyValue (jsonfile) {
	  
	for (t=0; t < jsonfile.length; t++)
	{
	 	//console.log('VKKEYN ' + jsonfile[t].VKKEYN.trim() );
       // console.log('VKKEYV ' + jsonfile[t].VKKEYV.trim() );
	   var sleutelwaarde = jsonfile[t].VKKEYV.trim();
	   //console.log('jsonArray' + jsonArray); 
	   return (sleutelwaarde);
    }	
	 
}
 
 module.exports = {
  vcnlkeyf: vcnlkeyf,
  getVcnlkeyfKeyValue : getVcnlkeyfKeyValue
  };
