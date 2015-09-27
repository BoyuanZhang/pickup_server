var paths = require('../../../paths'),
	lobbyutil = require(paths.controllers + '/services/util/chat/lobby/lobbyutil'),
	responseservice = require(paths.service + '/response/responseservice'),
	responsehelper = require(paths.controllers + '/services/helper/responsehelper');


var controller = {
	'lobbyExists': function(req, res) {
		res.end();
	},
	'createLobby': function(req, res) {
		res.end();
	},
	'getLobbyChat': function(req, res) {
		res.end();
	}
};

module.exports = controller;