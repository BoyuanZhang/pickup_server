var paths = require('../paths'),
	settings = require(paths.messagequeue + '/settings'),
	config = settings.config,
	queueconfig = settings.queues,
	exchangeconfig = settings.exchanges,
	amqp = require('amqplib/callback_api');

var connection = null;
var generalExchange = null;

function bail(err, conn){
	console.log("Closing MQ connection due to error: " + err);
	if(conn)
		conn.close();
}

function defaultMessagecb(message) {
	console.log(message.content.toString());
}

function setupQueue(ch) {
	console.log('Setting up default queue...');
	ch.assertQueue(queueconfig.defaultName, {}, function(err, ok){
		if(err) return bail(err, connection);
		var queue = ok.queue;
		
		ch.bindQueue(queue, exchangeconfig.defaultName, queue, {});
		ch.consume(queue, defaultMessagecb, {noAck: true}, function(err) {
			if(err) return bail(err, connection);
		});	
	});
}

module.exports = {
	setupClient: function(cb) {
		amqp.connect( config.host, function(err, conn) {
			connection = conn;
			if(err) return bail(err, conn);
			
			function on_channel_open(err, ch) {
				if(err) return bail(err, conn);
				console.log('Setting up default exchange...');
				ch.assertExchange(exchangeconfig.defaultName, 'direct', {}, function(err, ok) {
					if(err) return bail(err, conn);
					setupQueue(ch);
				});
			}
			
			conn.createChannel(on_channel_open);
		});
	},
	getConnection: function() {
		return connection;
	}
}