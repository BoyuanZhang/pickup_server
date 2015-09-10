var paths = require('../../paths'),
	gameController = require(paths.controllers + '/services/location/gamecontroller');

function init(app){
	app.post('/API/REST/1.0/location/games/create', gameController.create);
	app.post('/API/REST/1.0/location/games/find', gameController.find);
};

exports.init = init;
 