var paths = require('../../paths'),
	adhandler = require(paths.datahandler + '/accounts'),
	accutil = require('./util/accountutil'),
	auth = require(paths.security + '/auth');

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
			var ret = {}; 
			if(!exists) {
				adhandler.registerUser(registerObj, function(success) {
					if(success) {
						ret.userCreated = success;
						ret.authtoken = auth.generateToken(registerObj.email);
						res.json(ret);
					}
					else {
						ret.userCreated = false;
						res.json(ret);
					}
				});
			}
			else {
				ret.userCreated = false;
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
			var ret = {}; 
			if(authenticated) {
				ret.authenticated = true;
				ret.authtoken = auth.generateToken(loginObj.email);
				res.json(ret);
			}
			else {
				ret.authenticated = false;
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
			if(exists) 
				res.json( {'exists': 'true'});
			else 
				res.json({'exists':'false'});
		});		
	}
};

module.exports = controller;