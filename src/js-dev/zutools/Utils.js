ZUTOOLS.Utils = {

	XML:   'http://www.w3.org/XML/1998/namespace',
	SVG:   'http://www.w3.org/2000/svg',
	XLink: 'http://www.w3.org/1999/xlink',

	loadXML: function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, false );
		request.setRequestHeader( 'Content-Type', 'text/xml' );
		request.send( '' );

		return request.responseXML;

	}

};

