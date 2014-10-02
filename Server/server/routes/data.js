var dataController = require( '../controller/data');

var data = function(app){
	app.post( '/signup', dataController.signup );
	app.post( '/login', dataController.login );
};

module.exports = data;
