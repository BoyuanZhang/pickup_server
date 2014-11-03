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
		
		users.findOne({facebookUser : false, email : userLogin.email, password : userLogin.password}, function(err, found) {
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
	'registerUser' : function(newUser, callback) {
		//set up object
		var userObj = { 
			email : newUser.email,
			password : newUser.password,
			username : newUser.username,
			displayName : newUser.displayName,
			facebookUser : newUser.facebookUser
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
	'checkEmailExists' : function( checkEmail, callback ) {
		var users = db.collection('users');
		
		users.findOne({email : checkEmail, facebookUser : false}, function( err, found ) {
			if( err ) {
				console.log( "user could not be validated because an error occured while trying to find email: " + checkEmail + ", with error: " + err );
				callback(true);
			}
			else if( found ) {
				console.log( "user with email : " + checkEmail + " already exists!");
				callback(true);
			}
			else {
				callback(false);
			}
		});
	},
	'checkFacebookEmailExists' : function( checkEmail, callback) {
		var users = db.collection('users');
		
		users.findOne({email : checkEmail, facebookUser : true}, function( err, found ) {
			if( err ) {
				console.log( "user could not be validated because an error occured while trying to find facebook email: " + checkEmail + ", with error: " + err );
				callback(true);
			}
			else if( found ) {
				console.log( "user with facebook email : " + checkEmail + " already exists!");
				callback(true);
			}
			else {
				callback(false);
			}
		});	
	},
	'checkUsernameExists' : function( checkUsername, callback) {
		var users = db.collection('users');
		
		users.findOne({ username : checkUsername } , function(err, found ) {
			if( err ) {
				console.log("user could not be validated because an error occured while trying to find username: " + checkUsername + ", with error: " + err );
				callback(true);
			}
			else if( found ) {
				console.log( "user with username: " + checkUsername + " already exists!");
				callback(true);
			}
			else 
				callback(false);
		});
	}
};

module.exports = data_users;