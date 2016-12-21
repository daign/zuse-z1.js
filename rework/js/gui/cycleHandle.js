zuse.gui.CycleHandle = function ( parent ) {

	this.parent = parent;
	this.pos = undefined;

	this.node = document.createElementNS( zuse.SVGNS, 'circle' );
	this.node.setAttribute( 'class', 'cycleControlHandle' );
	this.node.setAttribute( 'r', 28 );
	parent.node.appendChild( this.node );

	this.setPos( -Math.PI/2 );

	var self = this;

	var beginDrag = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		//var startX = ( event.clientX || ( event.touches && event.touches[ 0 ].clientX ) ) - self.parent.centerX;
		//var startY = ( event.clientY || ( event.touches && event.touches[ 0 ].clientY ) ) - self.parent.centerY;
		//var startPos = self.pos;

		var cancelSelect = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

		};

		var continueDrag = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var cX = ( event.clientX || ( event.touches && event.touches[ 0 ].clientX ) ) - self.parent.centerX;
			var cY = ( event.clientY || ( event.touches && event.touches[ 0 ].clientY ) ) - self.parent.centerY;

			//var offsetX = ( cX - startX );
			//var offsetY = ( cY - startY );

			if ( !isNaN( cX ) && !isNaN( cY ) ) {
				self.setPos( Math.atan2( cY, cX ) );
			}

		};

		var throttledContinue = zuse.schedule.deferringThrottle( continueDrag, 20, this );

		var endDrag = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			document.removeEventListener( 'selectstart', cancelSelect, false );

			document.removeEventListener( 'mousemove',   throttledContinue, false );
			document.removeEventListener( 'touchmove',   throttledContinue, false );

			document.removeEventListener( 'mouseup',     endDrag, false );
			document.removeEventListener( 'touchend',    endDrag, false );
			document.removeEventListener( 'touchcancel', endDrag, false );
			document.removeEventListener( 'touchleave',  endDrag, false );

		};

		document.addEventListener( 'selectstart', cancelSelect, false );

		document.addEventListener( 'mousemove',   throttledContinue, false );
		document.addEventListener( 'touchmove',   throttledContinue, false );

		document.addEventListener( 'mouseup',     endDrag, false );
		document.addEventListener( 'touchend',    endDrag, false );
		document.addEventListener( 'touchcancel', endDrag, false );
		document.addEventListener( 'touchleave',  endDrag, false );

	};

	this.node.addEventListener( 'mousedown',  beginDrag, false );
	this.node.addEventListener( 'touchstart', beginDrag, false );

};

zuse.gui.CycleHandle.prototype = {

	constructor: zuse.gui.CycleHandle,

	setPos: function ( pos ) {

		self.pos = pos;
		var x = Math.cos( self.pos ) * 100;
		var y = Math.sin( self.pos ) * 100;
		this.node.setAttribute( 'cx', x );
		this.node.setAttribute( 'cy', y );

	}

};

