ZUSE.Sheet = function ( name, type, x1, x2, y1, y2, level, spacing, intermediate, moving, file ) {

	ZUSE.Cyclable.call( this, name, x1, x2, y1, y2 );

	this.level = level;
	this.intermediate = intermediate;
	this.thickness = intermediate ? 10 : 3;
	this.moving = moving;

	var extrudeSettings = {	amount: this.thickness, bevelEnabled: false, steps: 1 };
	var geometry = ZUSE.Shapes.getShape( file, x1, y1 ).extrude( extrudeSettings );

	var material;

	if ( moving ) {

		material = ZUSE.Materials.MovingSheet.shader;

	} else if ( intermediate ) {

		material = ZUSE.Materials.IntermediateSheet.shader;

	} else {

		material = ZUSE.Materials.StaticSheet.shader;

	}

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.defaultMaterial = material;

	this.setHeight( level * spacing );

};

ZUSE.Sheet.prototype = new ZUSE.Cyclable();
ZUSE.Sheet.prototype.constructor = ZUSE.Sheet;

ZUSE.Sheet.prototype.setHeight = function ( z ) {

	this.mesh.position.z = z - this.thickness / 2;

};

ZUSE.Sheet.prototype.setHighlight = function ( bool ) {

	if ( bool && ZUSE.adderObj.cycleControl.highlightMoving ) {

		this.mesh.material = ZUSE.Materials.Highlight.shader;

	} else {

		this.mesh.material = this.mesh.defaultMaterial;

	}

};

