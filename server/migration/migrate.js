var paths = require('../paths'),
	dbclient = require(paths.database + '/client');
	
//migrations
var users = require('./migrations/users');

function migrate() {
	var db = dbclient.get();
	var migrationArray = [users];
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