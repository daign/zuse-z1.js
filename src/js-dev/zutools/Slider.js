ZUTOOLS.Slider = function ( settings ) {

	var self = this;

	this.min = settings.min;
	this.max = settings.max;
	this.values = settings.values;
	this.active = ( settings.active !== undefined ) ? settings.active : true;
	this.onChange = settings.onChange;

	this.width = ( this.values.length > 1 ) ? 270 : 300;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'slider' );
	this.domNode.addEventListener( 'mousedown', beginDrag, false );

	this.sliderbar = document.createElement( 'div' );
	this.sliderbar.setAttribute( 'class', 'sliderbar corners small' );
	this.domNode.appendChild( this.sliderbar );

	this.range = document.createElement( 'div' );
	this.domNode.appendChild( this.range );

	this.handles = new Array();

	for ( var i = 0; i < this.values.length; i++ ) {

		this.handles[ i ] = document.createElement( 'div' );
		this.domNode.appendChild( this.handles[ i ] );

		( function () {

			var n = i;
			var callback = function ( event ) {
				beginDrag( event, n );
			};

			self.handles[ i ].addEventListener( 'mousedown', callback, false );

		} )();

	}

	this.setActivation( this.active );
	this.updateSlider();

	function beginDrag( event, n ) {

		if ( !self.active ) { return; }

		if ( n === undefined ) {

			n = 0;
			var value = undefined;
			var l = self.values.length;

			if ( l === 1 ) {

				var position = ( event.offsetX || event.layerX ) - 15;
				value = Math.round( position * ( self.max - self.min ) / self.width ) + self.min;

			} else {

				var minDistance = Infinity;
				for ( var i = 0; i < l; i++ ) {

					var displacement = i * 30 / ( l-1 ) + 15;
					var position = ( event.offsetX || event.layerX ) - displacement;
					var vi = Math.round( position * ( self.max - self.min ) / self.width ) + self.min;

					var distance = Math.abs( self.values[ i ] - vi );
					if ( distance < minDistance || ( distance === minDistance && self.values[ i ] < vi ) ) {
						minDistance = distance;
						n = i;
						value = vi;
					}

				}

			}

			self.setValue( n, value );

		}

		var dragStart = event.clientX;
		var valueStart = self.values[ n ];

		event.preventDefault();
		event.stopPropagation();

		SIMULATION.gui.tooltip.blockHiding( true );

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

			SIMULATION.gui.tooltip.blockHiding( false );

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

		var l = this.values.length;

		if ( l === 1 ) {

			var position = ( this.values[ 0 ] - this.min ) * this.width / ( this.max - this.min );
			this.handles[ 0 ].style.left = position + 'px';
			this.range.style.width = ( position + 9 ) + 'px';

		} else {

			var positions = new Array();

			for ( var i = 0; i < l; i++ ) {

				var p = ( this.values[ i ] - this.min ) * this.width / ( this.max - this.min );
				positions[ i ] = p + i * 30 / ( l-1 );
				this.handles[ i ].style.left = positions[ i ] + 'px';

			}

			this.range.style.left = ( positions[ 0 ] + 15 ) + 'px';
			this.range.style.width = ( positions[ l-1 ] - positions[ 0 ] ) + 'px';

		}

	},

	setActivation: function ( a ) {

		this.active = a;

		var rangeClasses = 'range corners small' + ( a ? '' : ' deactivated' );
		this.range.setAttribute( 'class', rangeClasses );

		var handleClasses = 'handle action corners small' + ( a ? ' pointer' : ' deactivated' );
		for ( var i = 0; i < this.handles.length; i++ ) {
			this.handles[ i ].setAttribute( 'class', handleClasses );
		}

	}

};

