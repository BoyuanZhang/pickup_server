var paths = require('../../paths'),
	settings = require(paths.messagequeue + '/settings'),
	queueconfig = settings.queues,
	exchangeconfig = settings.exchanges;

function defaultMessagecb(message) {
	console.log(message.content.toString());
}

module.exports = {
	setup: function(ch){
		console.log('Setting up default queue...');

		function bindQueue(err, ok) {
			if(err) {
				console.log('Default queue not created, error: ' + err);
				return;
			}
			
			var queue = ok.queue;
			console.log('Binding queue to default exchange...');
			ch.bindQueue(queue, exchangeconfig.defaultName, queue, {}, function(err, ok) {
				if(err) {
					console.log('Default queue not bound to channel, error: ' + err);
					return;
				}
				ch.consume(queue, defaultMessagecb, {noAck: true}, function(err) {
					if(err) console.log('Consumer not set up for default queue, error: ' + err);
				});				
			});	
		}
		
		ch.assertQueue(queueconfig.defaultName, {}, bindQueue);
	}
}