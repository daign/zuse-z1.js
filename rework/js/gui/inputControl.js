zuse.gui.InputControl = function ( parentNode ) {

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	this.createBackground();

};

zuse.gui.InputControl.prototype = {

	constructor: zuse.gui.InputControl,

	resize: function ( panelHeight ) {

		var border = 0.1;
		var height = 0.8;

		this.node.setAttribute( 'transform', (
			  'translate(' + ( panelHeight * (17/15) ) + ',' + ( panelHeight * border ) + ')'
			+ 'scale(' + ( panelHeight * height / 200 ) + ')'
		) );

	},

	createBackground: function () {

		this.rect = document.createElementNS( zuse.SVGNS, 'rect' );
		this.rect.setAttribute( 'class', 'areaMarker' );
		this.rect.setAttribute( 'x', 0 );
		this.rect.setAttribute( 'y', 0 );
		this.rect.setAttribute( 'width', 300 );
		this.rect.setAttribute( 'height', 200 );
		//this.node.appendChild( this.rect );

	}

};

