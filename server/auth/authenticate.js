var paths = require('../paths'),
	auth = require(paths.security + '/auth');

function authenticate(req, res, next) {
	var query = req.query, facebookuser;

	if( !validateReq(query) ) {
		res.statusCode = 400;
		res.end();
		return;
	}

	facebookuser = query.facebookuser ? query.facebookuser : false;

	if( auth.validateToken(query.email, query.authtoken, facebookuser))
		next();
	else {
		res.statusCode = 403;
		res.end();
	}
}

function validateReq(query) {
	if(!query || !query.email || !query.authtoken)
		return false;

	if(query.facebookuser && (query.facebookuser !== 'true' || query.facebookuser !== 'false'))
		return false;

	return true;
}

module.exports = authenticate;