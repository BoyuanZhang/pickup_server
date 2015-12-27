var paths = require('../paths'),
	auth = require(paths.security + '/auth');

var userFactory = {
	create: function(userObj){
		var user = {}, facebookuser = (userObj.facebookuser) ? 'true' : 'false';
		user.paddedEmail = (facebookuser === 'true') ? auth.createFBPadEmail(userObj.email) : userObj.email;
		user.email = userObj.email;
		user.username = userObj.username;
		user.facebookuser = facebookuser;
		user.password = userObj.password;
		user.lobbies = [];
		user.createdGames = [];

		return user;
	}
}

module.exports = userFactory;