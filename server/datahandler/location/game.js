var paths = require('../../paths'),
	dbclient = require(paths.database + '/client'),
	responseservice = require(paths.service + '/response/responseservice'),
	gameFactory = require(paths.model + '/game');

var data_games = {
	'isCreateAllowed': function(creator, game, callback) {
		var db = dbclient.get(), games = db.collection('games');

		games.count({creator: creator, game: game}, function(err, count) {
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

	'createGame': function(gameObj, callback) {
		var db = dbclient.get(), newgame = gameFactory.create(gameObj), games = db.collection('games');
		games.save(newgame, function(err, saved) {
			if( err || !saved ) {
				callback(false);
			}
			else {
				callback(true);
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
						console.log(docs);
						callback(true, docs);
					}
				})
	}
};

module.exports = data_games;