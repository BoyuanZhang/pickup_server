var paths = require('../../paths'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller'),
	auth = require(paths.security + '/auth');

//Connected user object
var lobbies = {};

var lobbymanager = {
	joinLobby: function(email, facebookUser, lobbyId, callback) {
		lobbycontroller.exists(lobbyId, function(exists) {
			if(exists) {
				var userEmail = (facebookUser) ? auth.createFBPadEmail(email) : email;
				lobbycontroller.joinLobby(lobbyId, userEmail, function(joined) {
					callback(joined);
				});
			}
			else {
				callback(false);
			}
		});
	},
	emitToLobby: function(email, facebookUser, lobbyId, msg, callback) {
		var userEmail = (facebookUser) ? auth.createFBPadEmail(email) : email;
		lobbycontroller.userInLobby(lobbyId, userEmail, function(inLobby) {
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