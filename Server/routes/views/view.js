var paths = require( '../../paths'),
	controller = require( paths.controllers + '/view/viewcontroller');

function init( app ) {
	app.get( '/', controller.home );
	app.get( '/home', controller.home );
	app.get( '/*', controller.notfound );
};

exports.init = init;