var util = require( '../util');

var dataController = {
	'signup' : function( req, res ) {		
		//validate signup information
		var validSignup = false;
		//first make sure everything exists
		if(req.body.newUser ){
			var newUser  = req.body.newUser ;
			if( util.validString(newUser.email) && util.validString(newUser.password) && util.validString(newUser.displayName ))
				validSignup = true;
		}
		
		//for the future if it is not a valid sign up then we can send back the proper HTTP status and message
		res.end();
	},
	'login' : function( req, res ) {
		//validate login information
		var validLogin = false;
		
		//first make sure everything exists
		if( req.body.userLogin ) {
			var userLogin = req.body.userLogin;
			if( util.validString(userLogin.email) && util.validString(userLogin.password))
				validLogin = true;
		}
		else if( req.body.facebookUser ) {
			var facebookUser = req.body.facebookUser;
			if( util.validString(facebookUser.email))
				validLogin = true;
		}
		
		//for the future if it is not a valid login then we can send back the proper HTTP status and message
		res.end();
	}
};

module.exports = dataController;