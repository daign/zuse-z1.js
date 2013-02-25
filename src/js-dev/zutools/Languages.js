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

		var file = this.config.versions[ shortcut ] + '.xml';

		this.textStore = new Object();
		this.fillStore( this.config.path + file, this.textStore );
		this.textStore.logic[ 1 ] = ZUTOOLS.Utils.loadXML( 'projects/adder/circuit.svg' ).lastChild;

		this.toolStore = new Object();
		this.fillStore( 'images/icons/languages/' + file, this.toolStore, true );

	},

	fillStore: function ( file, store, titleOnly ) {

		var dom = ZUTOOLS.Utils.loadXML( file ).lastChild.lastElementChild;

		for ( var i = 0; i < dom.childElementCount; i++ ) {

			var node = dom.children[ i ];
			var id = node.id;

			store[ id ] = [ node.children[ 0 ].innerHTML ];

			if ( !titleOnly ) {

				for ( var j = 1; j < node.childElementCount; j++ ) {
					store[ id ].push( node.children[ j ] );
				}

			}

		}

	},

	get: function ( id, n ) {

		if ( n ) {

			return this.textStore[ id ][ n ];

		}

		return this.textStore[ id ];

	},

	getTool: function ( id ) {

		return this.toolStore[ id ][ 0 ];

	}

};

