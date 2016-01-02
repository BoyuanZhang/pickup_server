var chatutil = {
	validateSend: function(user, lobbyId, msg) {
		if(!lobbyId || !user || !msg) { return false; }

		if(user.email) { return true; }

		return false;
	},
	validateAuthQuery: function(query) {
		if(query.email && query.facbookuser && query.authtoken) { return true; }
	
		return false;
	}
}

module.exports = chatutil;