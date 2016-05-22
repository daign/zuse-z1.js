ZUSE.WebGL.Sheet = function ( node, params ) {

	var x = parseInt( node.getAttribute( 'x' ) );
	var y = parseInt( node.getAttribute( 'y' ) );

	if ( node.childElementCount > 0 ) {
		var anim = node.firstElementChild;
		var xMove = anim.getAttribute( 'x' ) === 'true';
		var yMove = anim.getAttribute( 'y' ) === 'true';
	}

	this.intermediate = params.intermediate;
	this.thickness = this.intermediate ? 10 : 3;

	var file = node.getAttribute( 'file' );
	this.level = ( this.intermediate ) ? 1.5 : 2 * parseInt( node.getAttribute( 'level' ) ) + 1;

	var extrudeSettings = {	amount: this.thickness, bevelEnabled: false, steps: 1 };
	var geometry = ZUSE.Shapes.getShape( file, x, y ).extrude( extrudeSettings );

	if ( xMove || yMove ) {

		this.material = ZUSE.Materials.MovingSheet.shader;

	} else if ( this.intermediate ) {

		this.material = ZUSE.Materials.IntermediateSheet.shader;

	} else {

		this.material = ZUSE.Materials.StaticSheet.shader;

	}

	this.mesh = new THREE.Mesh( geometry, this.material );
	this.mesh.guardian = this;

	this.setHeight( params.spacing );

};

ZUSE.WebGL.Sheet.prototype = {

	constructor: ZUSE.WebGL.Sheet,

	setHeight: function ( spacing ) {

		var z = this.level * spacing;
		this.mesh.position.z = z - this.thickness / 2;

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

	}

};

