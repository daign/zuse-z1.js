ZUTOOLS.Tool = function ( parent, icon, events, activatable, tooltip ) {

	var self = this;

	this.activatable = activatable;
	this.activated = false;
	this.disabled = false;
	this.events = events;

	parent.svg.appendChild( ZUTOOLS.Utils.loadXML( 'images/icons/' + icon + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.group = document.createElementNS( ZUTOOLS.Utils.SVG, 'g' );
	this.group.setAttribute( 'class', 'tool' );
	parent.svg.appendChild( this.group );

	var title = document.createElementNS( ZUTOOLS.Utils.SVG, 'title' );
	var titleText = document.createTextNode( tooltip );
	title.appendChild( titleText );
	this.group.appendChild( title );

	this.rectangle = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.rectangle.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tool' );
	this.group.appendChild( this.rectangle );

	this.icon = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.icon.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#' + icon );
	this.icon.setAttribute( 'fill', '#f5f3e5' );
	this.icon.setAttribute( 'stroke', 'none' );
	this.group.appendChild( this.icon );

	this.tick = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.tick.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tick' );
	this.tick.setAttribute( 'class', 'tick' );
	this.tick.style.visibility = 'hidden';
	this.group.appendChild( this.tick );

	this.group.addEventListener( 'click', onClick, false );

	if ( events.mouseover ) { this.group.addEventListener( 'mouseover', events.mouseover, false ); }
	if ( events.mouseout )  { this.group.addEventListener( 'mouseout',  events.mouseout,  false ); }

	function onClick() {

		if ( self.disabled ) { return; }
		if ( self.activatable ) { self.switchActivation(); }
		self.events.click();

	}

};

ZUTOOLS.Tool.prototype = {

	constructor: ZUTOOLS.Tool,

	setSize: function ( width, x, y ) {

		this.group.setAttribute( 'transform', 'scale(' + width/24 + ') translate(' + x + ',' + y + ')' );

	},

	switchActivation: function () {

		this.activated = !this.activated;
		this.showActivation( this.activated );

		return this;

	},

	showActivation: function ( b ) {

		this.tick.style.visibility = b ? 'visible' : 'hidden';

	},

	disable: function ( b ) {

		this.disabled = ( b === undefined ) ? true : b;
		this.group.setAttribute( 'class', this.disabled ? 'toolDisabled' : 'tool' );
		this.tick.setAttribute(  'class', this.disabled ? 'tickDisabled' : 'tick' );

	}

};

