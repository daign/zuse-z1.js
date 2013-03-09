ZUTOOLS.Tooltip = function () {

	var self = this;
	this.contentActive = false;

	this.span = document.createElement( 'span' );
	document.body.appendChild( this.span );
	this.hide();

	this.bridge = document.createElement( 'div' );
	this.bridge.id = 'TooltipBridge';
	this.bridge.setAttribute( 'class', 'tooltip' );
	this.span.appendChild( this.bridge );

	this.pointer = document.createElement( 'div' );
	this.pointer.setAttribute( 'class', 'tooltip pointer diagonal' );
	this.span.appendChild( this.pointer );

	this.frame = document.createElement( 'div' );
	this.frame.id = 'TooltipFrame';
	this.frame.setAttribute( 'class', 'tooltip frame corners small' );
	this.span.appendChild( this.frame );

	this.content = document.createElement( 'div' );
	this.content.id = 'TooltipContent';
	this.content.setAttribute( 'class', 'contentpadding' );
	this.frame.appendChild( this.content );

	this.span.addEventListener( 'mouseout', onMouseout, false );

	function onMouseout ( event ) {

		if ( !self.contentActive ) {

			if ( !self.isTool( event.toElement ) && !self.isPartOfTooltip( event.toElement ) ) {
				self.hide();
			} else {
				self.checkIfContentActive( event.toElement );
			}

		}

	}

	this.content.addEventListener( 'mouseout', onContentout, false );

	function onContentout ( event ) {

		if ( self.isPartOfTooltip( event.toElement ) ) {
			self.contentActive = false;
		}

	}

};

ZUTOOLS.Tooltip.prototype = {

	constructor: ZUTOOLS.Tooltip,

	show: function () { this.span.style.display = 'block'; },
	hide: function () { this.span.style.display = 'none'; },

	setContent: function ( content ) {

		this.content.innerHTML = content[ 0 ];

		if ( content[ 1 ] !== null ) {
			this.content.appendChild( content[ 1 ] );
		}

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
		this.pointer.style.top  = ( y + 1 ) * f + 7.5 + 'px';
//		this.pointer.style.top  = ( y + 1 ) * f + 20 + 'px';
		this.pointer.style.left = ( x + 24 ) * f - 10 + 'px';
		this.pointer.style.width  = 20 + 'px';
		this.pointer.style.height = 20 + 'px';

	},

	isTool: function ( element ) {

		return ( element.href && element.href.baseVal === '#tool' );

	},

	isPartOfTooltip: function ( element ) {

		return (   element.id === 'TooltipBridge'
				|| element.id === 'TooltipFrame'
				|| element.id === 'TooltipContent' );

	},

	checkIfContentActive: function ( element ) {

		if ( element.id === 'TooltipContent' ) {
			this.contentActive = true;
		}

	}

};

