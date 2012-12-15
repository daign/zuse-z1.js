ZUSE.Pin = function ( name, x1, x2, y1, y2, l1, l2, spacing, radius, moving ) {

	ZUSE.Cyclable.call( this, name, x1, x2, y1, y2 );

	this.l1 = l1;
	this.l2 = l2;
	this.moving = moving;

	var arcShape = new THREE.Shape();
	arcShape.moveTo( x1, y1 );

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

	var material = moving ? ZUSE.Materials.MovingPin.shader : ZUSE.Materials.StaticPin.shader;

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.defaultMaterial = material;

	this.setHeight( l1 * spacing, l2 * spacing );

};

ZUSE.Pin.prototype = new ZUSE.Cyclable();
ZUSE.Pin.prototype.constructor = ZUSE.Pin;

ZUSE.Pin.prototype.setHeight = function ( z1, z2 ) {

	this.mesh.position.z = z1;
	this.mesh.scale.z = z2 - z1;

};

ZUSE.Pin.prototype.setHighlight = function ( bool ) {

	if ( bool && ZUSE.adderObj.cycleControl.highlightMoving ) {

		this.mesh.material = ZUSE.Materials.Highlight.shader;

	} else {

		this.mesh.material = this.mesh.defaultMaterial;

	}

};

/*ZUSE.Pin.prototype.setTransparency = function ( bool ) {

	if ( bool ) {

		this.mesh.material.opacity = 0.7;
		this.mesh.material.transparent = true;

	} else {

		this.mesh.material.opacity = 1;
		this.mesh.material.transparent = false;

	}

};*/

