var paths = require('../../../paths'),
	lobbyutil = require(paths.controllers + '/services/util/chat/lobby/lobbyutil'),
	ldhandler = require(paths.datahandler + '/lobby/lobby'),
	responseservice = require(paths.service + '/response/responseservice'),
	responsehelper = require(paths.controllers + '/services/helper/responsehelper'),
	auth = require(paths.security + '/auth');


var controller = {
	'lobbyExists': function(req, res) {
		var reqBody = req.body;
		if(!lobbyutil.validateExist(reqBody)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var lobbyId = reqBody.lobbyId;
		this.exists(lobbyId, function(exists) {
			var data = {}, ret;
			if(exists) {
				data.lobbyExists = true;
			} else {
				data.lobbyExists = false;					
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);	
		});
	},
	'createLobby': function(req, res) {
		var reqBody = req.body;
		if(!lobbyutil.validateCreate(reqBody)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		ldhandler.lobbyExists(reqBody.lobbyId, function(exists) {
			var data = {}, ret;
			if(exists) {
				ldhandler.createLobby(reqBody, function(success) {
					if(success) {
						data.lobbyCreated = true;
					} else {
						data.lobbyCreated = false;						
					}
					ret = responseservice.buildBasicResponse(data);
					res.json(ret);	
				})
			} else {
				data.lobbyCreated = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);		
			}
		});

		res.end();
	},
	'fetchChat': function(req, res) {
		var reqBody = req.body;
		if(!lobbyutil.validateFetch(reqBody)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var lobbyId = reqBody.lobbyId;
		ldhandler.fetchChat(lobbyId, function(success, element) {
			var data = {}, ret;
			if(success && element) {
				data.fetchSuccess = true;
				data.chatLog = element.chatLog;
			} else {
				data.fetchSuccess = false;	
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);		
		});
	},
	'destroyLobby': function(req, res) {
		var reqBody = req.body, reqQuery = req.query;
		if(!lobbyutil.validateDestroy(reqBody, reqQuery)) {
			responsehelper.handleBadRequest(res);
			return;
		}
		var lobbyId = reqBody.lobbyId, 
			creatorEmail = auth.getUserEmailFromQuery(reqQuery);

		ldhandler.destroyChat(lobbyId, creatorEmail, function(destroyed) {
			if(destroyed) {
				data.lobbyDestroyed = true;
			} else {
				data.lobbyDestroyed = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'leaveLobby': function(req, res) {
		var reqBody = req.body, reqQuery = req.query;
		if(!lobbyutil.validateLeave(reqBody, reqQuery)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var lobbyId = reqBody.lobbyId, userEmail = auth.getUserEmailFromQuery(reqQuery);

		ldhandler.leaveLobby(lobbyId, userEmail, function(left) {
			var data = {}, ret;
			if(left) {
				data.leftLobby = true;
			} else {
				data.leftLobby = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'exists': function(lobbyId, callback) {
		if(!lobbyId) {
			callback(false);
		}
		ldhandler.lobbyExists(lobbyId, function(exists) {
			callback(exists);
		});
	},
	'updateChat': function(lobbyId, msg, callback) {
		if(!lobbyutil.validateUpdate(lobbyId, msg)) {
			callback(false);
		}

		ldhandler.updateChat(lobbyId, msg, function(success) {
			callback(success);
		})
	},
	'userInLobby': function(lobbyId, email, callback) {
		if(!lobbyutil.validateUserInLobby(lobbyId, email)) {
			callback(false);
		}

		ldhandler.findLobby(lobbyId, function(success, result) {
			if(!success || !result || !result.users) {
				callback(false);
				return;
			}

			var users = result.users;

			if(users.indexOf(email) > -1) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	'joinLobby': function(lobbyId, email, callback) {
		if(!lobbyutil.validateJoin(lobbyId, email)) {
			callback(false);
		}

		ldhandler.joinLobby(lobbyId, email, function(success) {
			callback(success);
		})
	}
};

module.exports = controller;