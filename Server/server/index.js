var express = require('express'),
	config = require('../config'),
	view = require('./routes/view'),
	app = express();

function start() {
	view(app);
	
	app.listen(config.port);
	console.log( 'Wolfpack running, listening on port: ' + config.port );
};

module.exports = start;