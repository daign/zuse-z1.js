ZUTOOLS.Languages = function ( config ) {

	this.config = config;
	this.setLanguage( this.getShortcutFromURL() );

};

ZUTOOLS.Languages.prototype = {

	constructor: ZUTOOLS.Languages,

	getShortcutFromURL: function () {

		var match = window.location.search.match( /(?:lang=)([a-z]{2})/ );

		return ( match && match[ 1 ] ) ? match[ 1 ] : null;

	},

	setLanguage: function ( shortcut ) {

		if ( !this.config.versions[ shortcut ] ) {
			shortcut = this.config.standard;
		}

		var file = this.config.versions[ shortcut ];
		var fileContent = ZUTOOLS.Utils.loadXML( this.config.path + file + '.xml' );

		var body = fileContent.lastChild.lastElementChild;
		this.store = new Object();

		for ( var i = 0; i < body.childElementCount; i++ ) {

			var array = new Array();
			array.push( body.children[ i ].children[ 0 ].innerHTML );
			for ( var j = 1; j < body.children[ i ].childElementCount; j++ ) {
				array.push( body.children[ i ].children[ j ] );
			}
			this.store[ body.children[ i ].id ] = array;

		}

		this.store.logic[ 1 ] = ZUTOOLS.Utils.loadXML( 'projects/adder/circuit.svg' ).lastChild;

	},

	get: function ( id, n ) {

		if ( n ) {

			return this.store[ id ][ n ];

		}

		return this.store[ id ];

	}

};

