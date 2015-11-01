var userFactory = {
	create: function(userObj){
		var user = {};
		user.email = userObj.email;
		user.username = userObj.username;
		user.facebookuser = (userObj.facebookuser) ? 'true' : 'false';
		user.password = userObj.password;
		user.lobbies = [];

		return user;
	}
}

module.exports = userFactory;