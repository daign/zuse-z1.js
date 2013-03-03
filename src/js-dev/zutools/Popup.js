ZUTOOLS.Popup = function () {

	var self = this;

	this.span = document.createElement( 'span' );
	document.body.appendChild( this.span );
	this.hide();

	this.bridge = document.createElement( 'div' );
	this.bridge.id = 'PopupBridge';
	this.bridge.setAttribute( 'class', 'popup' );
	this.span.appendChild( this.bridge );

	this.pointer = document.createElement( 'div' );
	this.pointer.setAttribute( 'class', 'popup pointer diagonal' );
	this.span.appendChild( this.pointer );

	this.container = document.createElement( 'div' );
	this.container.id = 'PopupContainer';
	this.container.setAttribute( 'class', 'popup container topcorners bottomcorners' );
	this.span.appendChild( this.container );

	this.span.addEventListener( 'mouseout', onMouseout, false );

	function onMouseout ( event ) {

		//console.log( event );

		if (   event.toElement.id === 'PopupBridge'
			|| event.toElement.id === 'PopupContainer'
			|| ( event.toElement.href && event.toElement.href.baseVal === '#tool' )
		) { return; }

		self.hide();

	}

};

ZUTOOLS.Popup.prototype = {

	constructor: ZUTOOLS.Popup,

	show: function () { this.span.style.display = 'block'; },
	hide: function () { this.span.style.display = 'none'; },

	setTooltip: function ( tooltip ) {

		this.container.innerHTML = tooltip;
		//this.container.innerHTML = tooltip + '<br/><br/><br/><input type="button" value="Klick"/>';

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

