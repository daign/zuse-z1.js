ZUTOOLS.LayoutManager = function ( config ) {

	var self = this;

	this.toolbar   = new ZUTOOLS.Toolbar( config.tools );
	this.separator = new ZUTOOLS.Separator( this );
	this.webgl     = new ZUTOOLS.WebGL();
	this.status    = new ZUTOOLS.Status();
	this.controls  = new ZUTOOLS.Controls();
	this.tabbar    = new ZUTOOLS.Tabbar( config.tabs );
	this.lang      = new ZUTOOLS.Languages( config.languages );

	this.width  = window.innerWidth;
	this.height = window.innerHeight;
	this.columns = new Array();
	this.setColumns( 0, this.width / 10 );
	this.setColumns( 1, this.width / 50 );

	this.fillWithTexts();

/*
	var b = document.createElement( 'input' );
	b.style.position = 'absolute';
	b.style.top      = '5px';
	b.style.left     = '5px';
	b.type = 'button';
	b.value = 'Deutsch';
	b.addEventListener( 'click', onClickDe, false );
	document.body.appendChild( b );
	function onClickDe() {
		self.lang.setLanguage( 'de' );
		self.fillWithTexts();
	}
	var c = document.createElement( 'input' );
	c.style.position = 'absolute';
	c.style.top      = '5px';
	c.style.left     = '75px';
	c.type = 'button';
	c.value = 'English';
	c.addEventListener( 'click', onClickEn, false );
	document.body.appendChild( c );
	function onClickEn() {
		self.lang.setLanguage( 'en' );
		self.fillWithTexts();
	}
*/

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

	fillWithTexts: function () {

		this.controls.setTitle( this.lang.get( 'title',  0 ) );
		this.status.setText(    this.lang.get( 'status', 1 ) );

		for ( var i in this.tabbar.tabs ) {
			this.tabbar.tabs[ i ].setContent( this.lang.get( i ) );
		}

		for ( var i in this.toolbar.toolsByName ) {
			this.toolbar.toolsByName[ i ].setTooltip( this.lang.getTool( i ) );
		}

		this.setSizes();

	}

};

