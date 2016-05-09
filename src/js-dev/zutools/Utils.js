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

	},

	loadJSON: function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, false );
		request.setRequestHeader( 'Content-Type', 'application/json' );
		request.send( '' );

		return JSON && JSON.parse( request.responseText );

	},

	throttle: function ( callback, wait, context ) { // wait 60 = 16fps // wait 40 = 25fps // wait 20 = 50fps

		var execute = function () {
			callback.apply( context || callback, arguments );
			setTimeout( function () {
				if ( interrupts ) {
					interrupts = false;
					execute();
				} else {
					canrun = true;
				}
			}, wait );
		};

		var canrun = true;
		var interrupts = false;

		return function () {
			if ( !canrun ) {
				interrupts = true;
				return;
			} else {
				canrun = false;
				execute();
			}
		};

	}

};

