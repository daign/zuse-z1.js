ZUSE.GUI.Separator = function ( parent ) {

	var self = this;
	this.parent = parent;

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.id = 'sep';
	document.body.appendChild( this.div );

	this.left;
	this.leftStart;
	this.resizeActive = false;
	this.resizeStart;

	this.div.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mouseup',   onMouseUp,   false );
	document.addEventListener( 'selectstart', function(e){e.preventDefault();e.stopPropagation();}, false );

	function onMouseDown() {

		self.leftStart = self.left;
		self.resizeStart = event.clientX;
		self.resizeActive = true;

	}

	function onMouseMove() {

		if ( self.resizeActive ) {

			self.parent.setSeparation( self.leftStart + event.clientX - self.resizeStart );

		}

	}

	function onMouseUp() {

		self.resizeActive = false;
		self.resizeStart = undefined;

	}

};

ZUSE.GUI.Separator.prototype = {

	constructor: ZUSE.GUI.Separator,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.left = left;
		this.div.style.left   = left   + 'px';	

	}

};

