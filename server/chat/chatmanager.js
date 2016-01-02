var paths = require('../paths'),
	socketio = require('socket.io'),
	lobbymanager = require(paths.chat + '/lobby/lobbymanager'),
	chatutil = require(paths.chat + '/util/chatutil'),
	resbuilder = require(paths.chat + '/response/builder'),
	auth = require(paths.security + '/auth'),
	io = null;

var chatmanager = {
	setup: function(server){
		io = socketio(server);

		io.use(function(socket, next) {
			var query = socket.handshake.query;
			(query.facebookuser && query.facebookuser === true) ? query.facebookuser = 'true' : query.facebookuser = 'false';

		    if (auth.validateToken(query.email, query.token, query.facebookuser)) {
		        next();
		    } else {
		    	//[BZ] TODO: Build more elegant error response for unauthorized requests.
		    	//For now just return the 401 unauthorized error code
		        next(new Error('401'));
		    }
		});
 
		io.on("connection", function(client) {
			client.on("send", function(user, lobbyId, msg) {
				if(!chatutil.validateSend(user, lobbyId, msg)) {
					client.emit('message', resbuilder.buildJoinMsg('error', 'Invalid request send message'));
					return;					
				}

				lobbymanager.emitToLobby(user.email, user.facebookuser, lobbyId, msg, function(emitSuccess) {
					if(emitSuccess) {
						io.sockets.in(lobbyId).emit('roomMessage', resbuilder.buildBroadcastMsg('broadcast', msg));
					} else {
						client.emit('message', resbuilder.buildJoinMsg('error', 'Could not send message: ' + msg + ', to lobby with id: ' + lobbyId));
					}
				});
			});
		});
	}
};

module.exports = chatmanager;