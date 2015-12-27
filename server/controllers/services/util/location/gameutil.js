function validLat(num){
    if ( num && !isNaN(num) && (num >= -90) && (num <= 90) ){
        return true;
    } else {
        return false;
    };
}

function validLng(num){
    if ( num && !isNaN(num) && (num >= -180) && (num <= 180) )
        return true;

   	return false;

}

function validRadius(num){
	if( num && !isNaN(num) && num >=0 && num < 100 )
		return true;

	return false;
}

var gameutil = {
	validateGameCreate: function(body) {
		if(body.game && body.location) {
			var location = body.location;
			if(validLat(location.latitude) && validLng(location.longitude))
				return true;
		}
		return false;
	},

	validateGameFind: function(body) {
		var location = body.location;

		if(location && validLat(location.latitude) && validLng(location.longitude) && validRadius(body.radius))
			return true;

		return false;
	},

	validateDestroy: function(body) {
		if(body.gameId) { return true; }

		return false;
	},

	validateFindGame: function(body) {
		if(body.gameId) { return true; }

		return false;
	}
};

module.exports = gameutil;