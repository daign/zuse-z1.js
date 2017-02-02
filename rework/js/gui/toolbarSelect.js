zuse.gui.ToolbarSelect = function ( parentNode, ops ) {

	var self = this;

	this.options = [];
	this.collapsed = true;
	this.collapseTween = new TWEEN.Tween( { value: 0 } )
	.onUpdate( function () {
		self.animate( this.value );
	} );

	this.node = document.createElementNS( zuse.SVGNS, 'g' );
	parentNode.appendChild( this.node );

	for ( var i = 0; i < ops.length; i++ ) {

		var option = new zuse.gui.ToolbarSelectOption( this, i, ops[ i ] );
		this.options.push( option );

	}

	this.setSelected( 0 );

};

zuse.gui.ToolbarSelect.prototype = {

	constructor: zuse.gui.ToolbarSelect,

	setSelected: function ( n ) {

		// remove all nodes
		while ( this.node.lastChild ) {
			this.node.removeChild( this.node.lastChild );
		}

		// add again everything else
		for ( var i = 0; i < this.options.length; i++ ) {
			if ( i !== n ) {
				this.options[ i ].setSelected( false );
				this.node.appendChild( this.options[ i ].node );
			}
		}

		// at last add the selected element
		// because last element in svg hierachy is always on top
		this.options[ n ].setSelected( true );
		this.node.appendChild( this.options[ n ].node );

	},

	onClick: function ( n ) {

		if ( this.collapsed ) {

			this.setCollapsed( false );

		} else {

			this.setSelected( n );
			this.setCollapsed( true );

		}

	},

	setCollapsed: function ( b ) {

		this.collapsed = b;

		if ( b ) {
			this.collapseTween.to( { value: 0 }, 300 ).easing( TWEEN.Easing.Back.In ).start();
		} else {
			this.collapseTween.to( { value: 100 }, 300 ).easing( TWEEN.Easing.Back.Out ).start();
		}

	},

	animate: function ( v ) {

		this.options.forEach( function ( option, i ) {
			option.animate( v );
		} );

	}

};

