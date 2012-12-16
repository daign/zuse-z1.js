ZUSE.GUI = {};

ZUSE.GUI.LayoutManager = function () {

	var self = this;

	this.toolbar =   new ZUSE.GUI.Toolbar();
	this.seperator = new ZUSE.GUI.Seperator();
	this.webgl =     new ZUSE.GUI.WebGL();

	var w = window.innerWidth;
	var h = window.innerHeight;
	var a = w / 10;
	var b = w / 50;
	this.setSizes( a, b, w, h );

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {

		var w = window.innerWidth;
		var h = window.innerHeight;
		var a = self.aw * w;
		var b = self.bw * w;
		self.setSizes( a, b, w, h );

	}

};

ZUSE.GUI.LayoutManager.prototype = {

	constructor: ZUSE.GUI.LayoutManager,

	setSizes: function ( a, b, w, h ) {

		this.aw = a / w;
		this.bw = b / w;

		this.toolbar.setSize(   a+1, h, 0 );
		this.seperator.setSize( b+1, h, a );
		this.webgl.setSize( w-a-b+1, h, a+b );	

	}

};



ZUSE.GUI.Toolbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#33CC99';
	this.div.style.color = '#FFF';
	this.div.innerHTML = '1.';
	document.body.appendChild( this.div );

};

ZUSE.GUI.Toolbar.prototype = {

	constructor: ZUSE.GUI.Toolbar,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';	

	}

};



ZUSE.GUI.Seperator = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#3399CC';
	this.div.style.color = '#FFF';
	this.div.innerHTML = '2.';
	document.body.appendChild( this.div );

};

ZUSE.GUI.Seperator.prototype = {

	constructor: ZUSE.GUI.Seperator,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';	

	}

};



ZUSE.GUI.WebGL = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.style.background = '#3366CC';
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

