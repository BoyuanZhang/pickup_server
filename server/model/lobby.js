var paths = require('../paths'),
	auth = require(paths.security + '/auth');

var lobbyFactory = {
	create: function(creatorEmail, lobbyObj){
		var lobby = {}, timestamp = Date.now(), fbuser = (lobbyObj.facebookuser) ? lobbyObj.facebookuser : false;

		lobby.gameType = lobbyObj.gameType;
		lobby.lobbyId = lobbyObj.lobbyId;
		lobby.creatorEmail = creatorEmail;
		lobby.createDate = timestamp;
		lobby.chatLog = [];
		lobby.users = [];

		return lobby;
	}
}

module.exports = lobbyFactory;