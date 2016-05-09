ZUTOOLS.Tabbar = function ( config ) {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.tabs = new Object();

	for ( var i = 0; i < config.length; i++ ) {

		this.tabs[ config[ i ] ] = new ZUTOOLS.Tab( this );

	}

};

ZUTOOLS.Tabbar.prototype = {

	constructor: ZUTOOLS.Tabbar,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height + 'px';
		this.div.style.left = left + 10 + 'px';
		this.setConsecutiveSize();

	},

	setConsecutiveSize: function () {

		var left = 0;
		for ( var i in this.tabs ) {
			left = this.tabs[ i ].setPosition( left );
		}

	},

	closeAll: function () {

		for ( var i in this.tabs ) {

			this.tabs[ i ].close();

		};

	}

};

