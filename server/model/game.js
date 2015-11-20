var paths = require('../paths'),
	gameUtil = require(paths.model + '/util/gameutil');

var gameFactory = {
	create: function(creatorEmail, gameObj){
		var game = {}, loc = gameObj.location, timestamp = Date.now(), gameId = gameUtil.generateId(gameObj.creator, timestamp, gameObj.game);

		game.game = gameObj.game;
		game.gameId = gameId;
		game.location = [parseFloat(loc.longitude), parseFloat(loc.latitude)];
		game.creatorEmail = creatorEmail,
		game.createDate = timestamp;

		return game;
	},

	createFind: function(gameObj){
		var gameQuery = {}, loc = gameObj.location;

		gameQuery.location = [parseFloat(loc.longitude), parseFloat(loc.latitude)];
		gameQuery.radius = parseFloat(gameObj.radius);

		return gameQuery;
	}
}

module.exports = gameFactory;