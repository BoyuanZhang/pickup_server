var paths = require('../../../paths'),
	gdhandler = require(paths.datahandler + '/location/game'),
	gameutil = require('../util/location/gameutil'),
	responseservice = require(paths.service + '/response/responseservice');

function handleBadRequest(res) {
	res.statusCode = 400;
	res.end();
}

var controller = {
	'create': function(req, res) {
		if(!gameutil.validateGameCreate(req.body)) {
			handleBadRequest(res);
			return;
		}

		res.end();
	}
};

module.exports = controller;