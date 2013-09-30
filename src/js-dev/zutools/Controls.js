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
	this.title.setAttribute( 'class', 'controltitle action topcorners pointer' );
	this.title.style.padding = '8px';
	this.div.appendChild( this.title );

	this.title.addEventListener( 'click', onTitle, false );
	function onTitle() { self.switchExpanded(); }

	this.input = document.createElement( 'div' );
	this.input.style.background = '#ddd';
	this.div.appendChild( this.input );

	this.svg = ZUTOOLS.Utils.loadXML( 'projects/adder/controls.svg' ).documentElement;
	this.input.appendChild( this.svg );

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

	addDigit: function ( id, events ) {

		return new ZUTOOLS.Digit( this.svg, id, events );

	},

	setTitle: function ( title ) {

		this.title.innerHTML = title;

	}

};

