zuse.gui.ToolbarModeButton = function ( parentNode ) {

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	this.rect = document.createElementNS( zuse.SVGNS, 'rect' );
	this.rect.setAttribute( 'class', 'toolbarButton' );
	this.rect.setAttribute( 'x', 0 );
	this.rect.setAttribute( 'y', 0 );
	this.rect.setAttribute( 'width', 100 );
	this.rect.setAttribute( 'height', 100 );
	this.rect.setAttribute( 'rx', 16 );
	this.rect.setAttribute( 'ry', 16 );
	this.node.appendChild( this.rect );

};

zuse.gui.ToolbarModeButton.prototype = {

	constructor: zuse.gui.ToolbarModeButton

};

