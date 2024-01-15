const { oauthCheck } = require("./oauthCheckRequest.js");
 

// getOauthBearer programma:
// - 

	
  
	 var jsonVCNLKEYF;
 

 function getOauthBearer(setletter,idasuser, applicatie) {
	  return new Promise(function(bearer) {
		  
    var initializePromise = oauthCheck(setletter, idasuser, applicatie);
    initializePromise.then(function(result) {
        bearerToken = result;
       // console.log("Initialized jsonVCNLKEYF");
        // Use user details from here
       // console.log(userDetails);
	  bearer(bearerToken);  
    }, function(err) {
        console.log(err);
    });
	
}



  



	 