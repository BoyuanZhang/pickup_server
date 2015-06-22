var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('../config'),
	viewRouter = require('./routes/views/view'),
	accountRouter = require('./routes/services/account'),
	migrator = require('./migration/migrate'),
	dbclient = require('./database/client'),
	app = express();

function start() {
	var port = (process.env.PORT) ? process.env.PORT  : config.serverport;
	
	//establish connection to db
	dbclient.setupClient(function(success) {
		if(success) {
			console.log('Connection established to db.');
			//run migrations
			migrator.migrate();	
		}
		else
			console.log('Connection could not be established to db, migrations not run');
	});
	
	app.listen(port, function() {
		app.use(bodyParser.json() );
		app.all('/API/REST/*', [require('./auth/authenticate')]);
		
		viewRouter.init(app);
		accountRouter.init(app);
		
		//setup RESTFUL service routes below
		
		console.log('PickUp Server running on port: ' + port );
	});

};

exports.start = start;