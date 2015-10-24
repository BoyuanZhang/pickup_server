var responseBuilder = {
	buildJoinMsg: function(type, description){
		var message = {};

		message.type = type;
		message.description = description;

		return message;
	}
}

module.exports = responseBuilder;