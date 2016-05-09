ZUSE.XMLUtils = {

	loadXML: function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, false );
		request.setRequestHeader( 'Content-Type', 'text/xml' );
		request.send( '' );

		return request.responseXML;

	}

};

