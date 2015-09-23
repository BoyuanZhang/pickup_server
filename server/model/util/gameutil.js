var gameUtil = {
	generateId: function(creator, timestamp, game){
		var gameId = creator + timestamp + game;

		return gameId;
	}
}

module.exports = gameUtil;