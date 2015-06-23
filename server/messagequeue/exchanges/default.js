var paths = require('../../paths'),
	settings = require(paths.messagequeue + '/settings'),
	exchangeconfig = settings.exchanges;

module.exports = {
	setup: function(ch){
		console.log('Setting up default exchange...');
		ch.assertExchange(exchangeconfig.defaultName, 'direct', {}, function(err, ok) {
			if(err) {
				console.log('Default exchange not created, error: ' + err);
			}
		});
	}
}