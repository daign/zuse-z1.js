zuse.gui.ToolbarSelectOption = function ( parent, n, label ) {

	this.n = n;
	this.parent = parent;

	this.node = document.createElementNS( zuse.SVGNS, 'g' );

	this.button = document.createElementNS( zuse.SVGNS, 'rect' );
	this.button.setAttribute( 'class', 'toolbarButton' );
	this.button.setAttribute( 'x', 0 );
	this.button.setAttribute( 'y', 0 );
	this.button.setAttribute( 'width', 100 );
	this.button.setAttribute( 'height', 100 );
	this.button.setAttribute( 'rx', 16 );
	this.button.setAttribute( 'ry', 16 );
	this.node.appendChild( this.button );

	var self = this;
	var onClick = function () {
		self.parent.onClick( self.n );
	};
	this.button.addEventListener( 'click', onClick, false );

	var text = document.createElementNS( zuse.SVGNS, 'text' );
	text.setAttribute( 'class', 'toolbarButtonText' );
	text.setAttribute( 'x', 50 );
	text.setAttribute( 'y', 60 );
	text.textContent = label;
	this.node.appendChild( text );

};

zuse.gui.ToolbarSelectOption.prototype = {

	constructor: zuse.gui.ToolbarSelectOption,

	animate: function ( v ) {

		this.node.setAttribute( 'transform', 'translate(' + ( this.n * v * 1.1 ) + ',0)'	);

	},

	setSelected: function ( b ) {

		if ( b ) {
			this.button.setAttribute( 'class', 'toolbarButton active' );
		} else {
			this.button.setAttribute( 'class', 'toolbarButton' );
		}

	}

};

