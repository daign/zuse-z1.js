ZUTOOLS.Controls = function () {

	var self = this;

	this.expanded = true;
	this.bigger = false;

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top      =  '10px';
	this.div.style.width    = '270px';
	document.body.appendChild( this.div );

	this.title = document.createElement( 'div' );
	this.title.innerHTML = 'Z1 Adder';
	this.title.setAttribute( 'class', 'controltitle action topcorners pointer' );
	this.title.style.padding = '8px';
	this.div.appendChild( this.title );

	this.title.addEventListener( 'click', onTitle, false );
	function onTitle() { self.switchExpanded(); }

	this.input = document.createElement( 'div' );
	this.input.style.background = '#ddd';
	this.div.appendChild( this.input );

	this.svg = document.createElementNS( ZUSE.SVGUtils.NS, 'svg' );
	this.svg.setAttribute( 'xmlns:xlink', ZUSE.SVGUtils.XLink );
	this.svg.setAttribute( 'viewBox', '0, 0, 180, 100' );
	this.svg.setAttribute( 'width',  '270px' );
	this.svg.setAttribute( 'height', '150px' );
	this.svg.style.display = 'block';
	this.input.appendChild( this.svg );

	var line = document.createElementNS( ZUSE.SVGUtils.NS, 'line' );
	line.setAttribute( 'x1',  10 );
	line.setAttribute( 'x2', 108 );
	line.setAttribute( 'y1',  68 );
	line.setAttribute( 'y2',  68 );
	line.setAttribute( 'class', 'line' );
	this.svg.appendChild( line );

	var line = document.createElementNS( ZUSE.SVGUtils.NS, 'line' );
	line.setAttribute( 'x1', 126 );
	line.setAttribute( 'x2', 170 );
	line.setAttribute( 'y1',  68 );
	line.setAttribute( 'y2',  68 );
	line.setAttribute( 'class', 'line' );
	this.svg.appendChild( line );

/*	var myCircle = document.createElementNS( ZUSE.SVGUtils.NS, 'circle' );
	myCircle.setAttribute( "id",		"mycircle" );
	myCircle.setAttribute( "cx",		50 );
	myCircle.setAttribute( "cy",		50 );
	myCircle.setAttribute( "r",			50 );
	myCircle.setAttribute( "fill",		"red" );
	myCircle.setAttribute( "stroke",	"none" );
	this.svg.appendChild( myCircle ); */

	this.scale = document.createElement( 'div' );
	this.scale.setAttribute( 'class', 'action bottomcorners pointer' );
	this.scale.style.height = '10px';
	this.div.appendChild( this.scale );

	this.scale.addEventListener( 'click', onScale, false );

	function onScale() {

		if ( !self.expanded ) {

			self.switchExpanded();

		} else {

			self.bigger = !self.bigger;
			self.div.style.width =           self.bigger ? '450px' : '270px';
			self.svg.setAttribute( 'width',  self.bigger ? '450px' : '270px' );
			self.svg.setAttribute( 'height', self.bigger ? '250px' : '150px' );

		}

	}

};

ZUTOOLS.Controls.prototype = {

	constructor: ZUTOOLS.Controls,

	setSize: function ( width, height, left ) {

		this.div.style.left = left + 10 + 'px';

	},

	switchExpanded: function () {

		this.expanded = !this.expanded;
		this.input.style.display = this.expanded ? 'block' : 'none';

	},

	addDigit: function ( x, y, smaller, events ) {

		return new ZUTOOLS.Digit( this.svg, x, y, smaller, events );

	}

};

