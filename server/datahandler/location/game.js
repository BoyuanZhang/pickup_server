var paths = require('../../paths'),
	dbclient = require(paths.database + '/client'),
	gameFactory = require(paths.model + '/game');

var data_games = {
	'isCreateAllowed': function(creatorEmail, game, callback) {
		var db = dbclient.get(), games = db.collection('games');

		games.count({creatorEmail: creatorEmail, game: game}, function(err, count) {
			if( err ) {
				callback(false);
			}
			//[BZ] TODO: the count here 2 is hard-coded, and should be replaced with a config constant value in the future
			else if( count > 2 ) {
				callback(false);
			}
			else {
				callback(true);
			}
		});
	},

	'createGame': function(creatorEmail, gameObj, callback) {
		var db = dbclient.get(), newgame = gameFactory.create(creatorEmail, gameObj), games = db.collection('games');
		games.save(newgame, function(err, saved) {
			if( err || !saved ) {
				callback(false);
			}
			else {
				callback(true, newgame);
			}
		});
	},

	'findGames': function(gameQueryObj, callback) {
		var db = dbclient.get(), gameQuery = gameFactory.createFind(gameQueryObj), games = db.collection('games');

		games.find({ 
					location: 
					{ 
						$near: 
						{
							$geometry: 
							{
								type: "Point", 
								coordinates: [gameQuery.location[0], gameQuery.location[1]]
							},
							//[BZ] TODO: for now distance is hard-coded to km and converted to meters
							$maxDistance: gameQuery.radius * 1000
						}
					}
				}, function(err, docs) {
					if(err) {
						callback(false);
					}
					else {
						callback(true, docs);
					}
				})
	},

	'destroyGame': function(gameId, creatorEmail, callback) {
		var db = dbclient.get(), games = db.collection('games');

		games.remove( {gameId: gameId, creatorEmail: creatorEmail}, true, function(err, doc) {
			if(err) {
				callback(false);
			} else {
				callback(true);
			}
		})
	}
};

module.exports = data_games;