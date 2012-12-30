ZUSE.GUI.Tool = function ( parent, icon, fooX ) {

	var self = this;

	parent.svg.appendChild( ZUSE.XMLUtils.loadXML( 'images/' + icon + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.g = document.createElementNS( ZUSE.SVGUtils.NS, 'g' );
	this.g.setAttribute( 'transform', 'scale(' + 128/26 + ')' );
	this.g.setAttribute( 'class', 'gate' );
	parent.svg.appendChild( this.g );

	this.use = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.use.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', '#tool' );
	this.g.appendChild( this.use );

	this.icon = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.icon.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', '#' + icon );
	this.icon.setAttribute( 'fill', '#f5f3e5' );
	this.g.appendChild( this.icon );

	this.g.addEventListener( 'click', fooX, false );

};

ZUSE.GUI.Tool.prototype = {

	constructor: ZUSE.GUI.Tool,

	setSize: function ( width, x, y ) {

		this.g.setAttribute( 'transform', 'scale(' + width/26 + ') translate(' + x + ',' + y + ')' );

	}

};

