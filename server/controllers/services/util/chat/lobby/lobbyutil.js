var lobbyutil = {
	validateJoin: function(lobby) {
		if(lobby.id)
			return true;
			
		return false;
	}
}

module.exports = lobbyutil;