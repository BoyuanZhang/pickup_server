var util = require( '../util'),
	users = require( '../db/users')

var dataController = {
	'signup' : function( req, res ) {		
		//first make sure everything exists
		if(req.body.newUser ){
			var newUser  = req.body.newUser;
			if( util.validString(newUser.email) && util.validString( newUser.username) && util.validString(newUser.displayName ) 
				&& typeof(newUser.facebookUser) !== 'undefined') {
				//check to make sure this contact does not exist in the database, and update accordingly
				var ret = {
					userAuth : {}
				}
				var userExists = true;
				ret.userAuth.message = "";
				users.checkEmailExists( newUser.email, function( exists) {
					if( exists != true )
						userExists = false;
					else
						ret.userAuth.message += "User with email : " + newUser.email + "already exists. ";
				});
				
				if( userExists == false ) {
					users.checkUsernameExists( newUser.username, function( exists ) {
						if( exists == true ) {
							userExists = true;
							ret.userAuth.message += "User with username : " +newUser.username + "already exists. ";
						}
					});
				}
				
				if( userExists == false ) {
					//make sure password exists for a non-facebook user and password does not exist for a facebook user
					
					//set the password if undefined
					if( typeof( newUser.password) === 'undefined' )
						newUser.password = "";
					if( (util.validString(newUser.password) && newUser.facebookUser == false) || !(util.validString(newUser.password) && newUser.facebookUser == true))
					{
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
					else {
						ret.userAuth.valid = false;
						ret.userAuth.message = "A non-facebook user must have a password, and a facebook user cannot have a password!";
						res.json(ret);
					}
				}
				else {
					ret.userAuth.valid =false;
					res.json(ret);
				}
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
			var ret = {
				doesExist: {}
			}
			if( util.validString( userInfo.email )) {
				users.checkEmailExists(userInfo, function(exists) {
					if( exists == true) 
						ret.doesExist.emailExist = true;
					else 
						ret.doesExist.emailExist = false;
				
					validRequest = true;
				});
			}
			
			if( util.validString( userInfo.username ) ) {
				users.checkUsernameExists( userInfo, function(exists) {
					if( exists == true )
						ret.doesExist.usernameExist = true;
					else
						ret.doesExist.usernameExist = false;
						
					validRequest = true;
				});
			}
			
			if( validRequest == true ) {
				res.json( ret );
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