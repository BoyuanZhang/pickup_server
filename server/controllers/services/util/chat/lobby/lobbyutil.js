var lobbyutil = {
	validateExist: function(lobby) {
		if(lobby.lobbyId)
			return true;
			
		return false;
	},
	validateCreate: function(lobby) {
		if(lobby.lobbyId && lobby.creatorEmail && lobby.gameType)
			return true;

		return false;
	},
	validateFetch: function(lobby) {
		if(lobby.lobbyId)
			return true;

		return false;
	}
}

module.exports = lobbyutil;