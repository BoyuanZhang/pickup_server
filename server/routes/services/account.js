var paths = require('../../paths'),
	controller = require(paths.controllers + '/services/account/accountcontroller');

function init(app){
	app.post('/services/account/signup', controller.signup);
	app.post('/services/account/login', controller.login);
	app.post('/services/account/emailexist', controller.emailexist);
	app.get('/API/REST/1.0/account/findLobbies', controller.findLobbies);
	app.get('/API/REST/1.0/account/findCreatedLobbies', controller.findCreatedLobbies);
};

exports.init = init;
