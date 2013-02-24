ZUTOOLS.Tabbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.tabs = new Object();

};

ZUTOOLS.Tabbar.prototype = {

	constructor: ZUTOOLS.Tabbar,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height + 'px';
		this.div.style.left = left + 10 + 'px';

		var left = 0;

		for ( var i in this.tabs ) {

			left = this.tabs[ i ].setPosition( left );

		}

	},

	addTab: function ( name ) {

		var tab = new ZUTOOLS.Tab( this );
		this.tabs[ name ] = tab;

	},

	closeAll: function () {

		for ( var i in this.tabs ) {

			this.tabs[ i ].close();

		};

	}

};

