var paths = require('../paths'),
	socketio = require('socket.io'),
	usermanager = require(paths.chat + '/users/usermanager'),
	lobbymanager = require(paths.chat + '/lobby/lobbymanager'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller'),
	io = null;

//chatmanager manages all clients
var clients = {};

var chatmanager = {
	setup: function(server){
		io = socketio(server);

		io.on("connection", function(client) {
			client.on("joinLobby", function(user, lobby) {
			});
		});
	}	
};

module.exports = chatmanager;