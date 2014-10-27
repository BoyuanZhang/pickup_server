var util = require( '../util'),
	users = require( '../db/users')

var dataController = {
	'signup' : function( req, res ) {		
		//first make sure everything exists
		if(req.body.newUser ){
			var newUser  = req.body.newUser;
			if( util.validString(newUser.email) && util.validString(newUser.password) && util.validString(newUser.displayName )) {
				//check to make sure this contact does not exist in the database, and update accordingly
				var ret = {
					userAuth : {}
				}
				
				users.checkUserExists(newUser, function(exists) {
					if( exists == true ) {
						ret.userAuth.valid = false;
						ret.userAuth.message = "no updates made, user with email: " + newUser.email +" already exists in database";
						res.json(ret);	
					}
					else {
						users.registerUser(newUser, function(registered) {
							if( registered == true ) {
								ret.userAuth.valid = true;
								ret.userAuth.message = "successfully saved " + newUser.email + ", into database!";
								res.json(ret);								
							}
							else {
								ret.userAuth.valid = false;
								ret.userAuth.message = "failed to update database due to db error!";
								res.json(ret);								
							}
						});
					}
				});
			}
			else {
				res.statusCode = 400;
				res.end();
			}
		}
		else {
			res.statusCode = 400;
			res.end();
		}
	},
	'login' : function( req, res ) {
		var ret = {
			userAuth : {}
		}
		
		//first make sure everything exists
		if( req.body.userLogin ) {
			var userLogin = req.body.userLogin;
			if( util.validString(userLogin.email) && util.validString(userLogin.password)) {
				users.loginUser( userLogin, function( validLogin ) {
					if( validLogin == true ) {
						ret.userAuth.valid = true;
						ret.userAuth.message = "User with email " + userLogin.email + ", successfully validated!";
						res.json(ret);
					}
					else {
						ret.userAuth.valid = false;
						ret.userAuth.message = "Incorrect username or password combination for user with email: " + userLogin.email;
						res.json(ret);
					}
				});
			}
			else {
				res.statusCode = 400;
				res.end();
			}
		}
		else if( req.body.facebookUser ) {
			var facebookUser = req.body.facebookUser;
			if( util.validString(facebookUser.email) && util.validString(facebookUser.name)) {
				users.registerFacebookUser( facebookUser, function(registeredMsg) {
					if( registeredMsg == "success") {
						ret.userAuth.valid = true;
						ret.userAuth.message = "Facebook user with email " + facebookUser.email + ", successfully registered!";
						res.json(ret);
					}
					else if( registeredMsg == "exists" ) {
						ret.userAuth.valid = true;
						ret.userAuth.message = "Facebook user with email " + facebookUser.email + ", already registered!";
						res.json(ret);
					}
					else {
						ret.userAuth.valid = false;
						ret.userAuth.message = "Facebook user with email " + facebookUser.email + ", could not be registered";
						res.json(ret);
					}
				});
			}
			else {
				res.statusCode = 400;
				res.end();
			}
		}
		else {
			res.statusCode = 400;
			res.end();
		}
	},
	'userExists' : function( req, res ) {
		var validRequest = false;
		
		//validate request
		if( req.body.doesExist ) {
			var userInfo = req.body.doesExist;
			if( util.validString( userInfo.email ) ) {
				var ret = {
					doesExist: {}
				}
				users.checkUserExists(userInfo, function(exists) {
					if( exists == true) {
						ret.doesExist.exist = true;
						ret.doesExist.type = "email";
						res.json(ret);
					}
					else {
						ret.doesExist.exist = false;
						ret.doesExist.type = "email";
						res.json(ret);
					}
				});
			}
			else {
				res.statusCode = 400;
				res.end();
			}
		}
		else {
			res.statusCode = 400;
			res.end();
		}
	}
};

module.exports = dataController;