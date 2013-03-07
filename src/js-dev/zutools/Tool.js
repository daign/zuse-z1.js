ZUTOOLS.Tool = function ( param, tooltipManager, svg ) {

	var self = this;
	this.tooltipManager = tooltipManager;

	this.activatable = param[ 2 ];
	this.activated = false;
	this.disabled = false;
	this.events = param[ 1 ];

	this.tooltip = '';
	this.inputs = param[ 3 ];
	this.metrics = { x: 0, y: 0, width: 0 };

	svg.appendChild( ZUTOOLS.Utils.loadXML( 'images/icons/' + param[ 0 ] + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.group = document.createElementNS( ZUTOOLS.Utils.SVG, 'g' );
	this.group.setAttribute( 'class', 'tool' );
	svg.appendChild( this.group );

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

	function getTooltip() { return [ self.tooltip, self.inputs ]; }
	function getMetrics() { return self.metrics; }
	function hasInputs()  { return self.inputs !== null; }

	this.group.addEventListener( 'click',     onClick,     false );
	this.group.addEventListener( 'mouseover', onMouseover, false );
	this.group.addEventListener( 'mouseout',  onMouseout,  false );

	function onClick() {

		if ( self.disabled ) { return; }
		if ( self.activatable ) { self.switchActivation(); }
		self.events.click();

	}

	function onMouseover() {

		// TODO: some tools should be openable on click
		if ( self.disabled ) { return; }
		if ( self.events.mouseover ) { self.events.mouseover(); }
		self.tooltipManager.toolover( getTooltip, getMetrics, hasInputs );

	}

	function onMouseout( event ) {

		if ( self.disabled ) { return; }
		if ( self.events.mouseout ) { self.events.mouseout(); }
		self.tooltipManager.toolout( event );

	}

};

ZUTOOLS.Tool.prototype = {

	constructor: ZUTOOLS.Tool,

	setSize: function ( x, y, width ) {

		this.metrics = { x: x, y: y, factor: width/24 };
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

		this.tooltip = text;

	}

};

