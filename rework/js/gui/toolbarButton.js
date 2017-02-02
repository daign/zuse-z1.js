zuse.gui.ToolbarButton = function ( parentNode, label ) {

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	this.rect = document.createElementNS( zuse.SVGNS, 'rect' );
	this.rect.setAttribute( 'class', 'toolbarButton active' );
	this.rect.setAttribute( 'x', 0 );
	this.rect.setAttribute( 'y', 0 );
	this.rect.setAttribute( 'width', 100 );
	this.rect.setAttribute( 'height', 100 );
	this.rect.setAttribute( 'rx', 16 );
	this.rect.setAttribute( 'ry', 16 );
	this.node.appendChild( this.rect );

	var text = document.createElementNS( zuse.SVGNS, 'text' );
	text.setAttribute( 'class', 'toolbarButtonText' );
	text.setAttribute( 'x', 50 );
	text.setAttribute( 'y', 60 );
	text.textContent = label;
	this.node.appendChild( text );

};

zuse.gui.ToolbarButton.prototype = {

	constructor: zuse.gui.ToolbarButton

};

