var paths = require('../../paths'),
	ldhandler = require(paths.datahandler + '/location'),
	locutil = require('./util/locationutil'),
	responseservice = require(paths.service + '/response/responseservice');

function handleBadRequest(res) {
	res.statusCode = 400;
	res.end();
}

var controller = {
	'update': function(req, res) {
		if(!locutil.validateLocationUpdate(req.body)) {
			handleBadRequest(res);
			return;
		}

		res.end();
	}
};

module.exports = controller;