var responseBuilder = {
	buildJoinMsg: function(type, description) {
		var message = {};

		message.type = type;
		message.description = description;

		return message;
	},
	buildBroadcastMsg: function(type, msg) {
		var message = {};

		message.type = type;
		message.message = msg;

		return message;
	}
}

module.exports = responseBuilder;