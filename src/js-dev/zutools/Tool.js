ZUTOOLS.Tool = function ( param, tooltipManager, svg ) {

	var self = this;
	this.tooltipManager = tooltipManager;

	this.id = param[ 0 ];
	this.activatable = param[ 2 ];
	this.activated = false;
	this.disabled = false;
	this.events = param[ 1 ];

	this.tooltipContent = document.createElement( 'div' );
	this.title = document.createTextNode( '' );
	this.tooltipContent.appendChild( this.title );

	this.sliders = new Array();
	this.inputs = this.generateInputs( param[ 3 ] );
	if ( this.inputs !== null ) {
		this.tooltipContent.appendChild( this.inputs );
	}
	this.tagAsTooltip( this.tooltipContent );

	this.metrics = { x: 0, y: 0, width: 0 };

	svg.appendChild( ZUTOOLS.Utils.loadXML( 'images/icons/' + this.id + '.svg' ).documentElement.firstElementChild.nextElementSibling.nextElementSibling );

	this.group = document.createElementNS( ZUTOOLS.Utils.SVG, 'g' );
	this.group.setAttribute( 'class', 'tool' );
	svg.appendChild( this.group );

	this.rectangle = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.rectangle.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tool' );
	this.group.appendChild( this.rectangle );

	this.icon = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.icon.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#' + this.id );
	this.icon.setAttribute( 'class', 'icon' );
	this.group.appendChild( this.icon );

	this.tick = document.createElementNS( ZUTOOLS.Utils.SVG, 'use' );
	this.tick.setAttributeNS( ZUTOOLS.Utils.XLink, 'href', '#tick' );
	this.tick.setAttribute( 'class', 'tick' );
	this.tick.style.visibility = 'hidden';
	this.group.appendChild( this.tick );

	function getTooltipContent() { return self.tooltipContent; }
	function getMetrics() { return self.metrics; }
	function hasInputs()  { return self.inputs !== null; }

	this.group.addEventListener( 'click',     onClick,     false );
	this.group.addEventListener( 'mouseover', onMouseover, false );
	this.group.addEventListener( 'mouseout',  onMouseout,  false );

	function onClick() {

		if ( self.disabled ) { return; }
		if ( self.activatable ) { self.switchActivation(); }
		if ( self.events && self.events.click ) {
			self.events.click( self.activated );
			self.tooltipManager.toolclick();
		} else {
			// tooltip only opens on click when there is no other function associated with click
			self.tooltipManager.toolclickopen( self.id, getTooltipContent, getMetrics, hasInputs );
		}

	}

	function onMouseover() {

		if ( self.disabled ) { return; }
		if ( self.events && self.events.mouseover ) { self.events.mouseover(); }
		self.tooltipManager.toolover( getTooltipContent, getMetrics, hasInputs );

	}

	function onMouseout( event ) {

		if ( self.disabled ) { return; }
		if ( self.events && self.events.mouseout ) { self.events.mouseout(); }
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
		for ( var i = 0; i < this.sliders.length; i++ ) {
			this.sliders[ i ].setActivation( this.activated );
		}

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

		this.title.nodeValue = text;

	},

	generateInputs: function ( settings ) {

		if ( settings !== null ) {

			var container = document.createElement( 'div' );
			container.setAttribute( 'class', 'inputcontainer' );

			for ( var i in settings ) {

				switch ( settings[ i ].type ) {

					case 'button':

						var input = new ZUTOOLS.Button( settings[ i ] );
						container.appendChild( input.domNode );
						break;

					case 'selection':

						var tooltipManager = this.tooltipManager;
						var onselect = function () {
							tooltipManager.toolclick();
						};

						var input = new ZUTOOLS.Selection( settings[ i ], onselect );
						container.appendChild( input.domNode );
						break;

					case 'slider':

						var input = new ZUTOOLS.Slider( settings[ i ] );
						container.appendChild( input.domNode );
						if ( this.activatable ) {
							input.setActivation( false );
						}
						this.sliders.push( input );
						break;

				}

			}

			return container;

		} else {

			return null;

		}

	},

	tagAsTooltip: function ( domNode ) {

		domNode.dataset.zutooltip = 'true';

		for ( var i = 0; i < domNode.children.length; i++ ) {

			this.tagAsTooltip( domNode.children[ i ] );

		}

	}

};

