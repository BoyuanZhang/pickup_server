var paths = require('../paths'),
	auth = require(paths.security + '/auth');

var lobbyFactory = {
	create: function(lobbyId, creatorEmail){
		var lobby = {}, timestamp = Date.now();

		lobby.lobbyId = lobbyId;
		lobby.creatorEmail = creatorEmail;
		lobby.createDate = timestamp;
		lobby.chatLog = [];
		lobby.users = [];

		return lobby;
	}
}

module.exports = lobbyFactory;