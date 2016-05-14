var ZUSE = {};

ZUSE.Simulation = function () {

	this.scene = undefined;
	this.camera = undefined;
	this.renderer = undefined;

	this.init();

};

ZUSE.Simulation.prototype = {

	constructor: ZUSE.Simulation,

	init: function () {

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 75, 8/4, 1, 1000 );
		this.camera.position.z = 50;
		this.camera.position.y = 20;
		this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

		var uniforms = {
			color:        { type: "c",  value: new THREE.Color( 0x3d9ecb ) },
			clippingLow:  { type: "v3", value: new THREE.Vector3( -20, -20, -20 ) },
			clippingHigh: { type: "v3", value: new THREE.Vector3(   6,   7,  20 ) }
		};

		var material = new THREE.ShaderMaterial( {
			uniforms:       uniforms,
			vertexShader:   document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			side:           THREE.DoubleSide
		} );

		var g1 = new THREE.BoxGeometry( 20, 20, 20 );
		var mesh1 = new THREE.Mesh( g1, material );
		mesh1.rotation.y = 0.4;
		this.scene.add( mesh1 );

		var g2 = new THREE.CylinderGeometry( 10, 10, 20, 16 );
		var mesh2 = new THREE.Mesh( g2, material );
		mesh2.position.x = -30;
		this.scene.add( mesh2 );

		var g3 = new THREE.SphereGeometry( 10, 16, 16 );
		var mesh3 = new THREE.Mesh( g3, material );
		mesh3.position.x = 30;
		this.scene.add( mesh3 );

		var g4 = new THREE.CylinderGeometry( 10, 10, 20, 16 );
		var mesh4 = new THREE.Mesh( g4, material );
		mesh4.position.x = 60;
		this.scene.add( mesh4 );

		var g5 = new THREE.BoxGeometry( 20, 20, 20 );
		var mesh5 = new THREE.Mesh( g5, material );
		mesh5.position.x = -60;
		this.scene.add( mesh5 );

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( 800, 400 );
		this.renderer.setClearColor( 0xeeeeee );

		document.body.appendChild( this.renderer.domElement );

		this.renderer.render( this.scene, this.camera );

	}

};

