ZUTOOLS.Tool = function ( param, popup, svg ) {

	var self = this;
	this.popup = popup;

	this.footext = '';
	this.activatable = param[ 2 ];
	this.activated = false;
	this.disabled = false;
	this.events = param[ 1 ];

	svg.appendChild( ZUTOOLS.Utils.loadXML( 'images/icons/' + param[ 0 ] + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.group = document.createElementNS( ZUTOOLS.Utils.SVG, 'g' );
	this.group.setAttribute( 'class', 'tool' );
	svg.appendChild( this.group );

	this.title = document.createElementNS( ZUTOOLS.Utils.SVG, 'title' );
	this.group.appendChild( this.title );

	this.rectangle = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.rectangle.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tool' );
	this.group.appendChild( this.rectangle );

	this.icon = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.icon.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#' + param[ 0 ] );
	this.icon.setAttribute( 'class', 'icon' );
	this.group.appendChild( this.icon );

	this.tick = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.tick.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tick' );
	this.tick.setAttribute( 'class', 'tick' );
	this.tick.style.visibility = 'hidden';
	this.group.appendChild( this.tick );

	this.group.addEventListener( 'click', onClick, false );

	if ( this.events.mouseover ) { this.group.addEventListener( 'mouseover', this.events.mouseover, false ); }
	if ( this.events.mouseout )  { this.group.addEventListener( 'mouseout',  this.events.mouseout,  false ); }

	function onClick() {

		if ( self.disabled ) { return; }
		if ( self.activatable ) { self.switchActivation(); }
		self.events.click();

	}

	this.group.addEventListener( 'mouseover', onMouseover, false );
	this.group.addEventListener( 'mouseout', onMouseout, false );

	function onMouseover( e ) {

		if (self.timer === undefined ) {
			//console.log("setting timer");
			self.timer = setTimeout( foo, 500 );
		}

		function foo() {
			self.popup.div.innerHTML = self.footext;
			self.popup.show();
		}

	}

	function onMouseout() {

		clearTimeout( self.timer );
		//console.log( "timer " + self.timer + " cleared" );
		self.timer = undefined;
		self.popup.hide();

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

	},

	setTooltip: function ( text ) {

		this.footext = text;
		while ( this.title.hasChildNodes() ) {
			this.title.removeChild( this.title.firstChild );
		}
		var titleText = document.createTextNode( text );
		this.title.appendChild( titleText );

	}

};

