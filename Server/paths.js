var path = require( 'path' ),
	root = path.resolve( __dirname + '/../');

var paths = {
	root: root,
	controllers: root + '/server/controllers',
	service: root + '/server/service',
	datahandler: root + '/server/datahandler',
	model: root + '/server/model',
	security: root + '/server/security'
};

module.exports = paths;