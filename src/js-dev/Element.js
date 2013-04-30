ZUSE.Element = function ( name, spacing, intermediate, obj3d ) {

	this.name = name;
	this.position = 0;

	this.objects = [
		new ZUSE.WebGL.Sheet( spacing, intermediate, obj3d )
	];

	this.mesh = this.objects[ 0 ].mesh;

};

ZUSE.Element.prototype = {

	constructor: ZUSE.Element,

	setHeight: function ( z ) {

		for ( var i = 0; i < this.objects.length; i++ ) {
			this.objects[ i ].setHeight( z );
		}

	},

	setHighlight: function ( bool ) {

		for ( var i = 0; i < this.objects.length; i++ ) {
			this.objects[ i ].setHighlight( bool );
		}

	},

	move: function ( tact, value ) {

		for ( var i = 0; i < this.objects.length; i++ ) {
			this.objects[ i ].move( tact, value );
		}

	},

	changePosition: function ( tact ) {

		var p = this.position + 1;

		if ( p === tact ) {

			this.position = p % 4;

		} else if ( ( p % 4 ) + 1 === tact ) {

			this.position = ( p + 2 ) % 4;

		} else {

			console.warn( 'Unable to change position of ' + this.name + '.' );

		}

	},

	changePositionBack: function ( tact ) {

		var p = this.position;

		if ( p === ( tact % 4 ) ) {

			this.position = ( p + 3 ) % 4;

		} else if ( p === ( tact + 1 ) % 4 ) {

			this.position = ( p + 1 ) % 4;

		} else {

			console.warn( 'Unable to change position of ' + this.name + '.' );

		}

	}

};

