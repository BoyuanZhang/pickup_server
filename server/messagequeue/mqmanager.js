var paths = require('../paths'),
	client = require(paths.messagequeue + '/client'),
	exchangeManager = require(paths.messagequeue + '/exchanges/manager'),
	queueManager = require(paths.messagequeue + '/queues/manager');

function bail(err, conn) {
	console.log("Closing connection because a channel cannot be opened: " + err);
	if(conn)
		conn.close();
}	

var mqmanager = {
	setup: function(){
		var conn = client.getConnection();
		
		if(!conn) {
			console.log('Cannot get connection to RabbitMQ.');
			return;
		}
		
		function on_channel_open(err, ch) {
			if(err) return bail(err, conn);
			
			exchangeManager.setup(ch);
			queueManager.setup(ch);
		}
			
		conn.createChannel(on_channel_open);
	}	
};

module.exports = mqmanager;