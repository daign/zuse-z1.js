ZUSE.GUI.Tool = function ( parent, icon, fooX, activatable ) {

	var self = this;

	this.activatable = activatable;
	this.activated = false;
	this.disabled = false;
	this.action = fooX;

	parent.svg.appendChild( ZUSE.XMLUtils.loadXML( 'images/icons/' + icon + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.group = document.createElementNS( ZUSE.SVGUtils.NS, 'g' );
	this.group.setAttribute( 'class', 'tool' );
	parent.svg.appendChild( this.group );

	this.rectangle = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.rectangle.setAttributeNS( ZUSE.SVGUtils.XLink, 'href', '#tool' );
	this.group.appendChild( this.rectangle );

	this.icon = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.icon.setAttributeNS( ZUSE.SVGUtils.XLink, 'href', '#' + icon );
	this.icon.setAttribute( 'fill', '#f5f3e5' );
	this.icon.setAttribute( 'stroke', 'none' );
	this.group.appendChild( this.icon );

	this.tick = document.createElementNS( ZUSE.SVGUtils.NS, 'use' );
	this.tick.setAttributeNS( ZUSE.SVGUtils.XLink, 'href', '#tick' );
	this.tick.setAttribute( 'class', 'tick' );
	this.tick.style.visibility = 'hidden';
	this.group.appendChild( this.tick );

	this.group.addEventListener( 'click', onClick, false );

	function onClick() {

		if ( self.disabled ) { return; }
		if ( self.activatable ) { self.switchActivation(); }
		self.action();

	}

};

ZUSE.GUI.Tool.prototype = {

	constructor: ZUSE.GUI.Tool,

	setSize: function ( width, x, y ) {

		this.group.setAttribute( 'transform', 'scale(' + width/26 + ') translate(' + x + ',' + y + ')' );

	},

	switchActivation: function () {

		this.activated = !this.activated;
		this.setActivation( this.activated );

	},

	setActivation: function ( boolean ) {

		this.tick.style.visibility = boolean ? 'visible' : 'hidden';

	},

	disable: function ( boolean ) {

		this.disabled = ( boolean === undefined ) ? true : boolean;
		this.group.setAttribute( 'class', this.disabled ? 'toolDisabled' : 'tool' );

	}

};

