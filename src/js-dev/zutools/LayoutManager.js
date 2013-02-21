ZUTOOLS.LayoutManager = function ( config ) {

	var self = this;
	this.config = config;

	this.toolbar   = new ZUTOOLS.Toolbar();
	this.separator = new ZUTOOLS.Separator( this );
	this.webgl     = new ZUTOOLS.WebGL();
	this.status    = new ZUTOOLS.Status();
	this.controls  = new ZUTOOLS.Controls( config.title );
	this.tabbar    = new ZUTOOLS.Tabbar();

	this.width  = window.innerWidth;
	this.height = window.innerHeight;
	this.columns = new Array();
	this.setColumns( 0, this.width / 10 );
	this.setColumns( 1, this.width / 50 );
	this.setSizes();

	this.getLang();
	this.addTabs();

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

ZUTOOLS.LayoutManager.prototype = {

	constructor: ZUTOOLS.LayoutManager,

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
		this.status.setSize(         w, h+1, a+b );

	},

	setColumns: function ( n, w ) {

		this.columns[ n ] = Math.max( 0.1, w );

	},

	confinedSum: function () {

		var a = Math.min( Math.max( this.columns[ 0 ], 40 ), this.width/3 );
		var b = Math.min( Math.max( this.columns[ 1 ],  5 ), 40 );

		return a+b;

	},

	getLang: function () {

		var lpath = this.config.path + 'languages/';
		var lang = this.config.languages[ this.config.standard_language ] + '.xml';
		//lang = "Deutsch.xml";
		var text = ZUTOOLS.Utils.loadXML( lpath + lang );

		var body = text.lastChild.lastElementChild;
		this.store = new Object();

		for ( var i = 0; i < body.childElementCount; i++ ) {

			var array = new Array();
			for ( var j = 0; j < body.children[ i ].childElementCount; j++ ) {
				array.push( body.children[ i ].children[ j ] );
			}
			this.store[ body.children[ i ].id ] = array;

		}

		this.store.logic[ 1 ] = ZUSE.XMLUtils.loadXML( 'projects/adder/circuit.svg' ).lastChild;

	},

	addTabs: function () {

		for ( var i = 0; i < this.config.tabs.length; i++ ) {

			var foo = this.config.tabs[ i ];
			this.tabbar.addTab( this.store[ foo ][ 0 ].innerHTML, this.store[ foo ][ 1 ] );

		}

		this.setSizes();

	}

};

