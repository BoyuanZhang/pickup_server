var gameFactory = {
	create: function(gameObj){
		var game = {}, loc = gameObj.location;
		game.game = gameObj.game;
		game.location = [parseFloat(loc.longitude), parseFloat(loc.latitude)];
		game.creator = gameObj.creator;

		return game;
	},

	createFind: function(gameObj){
		var gameQuery = {}, loc = gameObj.location;
		if(gameObj.game)
			gameQuery.game = gameObj.game;

		gameQuery.location = [parseFloat(loc.longitude), parseFloat(loc.latitude)];
		gameQuery.radius = parseFloat(gameObj.radius);

		return gameQuery;
	}
}

module.exports = gameFactory;