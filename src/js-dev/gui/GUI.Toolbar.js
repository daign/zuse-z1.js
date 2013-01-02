ZUSE.GUI.Toolbar = function () {

	this.width;
	this.height;

	this.div = document.createElement( 'div' );
	this.div.style.position   = 'absolute';
	this.div.style.top        = '0px';
	this.div.style.left       = '0px';
	this.div.style.background = '#3d9ecb';
	this.div.style.color      = '#FFF';
	document.body.appendChild( this.div );

	this.svg = document.createElementNS( ZUSE.SVGUtils.NS, 'svg' );
	this.svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink' );
	this.svg.setAttribute( 'width', '100%' );
	this.svg.setAttribute( 'height', '100%' );
	this.div.appendChild( this.svg );

/*	var myCircle = document.createElementNS( ZUSE.SVGUtils.NS, 'circle' );
	myCircle.setAttribute( "id",		"mycircle" );
	myCircle.setAttribute( "cx",		100 );
	myCircle.setAttribute( "cy",		100 );
	myCircle.setAttribute( "r",			100 );
	myCircle.setAttribute( "fill",		"red" );
	myCircle.setAttribute( "stroke",	"none" );
	this.svg.appendChild( myCircle );*/

	this.svg.appendChild( ZUSE.XMLUtils.loadXML( 'images/tool.svg' ).documentElement.firstElementChild.nextElementSibling );

	this.tools = new Array();

};

ZUSE.GUI.Toolbar.prototype = {

	constructor: ZUSE.GUI.Toolbar,

	setSize: function ( width, height ) {

		this.width = width;
		this.height = height;
		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';

		this.shuffle();

	},

	shuffle: function () {

		var n = this.tools.length;
		var a = this.height/this.width;
		var c = 1;
		while( Math.floor(a*c) < (n/c) ) {
			c++;
		}

		for ( var i = 0; i < this.tools.length; i++ ) {

			var x = 1 + 24 * (i%c);
			var y = 1 + 24 * Math.floor(i/c);
			var w = this.width/c;
			this.tools[ i ].setSize( w, x, y );

		}

	},

	addTool: function ( group, icon, foo, activatable ) {

		this.tools.push( new ZUSE.GUI.Tool( this, icon, foo, activatable ) );
		this.shuffle();

/*		if ( this.tools[ group ] === undefined ) {
			this.tools[ group ] = new Array();
		}
		this.tools[ group ].push( new ZUSE.GUI.Tool( this ) ); */

	}

};

