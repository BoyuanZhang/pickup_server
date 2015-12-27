var paths = require('../../paths'),
	gameController = require(paths.controllers + '/services/location/gamecontroller');

function init(app){
	app.post('/API/REST/1.0/location/games/create', gameController.create);
	app.post('/API/REST/1.0/location/games/find', gameController.find);
	app.post('/API/REST/1.0/location/games/destroy', gameController.destroy);
	app.get('/API/REST/1.0/location/games/findGame', gameController.findGame);
};

exports.init = init;