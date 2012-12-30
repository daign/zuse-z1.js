ZUSE.GUI.Toolbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#3d9ecb';
	this.div.style.color = '#FFF';
	document.body.appendChild( this.div );


	this.svg = document.createElementNS( ZUSE.SVGUtils.NS, 'svg' );
	this.svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
	this.div.appendChild( this.svg );

	this.svg.appendChild( ZUSE.XMLUtils.loadXML( 'js-dev/gui/tool.svg' ).documentElement.firstElementChild.nextElementSibling );

	this.tools = new Array();

};

ZUSE.GUI.Toolbar.prototype = {

	constructor: ZUSE.GUI.Toolbar,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';

		for ( var i = 0; i < this.tools.length; i++ ) {

			this.tools[ i ].setSize( width );

		}

	},

	addTool: function ( y ) {

		this.tools.push( new ZUSE.GUI.Tool( this, y ) );

	}

};

