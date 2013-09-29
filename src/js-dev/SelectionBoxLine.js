ZUSE.SelectionBoxLine = function ( v0, v1, f0, f1, selection ) {

	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( v0, v1 );
	lineGeometry.computeLineDistances();
	lineGeometry.dynamic = true;
	selection.lineGeometries.push( lineGeometry );

	this.line = new THREE.Line( lineGeometry, ZUSE.Materials.BoxWireframe, THREE.LinePieces );
	selection.displayMeshes.add( this.line );

	f0.lines.push( this );
	f1.lines.push( this );

};

ZUSE.SelectionBoxLine.prototype = {

	constructor: ZUSE.SelectionBoxLine,

	setHighlight: function ( b ) {
		this.line.material = b ? ZUSE.Materials.BoxWireActive : ZUSE.Materials.BoxWireframe;
	}

};

