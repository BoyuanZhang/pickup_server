var lobbyFactory = {
	create: function(lobbyObj){
		var lobby = {}, timestamp = Date.now();

		lobby.gameType = lobbyObj.gameType;
		lobby.lobbyId = lobbyObj.lobbyId;
		lobby.creatorEmail = lobbyObj.creatorEmail,
		lobby.createDate = timestamp;
		lobby.chatLog = [];
		lobby.users = [];

		return lobby;
	}
}

module.exports = lobbyFactory;