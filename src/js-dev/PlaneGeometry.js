ZUSE.PlaneGeometry = function ( v0, v1, v2, v3 ) {

	THREE.Geometry.call( this );

	this.vertices.push( v0, v1, v2, v3 );
	this.faces.push( new THREE.Face4( 0, 1, 2, 3 ) );

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

ZUSE.PlaneGeometry.prototype = new THREE.Geometry();
ZUSE.PlaneGeometry.prototype.constructor = ZUSE.PlaneGeometry;

