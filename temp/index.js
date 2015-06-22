var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('../config'),
	viewRouter = require('./routes/views/view'),
	accountRouter = require('./routes/services/account'),
	app = express();

function start() {
	var port = (process.env.PORT) ? process.env.PORT  : config.serverport;

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