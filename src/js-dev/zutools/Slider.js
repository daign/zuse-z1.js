ZUTOOLS.Slider = function ( settings ) {

	var self = this;

	//this.min = settings.min;
	//this.max = settings.max;
	this.value = settings.value;
	this.on = settings.on;

	//this.left = undefined;
	this.leftStart = undefined;
	this.resizeActive = false;
	this.resizeStart = undefined;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'slider corners small' );

	this.handle = document.createElement( 'div' );
	this.handle.setAttribute( 'class', 'handle action corners small' );
	this.domNode.appendChild( this.handle );

	this.handle.style.left = this.value + 'px';

	this.handle.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener(    'mousemove', onMouseMove, false );
	document.addEventListener(    'mouseup',   onMouseUp,   false );

	function onMouseDown( event ) {

		self.leftStart = self.value;
		self.resizeStart = event.clientX;
		self.resizeActive = true;

	}

	function onMouseMove( event ) {

		if ( self.resizeActive ) {

			self.value = self.leftStart + event.clientX - self.resizeStart;
			self.handle.style.left = self.value + 'px';
			self.on( self.value );

		}

	}

	function onMouseUp() {

		self.resizeActive = false;

	}

};

ZUTOOLS.Slider.prototype = {

	constructor: ZUTOOLS.Slider

};

