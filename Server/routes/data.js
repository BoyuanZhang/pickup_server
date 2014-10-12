var dataController = require( '../controller/data');

var data = function(app){
	app.post( '/users/signup', dataController.signup );
	app.post( '/users/login', dataController.login );
	app.post( '/users/exist', dataController.userExists );
};

module.exports = data;
