ZUSE.WebGL.Sheet = function ( spacing, intermediate, obj3d ) {

	var x = parseInt( obj3d.getAttribute( 'x' ) );
	var y = parseInt( obj3d.getAttribute( 'y' ) );

	if ( obj3d.childElementCount > 0 ) {
		var anim = obj3d.firstElementChild;
		var xMove = anim.getAttribute( 'x' ) === 'true';
		var yMove = anim.getAttribute( 'y' ) === 'true';
	}

	this.intermediate = intermediate;
	this.thickness = intermediate ? 10 : 3;

	var file = obj3d.getAttribute( 'file' );
	this.level = ( this.intermediate ) ? 1.5 : 2 * parseInt( obj3d.getAttribute( 'level' ) ) + 1;

	var extrudeSettings = {	amount: this.thickness, bevelEnabled: false, steps: 1 };
	var geometry = ZUSE.Shapes.getShape( file, x, y ).extrude( extrudeSettings );

	var material;

	if ( xMove || yMove ) {

		material = ZUSE.Materials.MovingSheet.shader;

	} else if ( intermediate ) {

		material = ZUSE.Materials.IntermediateSheet.shader;

	} else {

		material = ZUSE.Materials.StaticSheet.shader;

	}

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.defaultMaterial = material;

	this.setHeight( this.level * spacing );

};

ZUSE.WebGL.Sheet.prototype = {

	constructor: ZUSE.WebGL.Sheet,

	setHeight: function ( z ) {

		this.mesh.position.z = z - this.thickness / 2;

	},

	setHighlight: function ( bool ) {

		if ( bool && ZUSE.adderObj.cycleControl.highlightMoving ) {

			this.mesh.material = ZUSE.Materials.Highlight.shader;

		} else {

			this.mesh.material = this.mesh.defaultMaterial;

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

