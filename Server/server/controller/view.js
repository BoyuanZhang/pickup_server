var viewController = {
	'home' : function( req, res ) {
		res.send('PickUp app server');
	},
	'notfound' : function( req, res ) {
		res.status(404).send('404 error, resource not found!');
	}
};

module.exports = viewController;