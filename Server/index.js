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
	
	var port = (process.env.PORT) ? process.env.PORT  : config.port;
	app.listen(port);
	console.log( 'PickUp Server is running on port: ' + port );
};

module.exports = start;