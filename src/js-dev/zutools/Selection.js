ZUTOOLS.Selection = function ( options, selected, onchange ) {

	var self = this;
	this.selected = selected;
	this.onchange = onchange;

	this.domNode = document.createElement( 'div' );
	this.buttons = new Object();

	for ( var i in options ) {

		( function () {

			var id = i;
			var callback = function () {
				self.onselect( id );
			};

			var button = new ZUTOOLS.Button( options[ i ], callback );
			self.buttons[ id ] = button;
			self.domNode.appendChild( button.domNode );

			if ( i === selected ) { button.select(); }

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

