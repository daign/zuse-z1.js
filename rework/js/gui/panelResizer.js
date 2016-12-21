zuse.gui.PanelResizer = function ( parent ) {

	this.parent = parent;

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	this.parent.node.appendChild( this.node );

	this.resizeHandle = document.createElementNS( zuse.SVGNS, 'path' );
	this.resizeHandle.setAttribute( 'class', 'resizeHandle' );
	this.resizeHandle.setAttribute( 'd', (
		'M -14,0 L 14,0 14,5 10,10 -10,10 -14,5 -14,0 Z'
	) );
	this.node.appendChild( this.resizeHandle );

	var line1 = document.createElementNS( zuse.SVGNS, 'path' );
	line1.setAttribute( 'class', 'resizeLine' );
	line1.setAttribute( 'd', 'M -11,3.3 L 11,3.3' );
	this.node.appendChild( line1 );

	var line2 = document.createElementNS( zuse.SVGNS, 'path' );
	line2.setAttribute( 'class', 'resizeLine' );
	line2.setAttribute( 'd', 'M -7,6.7 L 7,6.7' );
	this.node.appendChild( line2 );

	var self = this;

	var beginDrag = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		var startX = ( event.clientX || ( event.touches && event.touches[ 0 ].clientX ) );
		var startY = ( event.clientY || ( event.touches && event.touches[ 0 ].clientY ) );
		var startHeight = self.parent.panelHeight;
		var startPos = self.parent.positionX;

		var cancelSelect = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

		};

		var continueDrag = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var cX = ( event.clientX || ( event.touches && event.touches[ 0 ].clientX ) );
			var cY = ( event.clientY || ( event.touches && event.touches[ 0 ].clientY ) );

			var offsetX = ( cX - startX );
			var offsetY = ( cY - startY );

			if ( !isNaN( offsetX ) && !isNaN( offsetY ) ) {
				var cHeight = startHeight - offsetY;
				var cPos = startPos + offsetX;
				self.parent.resize( cHeight, cPos );
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

	this.resizeHandle.addEventListener( 'mousedown',  beginDrag, false );
	this.resizeHandle.addEventListener( 'touchstart', beginDrag, false );

};

zuse.gui.PanelResizer.prototype = {

	constructor: zuse.gui.PanelResizer,

	resize: function ( panelHeight ) {

		this.node.setAttribute( 'transform', (
			  'translate(' + ( panelHeight * 1.25 ) + ',0)'
			+ 'scale(' + ( panelHeight * 0.1 / 10 ) + ')'
		) );

	}

};

