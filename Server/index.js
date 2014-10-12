var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('../config'),
	view = require('./routes/view'),
	data = require('./routes/data'),
	app = express();

function start() {
	app.use( bodyParser.urlencoded({ extended: true}));
	app.use( bodyParser.json() );
	
	view(app);
	data(app);
	
	app.listen(config.port);
	console.log( 'PickUp Server is running, listening on port: ' + config.port );
};

module.exports = start;