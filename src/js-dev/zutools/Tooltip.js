ZUTOOLS.Tooltip = function () {

	var self = this;

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

	this.container = document.createElement( 'div' );
	this.container.id = 'TooltipContainer';
	this.container.setAttribute( 'class', 'tooltip container topcorners bottomcorners' );
	this.span.appendChild( this.container );

	this.span.addEventListener( 'mouseout', onMouseout, false );

	function onMouseout ( event ) {

		//console.log( event );

		if (   event.toElement.id === 'TooltipBridge'
			|| event.toElement.id === 'TooltipContainer'
			|| ( event.toElement.href && event.toElement.href.baseVal === '#tool' )
		) { return; }

		self.hide();

	}

};

ZUTOOLS.Tooltip.prototype = {

	constructor: ZUTOOLS.Tooltip,

	show: function () { this.span.style.display = 'block'; },
	hide: function () { this.span.style.display = 'none'; },

	setTooltip: function ( content ) {

		var text = content[ 0 ];
		if ( content[ 1 ] !== null ) {
			for ( var i in content[ 1 ] ) {
				text += '<br/><input type="button" value="Klick"/>';
			}
		}
		this.container.innerHTML = text;

	},

	setMetrics: function ( metrics ) {

		var x = metrics.x;
		var y = metrics.y;
		var f = metrics.factor;

		this.container.style.top  = ( y +  1 ) * f + 'px';
		this.container.style.left = ( x + 24 ) * f + 'px';

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

	}

};

