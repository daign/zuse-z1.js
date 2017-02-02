zuse.gui.Toolbar = function ( parentNode ) {

	this.node = document.createElementNS( zuse.SVGNS, 'g' ); // assumed to be 100x300 before scaling
	parentNode.appendChild( this.node );

	var place1 = document.createElementNS( zuse.SVGNS, 'g' );
	place1.setAttribute( 'transform', (
		  'translate(' + 10 + ',' + 10 + ')'
		+ 'scale(' + 0.9 + ')'
	) );
	this.node.appendChild( place1 );

	var place2 = document.createElementNS( zuse.SVGNS, 'g' );
	place2.setAttribute( 'transform', (
		  'translate(' + 10 + ',' + 110 + ')'
		+ 'scale(' + 0.9 + ')'
	) );
	this.node.appendChild( place2 );

	var place3 = document.createElementNS( zuse.SVGNS, 'g' );
	place3.setAttribute( 'transform', (
		  'translate(' + 10 + ',' + 210 + ')'
		+ 'scale(' + 0.9 + ')'
	) );
	this.node.appendChild( place3 );

	var homeButton = new zuse.gui.ToolbarButton( place1, 'Home' );
	this.viewMode = new zuse.gui.ToolbarSelect( place2, [ '3D', 'Cut', 'SVG', 'Circuit' ] );
	this.hideMode = new zuse.gui.ToolbarSelect( place3, [ 'All', 'Moving' ] );

};

zuse.gui.Toolbar.prototype = {

	constructor: zuse.gui.Toolbar,

	windowResize: function ( windowWidth, windowHeight ) {

		var height = Math.round( windowHeight * 0.5 );                    // half of screen height
		height = Math.min( height, Math.round( windowWidth * 0.2 * 3 ) ); // but not more than 20% of screen width
		height = Math.min( height, 350 );                                 // and not lager than 350px

		this.node.setAttribute( 'transform', 'scale(' + ( height / 300 ) + ')' );

	}

};

