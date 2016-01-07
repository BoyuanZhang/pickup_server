var paths = require('../../../paths'),
	gdhandler = require(paths.datahandler + '/location/game'),
	gameutil = require('../util/location/gameutil'),
	responseservice = require(paths.service + '/response/responseservice'),
	responsehelper = require(paths.controllers + '/services/helper/responsehelper'),
	lobbycontroller = require(paths.controllers + '/services/lobby/lobbycontroller'),
	accountcontroller = require(paths.controllers + '/services/account/accountcontroller'),
	auth = require(paths.security + '/auth');

var controller = {
	'create': function(req, res) {
		if(!gameutil.validateGameCreate(req.body)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var createObj = req.body, creatorEmail = auth.getPaddedEmailFromQuery(req.query);

		gdhandler.isCreateAllowed(creatorEmail, createObj.game, function(allowed) {
			var data = {}, ret;
			if(allowed) {
				gdhandler.createGame(creatorEmail, createObj, function(success, gameObj) {
					if(success) {
						callbacks.createCb(gameObj.gameId, creatorEmail, req, res);
					} else {
						data.gameCreated = false;
						ret = responseservice.buildBasicResponse(data);
						res.json(ret);			
					}	
				});
			}
			else {
				data.gameCreated = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		});
	},

	'find': function(req, res) {
		if(!gameutil.validateGameFind(req.body)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		var data = {}, ret;
		gdhandler.findGames(req.body, function(success, elements) {
			if(success && elements && elements.length > 0) {
				data.gamesFound = true;
				data.games = elements;
			}
			else {
				data.gamesFound = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},

	'destroy': function(req, res) {
		if(!gameutil.validateDestroy(req.body)) {
			responsehelper.handleBadRequest(res);
			return;			
		}

		var data = {}, ret, gameId = req.body.gameId, paddedEmail = auth.getPaddedEmailFromQuery(req.query);
		gdhandler.destroyGame(gameId, paddedEmail, function(success) {
			if(success) {
				data.gameDestroyed = true;
				callbacks.destroyCb(gameId, paddedEmail);
			}
			else {
				data.gameDestroyed = false;
			}

			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},

	'findGame': function(req, res) {
		if(!gameutil.validateFindGame(req.body)) {
			responsehelper.handleBadRequest(res);
			return;			
		}

		var data = {}, ret, gameId = req.body.gameId;
		gdhandler.findGame(gameId, function(success) {
			if(success && game) {
				data.gameFound = true;
				data.game = game;
			}
			else {
				data.gameFound = false;
			}

			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	}
};

module.exports = controller;

var callbacks = {
	'createCb': function(gameId, paddedEmail, req, res) {
		var lobbyCreated = null, userAddedToLobby = null, gameAddedToAccount = null, data = {}, ret;

		lobbycontroller.createLobby(gameId, paddedEmail, function(created) {
			if(!created) {
				failure();
			} else {
				lobbyCreated = true;
				lobbycontroller.addUserToLobby(gameId, paddedEmail, function(joined) {
					if(!joined) {
						failure();
					} else {
						userAddedToLobby = true;
						complete();
					}
				});
			}
		});

		accountcontroller.addCreatedGame(gameId, paddedEmail, function(joined) {
			if(!joined) {
				failure();
			} else {
				gameAddedToAccount = true;
				complete();
			}
		});

		function complete() {
			if(lobbyCreated && userAddedToLobby && gameAddedToAccount) {
				data.gameCreated = true;
				data.gameId = gameId;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		}

		function failure() {
			rollbacks.createRb(gameId, paddedEmail, lobbyCreated, gameAddedToAccount);
			data.gameCreated = false;
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		}
	},

	'destroyCb': function(gameId, paddedEmail) {
		lobbycontroller.destroyLobby(gameId, paddedEmail, function(destroyed) {
			if(!destroyed) {
				//[BZ] TODO: if lobby was not deleted we should error handle this somehow.
			}
		});		
	}
};

var rollbacks = {
	'createRb': function(gameId, paddedEmail, lobbyCreated, gameAddedToAccount) {
		gdhandler.destroyGame(gameId, paddedEmail, function(success) {
			if(!success) {
				//[BZ] TODO: if game is not destroyed we need to handle this error somehow.
			}
		});

		if(lobbyCreated) {
			lobbycontroller.removeLobby(gameId, paddedEmail, function(destroyed) {
				if(!destroyed) {
					//[BZ] TODO: if lobby is not deleted we need to handle this error somehow.
				}
			});
		}

		if(gameAddedToAccount) {
			accountcontroller.removeCreatedGame(gameId, paddedEmail, function(removed) {
				if(!removed) {
					//[BZ] TODO: if game is not removed from account's created list we need to handle this error somehow.					
				}
			});
		}
	}
}