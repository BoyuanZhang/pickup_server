var paths = require('../../../paths'),
	adhandler = require(paths.datahandler + '/account/accounts'),
	accutil = require('../util/account/accountutil'),
	auth = require(paths.security + '/auth'),
	responseservice = require(paths.service + '/response/responseservice'),
	responsehelper = require(paths.controllers + '/services/helper/responsehelper');

var controller = {
	'signup': function(req, res) {
		if(!accutil.validateRegisterReq(req.body)) {
			responsehelper.handleBadRequest(res);
			return;
		}

		registerObj = req.body;
		var facebookuser = (registerObj.facebookuser === 'true') ? 'true' : 'false';
		adhandler.emailExists(registerObj.email, facebookuser, function(exists) {
			var data = {}, ret;
			if(!exists) {
				adhandler.registerUser(registerObj, function(success) {
					if(success) {
						data.userCreated = success;
						data.authtoken = auth.generateToken(registerObj.email, facebookuser);
					}
					else {
						data.userCreated = false;
					}
					ret = responseservice.buildBasicResponse(data);
					res.json(ret);
				});
			}
			else {
				data.userCreated = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		});
	},
	'login': function(req, res) {
		if(!accutil.validateLoginReq(req.body)) {
			responsehelper.handleBadRequest(res);
			return;
		}
		
		var loginObj = req.body;
		var facebookuser = (loginObj.facebookuser === 'true') ? 'true': 'false';
		adhandler.loginUser(loginObj, facebookuser, function(authenticated) {
			var data = {}, ret;
			if(authenticated) {
				data.authenticated = true;
				data.authtoken = auth.generateToken(loginObj.email, facebookuser);
			}
			else {
				data.authenticated = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'emailexist': function(req, res) {
		if(!accutil.validateExistReq(req.body)) {
			responsehelper.handleBadRequest(res);
			return;
		}
		
		var facebookuser = (req.body.facebookuser === 'true') ? 'true' : 'false';
		adhandler.emailExists(req.body.email, facebookuser, function(exists) { 
			var data = {}, ret;	
			if(exists) {
				data.exists = true;
			}
			else {
				data.exists = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});		
	},
	'findLobbies': function(req, res) {
		var query = req.query, paddedEmail = auth.getPaddedEmailFromQuery(query);
		adhandler.findAccount(paddedEmail, function(success, doc) {
			var data = {}, ret;	
			if(success && doc) {
				data.found = true;
				data.lobbies = doc.lobbies;
			} else {
				data.found = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'findCreatedGames': function(req, res) {
		var query = req.query, paddedEmail = auth.getPaddedEmailFromQuery(query);
		adhandler.findAccount(paddedEmail, function(success, doc) {
			var data = {}, ret;	
			if(success && doc) {
				data.found = true;
				data.createdGames = doc.createdGames;
			} else {
				data.found = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		});
	},
	'addCreatedGame': function(gameId, paddedEmail, callback) {
		if(!accutil.validateAddCreatedGame(gameId, paddedEmail)) {
			callback(false);
			return;
		}

		adhandler.addCreatedGame(gameId, paddedEmail, function(success) {
			callback(success);
		});
	},
	'addLobby': function(lobbyId, paddedEmail, callback) {
		if(!accutil.validateAddLobby(lobbyId, paddedEmail)) {
			callback(false);
			return;
		}

		adhandler.addLobby(lobbyId, paddedEmail, function(success) {
			callback(success);
		});
	},
	'removeLobby': function(lobbyId, paddedEmail, callback) {
		if(!accutil.validateRemoveLobby(lobbyId, paddedEmail)) {
			callback(false);
			return;
		}

		adhandler.removeLobby(lobbyId, paddedEmail, function(success) {
			callback(success);
		});
	},
	'removeLobbies': function(lobbyId, lobbyUsers, callback) {
		if(!accutil.validateRemoveLobbies(lobbyId, lobbyUsers)) {
			callback(false);
			return;
		}

		adhandler.removeLobbies(lobbyId, lobbyUsers, function(success) {
			callback(success);
		});
	},
	'removeCreatedGame': function(gameId, creatorEmail, callback) {
		if(!accutil.validateRemovedCreatedGame(gameId, creatorEmail)) {
			callback(false);
			return;
		}

		adhandler.removeCreatedGame(gameId, creatorEmail, function(success) {
			callback(success);
		});
	}
};

module.exports = controller;