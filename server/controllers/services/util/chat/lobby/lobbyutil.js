var lobbyutil = {
	validateExist: function(lobby) {
		if(lobby.lobbyId)
			return true;
			
		return false;
	}
}

module.exports = lobbyutil;