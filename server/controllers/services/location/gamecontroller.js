var paths = require('../../../paths'),
	gdhandler = require(paths.datahandler + '/location/game'),
	gameutil = require('../util/location/gameutil'),
	sessionHandler = require(paths.security + '/sessionhandler'),
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

		var createObj = req.body, 
			userContext = sessionHandler.getUserContext(req),
			//[BZ] TODO: abstract this fbPrefixStr so we can use it across the server
			fbPrefixStr = (userContext.facebookuser) ? "fbusr-" : "usr-"; 

		createObj.creator = fbPrefixStr + userContext.email;

		gdhandler.isCreateAllowed(createObj.creator, createObj.game, function(allowed) {
			var data = {}, ret;
			if(allowed) {
				gdhandler.createGame(createObj, function(success) {
					if(success) {
						data.gameCreated = true;
						ret = responseservice.buildBasicResponse(data);
						res.json(ret);	
					}
					else {
						data.gameCreated = false;
						ret = responseservice.buildBasicResponse(data);
						res.json(ret);						
					}
				})
			}
			else {
				data.gameCreated = false;
				ret = responseservice.buildBasicResponse(data);
				res.json(ret);
			}
		});

		res.end();
	}
};

module.exports = controller;