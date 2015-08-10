var paths = require('../../paths'),
	controller = require(paths.controllers + '/services/locationcontroller');

function init(app){
	app.post('/API/REST/1.0/location/update', controller.update);
};

exports.init = init;
