ZUTOOLS.Tooltip = function () {

	var self = this;
	this.wasClicked = false;

	this.span = document.createElement( 'span' );
	document.body.appendChild( this.span );
	this.hide();

	this.bridge = document.createElement( 'div' );
	this.bridge.dataset.zutooltip = 'true';
	this.bridge.setAttribute( 'class', 'tooltip' );
	this.span.appendChild( this.bridge );

	this.pike = document.createElement( 'div' );
	this.pike.setAttribute( 'class', 'tooltip pike diagonal' );
	this.span.appendChild( this.pike );

	this.frame = document.createElement( 'div' );
	this.frame.dataset.zutooltip = 'true';
	this.frame.setAttribute( 'class', 'tooltip frame corners small' );
	this.span.appendChild( this.frame );

	this.span.addEventListener( 'mouseout', onMouseout, false );

	function onMouseout ( event ) {

		if (
			   !self.wasClicked
			&& !self.isTool( event.relatedTarget )
			&& !self.isPartOfTooltip( event.relatedTarget )
		) {
			self.hide();
		}

	}

};

ZUTOOLS.Tooltip.prototype = {

	constructor: ZUTOOLS.Tooltip,

	show: function () { this.span.style.display = 'block'; },
	hide: function () { this.span.style.display = 'none'; },

	setContent: function ( content ) {

		while ( this.frame.hasChildNodes() ) {
			this.frame.removeChild( this.frame.firstChild );
		}
		this.frame.appendChild( content );

	},

	setMetrics: function ( metrics ) {

		var x = metrics.x;
		var y = metrics.y;
		var f = metrics.factor;

		this.frame.style.top  = ( y +  1 ) * f + 'px';
		this.frame.style.left = ( x + 24 ) * f + 'px';

		this.bridge.style.top  = ( y +  1 ) * f + 'px';
		this.bridge.style.left = ( x + 22 ) * f + 'px';
		this.bridge.style.width  =  3 * f + 'px';
		this.bridge.style.height = 22 * f + 'px';

		// not final
		this.pike.style.top  = ( y + 1 ) * f + 7.5 + 'px';
//		this.pike.style.top  = ( y + 1 ) * f + 20 + 'px';
		this.pike.style.left = ( x + 24 ) * f - 10 + 'px';
		this.pike.style.width  = 20 + 'px';
		this.pike.style.height = 20 + 'px';

	},

	isTool: function ( element ) {

		return ( element && element.href && element.href.baseVal === '#tool' );

	},

	isPartOfTooltip: function ( element ) {

		return ( element && element.dataset.zutooltip !== undefined );

	}

};

