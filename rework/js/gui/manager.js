zuse.gui.Manager = function () {

	this.contextNode = document.createElementNS( zuse.SVGNS, 'svg' );
	document.body.appendChild( this.contextNode );

	this.controlPanel = new zuse.gui.ControlPanel( this.contextNode );
	this.toolbar = new zuse.gui.Toolbar( this.contextNode );

	var postponedResize = zuse.schedule.postpone( this.resize, this, 20 );
	var throttledResize = zuse.schedule.deferringThrottle( this.resize, this, 40 );

	this.resize();
	postponedResize();

	window.addEventListener( 'resize', throttledResize, false );

	function cancelTouch( event ) {
		event.preventDefault();
		event.stopPropagation();
	}
	document.addEventListener( 'touchstart', cancelTouch, false );
	document.addEventListener( 'touchmove',  cancelTouch, false );

};

zuse.gui.Manager.prototype = {

	constructor: zuse.gui.Manager,

	resize: function () {

		var width = Math.max( window.innerWidth, 300 );
		var height = Math.max( window.innerHeight, 200 );

		this.contextNode.style.width  = width + 'px';
		this.contextNode.style.height = height + 'px';
		this.contextNode.setAttribute( 'viewBox', 0 + ',' + 0 + ',' + width + ',' + height );

		this.controlPanel.windowResize( width, height );
		this.toolbar.windowResize( width, height );

	}

};

