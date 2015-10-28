var paths = require('../paths'),
	socketio = require('socket.io'),
	usermanager = require(paths.chat + '/users/usermanager'),
	lobbymanager = require(paths.chat + '/lobby/lobbymanager'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller'),
	chatutil = require(paths.chat + '/util/chatutil'),
	resbuilder = require(paths.chat + '/response/builder'),
	io = null;

var chatmanager = {
	setup: function(server){
		io = socketio(server);

		io.on("connection", function(client) {
			client.on("joinLobby", function(user, lobby) {
				if(!chatutil.validateJoin(user, lobby)) {
					client.emit('message', resbuilder.buildJoinMsg('error', 'Invalid request to join lobby'));
					return;
				}

				var lobbyId = lobby.lobbyId;
				lobbycontroller.exists(lobbyId, function(exists) {
					if(exists) {
						lobbymanager.joinLobby(lobbyId, user, function(joined) {
							if(joined) {
								client.join(lobbyId);
							} else {
								client.emit('message', resbuilder.buildJoinMsg('error', 'Could not join lobby with id: ' + lobbyId));
							}
						});
					}
					else {
						client.emit('message', resbuilder.buildJoinMsg('error', 'Lobby with id: ' + lobbyId + ' does not exist'));
					}
				});
			});

			client.on("send", function(user, lobbyId, msg) {
			});

			client.on("disconnect", function(user, lobbyId) {
			});
		});
	},
};

module.exports = chatmanager;