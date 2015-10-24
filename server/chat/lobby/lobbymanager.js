//Connected user object
var lobbies = {};

function addLobby(lobbyId) {
	lobbies[lobbyId] = createLobbyObj();
}

function createLobbyObj() {
	var lobbyObj = {};
	lobbyObj.users = [];

	return lobbyObj;
}

function userInLobby(lobbyId, email) {
	if(!lobbies[lobbyId]) {
		return false;
	}

	return (lobbies[lobbyId].users.indexOf(email) > -1)
}

var lobbymanager = {
	joinLobby: function(lobbyId, user) {
		if(!lobbies[lobbyId]) {
			addLobby(lobbyId);
		}

		if(!userInLobby(lobbyId, user.email)) {
			lobbies[lobbyId].users.push(user.email);
		}
	}
};

module.exports = lobbymanager;