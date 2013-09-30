ZUTOOLS.Digit = function ( parent, id, events ) {

	var self = this;
	this.events = events;

	this.show = false;
	this.input = false;

	this.group = parent.getElementById( 'c' + id );
	this.textNode = this.group.getElementsByTagName( 'text' )[ 0 ].firstChild;

	if ( this.events ) {

		if ( this.events.click ) {
			this.group.addEventListener( 'click', onClick, false );
		}

		if ( this.events.mouseover && this.events.mouseout ) {
			this.group.addEventListener( 'mouseover', onMouseover, false );
			this.group.addEventListener( 'mouseout',  onMouseout,  false );
		}

	}

	function onClick() { if ( self.input ) { self.setValue( self.events.click() ); } }
	function onMouseover() { if ( self.show ) { self.events.mouseover(); } }
	function onMouseout()  { if ( self.show ) { self.events.mouseout(); } }

};

ZUTOOLS.Digit.prototype = {

	constructor: ZUTOOLS.Digit,

	setToEmpty:	function () { this.textNode.nodeValue = '';  this.setShow( false ); return this; },
	setToZero:	function () { this.textNode.nodeValue = '0'; this.setShow( true  ); return this; },
	setToOne:	function () { this.textNode.nodeValue = '1'; this.setShow( true  ); return this; },
	setText: function ( t ) { this.textNode.nodeValue = t;   this.setShow( false ); return this; },

	setValue: function ( b ) {

		if ( b !== undefined) {
			b ? this.setToOne() : this.setToZero();
		}
		return this;
	},

	inputOn:  function () { this.setInput( true  ); return this; },
	inputOff: function () { this.setInput( false ); return this; },

	setShow:  function ( b ) { this.show  = b; this.setClass(); },
	setInput: function ( b ) { this.input = b; this.setClass(); },

	setClass: function () {

		if		( this.input )	{ this.group.setAttribute( 'class', 'digitInput' ); }
		else if	( this.show )	{ this.group.setAttribute( 'class', 'digitShow' ); }
		else					{ this.group.setAttribute( 'class', 'digit' ); }

	}

};

