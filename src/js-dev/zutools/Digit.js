ZUTOOLS.Digit = function ( parent, x, y, smaller, events ) {

	var self = this;
	this.events = events;

	this.show = false;
	this.input = false;

	this.group = document.createElementNS( ZUTOOLS.Utils.SVG, 'g' );
	this.group.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
	this.group.setAttribute( 'class', 'digit' );
	parent.appendChild( this.group );

	if ( this.events ) {

		var rect = document.createElementNS( ZUTOOLS.Utils.SVG, 'rect' );
		rect.setAttribute( 'rx', smaller ? 2 : 4 );
		rect.setAttribute( 'ry', smaller ? 2 : 4 );
		rect.setAttribute( 'width',  smaller ?  '9px' : '18px' );
		rect.setAttribute( 'height', smaller ? '12px' : '24px' );
		this.group.appendChild( rect );

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

	var text = document.createElementNS( ZUTOOLS.Utils.SVG, 'text' );
	text.setAttribute( 'x', smaller ? 1.5 : 3 );
	text.setAttribute( 'y', smaller ? 10 : 20 );
	text.setAttribute( 'class', 'inputText' );
	text.style.fontSize = smaller ? '10px' : '20px';
	text.setAttributeNS( ZUTOOLS.Utils.XML, 'xml:space', 'preserve' );
	this.group.appendChild( text );

	this.textNode = document.createTextNode( '' );
	text.appendChild( this.textNode );

};

ZUTOOLS.Digit.prototype = {

	constructor: ZUTOOLS.Digit,

	setToEmpty:	function () { this.textNode.nodeValue = '';  this.setShow( false ); return this; },
	setToZero:	function () { this.textNode.nodeValue = '0'; this.setShow( true  ); return this; },
	setToOne:	function () { this.textNode.nodeValue = '1'; this.setShow( true  ); return this; },
	setToPlus:	function () { this.textNode.nodeValue = '+'; this.setShow( false ); return this; },
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

