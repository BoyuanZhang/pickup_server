var accountutil = {
	validateRegisterReq: function(body) {
		if(body.email && body.username && body.password)
			return true;
			
		return false;
	},
	validateLoginReq: function(body) {
		if(body.email && body.password)
			return true;
			
		return false;	
	}
}

module.exports = accountutil;