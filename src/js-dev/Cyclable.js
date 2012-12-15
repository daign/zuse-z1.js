ZUSE.Cyclable = function ( name, x1, x2, y1, y2 ) {

	this.name = name;
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;

	this.position = 0;
	this.xMove = ( this.x1 < this.x2 ) ? true : false;
	this.yMove = ( this.y1 > this.y2 ) ? true : false;

};

ZUSE.Cyclable.prototype = {

	constructor: ZUSE.Cyclable,

	move: function ( tact, value ) {

		switch ( tact ) {

			case 1:

				this.mesh.position.y = -value;
				break;

			case 2:

				this.mesh.position.x = value;
				break;

			case 3:

				this.mesh.position.y = -10 + value;
				break;

			case 4:

				this.mesh.position.x = 10 - value;
				break;

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

