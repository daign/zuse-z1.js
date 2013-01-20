ZUSE.GUI.Status = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.states = new Array();

	this.addState( '1. Eingabe' );
	this.addState( '2. Überträge berechnen' );
	this.addState( '3. Ergebnis berechnen' );
	this.addState( '4. Zurücksetzen' );

	this.activate( 0 );

};

ZUSE.GUI.Status.prototype = {

	constructor: ZUSE.GUI.Status,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height - 110 + 'px';
		this.div.style.left = width - 260 + 'px';

	},

	addState: function ( text ) {

		var state = document.createElement( 'div' );
		state.innerHTML = text;
		state.setAttribute( 'class', 'stat' );
		this.div.appendChild( state );
		this.states.push( state );

	},

	activate: function ( n ) {

		for ( var i = 0; i < this.states.length; i++ ) {

			this.states[ i ].setAttribute( 'class', 'stat' );

		};

		this.states[ n ].setAttribute( 'class', 'stat statActive' );

	}

};
