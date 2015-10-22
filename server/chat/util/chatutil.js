var chatutil = {
	validateJoin: function(user, lobby) {
		if(!lobby || !user)
			return false;

		if(lobby.lobbyId && user.email && user.username)
			return true;
			
		return false;
	}
}

module.exports = chatutil;