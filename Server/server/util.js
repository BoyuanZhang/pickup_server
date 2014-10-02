var util = {
	'validString' : function( str ) {
		var valid = false; 
		if( str )
			if( str.trim() != "" )
				valid = true;
		return valid;
	}
}

module.exports = util;