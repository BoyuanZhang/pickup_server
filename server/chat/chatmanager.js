var paths = require('../paths'),
	socketio = require('socket.io'),
	usermanager = require(paths.chat + '/users/usermanager'),
	lobbymanager = require(paths.chat + '/lobby/lobbymanager'),
	uuid = require("node-uuid"),
	io = null;

//chatmanager manages all clients
var clients = {};

var chatmanager = {
	setup: function(server){
		io = socketio(server);

		io.on("connection", function(client) {
			client.on("createLobby", function(user) {
			});
		});
	}	
};

module.exports = chatmanager;