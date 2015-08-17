var paths = require('../../paths'),
	ldhandler = require(paths.datahandler + '/location'),
	locutil = require('./util/locationutil'),
	responseservice = require(paths.service + '/response/responseservice');

function handleBadRequest(res) {
	res.statusCode = 400;
	res.end();
}

var controller = {
	'create': function(req, res) {
		if(!locutil.validateGameCreate(req.body)) {
			handleBadRequest(res);
			return;
		}

		res.end();
	}
};

module.exports = controller;