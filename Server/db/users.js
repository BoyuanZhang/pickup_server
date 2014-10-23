var root = require('../paths').root;
	config = require(root + '/config'),
	databaseURL = config.domain+':'+config.dbport + '/' + config.pickupdb,
	mongojs = require("mongojs"),
	db = mongojs( databaseURL );

function doesUserExist( user ) {
	
};

var data_users = {
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
				console.log( "user with email: " + userObj.email + ", successfuly saved!");
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