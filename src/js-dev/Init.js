ZUSE.Initializer = function () {

var webGLSupport = ( function () {
	try {
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ) {
		return false;
	}
} )();

if ( ! webGLSupport ) {

	document.getElementById( 'webglError' ).style.display = 'block';

}

/* ehemals globale Variablen
ZUSE.container;
ZUSE.scene;
ZUSE.camera;
ZUSE.controls;
ZUSE.renderer;
ZUSE.adderObj;
ZUSE.projector;
ZUSE.INTERSECTED;
ZUSE.SELECTED;
ZUSE.plane;*/

ZUSE.INTERSECTED = undefined;
ZUSE.SELECTED = undefined;

ZUSE.mouse = new THREE.Vector2();
ZUSE.offset = new THREE.Vector3();

init();
animate();

function init() {

	ZUSE.container = document.getElementById( 'webgl_01' );
	ZUSE.scene = new THREE.Scene();

	ZUSE.camera = new THREE.PerspectiveCamera( 50, ( window.innerWidth - 20 ) / ( window.innerHeight - 20 ), 25, 2500 );
	ZUSE.camera.position.set( 0, 0, 500 );
	ZUSE.scene.add( ZUSE.camera );

	document.getElementById( 'log' ).addEventListener( 'mousewheel', stopScrollBubbling, false );
	document.getElementById( 'log' ).addEventListener( 'DOMMouseScroll', stopScrollBubbling, false );
	ZUSE.controls = new ZUSE.CameraControls( ZUSE.camera );
	ZUSE.controls.reset();

	ZUSE.adderObj = new ZUSE.Adder();

	ZUSE.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ),
							new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
	ZUSE.plane.visible = false;
	ZUSE.scene.add( ZUSE.plane );

	ZUSE.projector = new THREE.Projector();

	ZUSE.renderer = new THREE.WebGLRenderer( { antialias: true } );
	ZUSE.renderer.setSize( ( window.innerWidth ) , ( window.innerHeight ) );
	//ZUSE.renderer.setDepthTest( false );
	ZUSE.container.appendChild( ZUSE.renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup',   onDocumentMouseUp,   false );

	//renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	//renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	//renderer.domElement.addEventListener( 'mouseup',   onDocumentMouseUp,   false );
	window.addEventListener(              'resize',    onWindowResize,      false );

	document.getElementById( 'tabs-1' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'tabs-3' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'tabs-4' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'tabs-5' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'tabs-6' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'tabs-8' ).addEventListener( 'mousedown', stopScrollBubbling, false );
	document.getElementById( 'floatingCircuit' ).addEventListener( 'mousedown', stopScrollBubbling, false );

	document.addEventListener( 'selectstart', function(e){e.preventDefault();e.stopPropagation();}, false );

	var circuitDiv = document.getElementById( 'floatingCircuit' );
	circuitDiv.insertBefore( ZUSE.XMLUtils.loadXML( 'projects/adder/circuit.svg' ).lastChild, circuitDiv.childNodes[ 0 ] );

}

function onWindowResize() {

	ZUSE.camera.aspect = window.innerWidth / window.innerHeight;
	ZUSE.camera.updateProjectionMatrix();

	ZUSE.renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	render();
	TWEEN.update();

}

function render() {

	ZUSE.controls.update();
	ZUSE.renderer.render( ZUSE.scene, ZUSE.camera );

}

function onDocumentMouseMove( event ) {

	var selectionActive = ZUSE.adderObj.selection.enabled;
	if( !selectionActive && !ZUSE.adderObj.selectables2enabled ) { return; }

	event.preventDefault();

	ZUSE.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	ZUSE.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	var vector = new THREE.Vector3( ZUSE.mouse.x, ZUSE.mouse.y, 0.5 );
	ZUSE.projector.unprojectVector( vector, ZUSE.camera );

	var ray = new THREE.Ray( ZUSE.camera.position, vector.subSelf( ZUSE.camera.position ).normalize() );

	if ( ZUSE.SELECTED ) {

		var intersects = ray.intersectObject( ZUSE.plane );
		var newPosition = intersects[ 0 ].point.subSelf( ZUSE.offset );
		ZUSE.adderObj.selection.setFromMouse( ZUSE.SELECTED.axis, newPosition[ ZUSE.SELECTED.axis.a ], true );
		return;

	}

	var intersects = ray.intersectObjects( selectionActive ? ZUSE.adderObj.selectables : ZUSE.adderObj.selectables2 );

	if ( intersects.length > 0 ) {

		var candidate;

		if ( selectionActive ) { // selectionbox selection

			candidate = intersects[ 0 ].object;

		} else { // plate selection process

			var found = false;
			var count = 0;
			var limits = ZUSE.adderObj.selection.values;

			while ( !found && intersects[ count ] ) {

				var point = intersects[ count ].point;

				if ( 	point.x >= limits.x1 && point.x <= limits.x2 &&
						point.y >= limits.y1 && point.y <= limits.y2 &&
						point.z >= limits.z1 && point.z <= limits.z2 ) {

					candidate = intersects[ count ].object;
					found = true;

				} // else something has been skipped from beeing selected

				count++;

			}

		}

		if ( candidate !== undefined ) {

			if ( ZUSE.INTERSECTED != candidate ) {

				if ( ZUSE.INTERSECTED ) ZUSE.INTERSECTED.material = selectionActive ? ZUSE.Materials.BoxWireframe : ZUSE.INTERSECTED.defaultMaterial;

				ZUSE.INTERSECTED = intersects[ 0 ].object;
				ZUSE.INTERSECTED.material = selectionActive ? ZUSE.Materials.BoxWireActive : ZUSE.Materials.Highlight.shader;

				ZUSE.plane.position.copy( ZUSE.INTERSECTED.position );
				ZUSE.plane.lookAt( ZUSE.camera.position );

			}

			document.body.style.cursor = 'pointer';

		} else {

			// found no candidate because of visible range
			if ( ZUSE.INTERSECTED ) ZUSE.INTERSECTED.material = selectionActive ? ZUSE.Materials.BoxWireframe : ZUSE.INTERSECTED.defaultMaterial;

			ZUSE.INTERSECTED = null;

			document.body.style.cursor = 'auto';

		}

	} else { // really found nothing

		if ( ZUSE.INTERSECTED ) ZUSE.INTERSECTED.material = selectionActive ? ZUSE.Materials.BoxWireframe : ZUSE.INTERSECTED.defaultMaterial;

		ZUSE.INTERSECTED = null;

		document.body.style.cursor = 'auto';

	}

}

function onDocumentMouseDown( event ) {

	if ( !ZUSE.adderObj.selection.enabled ) { return; }

	event.preventDefault();

	var vector = new THREE.Vector3( ZUSE.mouse.x, ZUSE.mouse.y, 0.5 );
	ZUSE.projector.unprojectVector( vector, ZUSE.camera );

	var ray = new THREE.Ray( ZUSE.camera.position, vector.subSelf( ZUSE.camera.position ).normalize() );

	var intersects = ray.intersectObjects( ZUSE.adderObj.selectables );

	if ( intersects.length > 0 ) {

		ZUSE.SELECTED = intersects[ 0 ].object;
		ZUSE.adderObj.selection.dragStart( ZUSE.SELECTED.axis );

		var intersects = ray.intersectObject( ZUSE.plane );
		ZUSE.offset.copy( intersects[ 0 ].point ).subSelf( ZUSE.plane.position );

		document.body.style.cursor = 'move';

	}

}

function onDocumentMouseUp( event ) {

	if ( !ZUSE.adderObj.selection.enabled ) { return; }

	event.preventDefault();

	if ( ZUSE.INTERSECTED ) {

		ZUSE.plane.position.copy( ZUSE.INTERSECTED.position );

		ZUSE.SELECTED = null;

	}

	document.body.style.cursor = 'pointer';

}


function stopScrollBubbling( event ) {

	event.stopPropagation();

}

}

