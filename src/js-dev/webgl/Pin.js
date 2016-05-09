ZUSE.WebGL.Pin = function ( node, params ) {

	var x = parseInt( node.getAttribute( 'x' ) );
	var y = parseInt( node.getAttribute( 'y' ) );
	this.l1 = parseInt( node.getAttribute( 'l1' ) );
	this.l2 = parseInt( node.getAttribute( 'l2' ) );

	if ( node.childElementCount > 0 ) {
		var anim = node.firstElementChild;
		var xMove = anim.getAttribute( 'x' ) === 'true';
		var yMove = anim.getAttribute( 'y' ) === 'true';
		if ( isNaN( this.l1 ) ) { this.l1 = 0; } else { this.l1 = this.l1*2; }
		if ( isNaN( this.l2 ) ) { this.l2 = 2 * params.levels; } else { this.l2 = 2*this.l2+2; }
	} else {
		if ( isNaN( this.l1 ) ) { this.l1 = 0; }
		if ( isNaN( this.l2 ) ) { this.l2 = 2 * params.levels; }
	}

	var radius = parseInt( node.getAttribute( 'radius' ) ) || 4;

	var arcShape = new THREE.Shape();
	arcShape.moveTo( x, y );

	switch ( radius ) {

		case 4:

			arcShape.moveBy( 5, 5 );
			arcShape.circle( 4 );
			break;

		case 6:

			arcShape.moveBy( 10, 10 );
			arcShape.circle( 6 );
			break;

	}

	var extrudeSettings = {	amount: 1, bevelEnabled: false, steps: 1 };
	var geometry = arcShape.extrude( extrudeSettings );

	this.material = ( xMove || yMove ) ? ZUSE.Materials.MovingPin.shader : ZUSE.Materials.StaticPin.shader;

	this.mesh = new THREE.Mesh( geometry, this.material );
	this.mesh.guardian = this;

	this.setHeight( params.spacing );

};

ZUSE.WebGL.Pin.prototype = {

	constructor: ZUSE.WebGL.Pin,

	setHeight: function ( spacing ) {

		var z1 = this.l1 * spacing;
		var z2 = this.l2 * spacing;

		this.mesh.position.z = z1;
		this.mesh.scale.z = z2 - z1;

	},

	setHighlight: function ( bool ) {

		if ( bool && ZUSE.adderObj.cycleControl.highlightMoving ) {

			this.mesh.material = ZUSE.Materials.Highlight.shader;

		} else {

			this.mesh.material = this.material;

		}

	},

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

	rayOver: function () {
		this.mesh.material = ZUSE.Materials.Highlight.shader;
	},

	rayOut: function () {
		this.mesh.material = this.material;
	}

};

