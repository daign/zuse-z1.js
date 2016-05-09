ZUTOOLS.Tooltip = function () {

	var self = this;
	this.wasClicked = false;
	this.hidingBlocked = false;

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
			&& !self.hidingBlocked
			&& !self.isTool( event.relatedTarget )
			&& !self.isPartOfTooltip( event.relatedTarget )
		) {
			self.hide();
		}

	}

};

ZUTOOLS.Tooltip.prototype = {

	constructor: ZUTOOLS.Tooltip,

	show: function () { this.span.style.visibility = 'visible'; },
	hide: function () { this.span.style.visibility = 'hidden'; },

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

		var top = ( y + 1 ) * f;
		if ( ( top + this.frame.offsetHeight ) > window.innerHeight ) {
			top = window.innerHeight - this.frame.offsetHeight - 2*f;
		}

		this.frame.style.top  = top + 'px';
		this.frame.style.left = ( x + 24 ) * f + 'px';

		this.bridge.style.top  = ( y +  1 ) * f + 'px';
		this.bridge.style.left = ( x + 22 ) * f + 'px';
		this.bridge.style.width  =  3 * f + 'px';
		this.bridge.style.height = 22 * f + 'px';

		this.pike.style.top  = ( y +  1 ) * f + 6 + 'px';
		this.pike.style.left = ( x + 24 ) * f + 1 + 'px';
		var size = Math.sqrt( 0.5 ) * ( Math.min( 43, 22 * f ) - 12 );
		this.pike.style.width  = size + 'px';
		this.pike.style.height = size + 'px';

	},

	isTool: function ( element ) {

		return ( element && element.href && element.href.baseVal === '#tool' );

	},

	isPartOfTooltip: function ( element ) {

		return ( element && element.dataset !== undefined && element.dataset.zutooltip !== undefined );

	}

};

