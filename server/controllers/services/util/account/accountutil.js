var accountutil = {
	validateRegisterReq: function(body) {
		if(body.email && body.username && body.password) {
			if( body.facebookuser && (body.facebookuser!=='true' && body.facebookuser!=='false')) { return false; }
				
			return true;
		}
			
		return false;
	},
	validateLoginReq: function(body) {
		if(body.email && body.password) {
			if( body.facebookuser && (body.facebookuser!=='true' && body.facebookuser!=='false')) { return false; }
				
			return true;
		}
		return false;	
	},
	validateExistReq: function(body) {
		if(body.email) {
			if( body.facebookuser && (body.facebookuser!=='true' && body.facebookuser!=='false')) { return false; }
				
			return true;		
		}
		
		return false;
	},
	validateAddLobby: function(lobbyId, paddedEmail) {
		if(paddedEmail && lobbyId) { return true; }

		return false;
	},
	validateAddCreatedLobby: function(lobbyId, paddedEmail) {
		if(lobbyId && paddedEmail) { return true; }

		return false;
	},
	validateRemoveLobby: function(lobbyId, paddedEmail) {
		if(paddedEmail && lobbyId) {
			return true;
		}

		return false;
	},
	validateRemoveLobbies: function(lobbyId, lobbyUsers) {
		if(lobbyId && lobbyUsers.constructor === Array) { return true; }

		return false;
	},
	validateRemovedCreatedLobby: function(lobbyId, creatorEmail) {
		if(lobbyId && creatorEmail) { return true; }

		return false;
	}
}

module.exports = accountutil;