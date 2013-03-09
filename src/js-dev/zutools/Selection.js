ZUTOOLS.Selection = function ( settings ) {

	var self = this;
	this.selected = settings.selected;
	this.onchange = settings.onchange;

	this.domNode = document.createElement( 'div' );
	this.domNode.style.paddingTop = '10px';
	this.buttons = new Object();

	for ( var i in settings.options ) {

		( function () {

			var id = i;
			var callback = function () {
				self.onselect( id );
			};

			var button = new ZUTOOLS.Button( { text: settings.options[ i ], onclick: callback } );
			self.buttons[ id ] = button;
			self.domNode.appendChild( button.domNode );

			if ( i === self.selected ) { button.select(); }

		} )();

	}

};

ZUTOOLS.Selection.prototype = {

	constructor: ZUTOOLS.Selection,

	deselectAll: function () {

		for ( var i in this.buttons ) {
			this.buttons[ i ].select( false );
		}

	},

	onselect: function ( id ) {

		if ( id !== this.selected ) {

			this.selected = id;
			this.deselectAll();
			this.buttons[ id ].select();
			this.onchange( id );

		}

	}

};

