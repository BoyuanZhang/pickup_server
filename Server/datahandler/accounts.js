var paths = require('../paths'),
	root = paths.root,
	config = require(root + '/config'),
	databaseURL = process.env.MONGOLAB_URI || config.domain+':'+config.dbport + '/' + config.pickupdb,
	mongojs = require("mongojs"),
	db = mongojs( databaseURL ),
	userFactory = require(paths.model + '/user');
	
var data_accounts = {
	'loginUser': function(userObj, facebookuser, callback) {
		var users = db.collection('users');
		
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
		var newuser = userFactory.create(userObj);
		
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
		var users = db.collection('users');
		
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