var paths = require('../../paths'),
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
	'findAccount': function(userEmail, facebookuser, callback) {
		var db = dbclient.get(), users = db.collection('users'),
			facebookuser = (facebookuser === 'true' || facebookuser === true) ? 'true' : 'false';

		users.findOne({email: userEmail, facebookuser: facebookuser}, function(err, found) {
			if( err ) {
				callback(false);
			}
			else if( found ) {
				callback(true, found);
			}
			else {
				callback(false);
			}
		});		
	},
	'registerUser': function(userObj, callback) {
		var db = dbclient.get(), newuser = userFactory.create(userObj), users = db.collection('users');
		
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
	},
	'addLobby': function(lobbyId, useremail, facebookuser, callback) {
		var db = dbclient.get(), users = db.collection('users'),
			facebookuser = (facebookuser === 'true' || facebookuser === true) ? 'true' : 'false';

		users.update( 
			{
				email: useremail,
				facebookuser: facebookuser
			}, 
			{
				$addToSet: {
					lobbies: lobbyId
				}
			} 
			, function(err, doc) {
			if(err) {
				callback(false);
			} else {
				callback(true);
			}
		});		
	},
	'removeLobby': function(useremail, lobbyId, callback) {
		var db = dbclient.get(), users = db.collection('users');
		lobby.update( 
			{
				email: useremail
			},
			{
				$pull: {
					lobbies: lobbyId
				}
			}, function(err, doc) {
				if(err) {
					callback(false);
				} else {
					callback(true);
				}
		});
	}
};

module.exports = data_accounts;