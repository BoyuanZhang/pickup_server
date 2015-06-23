var paths = require('../paths'),
	config = require(paths.root + '/config'),
	databaseURL = process.env.MONGOLAB_URI || config.devdomain+':'+config.dbport + '/' + config.pickupdb,
	mongojs = require("mongojs");

var client = null;

module.exports = {
	setupClient: function(cb) {
		client = mongojs( databaseURL );
		if(client)
			cb(true);
		else
			cb(false);
	},
	get: function() {
		return client;
	}
}