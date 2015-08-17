var paths = require('../../paths'),
	dbclient = require(paths.database + '/client');
	
//migrations
var users = require('./migrations/users'),
	games = require('./migrations/games');

function migrate() {
	var db = dbclient.get();
	var migrationArray = [users, games];
	if(!db) {
		console.log("Could not connect to db, migrations not run.");
		return;
	}
	
	for(var i=0; i<migrationArray.length; i++){
		migrationArray[i].migrate(db);
	}
	
	console.log("Migrations complete!");
};

exports.migrate = migrate;