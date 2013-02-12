ZUTOOLS.Tabbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.tabs = new Array();

};

ZUTOOLS.Tabbar.prototype = {

	constructor: ZUTOOLS.Tabbar,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height + 'px';
		this.div.style.left = left + 10 + 'px';

		var left = 0;

		for ( var i = 0; i < this.tabs.length; i++ ) {

			left = this.tabs[ i ].setPosition( left );

		}

	},

	addTab: function ( title, content ) {

		var tab = new ZUTOOLS.Tab( this, title, content );
		this.tabs.push( tab );

	},

	closeAll: function () {

		for ( var i = 0; i < this.tabs.length; i++ ) {

			this.tabs[ i ].close();

		};

	}

};

