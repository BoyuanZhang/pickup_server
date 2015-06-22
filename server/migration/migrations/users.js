function migrate(db) {
	var users = db.collection('users');
	users.createIndex({'email': 1, 'facebookuser': 1}, {unique:true});
}

exports.migrate=migrate;