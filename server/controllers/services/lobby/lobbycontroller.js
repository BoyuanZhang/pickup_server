var paths = require('../../../paths'),
	lobbyutil = require(paths.controllers + '/services/util/chat/lobby/lobbyutil'),
	ldhandler = require(paths.datahandler + '/lobby/lobby'),
	responseservice = require(paths.service + '/response/responseservice'),
	responsehelper = require(paths.controllers + '/services/helper/responsehelper'),
	accountcontroller = require(paths.controllers + '/services/account/accountcontroller'),
	auth = require(paths.security + '/auth');


var controller = {
	'lobbyExists': function(req, res) {
		var reqBody = req.body;
		if(!lobbyutil.validateExist(reqBody)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var lobbyId = reqBody.lobbyId;
		ldhandler.lobbyExists(lobbyId, function(exists, err) {
			var data = {}, ret;
			if(!exists && !err) {
				data.lobbyExists = true;
			} else {
				data.lobbyExists = false;					
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);	
		});
	},
	'fetchChat': function(req, res) {
		var reqBody = req.body;
		if(!lobbyutil.validateFetch(reqBody)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var lobbyId = reqBody.lobbyId;
		ldhandler.findLobby(lobbyId, function(success, lobby) {
			var data = {}, ret;
			if(success && lobby) {
				data.fetchSuccess = true;
				data.chatLog = lobby.chatLog;
			} else {
				data.fetchSuccess = false;	
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);		
		});
	},
	'joinLobby': function(req, res) {
		var reqBody = req.body, reqQuery = req.query;
		if(!lobbyutil.validateJoin(reqBody, reqQuery)) {
			callback(false);
		}

		var lobbyId = reqBody.lobbyId, paddedEmail = auth.getPaddedEmailFromQuery(reqQuery);

		ldhandler.joinLobby(lobbyId, paddedEmail, function(success) {
			var data = {}, ret;
			if(success) {
				data.joinSuccess = true;
				callbacks.joinCb(lobbyId, paddedEmail);
			} else {
				data.joinSuccess = false;
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

		var lobbyId = reqBody.lobbyId, paddedEmail = auth.getPaddedEmailFromQuery(reqQuery);

		ldhandler.leaveLobby(lobbyId, paddedEmail, function(left) {
			var data = {}, ret;
			if(left) {
				callbacks.leaveCb(lobbyId, paddedEmail);
				data.leftLobby = true;
			} else {
				data.leftLobby = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'createLobby': function(lobbyId, paddedEmail, callback) {
		if(!lobbyutil.validateCreate(lobbyId, paddedEmail)) {
			callback(false);
			return;
		}

		ldhandler.lobbyExists(lobbyId, function(exists) {
			if(!exists) {
				ldhandler.createLobby(lobbyId, paddedEmail, function(success) {
					if(success) {
						callback(true);
					} else {
						callback(false);					
					}	
				})
			} else {
				callback(false);	
			}
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
	'destroyLobby': function(lobbyId, creatorEmail, callback) {
		if(!lobbyutil.validateDestroy(lobbyId, creatorEmail)) {
			callback(false);
		}

		ldhandler.findCreatorLobby(lobbyId, creatorEmail, function(found, lobbyObj) {
			if(!found || !lobbyObj) {
				callback(false);
				return;
			}

			ldhandler.destroyChat(lobbyId, creatorEmail, function(destroyed) {
				if(destroyed) {
					callbacks.destroyCb(lobbyObj);
					callback(true);
				} else {
					callback(false);
				}
			});
		});
	},
	'addUserToLobby': function(lobbyId, paddedEmail, callback) {
		if(!lobbyutil.validateAddToLobby(lobbyId, paddedEmail)) {
			callback(false);
		}

		ldhandler.joinLobby(lobbyId, paddedEmail, function(success) {
			if(success) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
};

module.exports = controller;

var callbacks = {
	'joinCb': function(lobbyId, paddedEmail) {
		accountcontroller.addLobby(lobbyId, paddedEmail, function(joined) {
			if(!joined) {
				//[BZ] TODO: if lobby was not added to user's account we should handle this somehow.
			}
		})
	},
	'destroyCb': function(lobbyObj) {
		if(!lobbyObj && !lobbyObj.lobbyId && !lobbyObj.users) {
			//[BZ] TODO: There should always be a lobby object, if there is not handle this error.
			return;
		}

		var lobbyId = lobbyObj.lobbyId, lobbyUsers = lobbyObj.users, creatorEmail = lobbyObj.creatorEmail, index=-1;

		index = lobbyUsers.indexOf(creatorEmail);
		if(index > -1) { lobbyUsers.splice(index, 1); }

		accountcontroller.removeLobbies(lobbyId, lobbyUsers, function(removed) {
			if(!removed) {
				//[BZ] TODO: if person did not leave this lobby we should error handle this somehow.
			}
		});

		accountcontroller.removeCreatedGame(lobbyId, creatorEmail, function(removed) {
			if(!removed) {
				//[BZ] TODO: if the created lobby is not removed from the account we should handle this error somehow.
			}
		});
	},
	'leaveCb': function(lobbyId, paddedEmail) {
		accountcontroller.removeLobby(lobbyId, paddedEmail, function(removed) {
			if(!removed) {
				//[BZ] TODO: if person did not join this lobby we should error handle this somehow.
			}
		});		
	}
}

var rollbacks = {
	'joinRb': function(gameId, paddedEmail) {

	}
}