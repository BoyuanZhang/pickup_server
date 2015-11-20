function migrate(db) {
	var games = db.collection('games');
	games.createIndex({location:"2dsphere"});
	games.createIndex({creatorEmail: 1});
	games.createIndex({gameId: 1}, {unique: true})
}

exports.migrate=migrate;