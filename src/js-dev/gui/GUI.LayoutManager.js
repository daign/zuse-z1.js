ZUSE.GUI.LayoutManager = function () {

	var self = this;

	this.toolbar   = new ZUSE.GUI.Toolbar();
	this.separator = new ZUSE.GUI.Separator( this );
	this.webgl     = new ZUSE.GUI.WebGL();
	this.controls  = new ZUSE.GUI.Controls();
	this.tabbar    = new ZUSE.GUI.Tabbar();

	this.width  = window.innerWidth;
	this.height = window.innerHeight;
	this.columns = new Array();
	this.setColumns( 0, this.width / 10 );
	this.setColumns( 1, this.width / 50 );
	this.setSizes();

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {

		var newWidth = window.innerWidth;

		self.setColumns( 0, self.columns[ 0 ] / self.width * newWidth );
		self.setColumns( 1, self.columns[ 1 ] / self.width * newWidth );
		self.width  = newWidth;
		self.height = window.innerHeight;

		self.setSizes();

	}

};

ZUSE.GUI.LayoutManager.prototype = {

	constructor: ZUSE.GUI.LayoutManager,

	setSizes: function () {

		var a = Math.min( Math.max( this.columns[ 0 ], 40 ), this.width/3 );
		var b = Math.min( Math.max( this.columns[ 1 ],  5 ), 40 );
		var w = this.width;
		var h = this.height;

		this.toolbar.setSize(      a+1, h+1 );
		this.separator.setSize(    b+1, h+1, a );
		this.webgl.setSize(    w-a-b+1, h+1, a+b );
		this.controls.setSize( w-a-b+1, h+1, a+b );
		this.tabbar.setSize(   w-a-b+1, h+1, a+b );

	},

	setColumns: function ( n, w ) {

		this.columns[ n ] = Math.max( 0.1, w );

	}

};

