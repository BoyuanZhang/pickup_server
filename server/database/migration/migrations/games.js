function migrate(db) {
	var games = db.collection('games');
	games.createIndex({location:"2dsphere"});
}

exports.migrate=migrate;