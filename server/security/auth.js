var paths = require('../paths'),
	secrets = require(paths.security + '/config/secrets'),
	jwt = require('jwt-simple');

function createTokenContent(email) {
		var date = new Date(),
			dayOfMonth = date.getDate().toString(),
			content = email+dayOfMonth;
			
		return content;
}

var auth = {
	generateToken: function(email, facebookuser) {
		if(facebookuser === 'true')
			email = this.createFBPadEmail(email);
		
		var token = jwt.encode(createTokenContent(email), secrets.authsecret);
		return token;
	},
	validateToken: function(email, token, facebookuser) {
		if(facebookuser === 'true')
			email = this.createFBPadEmail(email);	

		var expectedContent = createTokenContent(email);
		return (expectedContent == jwt.decode(token, secrets.authsecret));
	},
	createFBPadEmail: function(email) {
		return email + secrets.fbemailpad;
	},
	getUserEmailFromQuery: function(query) {
		var facebookuser = query.facebookuser ? query.facebookuser : false;

		if(!query.email) return null;

		if(facebookuser) {
			return this.createFBPadEmail(query.email);
		}
		else { 
			return query.email;
		}
	}
}

module.exports = auth;