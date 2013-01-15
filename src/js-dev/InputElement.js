ZUSE.InputElement = function ( name, values, activeTact ) {

	this.name = name;
	this.values = values;
	this.activeTact = activeTact;

	this.position = 0;

};

ZUSE.InputElement.prototype = {

	constructor: ZUSE.InputElement,

	move: function ( tact, value ) {},

	setHighlight: function ( bool ) {},

	changePosition: function ( tact ) {

		var p = this.position + 1;

		if ( p === tact ) {

			this.position = p % 4;

		} else if ( ( p % 4 ) + 1 === tact ) {

			this.position = ( p + 2 ) % 4;

		} else {

			console.warn( 'Unable to change position of' + this.name + '.' );

		}

		this.setButtonValue();

	},

	changePositionBack: function ( tact ) {

		var p = this.position;

		if ( p === ( tact % 4 ) ) {

			this.position = ( p + 3 ) % 4;

		} else if ( p === ( tact + 1 ) % 4 ) {

			this.position = ( p + 1 ) % 4;

		} else {

			console.warn( 'Unable to change position of ' + this.name + '.' );

		}

		this.setButtonValue();

	},

	updateButtonState: function ( tact ) {

		document.getElementById( 'Button' + this.name[ 1 ] ).disabled = this.evaluateState( tact );

		if ( SIMULATION.inputs[ this.name[ 1 ] ] ) {

			SIMULATION.inputs[ this.name[ 1 ] ].setInput( !this.evaluateState( tact ) );

		} // else { console.log( this.name[ 1 ] + ' does not exist in new input control' ); }

	},

	evaluateState: function ( tact ) {

		if ( this.activeTact !== null ) {

			return ( tact === this.activeTact ) ? false : true;

		} else {

			return true;

		}

	},

	setButtonValue: function () {

		var value = this.values[ this.position ];

		document.getElementById( 'Button' + this.name[ 1 ] ).value = value;

		if ( SIMULATION.inputs[ this.name[ 1 ] ] ) {

			SIMULATION.inputs[ this.name[ 1 ] ].setText( value );

		} else { console.log( this.name[ 1 ] + ' does not exist in new input control' ); }


	}

};

