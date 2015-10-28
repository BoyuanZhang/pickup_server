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
	},
	validateUpdate: function(lobbyId, msg) {
		if(lobbyId && msg)
			return true;

		return false;
	},
	validateUserInLobby: function(lobbyId, email) {
		if(lobbyId && msg)
			return true;

		return false;
	},
	validateJoin: function(lobbyId, email) {
		if(lobbyId && email)
			return true;

		return false;
	}
}

module.exports = lobbyutil;