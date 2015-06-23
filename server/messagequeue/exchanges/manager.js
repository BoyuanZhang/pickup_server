var default_exchange = require('./default'),
	exchangesArr = [default_exchange];

var exchangemanager = {
	setup: function(ch){
		console.log('setting up exchanges...');
		for( var i=0; i<exchangesArr.length; i++)
			exchangesArr[i].setup(ch);
	}	
};

module.exports = exchangemanager;