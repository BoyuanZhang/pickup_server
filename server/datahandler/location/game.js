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
	}
};

module.exports = data_games;