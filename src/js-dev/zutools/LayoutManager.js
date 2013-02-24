ZUTOOLS.LayoutManager = function ( config ) {

	var self = this;
	this.config = config;

	this.toolbar   = new ZUTOOLS.Toolbar();
	this.separator = new ZUTOOLS.Separator( this );
	this.webgl     = new ZUTOOLS.WebGL();
	this.status    = new ZUTOOLS.Status();
	this.controls  = new ZUTOOLS.Controls();
	this.tabbar    = new ZUTOOLS.Tabbar();

	this.width  = window.innerWidth;
	this.height = window.innerHeight;
	this.columns = new Array();
	this.setColumns( 0, this.width / 10 );
	this.setColumns( 1, this.width / 50 );
	this.setSizes();

	this.addTabs();

	this.getLang( this.initLang() );
	this.fillText();

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
		self.getLang( 'de' );
		self.fillText();
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
		self.getLang( 'en' );
		self.fillText();
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

	initLang: function () {

		var match = window.location.search.match( /(?:lang=)([a-z]{2})/ );

		if( match && match.length >= 2 ) {
			var lang = match[1];
			if( this.config.languages[ lang ] ) {
				return lang;
			}
		}

		return this.config.standard_language;

	},

	getLang: function ( lang ) {

		var lpath = this.config.path + 'languages/';
		var lang = this.config.languages[ lang ] + '.xml';
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

			var name = this.config.tabs[ i ];
			this.tabbar.addTab( name );

		}

		this.setSizes();

	},

	fillText: function () {

		this.controls.setTitle( this.store.title[ 0 ].innerHTML );

		for ( var i in this.tabbar.tabs ) {

			this.tabbar.tabs[ i ].setContent( this.store[ i ][ 0 ].innerHTML, this.store[ i ][ 1 ] );

		}

		this.setSizes();

		var statuslist = this.store.status[ 1 ].firstElementChild.children;
		for ( var i = 0; i < statuslist.length; i++ ) {
			this.status.setStateText( i, (i+1) + '. ' + statuslist[ i ].innerHTML );
		}

	}

};

