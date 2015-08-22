var paths = require('../paths'),
	dbclient = require(paths.database + '/client'),
	userFactory = require(paths.model + '/user');
	
var data_accounts = {
	'loginUser': function(userObj, facebookuser, callback) {
		var db = dbclient.get(), users = db.collection('users');
		
		users.findOne({email: userObj.email, password: userObj.password, facebookuser: facebookuser}, function(err, found) {
			if( err ) {
				callback(false);
			}
			else if( found ) {
				callback(true);
			}
			else {
				callback(false);
			}
		});
	},
	'registerUser': function(userObj, callback) {
		var db = dbclient.get(), newuser = userFactory.create(userObj);
		
		var users = db.collection('users');
		users.save( newuser, function( err, saved) {
			if( err || !saved ) {
				callback(false);
			}
			else {
				callback(true);
			}
		});	
	},
	'emailExists': function(useremail, facebookuser, callback ) {
		var db = dbclient.get(), users = db.collection('users');
		
		users.findOne({email: useremail, facebookuser: facebookuser}, function( err, found ) {
			if( err ) {
				callback(false);
			}
			else if( found ) {
				callback(true);
			}
			else {
				callback(false);
			}
		});
	}
};

module.exports = data_accounts;