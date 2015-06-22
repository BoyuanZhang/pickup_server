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
	generateToken: function(email) {
		var token = jwt.encode(createTokenContent(email), secrets.authsecret);
		return token;
	},
	validateToken: function(email, token) {
		var expectedContent = createTokenContent(email);
		return (expectedContent == jwt.decode(token, secrets.authsecret));
	}
}

module.exports = auth;