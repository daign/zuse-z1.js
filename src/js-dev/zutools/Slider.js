ZUTOOLS.Slider = function ( settings ) {

	var self = this;

	this.min = settings.min;
	this.max = settings.max;
	this.value = settings.value;
	this.onChange = settings.onChange;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'slider corners small' );

	this.range = document.createElement( 'div' );
	this.range.setAttribute( 'class', 'range corners small' );
	this.domNode.appendChild( this.range );

	this.handle = document.createElement( 'div' );
	this.handle.setAttribute( 'class', 'handle action corners small' );
	this.domNode.appendChild( this.handle );

	this.setSlider();

	this.handle.addEventListener( 'mousedown', beginDrag, false );

	function beginDrag( event ) {

		var valueStart = self.value;
		var dragStart = event.clientX;

		document.addEventListener( 'selectstart', cancelSelect, false );
		document.addEventListener( 'mousemove',   continueDrag, false );
		document.addEventListener( 'mouseup',     endDrag,      false );

		function cancelSelect( event ) {

			event.preventDefault();
			event.stopPropagation();

		}

		function continueDrag( event ) {

			var delta = Math.round( ( event.clientX - dragStart ) * ( self.max - self.min ) / 300 );
			self.setValue( valueStart + delta );

		}

		function endDrag() {

			document.removeEventListener( 'selectstart', cancelSelect, false );
			document.removeEventListener( 'mousemove',   continueDrag, false );
			document.removeEventListener( 'mouseup',     endDrag,      false );

		}

	}

};

ZUTOOLS.Slider.prototype = {

	constructor: ZUTOOLS.Slider,

	setValue: function ( v ) {

		v = Math.min( Math.max( v, this.min ), this.max );

		if ( v !== this.value ) {

			this.value = v;
			this.onChange( v );
			this.setSlider();

		}

	},

	setSlider: function () {

		var left = ( this.value - this.min ) * 300 / ( this.max - this.min );
		this.handle.style.left = left + 'px';
		this.range.style.width = ( left + 15 ) + 'px';

	}

};

