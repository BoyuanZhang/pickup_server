var default_queue = require('./default'),
	queueArr = [default_queue]

var queuemanager = {
	setup: function(ch){
		console.log('setting up queues...');
		for( var i=0; i<queueArr.length; i++)
			queueArr[i].setup(ch);
	}	
};

module.exports = queuemanager;