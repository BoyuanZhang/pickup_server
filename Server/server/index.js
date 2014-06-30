var express = require('express'),
	config = require('../config'),
	app = express();

function start() {
	app.listen(config.port);
	console.log( 'Wolfpack running, listening on port' + config.port );
};

module.exports = start;