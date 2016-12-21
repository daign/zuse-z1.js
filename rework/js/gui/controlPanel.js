zuse.gui.ControlPanel = function ( parentNode ) {

	this.windowWidth = undefined;
	this.windowHeight = undefined;
	this.panelHeight = 200;
	this.positionX = 10;

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	this.createPanelBackground();

	this.cycleControl = new zuse.gui.CycleControl( this.node );
	this.inputControl = new zuse.gui.InputControl( this.node );
	this.panelResizer = new zuse.gui.PanelResizer( this );

};

zuse.gui.ControlPanel.prototype = {

	constructor: zuse.gui.ControlPanel,

	windowResize: function ( windowWidth, windowHeight ) {

		this.windowWidth = windowWidth;
		this.windowHeight = windowHeight;
		this.resize( this.panelHeight, this.positionX );

	},

	resize: function ( height, pos ) {

		var maximumHeight = this.windowHeight * 0.5;
		var minimumHeight = this.windowHeight * 0.2;
		var maximumWidth = this.windowWidth - 20;
		var margin = 10;

		height = Math.min( height, maximumHeight );
		height = Math.max( height, minimumHeight );
		height = Math.min( height, Math.round( maximumWidth * 0.4 ) );
		this.panelHeight = height;
		var panelWidth = Math.round( this.panelHeight * 2.5 );

		pos = Math.max( pos, margin );
		pos = Math.min( pos, this.windowWidth - margin - panelWidth );
		this.positionX = pos;

		this.node.setAttribute( 'transform', (
			'translate(' + this.positionX + ',' + ( this.windowHeight - this.panelHeight ) + ')'
		) );
		this.backgroundNode.setAttribute( 'transform', (
			'scale(' + this.panelHeight + ')'
		) );

		this.cycleControl.resize( this.panelHeight, this.positionX, this.windowHeight );
		this.inputControl.resize( this.panelHeight );
		this.panelResizer.resize( this.panelHeight );

	},

	createPanelBackground: function () {

		this.backgroundNode = document.createElementNS( zuse.SVGNS, 'path' );
		this.backgroundNode.setAttribute( 'class', 'panelBackground' );
		this.backgroundNode.setAttribute( 'd', (
			'M 0,1 L 0,0.5 A 0.5,0.5,0,0,1,0.5,0 L 2,0 A 0.5,0.5,0,0,1,2.5,0.5 L 2.5,1 0,1 Z'
		) );
		this.node.appendChild( this.backgroundNode );

	}

};

