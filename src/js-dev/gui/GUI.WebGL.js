ZUSE.GUI.WebGL = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	//this.div.style.background = '#3366CC';
	this.div.style.color = '#FFF';
	this.div.innerHTML = '3.';
	document.body.appendChild( this.div );

	ZUSE.container=this.div;

};

ZUSE.GUI.WebGL.prototype = {

	constructor: ZUSE.GUI.WebGL,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';	

	}

};

