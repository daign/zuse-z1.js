ZUSE.GUI.Toolbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#3d9ecb';
	this.div.style.color = '#FFF';
	document.body.appendChild( this.div );

	var svgNS = "http://www.w3.org/2000/svg";

	this.svg = document.createElementNS(svgNS, 'svg' );
	this.svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
	this.div.appendChild( this.svg );

	this.svg.appendChild( ZUSE.XMLUtils.loadXML( 'js-dev/gui/tool.svg' ).documentElement.firstElementChild.nextElementSibling );

	var g = document.createElementNS(svgNS,"symbol");
	g.setAttributeNS(null,"id","ttre");
	g.setAttribute( 'width', "280px" );
	var myCircle = document.createElementNS(svgNS,"circle");
	myCircle.setAttribute( "id", "mycircle" );
	myCircle.setAttribute( "cx", 12 );
	myCircle.setAttribute( "cy", 12 );
	myCircle.setAttribute( "r", 12 );
	myCircle.setAttribute( "fill", "red" );
	myCircle.setAttribute( "stroke", "none" );
	g.appendChild( myCircle );
//	this.svg.appendChild( g );

	var u = document.createElementNS(svgNS,"use");
	u.setAttributeNS('http://www.w3.org/1999/xlink',"href","#ttre");
	u.setAttribute( "transform", "scale("+128/24+")" );
	this.svg.appendChild( u );

	var u2 = document.createElementNS(svgNS,"use");
	u2.setAttributeNS('http://www.w3.org/1999/xlink',"href","#tool");
	u2.setAttribute( "transform", "scale("+128/26+")" );
	u2.setAttribute('class', 'gate');
	u2.setAttribute( 'x', 1 );
	u2.setAttribute( 'y', 1 );
	this.svg.appendChild( u2 );

	var u3 = document.createElementNS(svgNS,"use");
	u3.setAttributeNS('http://www.w3.org/1999/xlink',"href","#tool");
	u3.setAttribute( "transform", "scale("+128/26+")" );
	u3.setAttribute('class', 'gate');
	u3.setAttribute( 'x', 1 );
	u3.setAttribute( 'y', 25 );
	this.svg.appendChild( u3 );

	this.buttons = new Array();
	this.buttons.push( u );
	this.buttons.push( u2 );
	this.buttons.push( u3 );
	//this.buttons.push( new ZUSE.GUI.Button( this ) );
	//this.buttons.push( new ZUSE.GUI.Button( this ) );

};

ZUSE.GUI.Toolbar.prototype = {

	constructor: ZUSE.GUI.Toolbar,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';

		for ( var i = 0; i < this.buttons.length; i++ ) {

			this.buttons[ i ].setAttribute( "transform", "scale("+width/26+")" );
			//this.buttons[ i ].setSize( width );

		}

	},

	addButton: function () {

	}

};

