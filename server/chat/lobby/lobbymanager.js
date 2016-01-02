var paths = require('../../paths'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller'),
	auth = require(paths.security + '/auth');

//Connected user object
var lobbies = {};

var lobbymanager = {
	emitToLobby: function(email, facebookUser, lobbyId, msg, callback) {
		var userEmail = (facebookUser === 'true') ? auth.createFBPadEmail(email) : email;
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