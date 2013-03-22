ZUTOOLS.Slider = function ( settings ) {

	var self = this;

	this.min = settings.min;
	this.max = settings.max;
	this.values = settings.values;
	this.onChange = settings.onChange;

	this.width = ( this.values.length > 1 ) ? 270 : 300;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'slider corners small' );

	this.range = document.createElement( 'div' );
	this.range.setAttribute( 'class', 'range corners small' );
	this.domNode.appendChild( this.range );

	this.handles = new Array();

	for ( var i = 0; i < this.values.length; i++ ) {

		this.handles[ i ] = document.createElement( 'div' );
		this.handles[ i ].setAttribute( 'class', 'handle action corners small' );
		this.domNode.appendChild( this.handles[ i ] );

		( function () {

			var n = i;
			var callback = function ( event ) {
				beginDrag( event, n );
			};

			self.handles[ i ].addEventListener( 'mousedown', callback, false );

		} )();

	}

	this.updateSlider();

	function beginDrag( event, n ) {

		var valueStart = self.values[ n ];
		var dragStart = event.clientX;

		document.addEventListener( 'selectstart', cancelSelect, false );
		document.addEventListener( 'mousemove',   continueDrag, false );
		document.addEventListener( 'mouseup',     endDrag,      false );

		function cancelSelect( event ) {

			event.preventDefault();
			event.stopPropagation();

		}

		function continueDrag( event ) {

			var delta = Math.round( ( event.clientX - dragStart ) * ( self.max - self.min ) / self.width );
			self.setValue( n, valueStart + delta );

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

	setValue: function ( n, v ) {

		var lowerLimit = ( this.values[ n-1 ] !== undefined ) ? this.values[ n-1 ] : this.min;
		var upperLimit = ( this.values[ n+1 ] !== undefined ) ? this.values[ n+1 ] : this.max;

		v = Math.min( Math.max( v, lowerLimit ), upperLimit );

		if ( v !== this.values[ n ] ) {

			this.values[ n ] = v;
			this.onChange( this.values );
			this.updateSlider();

		}

	},

	updateSlider: function () {

		var n = this.values.length;

		if ( n === 1 ) {

			var position = ( this.values[ 0 ] - this.min ) * this.width / ( this.max - this.min );
			this.handles[ 0 ].style.left = position + 'px';
			this.range.style.width = ( position + 15 ) + 'px';

		} else {

			var positions = new Array();

			for ( var i = 0; i < n; i++ ) {

				var p = ( this.values[ i ] - this.min ) * this.width / ( this.max - this.min );
				positions[ i ] = p + i * 30 / ( n-1 );
				this.handles[ i ].style.left = positions[ i ] + 'px';

			}

			this.range.style.left = ( positions[ 0 ] + 15 ) + 'px';
			this.range.style.width = ( positions[ n-1 ] - positions[ 0 ] ) + 'px';

		}

	}

};

