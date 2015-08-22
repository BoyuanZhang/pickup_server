var paths = require('../../paths'),
	dbclient = require(paths.database + '/client'),
	responseservice = require(paths.service + '/response/responseservice');

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
	}
};

module.exports = data_games;