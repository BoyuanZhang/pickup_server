var dataController = require( '../controller/data');

var data = function(app){
	app.post( '/users/signup', dataController.signup );
	app.post( '/users/login', dataController.login );
};

module.exports = data;
