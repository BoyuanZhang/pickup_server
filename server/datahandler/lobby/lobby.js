var paths = require('../../paths'),
	dbclient = require(paths.database + '/client'),
	lobbyFactory = require(paths.model + '/lobby'),
	chatConfig = require(paths.chat + '/config/config');

var data_lobby = {
	'lobbyExists': function(lobbyId, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.count({lobbyId: lobbyId}, function(err, count) {
			if( err ) {
				callback(false, err);
			}
			else if( count > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	'createLobby': function(lobbyId, creatorEmail, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby'), newLobby = lobbyFactory.create(lobbyId, creatorEmail);
		lobby.save(newLobby, function(err, saved) {
			if( err || !saved ) {
				callback(false);
			} else {
				callback(true);
			}
		});
	},
	'fetchChat': function(lobbyId, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.findOne({lobbyId: lobbyId}, function(err, doc) {
			if(err) {
				callback(false);
			} else {
				callback(true, doc);
			}
		});
	},
	'destroyChat': function(lobbyId, creatorEmail, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.remove( {lobbyId: lobbyId, creatorEmail: creatorEmail}, true, function(err, doc) {
			if(err) {
				callback(false);
			} else {
				callback(true);
			}
		})
	},
	'leaveLobby': function(lobbyId, email, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.update( 
			{
				lobbyId: lobbyId
			},
			{
				$pull: {
					users: email
				}
			}, function(err, doc) {
				if(err) {
					callback(false);
				} else {
					callback(true);
				}
		})
	},
	'updateChat': function(lobbyId, msg, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby'), maxMessages = chatConfig.maxMessages;

		lobby.update( 
			{
				lobbyId: lobbyId
			}, 
			{
				$push: {
					chatLog: {
						$each: [msg],
						$slice: maxMessages
					}
				}
			} 
			, function(err, doc) {
			if(err) {
				callback(false);
			} else {
				callback(true);
			}
		})
	},
	'joinLobby': function(lobbyId, email, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.update(
			{
				lobbyId: lobbyId
			},
			{
				$addToSet: {
					users: email
				}
			}
			, function(err, doc) {
				if(err) {
					callback(false);
				} else {
					callback(true);
				}
			}
		);
	},
	'findLobby': function(lobbyId, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.findOne({lobbyId: lobbyId}, function(err, lobby) {
			if( err ) {
				callback(false);
			}
			else if( lobby ) {
				callback(true, lobby);
			}
			else {
				callback(false);
			}
		});
	}
};

module.exports = data_lobby;