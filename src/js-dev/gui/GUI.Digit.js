ZUSE.GUI.Digit = function ( parent, x, y, smaller, events ) {

	var self = this;

	this.show = false;
	this.input = false;

	this.group = document.createElementNS( ZUSE.SVGUtils.NS, 'g' );
	this.group.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
	this.group.setAttribute( 'class', 'digit' );
	parent.appendChild( this.group );

	if ( events ) {

		var rect = document.createElementNS( ZUSE.SVGUtils.NS, 'rect' );
		rect.setAttribute( 'rx', smaller ? 2 : 4 );
		rect.setAttribute( 'ry', smaller ? 2 : 4 );
		rect.setAttribute( 'width',  smaller ?  '9px' : '18px' );
		rect.setAttribute( 'height', smaller ? '12px' : '24px' );
		this.group.appendChild( rect );

		if ( events.click ) {

			this.group.addEventListener( 'click', onClick, false );

			function onClick() { if ( self.input ) { self.setValue( events.click() ); } }

		}

		if ( events.mouseover && events.mouseout ) {

			this.group.addEventListener( 'mouseover', onMouseover, false );
			this.group.addEventListener( 'mouseout',  onMouseout,  false );

			function onMouseover() { if ( self.show ) { events.mouseover(); } }
			function onMouseout()  { if ( self.show ) { events.mouseout(); } }

		}

	}

	var text = document.createElementNS( ZUSE.SVGUtils.NS, 'text' );
	text.setAttribute( 'x', smaller ? 1.5 : 3 );
	text.setAttribute( 'y', smaller ? 10 : 20 );
	text.setAttribute( 'class', 'inputText' );
	text.style.fontSize = smaller ? '10px' : '20px';
	text.setAttributeNS( 'http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve' );
	this.group.appendChild( text );

	this.textNode = document.createTextNode( '' );
	text.appendChild( this.textNode );

};

ZUSE.GUI.Digit.prototype = {

	constructor: ZUSE.GUI.Digit,

	setToEmpty:	function () { this.textNode.nodeValue = '';  this.setShow( false ); return this; },
	setToZero:	function () { this.textNode.nodeValue = '0'; this.setShow( true  ); return this; },
	setToOne:	function () { this.textNode.nodeValue = '1'; this.setShow( true  ); return this; },
	setToPlus:	function () { this.textNode.nodeValue = '+'; this.setShow( false ); return this; },
	setText: function ( t ) { this.textNode.nodeValue = t;   this.setShow( false ); return this; },

	setValue: function ( b ) { b ? this.setToOne() : this.setToZero(); return this; },

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

