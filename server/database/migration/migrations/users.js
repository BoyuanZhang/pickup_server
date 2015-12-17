function migrate(db) {
	var users = db.collection('users');
	
	users.createIndex({'paddedEmail': 1}, {unique:true});
	users.createIndex({'email': 1, 'facebookuser': 1}, {unique:true});
}

exports.migrate=migrate;