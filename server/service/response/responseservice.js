var service = {
	buildBasicResponse: function(data, errors, warnings) {
		var res = {};

		res.data = data;
		res.errors = errors ? errors : '';
		res.warnings = warnings ? warnings : '';

		return res;
	}
};

module.exports = service;