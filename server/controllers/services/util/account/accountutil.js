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
	validateAddLobby: function(userEmail, lobbyId, facebookuser) {
		if(userEmail && lobbyId) {
			if( facebookuser && (facebookuser!=='true' && facebookuser!=='false')) { return false; }
			return true;
		}

		return false;
	},
	validateRemoveLobby: function(userEmail, lobbyId) {
		if(userEmail && lobbyId)
			return true;

		return false;
	}
}

module.exports = accountutil;