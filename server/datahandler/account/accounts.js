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
	'findAccount': function(paddedEmail, callback) {
		var db = dbclient.get(), users = db.collection('users');

		users.findOne({paddedEmail: paddedEmail}, function(err, found) {
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
	'addLobby': function(lobbyId, paddedEmail, callback) {
		var db = dbclient.get(), users = db.collection('users');

		users.update( 
			{
				paddedEmail: paddedEmail
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
	'removeLobby': function(lobbyId, paddedEmail,callback) {
		var db = dbclient.get(), users = db.collection('users');

		users.update( 
			{
				paddedEmail: paddedEmail
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
	},
	'removeLobbies': function(lobbyId, lobbyUsers, callback) {
		var db = dbclient.get(), users = db.collection('users');

		if(lobbyUsers.length === 0) {
			callback(true);
			return;
		}

		users.update(
			{
				paddedEmail: 
					{
						$in: lobbyUsers
					}
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
		})
	}
};

module.exports = data_accounts;