var responsehelper = { 
	handleBadRequest: function(res) {
		res.statusCode = 400;
		res.end();
	}
}

module.exports = responsehelper;