ZUSE.InitPicking = function () {

	ZUSE.INTERSECTED = undefined;
	ZUSE.SELECTED = undefined;

	ZUSE.mouse = new THREE.Vector2();
	ZUSE.offset = new THREE.Vector3();

	ZUSE.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ),
							new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
	ZUSE.plane.visible = false;
	SIMULATION.gui.webgl.scene.add( ZUSE.plane );

	ZUSE.projector = new THREE.Projector();

	SIMULATION.gui.webgl.renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	SIMULATION.gui.webgl.renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	SIMULATION.gui.webgl.renderer.domElement.addEventListener( 'mouseup',   onDocumentMouseUp,   false );
	SIMULATION.gui.webgl.renderer.domElement.addEventListener( 'mouseout',  onDocumentMouseOut,  false );

	function onDocumentMouseMove( event ) {

		var selectionActive = ZUSE.adderObj.selection.enabled;
		if( !selectionActive && !ZUSE.adderObj.selectables2enabled ) { return; }

		event.preventDefault();

		var offset = SIMULATION.gui.confinedSum();

		ZUSE.mouse.x = ( (event.clientX-offset) / (window.innerWidth-offset) ) * 2 - 1;
		ZUSE.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		var vector = new THREE.Vector3( ZUSE.mouse.x, ZUSE.mouse.y, 0.5 );
		ZUSE.projector.unprojectVector( vector, SIMULATION.gui.webgl.camera );

		var ray = new THREE.Ray( SIMULATION.gui.webgl.camera.position, vector.subSelf( SIMULATION.gui.webgl.camera.position ).normalize() );

		if ( ZUSE.SELECTED ) {

			var intersects = ray.intersectObject( ZUSE.plane );
			if ( intersects.length > 0 ) {
				var newPosition = intersects[ 0 ].point.subSelf( ZUSE.offset );
				ZUSE.adderObj.selection.setFromMouse( ZUSE.SELECTED.axis, newPosition[ ZUSE.SELECTED.axis.a ], true );
			}
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
					ZUSE.plane.lookAt( SIMULATION.gui.webgl.camera.position );

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
		ZUSE.projector.unprojectVector( vector, SIMULATION.gui.webgl.camera );

		var ray = new THREE.Ray( SIMULATION.gui.webgl.camera.position, vector.subSelf( SIMULATION.gui.webgl.camera.position ).normalize() );

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

	function onDocumentMouseOut( event ) {

		if ( ZUSE.INTERSECTED ) ZUSE.INTERSECTED.material = ZUSE.adderObj.selection.enabled ? ZUSE.Materials.BoxWireframe : ZUSE.INTERSECTED.defaultMaterial;
		ZUSE.INTERSECTED = null;
		ZUSE.SELECTED = null;

		document.body.style.cursor = 'auto';

	}

}

