ZUTOOLS.Slider = function ( settings ) {

	var self = this;

	//this.min = settings.min;
	//this.max = settings.max;
	this.value = settings.value;
	this.on = settings.on;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'slider corners small' );

	this.handle = document.createElement( 'div' );
	this.handle.setAttribute( 'class', 'handle action corners small' );
	this.domNode.appendChild( this.handle );

	this.handle.style.left = this.value + 'px';

	this.handle.addEventListener( 'mousedown', beginDrag, false );

	function beginDrag( event ) {

		var leftStart = self.value;
		var resizeStart = event.clientX;

		document.addEventListener( 'mousemove', continueDrag, false );
		document.addEventListener( 'mouseup',   endDrag,      false );

		function continueDrag( event ) {

			self.value = leftStart + event.clientX - resizeStart;
			self.handle.style.left = self.value + 'px';
			self.on( self.value );

		}

		function endDrag() {

			document.removeEventListener( 'mousemove', continueDrag, false );
			document.removeEventListener( 'mouseup',   endDrag,      false );

		}

	}

};

ZUTOOLS.Slider.prototype = {

	constructor: ZUTOOLS.Slider

};

