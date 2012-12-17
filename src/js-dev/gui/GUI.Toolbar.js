ZUSE.GUI.Toolbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#3c9';
	this.div.style.color = '#FFF';
	this.div.innerHTML = '1.';
	document.body.appendChild( this.div );

	this.buttons = new Array();
	this.buttons.push( new ZUSE.GUI.Button( this ) );
	this.buttons.push( new ZUSE.GUI.Button( this ) );

};

ZUSE.GUI.Toolbar.prototype = {

	constructor: ZUSE.GUI.Toolbar,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';

		for ( var i = 0; i < this.buttons.length; i++ ) {

			this.buttons[ i ].setSize( width );

		}

	}

};

