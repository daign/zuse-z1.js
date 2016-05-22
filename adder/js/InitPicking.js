ZUSE.InitPicking = function () {

	ZUSE.INTERSECTED = undefined;
	ZUSE.SELECTED = undefined;

	ZUSE.mouse = new THREE.Vector2();
	ZUSE.offset = new THREE.Vector3();

	ZUSE.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), ZUSE.Materials.Invisible );
	ZUSE.gui.webgl.scene.add( ZUSE.plane );

	ZUSE.gui.webgl.renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	ZUSE.gui.webgl.renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	ZUSE.gui.webgl.renderer.domElement.addEventListener( 'mouseup',   onDocumentMouseUp,   false );
	ZUSE.gui.webgl.renderer.domElement.addEventListener( 'mouseout',  onDocumentMouseOut,  false );

	function onDocumentMouseMove( event ) {

		var selectionActive = ZUSE.adderObj.selection.enabled;
		if( !selectionActive ) { return; }

		event.preventDefault();

		var offset = ZUSE.gui.confinedSum();

		ZUSE.mouse.x = ( (event.clientX-offset) / (window.innerWidth-offset) ) * 2 - 1;
		ZUSE.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		var ray = new THREE.Raycaster();
		ray.setFromCamera( ZUSE.mouse, ZUSE.gui.webgl.camera );	

		if ( ZUSE.SELECTED ) {

			var intersects = ray.intersectObject( ZUSE.plane );
			if ( intersects.length > 0 ) {
				var newPosition = intersects[ 0 ].point.sub( ZUSE.offset );
				ZUSE.adderObj.selection.setFromMouse( ZUSE.SELECTED.axis, newPosition[ ZUSE.SELECTED.axis.a ], true );
			}
			return;

		}

		var intersects = ray.intersectObjects( ZUSE.adderObj.selectables );

		if ( intersects.length > 0 ) {

			var candidate = intersects[ 0 ].object;

			if ( ZUSE.INTERSECTED != candidate ) {

				if ( ZUSE.INTERSECTED && ZUSE.INTERSECTED.guardian ) {
					ZUSE.INTERSECTED.guardian.rayOut();
				}

				ZUSE.INTERSECTED = intersects[ 0 ].object;
				if ( ZUSE.INTERSECTED && ZUSE.INTERSECTED.guardian ) {
					ZUSE.INTERSECTED.guardian.rayOver();
				}

				ZUSE.plane.position.copy( ZUSE.INTERSECTED.position );
				ZUSE.plane.lookAt( ZUSE.gui.webgl.camera.position );

			}

			document.body.style.cursor = 'pointer';

		} else {

			if ( ZUSE.INTERSECTED && ZUSE.INTERSECTED.guardian ) {
				ZUSE.INTERSECTED.guardian.rayOut();
			}

			ZUSE.INTERSECTED = null;

			document.body.style.cursor = 'auto';

		}

	}

	function onDocumentMouseDown( event ) {

		if ( !ZUSE.adderObj.selection.enabled ) { return; }

		event.preventDefault();

		var ray = new THREE.Raycaster();
		ray.setFromCamera( ZUSE.mouse, ZUSE.gui.webgl.camera );	

		var intersects = ray.intersectObjects( ZUSE.adderObj.selectables );

		if ( intersects.length > 0 ) {

			ZUSE.SELECTED = intersects[ 0 ].object;
			ZUSE.adderObj.selection.dragStart( ZUSE.SELECTED.axis );

			var intersects = ray.intersectObject( ZUSE.plane );
			if ( intersects.length > 0 ) {
				ZUSE.offset.copy( intersects[ 0 ].point ).sub( ZUSE.plane.position );
			}

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

		if ( ZUSE.INTERSECTED && ZUSE.INTERSECTED.guardian ) {
			ZUSE.INTERSECTED.guardian.rayOut();
		}
		ZUSE.INTERSECTED = null;
		ZUSE.SELECTED = null;

		document.body.style.cursor = 'auto';

	}

}

