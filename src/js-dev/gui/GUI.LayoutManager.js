ZUSE.GUI.LayoutManager = function () {

	var self = this;

	this.toolbar =   new ZUSE.GUI.Toolbar();
	this.separator = new ZUSE.GUI.Separator( this );
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

		this.toolbar.setSize(   a+1, h );
		this.separator.setSize( b+1, h, a );
		this.webgl.setSize( w-a-b+1, h, a+b );	

	},

	setSeparation: function ( s ) {

		var w = window.innerWidth;

		if ( s > 20 && s < w/3 ) {

			var h = window.innerHeight;
			var b = this.bw * w;
			this.setSizes( s, b, w, h );

		}

	}

};

