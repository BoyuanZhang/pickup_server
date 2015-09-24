var paths = require('../../paths'),
	adhandler = require(paths.datahandler + '/accounts'),
	accutil = require('./util/accountutil'),
	auth = require(paths.security + '/auth'),
	responseservice = require(paths.service + '/response/responseservice');

function handleBadRequest(res) {
	res.statusCode = 400;
	res.end();
}

var controller = {
	'signup': function(req, res) {
		if(!accutil.validateRegisterReq(req.body)) {
			handleBadRequest(res);
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
						ret = responseservice.buildBasicResponse(data);
						res.json(ret);
					}
					else {
						data.userCreated = false;
						ret = responseservice.buildBasicResponse(data);
						res.json(ret);
					}
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
			handleBadRequest(res);
			return;
		}
		
		var loginObj = req.body;
		var facebookuser = (loginObj.facebookuser) ? loginObj.facebookuser : 'false';
		adhandler.loginUser(loginObj, facebookuser, function(authenticated) {
			var data = {}, ret;
			if(authenticated) {
				data.authenticated = true;
				data.authtoken = auth.generateToken(loginObj.email, facebookuser);
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
			else {
				data.authenticated = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		});
	},
	'emailexist': function(req, res) {
		if(!accutil.validateExistReq(req.body)) {
			handleBadRequest(res);
			return;
		}
		
		var facebookuser = (req.body.facebookuser) ? req.body.facebookuser : 'false';
		adhandler.emailExists(req.body.email, facebookuser, function(exists) { 
			var data = {}, ret;	
			if(exists) {
				data.exists = true;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
			else {
				data.exists = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		});		
	}
};

module.exports = controller;