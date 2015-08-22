var handler = {
	//[BZ] TODO: These are temporary functions to grab the users email / fbuser flag from the request
	//in the future we will have proper session management.
	//Also note the session handler is after authenticate has happened so we can assume the email/facebookuser flag is inside the request
	getUserContext: function(req) {
		var query = req.query,
			facebookuser = query.facebookuser ? query.facebookuser : false,
			sessionObj = {
				email: query.email,
				facebookuser: facebookuser
			}

		return sessionObj;
	}

};

module.exports = handler;