ZUSE.SVG.CircuitElement = function ( node, params ) {

	this.ref = SIMULATION.gui.circuit.getElementById( node.getAttribute( 'ref' ) );
	this.workPosition = undefined;

	if ( node.childElementCount > 0 ) {
		var anim = node.firstElementChild;
		this.workPosition = parseInt( anim.getAttribute( 'position' ) );
	}

};

ZUSE.SVG.CircuitElement.prototype = {

	constructor: ZUSE.SVG.CircuitElement,

	setHighlight: function ( bool ) {

		//this.ref.style.stroke = bool ? '#f83610' : 'black';
		//this.ref.style.fill = bool ? '#f83610' : 'black';
		//this.ref.style.strokeWidth = bool ? 3 : 1.5;

	},

	_setHighlight: function ( bool ) {

		this.ref.style.stroke = bool ? '#f83610' : 'black';
		this.ref.style.fill = bool ? '#f83610' : 'black';
		this.ref.style.strokeWidth = bool ? 3 : 1.5;

	},

	antiHighlight: function ( bool ) {

		this.ref.style.stroke = bool ? '#999' : 'black';
		this.ref.style.fill = bool ? '#999' : 'black';

	},


	setPosition: function ( position ) {

		if ( this.workPosition === position ) {
			this._setHighlight( true );
		} else {
			this._setHighlight( false );
		}

	},

	failedToChange: function ( position ) {

		this.antiHighlight( true );

/*		if ( this.workPosition === position ) {
			this._setHighlight( true );
		} else {
			this._setHighlight( false );
		}*/

	}

};

