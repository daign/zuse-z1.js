ZUSE.GUI.WebGL = function () {

	var self = this;

	this.div = document.createElement( 'div' );
	this.div.style.position   = 'absolute';
	this.div.style.top        = '0px';
	this.div.style.background = '#fff';
	document.body.appendChild( this.div );

	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	//this.renderer.setDepthTest( false );
	this.div.appendChild( this.renderer.domElement );

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera( 50, 1, 1, 2500 );
	this.camera.controls = new ZUSE.CameraControls( this.camera, this.renderer.domElement );
	this.camera.controls.reset();
	this.scene.add( this.camera );

	animate();

	function animate() {

		requestAnimationFrame( animate );

		self.camera.controls.update();
		self.renderer.render( self.scene, self.camera );

		TWEEN.update();

	}

};

ZUSE.GUI.WebGL.prototype = {

	constructor: ZUSE.GUI.WebGL,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.div.style.left   = left   + 'px';

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( width, height );

	}

};

