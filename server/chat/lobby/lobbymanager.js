var paths = require('../../paths'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller');

//Connected user object
var lobbies = {};

var lobbymanager = {
	joinLobby: function(lobbyId, user, callback) {
		lobbycontroller.exists(lobbyId, function(exists) {
			if(exists) {
				lobbycontroller.joinLobby(lobbyId, user, function(joined) {
					callback(joined);
				});
			}
			else {
				callback(false);
			}
		});
	},
	emitToLobby: function(email, lobbyId, msg, callback) {
		lobbycontroller.userInLobby(lobbyId, email, function(inLobby) {
			if(inLobby) {
				lobbycontroller.updateChat(lobbyId, msg, function(success) {
					callback(success);
				});
			} else {
				callback(false);
			}
		})
	}
};

module.exports = lobbymanager;