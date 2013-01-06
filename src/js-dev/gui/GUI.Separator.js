ZUSE.GUI.Separator = function ( parent ) {

	var self = this;
	this.parent = parent;

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.setAttribute( 'class', 'action col' );
	document.body.appendChild( this.div );

	this.left = undefined;
	this.leftStart = undefined;
	this.resizeActive = false;
	this.resizeStart = undefined;

	this.div.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mouseup',   onMouseUp,   false );
	document.addEventListener( 'selectstart', function(e){e.preventDefault();e.stopPropagation();}, false );

	function onMouseDown( event ) {

		self.leftStart = self.left;
		self.resizeStart = event.clientX;
		self.resizeActive = true;

	}

	function onMouseMove( event ) {

		if ( self.resizeActive ) {

			self.parent.setColumns( 0, self.leftStart + event.clientX - self.resizeStart );
			self.parent.setSizes();

		}

	}

	function onMouseUp() {

		self.resizeActive = false;

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

