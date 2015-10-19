var paths = require('../../paths'),
	dbclient = require(paths.database + '/client'),
	lobbyFactory = require(paths.model + '/lobby'),
	chatConfig = require(paths.chat + '/config/config');

var data_lobby = {
	'lobbyExists': function(lobbyId, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby');

		lobby.count({lobbyId: lobbyId}, function(err, count) {
			if( err ) {
				callback(false);
			}
			//[BZ] TODO: the count here 2 is hard-coded, and should be replaced with a config constant value in the future
			else if( count > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	'createLobby': function(lobby, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby'), newLobby = lobbyFactory.create(lobby);
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
	'updateChat': function(lobbyId, msg, callback) {
		var db = dbclient.get(), lobby = db.collection('lobby'), maxMessages = chatConfig.maxMessages;

		lobby.update( 
			{
				lobbyId: lobbyId
			}, 
			{
				$push:{
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
				callback(true, doc);
			}
		})
	}
};

module.exports = data_lobby;