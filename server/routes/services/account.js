var paths = require('../../paths'),
	controller = require(paths.controllers + '/services/account/accountcontroller');

function init(app){
	app.post('/services/account/signup', controller.signup);
	app.post('/services/account/login', controller.login);
	app.post('/services/account/emailexist', controller.emailexist);
};

exports.init = init;
