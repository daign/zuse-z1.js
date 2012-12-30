ZUSE.GUI.Tool = function ( parent, y ) {

	var self = this;

	this.use = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.use.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', '#tool' );
	this.use.setAttribute( 'transform', 'scale(' + 128/26 + ')' );
	this.use.setAttribute( 'class', 'gate' );
	this.use.setAttribute( 'x', 1 );
	this.use.setAttribute( 'y', y );
	parent.svg.appendChild( this.use );

};

ZUSE.GUI.Tool.prototype = {

	constructor: ZUSE.GUI.Tool,

	setSize: function ( width ) {

		this.use.setAttribute( 'transform', 'scale(' + width/26 + ')' );

	}

};

