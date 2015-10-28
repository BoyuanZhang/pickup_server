var paths = require('../../paths'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller');

//Connected user object
var lobbies = {};

var lobbymanager = {
	joinLobby: function(lobbyId, user) {
		lobbycontroller.joinLobby(lobbyId, user.email);
	}
};

module.exports = lobbymanager;