function migrate(db) {
	var lobby = db.collection('lobby');
	lobby.createIndex({lobbyId: 1}, {unique: true})
}

exports.migrate=migrate;