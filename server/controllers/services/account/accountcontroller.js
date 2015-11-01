var paths = require('../../../paths'),
	adhandler = require(paths.datahandler + '/account/accounts'),
	accutil = require('../util/accountutil'),
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
		var facebookuser = (req.body.facebookuser) ? registerObj.facebookuser : 'false';
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
		var facebookuser = (loginObj.facebookuser) ? loginObj.facebookuser : 'false';
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
		
		var facebookuser = (req.body.facebookuser) ? req.body.facebookuser : 'false';
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
		var userEmail = auth.getUserEmailFromQuery(req.query);

		adhandler.findAccount(userEmail, function(success, doc) {
			var data = {}, ret;	
			if(success && doc) {
				data.found = true;
				data.lobbies = doc.lobbies;
			} else {
				data.found = false;
			}
			ret = responseservice.buildBasicResponse(data);
			res.json(ret);
		}) 
	},
	'addLobby': function(userEmail, lobbyId, callback) {
		if(!accutil.validateAddLobby(userEmail, lobbyId)) {
			callback(false);
			return;
		}

		adhandler.addLobby(userEmail, lobbyId, function(success) {
			callback(success);
		});
	},
	'removeLobby': function(userEmail, lobbyId, callback) {
		if(!accutil.validateRemoveLobby(userEmail, lobbyId)) {
			callback(false);
			return;
		}

		adhandler.removeLobby(userEmail, lobbyId, function(success) {
			callback(success);
		});
	}
};

module.exports = controller;