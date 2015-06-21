var paths = require('../../paths'),
	adhandler = require(paths.datahandler + '/accounts'),
	accutil = require('./util/accountutil');

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
		var facebookuser = (req.body.facebookuser) ? true : false;
		adhandler.emailExists(registerObj.email, facebookuser, function(exists) {
			var ret = {}; 
			if(!exists) {
				adhandler.registerUser(registerObj, function(success) {
					ret.userCreated = success;
					res.json(ret);
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
		var facebookuser = (req.body.facebookuser) ? true : false;
		adhandler.loginUser(req.body, facebookuser, function(authenticated) {
			var ret = {}; 
			if(authenticated) {
				ret.authenticated = true;
				res.json(ret);
			}
			else {
				ret.authenticated = false;
				res.json(ret);
			}
		});
	},
	'emailexist': function(req, res) {
		if(!req.body.email) {
			handleBadRequest(res);
			return;
		}
		
		var facebookuser = (req.body.facebookuser) ? true : false;
		adhandler.emailExists(req.body.email, facebookuser, function(exists) { 
			if(exists) 
				res.json( {'exists': 'true'});
			else 
				res.json({'exists':'false'});
		});		
	}
};

module.exports = controller;