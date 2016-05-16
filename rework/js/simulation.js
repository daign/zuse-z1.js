ZUSE.Simulation = function () {

	this.scene = undefined;
	this.capsScene = undefined;
	this.backStencil = undefined;
	this.frontStencil = undefined;

	this.camera = undefined;
	this.renderer = undefined;

	this.init();

};

ZUSE.Simulation.prototype = {

	constructor: ZUSE.Simulation,

	init: function () {

		this.camera = new THREE.PerspectiveCamera( 75, 8/4, 1, 1000 );
		this.camera.position.z = 50;
		this.camera.position.y = 20;
		this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

		this.capsScene = new THREE.Scene();

		var box = new THREE.BoxGeometry( 90, 12, 14 );
		var boxMesh = new THREE.Mesh( box, ZUSE.WEBGL.MATERIAL.cap );
		boxMesh.position.set( -15, 0, 0 );
		this.capsScene.add( boxMesh );

		var geometries = [
			new THREE.BoxGeometry( 20, 20, 20 ),
			new THREE.CylinderGeometry( 10, 10, 20, 16 ),
			new THREE.SphereGeometry( 10, 16, 16 ),
			new THREE.CylinderGeometry( 10, 10, 20, 16 ),
			new THREE.BoxGeometry( 20, 20, 20 )
		];

		this.scene = new THREE.Scene();

		var mesh0 = new THREE.Mesh( geometries[0], ZUSE.WEBGL.MATERIAL.sheet );
		mesh0.rotation.y = 0.4;
		this.scene.add( mesh0 );
		var mesh1 = new THREE.Mesh( geometries[1], ZUSE.WEBGL.MATERIAL.sheet );
		mesh1.position.x = -30;
		this.scene.add( mesh1 );
		var mesh2 = new THREE.Mesh( geometries[2], ZUSE.WEBGL.MATERIAL.sheet );
		mesh2.position.x = 30;
		this.scene.add( mesh2 );
		var mesh3 = new THREE.Mesh( geometries[3], ZUSE.WEBGL.MATERIAL.sheet );
		mesh3.position.x = 60;
		this.scene.add( mesh3 );
		var mesh4 = new THREE.Mesh( geometries[4], ZUSE.WEBGL.MATERIAL.sheet );
		mesh4.position.x = -60;
		this.scene.add( mesh4 );

		this.backStencil = new THREE.Scene();

		var mesh0 = new THREE.Mesh( geometries[0], ZUSE.WEBGL.MATERIAL.backStencil );
		mesh0.rotation.y = 0.4;
		this.backStencil.add( mesh0 );
		var mesh1 = new THREE.Mesh( geometries[1], ZUSE.WEBGL.MATERIAL.backStencil );
		mesh1.position.x = -30;
		this.backStencil.add( mesh1 );
		var mesh2 = new THREE.Mesh( geometries[2], ZUSE.WEBGL.MATERIAL.backStencil );
		mesh2.position.x = 30;
		this.backStencil.add( mesh2 );
		var mesh3 = new THREE.Mesh( geometries[3], ZUSE.WEBGL.MATERIAL.backStencil );
		mesh3.position.x = 60;
		this.backStencil.add( mesh3 );
		var mesh4 = new THREE.Mesh( geometries[4], ZUSE.WEBGL.MATERIAL.backStencil );
		mesh4.position.x = -60;
		this.backStencil.add( mesh4 );

		this.frontStencil = new THREE.Scene();

		var mesh0 = new THREE.Mesh( geometries[0], ZUSE.WEBGL.MATERIAL.frontStencil );
		mesh0.rotation.y = 0.4;
		this.frontStencil.add( mesh0 );
		var mesh1 = new THREE.Mesh( geometries[1], ZUSE.WEBGL.MATERIAL.frontStencil );
		mesh1.position.x = -30;
		this.frontStencil.add( mesh1 );
		var mesh2 = new THREE.Mesh( geometries[2], ZUSE.WEBGL.MATERIAL.frontStencil );
		mesh2.position.x = 30;
		this.frontStencil.add( mesh2 );
		var mesh3 = new THREE.Mesh( geometries[3], ZUSE.WEBGL.MATERIAL.frontStencil );
		mesh3.position.x = 60;
		this.frontStencil.add( mesh3 );
		var mesh4 = new THREE.Mesh( geometries[4], ZUSE.WEBGL.MATERIAL.frontStencil );
		mesh4.position.x = -60;
		this.frontStencil.add( mesh4 );

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( 800, 400 );
		this.renderer.setClearColor( 0xeeeeee );
		this.renderer.autoClear = false;

		document.body.appendChild( this.renderer.domElement );

		this.renderer.clear();

		var gl = this.renderer.context;

		this.renderer.state.setStencilTest( true );

		this.renderer.state.setStencilFunc( gl.ALWAYS, 1, 0xff );
		this.renderer.state.setStencilOp( gl.KEEP, gl.KEEP, gl.INCR );
		this.renderer.render( this.backStencil, this.camera );

		this.renderer.state.setStencilFunc( gl.ALWAYS, 1, 0xff );
		this.renderer.state.setStencilOp( gl.KEEP, gl.KEEP, gl.DECR );
		this.renderer.render( this.frontStencil, this.camera );

		this.renderer.state.setStencilFunc( gl.EQUAL, 1, 0xff );
		this.renderer.state.setStencilOp( gl.KEEP, gl.KEEP, gl.KEEP );
		this.renderer.render( this.capsScene, this.camera );

		this.renderer.state.setStencilTest( false );

		this.renderer.render( this.scene, this.camera );

	}

};

