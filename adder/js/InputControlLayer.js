ZUSE.InputControlLayer = function () {

	this.namedElements = new Object();

	this.addInput( [ 'In', 'A0' ], [ '1', '?', '?', '0' ],    4 );
	this.addInput( [ 'In', 'A1' ], [ '1', '?', '?', '0' ],    4 );
	this.addInput( [ 'In', 'A2' ], [ '1', '?', '?', '0' ],    4 );
	this.addInput( [ 'In', 'A3' ], [ '1', '?', '?', '0' ],    4 );
	this.addInput( [ 'In', 'B0' ], [ '0', '1', '?', '?' ],    4 );
	this.addInput( [ 'In', 'B1' ], [ '0', '1', '?', '?' ],    4 );
	this.addInput( [ 'In', 'B2' ], [ '0', '1', '?', '?' ],    4 );
	this.addInput( [ 'In', 'B3' ], [ '0', '1', '?', '?' ],    4 );

	this.addInput( [ 'In', 'F0' ], [ '0', '?', '?', '1' ],    1 );

	this.addInput( [ 'In', 'K0' ], [ '1', '0', '?', '?' ], null );
	this.addInput( [ 'In', 'K1' ], [ '1', '0', '?', '?' ], null );
	this.addInput( [ 'In', 'K2' ], [ '1', '0', '?', '?' ], null );
	this.addInput( [ 'In', 'K3' ], [ '1', '0', '?', '?' ], null );

	this.addInput( [ 'In', 'F4' ], [ '0', '?', '?', '1' ], null );

};

ZUSE.InputControlLayer.prototype = {

	constructor: ZUSE.InputControlLayer,

	addInput: function ( name, values, activeTact ) {

		this.namedElements[ name[ 1 ] ] = new ZUSE.InputElement( name, values, activeTact );

	},

	updateButtonState: function ( tact ) {

		for ( a in this.namedElements ) {

			this.namedElements[ a ].updateButtonState( tact );

		}

	}

};

