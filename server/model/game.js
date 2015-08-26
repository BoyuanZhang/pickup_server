var gameFactory = {
	create: function(gameObj){
		var game = {}, loc = gameObj.location;
		game.game = gameObj.game;
		game.location = [loc.longitude, loc.latitude];
		game.creator = gameObj.creator;

		return game;
	}
}

module.exports = gameFactory;