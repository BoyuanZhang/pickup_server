var viewController = {
	'home' : function( req, res ) {
		res.send('Hello World!');
	},
	'notfound' : function( req, res ) {
		res.status(404).send('404 error, resource not found!');
	}
};

module.exports = viewController;