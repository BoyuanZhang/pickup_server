var paths = require('../paths'),
	secrets = require(paths.security + '/config/secrets'),
	jwt = require('jwt-simple');

function createTokenContent(email) {
		var date = new Date(),
			dayOfMonth = date.getDate().toString(),
			content = email+dayOfMonth;
			
		return content;
}

function createFBPadEmail(email) {
	return email + secrets.fbemailpad;
}

var auth = {
	generateToken: function(email, facebookuser) {
		if(facebookuser === 'true')
			email = createFBPadEmail(email);
		
		var token = jwt.encode(createTokenContent(email), secrets.authsecret);
		return token;
	},
	validateToken: function(email, token) {
		if(facebookuser === 'true')
			email = createFBPadEmail(email);	

		var expectedContent = createTokenContent(email);
		return (expectedContent == jwt.decode(token, secrets.authsecret));
	}
}

module.exports = auth;