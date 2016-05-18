ZUSE.SelectionBoxFace = function ( axis, v0, v1, v2, v3, selection ) {

	axis.toString = function () { return this.a + this.d; };

	var frontFaceGeometry = new ZUSE.PlaneGeometry( v0, v1, v2, v3 );
	frontFaceGeometry.dynamic = true;
	selection.meshGeometries.push( frontFaceGeometry );

	var frontFaceMesh = new THREE.Mesh( frontFaceGeometry, ZUSE.Materials.Invisible );
	frontFaceMesh.axis = axis;
	frontFaceMesh.guardian = this;
	selection.touchMeshes.add( frontFaceMesh );
	selection.parent.selectables.push( frontFaceMesh );

	var backFaceGeometry = new ZUSE.PlaneGeometry( v3, v2, v1, v0 );
	backFaceGeometry.dynamic = true;
	selection.meshGeometries.push( backFaceGeometry );

	var backFaceMesh = new THREE.Mesh( backFaceGeometry, ZUSE.Materials.BoxBackFace );
	selection.displayMeshes.add( backFaceMesh );

	this.lines = new Array();

};

ZUSE.SelectionBoxFace.prototype = {

	constructor: ZUSE.SelectionBoxFace,

	rayOver: function () {
		this.highlightLines( true );
	},

	rayOut: function () {
		this.highlightLines( false );
	},

	highlightLines: function ( b ) {
		for ( var i = 0; i < this.lines.length; i++ ) {
			this.lines[ i ].setHighlight( b );
		}
	}

};

