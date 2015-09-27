var paths = require('../../paths'),
	lobbyController = require(paths.controllers + '/services/lobby/lobbycontroller');

function init(app){
	app.post('/API/REST/1.0/chat/lobby/exists', lobbyController.lobbyExists);
	app.post('/API/REST/1.0/chat/lobby/create', lobbyController.createLobby);
	app.post('/API/REST/1.0/chat/lobby/findchat', lobbyController.getLobbyChat);
};

exports.init = init;