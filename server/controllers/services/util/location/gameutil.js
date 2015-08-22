function validLat(num){
    if ( num && !isNaN(num) && (num >= -90) && (num <= 90) ){
        return true;
    } else {
        return false;
    };
}

function validLng(num){
    if ( num && !isNaN(num) && (num >= -180) && (num <= 180) ){
        return true;
    } else {
        return false;
    };
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
		if(body.location && body.radius) {
			var location = body.location;
			if(validLat(location.latitude) && validLng(location.longitude))
				return true;
		}
		return false;
	}
};

module.exports = gameutil;