var lobbyutil = {
	validateExist: function(lobby) {
		if(lobby.lobbyId)
			return true;
			
		return false;
	},
	validateCreate: function(lobbyId, creatorEmail) {
		if(lobbyId && creatorEmail)
			return true;

		return false;
	},
	validateFetch: function(lobby) {
		if(lobby.lobbyId)
			return true;

		return false;
	},
	validateDestroy: function(lobbyId, creatorEmail) {
		if(!lobbyId || !creatorEmail)
			return false;

		return true;
	},
	validateLeave: function(Lobby, reqQuery) {
		if(!Lobby || !reqQuery)
			return false;

		if(Lobby.lobbyId && reqQuery.email)
			return true;

		return false;
	},
	validateUpdate: function(lobbyId, msg) {
		if(lobbyId && msg)
			return true;

		return false;
	},
	validateUserInLobby: function(lobbyId, email) {
		if(lobbyId && email) { return true; }

		return false;
	},
	validateJoin: function(lobby, reqQuery) {
		if(lobby.lobbyId && reqQuery.email)
			return true;

		return false;
	},
	validateAddToLobby: function(lobbyId, paddedEmail) {
		if(lobbyId && paddedEmail) { return true; }

		return false;
	}
}

module.exports = lobbyutil;