zuse.gui.CycleControl = function ( parentNode ) {

	this.stops = 8;
	this.centerX = undefined;
	this.centerY = undefined;

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	this.createElements();

	this.cycleHandle = new zuse.gui.CycleHandle( this );

};

zuse.gui.CycleControl.prototype = {

	constructor: zuse.gui.CycleControl,

	resize: function ( panelHeight, panelPositionX, windowHeight ) {

		var border = 0.1;
		var height = 0.8;

		this.node.setAttribute( 'transform', (
			  'translate(' + ( panelHeight * ( 1/6 + 0.4 ) ) + ',' + ( panelHeight * ( border + 0.4 ) ) + ')'
			+ 'scale(' + ( panelHeight * height / 260 ) + ')'
		) );

		this.centerX = panelPositionX + panelHeight * ( 1/6 + 0.4 );
		this.centerY = windowHeight - panelHeight * 0.5;

	},

	createElements: function () {

		/*this.rect = document.createElementNS( zuse.SVGNS, 'rect' );
		this.rect.setAttribute( 'x', -130 );
		this.rect.setAttribute( 'y', -130 );
		this.rect.setAttribute( 'width', 260 );
		this.rect.setAttribute( 'height', 260 );
		this.node.appendChild( this.rect );*/

		var outerRing = document.createElementNS( zuse.SVGNS, 'circle' );
		outerRing.setAttribute( 'class', 'cycleControlRing' );
		outerRing.setAttribute( 'cx', 0 );
		outerRing.setAttribute( 'cy', 0 );
		outerRing.setAttribute( 'r', 118 );
		this.node.appendChild( outerRing );

		// TODO: react on mousedown and continue by dragging
		var onRing = function ( event ) {
			var cX = ( event.clientX || ( event.touches && event.touches[ 0 ].clientX ) ) - self.centerX;
			var cY = ( event.clientY || ( event.touches && event.touches[ 0 ].clientY ) ) - self.centerY;
			if ( !isNaN( cX ) && !isNaN( cY ) ) {
				self.cycleHandle.setPos( Math.atan2( cY, cX ) );
			}
		};
		outerRing.addEventListener( 'click', onRing, false );

		var self = this;

		for ( var i = 0; i < this.stops; i++ ) {

			var pos = i * Math.PI * 2 / this.stops - Math.PI * 0.5;

			var stopWidth = 0.18;
			var x1 = Math.cos( stopWidth ) * 118;
			var y1 = Math.sin( stopWidth ) * 118;
			var x2 = Math.cos( -stopWidth ) * 118;
			var y2 = Math.sin( -stopWidth ) * 118;

			var stop = document.createElementNS( zuse.SVGNS, 'path' );
			stop.setAttribute( 'class', 'cycleControlRingStop' );
			stop.setAttribute( 'd', (
				'M 0,0 L ' + x1 + ',' + y1 + ' A 118,118,0,0,0,' + x2 + ',' + y2 + ' L 0,0 Z'
			) );
			stop.setAttribute( 'transform', (
				'rotate(' + pos*180/Math.PI + ')'
			) );
			this.node.appendChild( stop );

			var onStop = ( function () {
				var p = pos;
				return function () {
					self.cycleHandle.setPos( p );
				};
			} )();
			stop.addEventListener( 'click', onStop, false );

			var text = document.createElementNS( zuse.SVGNS, 'text' );
			text.setAttribute( 'class', 'cycleControlText' );
			text.setAttribute( 'x', Math.cos( pos ) * 100 - 6 );
			text.setAttribute( 'y', Math.sin( pos ) * 100 + 6 );
			text.textContent = i;
			this.node.appendChild( text );

		}

		var innerRing = document.createElementNS( zuse.SVGNS, 'circle' );
		innerRing.setAttribute( 'class', 'panelBackground' );
		innerRing.setAttribute( 'cx', 0 );
		innerRing.setAttribute( 'cy', 0 );
		innerRing.setAttribute( 'r', 82 );
		this.node.appendChild( innerRing );

		var button = document.createElementNS( zuse.SVGNS, 'circle' );
		button.setAttribute( 'class', 'cycleControlButton' );
		button.setAttribute( 'cx', 0 );
		button.setAttribute( 'cy', 0 );
		button.setAttribute( 'r', 40 );
		this.node.appendChild( button );

		var onButton = function () {
			self.cycleHandle.setPos( -Math.PI/2 );
		};
		button.addEventListener( 'click', onButton, false );

		var buttonArrow = document.createElementNS( zuse.SVGNS, 'path' );
		buttonArrow.setAttribute( 'class', 'cycleControlButtonIcon' );
		buttonArrow.setAttribute( 'd', (
			'M -14.1,-14.1 A 20,20,0,1,0,0,-20 L 0,-26 A 26,26,0,1,1,-18.4,-18.4 L -23,-23 -8,-23 -9,-9 Z'
		) );
		this.node.appendChild( buttonArrow );

	}

};

