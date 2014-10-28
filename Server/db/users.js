var root = require('../paths').root;
	config = require(root + '/config'),
	databaseURL = process.env.MONGOLAB_URI || config.domain+':'+config.dbport + '/' + config.pickupdb,
	mongojs = require("mongojs"),
	db = mongojs( databaseURL );

function doesUserExist( user ) {
	
};

var data_users = {
	'loginUser' : function( userLogin, callback ) {
		var users = db.collection('users');
		
		users.findOne({email : userLogin.email, password : userLogin.password}, function(err, found) {
			if( err ) {
				console.log( "user could not be searched for because an error occured while locating user: " + userLogin.email +", with error: " + err );
				callback( false );
			}
			else if( found ) {
				console.log( "user with email : " + userLogin.email + " successfully validated!");
				callback(true);
			}
			else {
				console.log( "login information provided for user with email : " + userLogin.email + ", email / password combination incorrect");
				callback( false );
			}
		});
	},
	'registerFacebookUser' : function( facebookUser, callback ) {
		var users = db.collection('users');
		
		users.findOne({email : facebookUser.email, facebookUser : true}, function( err, found ) {
			if( err ) {
				console.log( "facebook user could not be searched for because an error occured while trying to find facebook user: " + facebookUser.email + ", with error: " + err );
				callback("failed");
			}
			else if( found ) {
				console.log( "facebook user with email : " + facebookUser.email + " already exists!");
				callback("exists");
			}
			else {
				var userObj = {
					email : facebookUser.email,
					password : "",
					displayName : facebookUser.name,
					facebookUser : true
				}
				users.save( userObj, function( err, saved ) {
					if( err || !saved ) {
						console.log( "Facebook user with email: " + facebookUser.email + ", was not saved due to error: " + err );
						callback("failed");
					}
					else {
						console.log( "Facebook user with email " + facebookUser.email + ", successfully saved!");
						callback("success");
					}
				});
			}
		});
	},
	'registerUser' : function(newUser, callback) {
		//set up object
		var userObj = { 
			email : newUser.email,
			password : newUser.password,
			displayName : newUser.displayName,
			facebookUser : false
		}
		console.log( "connecting to users table");
		var users = db.collection('users');
		users.save( userObj, function( err, saved) {
			if( err || !saved ) {
				console.log( "user with email: " + userObj.email + ", was not saved due to error: " + err);
				callback(false);
			}
			else {
				console.log( "user with email: " + userObj.email + ", successfully saved!");
				callback(true);
			}
		});
	},
	'checkUserExists' : function( userInfo, callback ) {
		var users = db.collection('users');
		
		users.findOne({email : userInfo.email, facebookUser : false}, function( err, found ) {
			if( err ) {
				console.log( "user could not be validated because an error occured while trying to find user: " + userInfo.email + ", with error: " + err );
				callback(true);
			}
			else if( found ) {
				console.log( "user with email : " + userInfo.email + " already exists!");
				callback(true);
			}
			else {
				callback(false);
			}
		});
	}
};

module.exports = data_users;