var viewController = require( '../controller/view');

var views = function( app ) {
	app.get( '/', viewController.home );
	app.get( '/*', viewController.notfound );
};

module.exports = views;