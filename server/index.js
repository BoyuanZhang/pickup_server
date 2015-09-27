var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('../config'),
	viewRouter = require('./routes/views/view'),
	accountRouter = require('./routes/services/account'),
	locationRouter = require('./routes/services/location'),
	lobbyRouter = require('./routes/services/lobby'),
	dbclient = require('./database/client'),
	migrator = require('./database/migration/migrate'),
	amqclient = require('./messagequeue/client'),
	mqmanager = require('./messagequeue/mqmanager'),
	chatio = require('./chat/chatmanager'),
	app = express();

function start() {
	var port = (process.env.PORT) ? process.env.PORT  : config.serverport;
	
	//establish connection to, and initialize db
	dbinit();
	//establish connection to, and initialize rabbit mq
	armqinit();

	var server = app.listen(port, function() {
		app.use(bodyParser.json() );
		app.all('/API/REST/*', [require('./auth/authenticate')]);
		
		viewRouter.init(app);
		accountRouter.init(app);
		locationRouter.init(app);
		lobbyRouter.init(app);
		
		//setup RESTFUL service routes below
		
		console.log('PickUp Server running on port: ' + port );
	});

	//Initialize socket event listener/handler
	chatio.setup(server);
};

function dbinit() {
	dbclient.setupClient(function(success) {
		if(success) {
			console.log('Connection established to db.');
			//run migrations
			migrator.migrate();	
		}
		else
			console.log('Connection could not be established to db, migrations not run.');
	});
}

function armqinit() {
	amqclient.setupClient(function(success) {
		if(success) {
			console.log('Connection to RabbitMQ established.');
			mqmanager.setup();
		}	
		else
			console.log('Connection could not be established to RabbitMQ.');	
	});
}

exports.start = start;