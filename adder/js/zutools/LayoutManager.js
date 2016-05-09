ZUTOOLS.LayoutManager = function ( config ) {

	var self = this;

	config.tools[ 0 ].push( this.generateLanguageTool( config.languages, self ) );
	this.circuit = ZUTOOLS.Utils.loadXML( 'projects/adder/circuit.svg' ).lastChild;

	this.tooltip   = new ZUTOOLS.TooltipManager();
	this.toolbar   = new ZUTOOLS.Toolbar( config.tools, this.tooltip );
	this.separator = new ZUTOOLS.Separator( this );
	this.webgl     = new ZUTOOLS.WebGL();
	this.status    = new ZUTOOLS.Status();
	this.controls  = new ZUTOOLS.Controls();
	this.tabbar    = new ZUTOOLS.Tabbar( config.tabs );
	this.lang      = new ZUTOOLS.Languages( config.languages, this.circuit );

	this.width  = window.innerWidth;
	this.height = window.innerHeight;
	this.columns = new Array();
	this.setColumns( 0, this.width / 10 );
	this.setColumns( 1, this.width / 50 );

	this.fillWithTexts();

	function onWindowResize() {

		var newWidth = window.innerWidth;

		self.setColumns( 0, self.columns[ 0 ] / self.width * newWidth );
		self.setColumns( 1, self.columns[ 1 ] / self.width * newWidth );
		self.width  = newWidth;
		self.height = window.innerHeight;

		self.setSizes();

	}
	window.addEventListener( 'resize', onWindowResize, false );

	var resize = function () {

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

	};
	this.setSizes = ZUTOOLS.Utils.throttle( resize, 40, this );

	this.setSizes();

};

ZUTOOLS.LayoutManager.prototype = {

	constructor: ZUTOOLS.LayoutManager,

	setColumns: function ( n, w ) {

		this.columns[ n ] = Math.max( 0.1, w );

	},

	confinedSum: function () {

		var a = Math.min( Math.max( this.columns[ 0 ], 40 ), this.width/3 );
		var b = Math.min( Math.max( this.columns[ 1 ],  5 ), 40 );

		return a+b;

	},

	fillWithTexts: function () {

		this.controls.setTitle( this.lang.get( 'title',  0 ) );
		this.status.setText(    this.lang.get( 'status', 1 ) );

		for ( var i in this.tabbar.tabs ) {
			this.tabbar.tabs[ i ].setContent( this.lang.get( i ) );
		}
		this.tabbar.setConsecutiveSize();

		for ( var i in this.toolbar.toolsByName ) {
			this.toolbar.toolsByName[ i ].setTooltip( this.lang.getTool( i ) );
		}

	},

	generateLanguageTool: function ( config, self ) {

		return [ 'languages', null, false, [ {
			type:     'selection',
			options:  config.versions,
			selected: config.standard,
			onchange: function ( id ) {
				self.lang.setLanguage( id );
				self.fillWithTexts();
			}
		} ] ];

	}

};

