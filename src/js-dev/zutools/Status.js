ZUTOOLS.Status = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.states = new Array();

	this.addStates( 4 );

	this.activate( 0 );

};

ZUTOOLS.Status.prototype = {

	constructor: ZUTOOLS.Status,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height - 110 + 'px';
		this.div.style.left = width - 260 + 'px';

	},

	addStates: function ( n ) {

		for ( var i = 0; i < n; i++ ) {

			var state = document.createElement( 'div' );
			state.setAttribute( 'class', 'stat' );
			this.div.appendChild( state );
			this.states.push( state );

		}

	},

	activate: function ( n ) {

		for ( var i = 0; i < this.states.length; i++ ) {

			this.states[ i ].setAttribute( 'class', 'stat' );

		};

		this.states[ n ].setAttribute( 'class', 'stat statActive' );

	},

	setStateText: function ( i, text ) {

		this.states[ i ].innerHTML = text;

	}

};

