var paths = require('../paths'),
	settings = require(paths.messagequeue + '/settings'),
	config = settings.config,
	amqp = require('amqplib/callback_api');

var connection = null;
var generalExchange = null;

function bail(err, conn){
	console.log("Closing MQ connection due to error: " + err);
	if(conn)
		conn.close();
}

module.exports = {
	setupClient: function(cb) {
		amqp.connect( config.host, function(err, conn) {
			if(err) {
				bail(err, conn)
				cb(false);
			}
			else {
				connection = conn;
				cb(true);
			}
		});
	},
	getConnection: function() {
		return connection;
	}
}