var chatutil = {
	validateJoin: function(user, lobby) {
		if(!lobby || !user)
			return false;

		if(lobby.lobbyId && user.email && user.username)
			return true;
			
		return false;
	},
	validateSend: function(user, lobbyId, msg) {
		if(!lobbyId || !user || !msg)
			return false;

		if(user.email)
			return true;

		return false;
	},
	validateAuthQuery: function(query) {
		if(query.email && query.facbookuser && query.authtoken) { return true; }
	
		return false;
	}
}

module.exports = chatutil;