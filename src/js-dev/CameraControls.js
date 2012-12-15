ZUSE.CameraControls = function ( camera ) {

	var control = this;
	var STATE = { NONE : -1, ROTATE : 0, PAN : 1 };
	var state = STATE.NONE;

	this.screen = { width: window.innerWidth,
					height: window.innerHeight,
					offsetLeft: 0,
					offsetTop: 0 };
	this.radius = ( this.screen.width + this.screen.height ) / 4;

	this.rotateSpeed = 1.0;
	this.panSpeed = 0.8;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.camera = camera;
	this.target = new THREE.Vector3();

	var displacement = new THREE.Vector3(),
	rotateStart = new THREE.Vector3(),
	rotateEnd = new THREE.Vector3(),
	panStart = new THREE.Vector2(),
	panEnd = new THREE.Vector2();

	var zoomFactor;

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {
			this[ event.type ]( event );
		}

	};

	this.getMouseOnScreen = function ( clientX, clientY ) {

		return new THREE.Vector2(
			( clientX - this.screen.offsetLeft ) / this.radius * 0.5,
			( clientY - this.screen.offsetTop ) / this.radius * 0.5
		);

	};

	this.getMouseProjectionOnBall = function ( clientX, clientY ) {

		var mouseOnBall = new THREE.Vector3(
			( clientX - this.screen.width * 0.5 - this.screen.offsetLeft ) / this.radius,
			( this.screen.height * 0.5 + this.screen.offsetTop - clientY ) / this.radius,
			0.0
		);

		var length = mouseOnBall.length();

		if ( length > 1.0 ) {

			mouseOnBall.normalize();

		} else {

			mouseOnBall.z = Math.sqrt( 1.0 - length * length );

		}

		displacement.copy( this.camera.position ).subSelf( this.target );

		var projection = this.camera.up.clone().setLength( mouseOnBall.y );
		projection.addSelf( this.camera.up.clone().crossSelf( displacement ).setLength( mouseOnBall.x ) );
		projection.addSelf( displacement.setLength( mouseOnBall.z ) );

		return projection;

	};

	this.rotateCamera = function () {

		var angle = Math.acos( rotateStart.dot( rotateEnd ) /
					rotateStart.length() /
					rotateEnd.length() );

		if ( angle ) {

			var axis = ( new THREE.Vector3() ).cross( rotateStart, rotateEnd ).normalize();

			angle *= this.rotateSpeed;

			var quaternion = new THREE.Quaternion();
			quaternion.setFromAxisAngle( axis, -angle );

			quaternion.multiplyVector3( displacement );
			quaternion.multiplyVector3( this.camera.up );
			quaternion.multiplyVector3( rotateEnd );

			quaternion.setFromAxisAngle( axis, angle * ( this.dynamicDampingFactor - 1.0 ) );
			quaternion.multiplyVector3( rotateStart );

		}

	};

	this.zoomCamera = function () {

		var factor = 1.0 - zoomFactor / 10;

		if ( factor != 1.0 && factor > 0.0 ) {

			//displacement.multiplyScalar( factor );
			this.target.addSelf( displacement.clone().normalize().multiplyScalar( zoomFactor * -30 ) );

		}

		zoomFactor *= 0.5;

	};

	this.panCamera = function () {

		var mouseChange = panEnd.clone().subSelf( panStart );

		if ( mouseChange.lengthSq() > 0 ) {

			mouseChange.multiplyScalar( displacement.length() * this.panSpeed );

			var pan = displacement.clone().crossSelf( this.camera.up ).setLength( mouseChange.x );
			pan.addSelf( this.camera.up.clone().setLength( mouseChange.y ) );

			this.camera.position.addSelf( pan );
			this.target.addSelf( pan );

			panStart.addSelf( mouseChange.sub( panEnd, panStart ).multiplyScalar( this.dynamicDampingFactor ) );

		}

	};

	this.levelCamera = function () {

		var start = this.camera.up.clone();
		var end = ( new THREE.Vector3( 0, 1, 0 ) ).crossSelf( displacement ).crossSelf( displacement ).negate();

		var angle = Math.acos( start.dot( end ) / start.length() / end.length() );

		if ( angle ) {

			var axis = displacement.clone().normalize();
			var sign = ( start.clone().crossSelf( end ).dot( displacement ) >= 0 ) ? 1 : -1;

			var quaternion = new THREE.Quaternion();
			quaternion.setFromAxisAngle( axis, sign * angle );
			quaternion.multiplyVector3( this.camera.up );

		}

	};

	this.checkDistances = function () {

		if ( this.camera.position.lengthSq() > this.maxDistance * this.maxDistance ) {
			this.camera.position.setLength( this.maxDistance );
		}

		if ( displacement.lengthSq() < this.minDistance * this.minDistance ) {
			this.camera.position.add( this.target, displacement.setLength( this.minDistance ) );
		}

	};

	this.update = function () {

		displacement.copy( this.camera.position ).subSelf( this.target );

		this.zoomCamera();
		this.rotateCamera();
		this.panCamera();
		//this.levelCamera();

		this.camera.position.add( this.target, displacement );
		this.checkDistances();
		this.camera.lookAt( this.target );

	};

/*	this.log = function () {

		console.log(    this.camera.position.x + ', ' +
						this.camera.position.y + ', ' +
						this.camera.position.z + ' | ' +
						this.target.x + ', ' +
						this.target.y + ', ' +
						this.target.z + ' | ' +
						this.camera.up.x + ', ' +
						this.camera.up.y + ', ' +
						this.camera.up.z );

	};*/

	this.reset = function () {

		this.camera.position.set( 400, -400, 400 );
		this.target.set(          140,  120, 160 );
		this.camera.up.set(         0,    0,   1 );

	};

	function mousedown( event ) {

		if ( event.button === 0 && !ZUSE.INTERSECTED ) {

			event.preventDefault();
			event.stopPropagation();

			if ( event.shiftKey ) {

				state = STATE.PAN;
				panStart = panEnd = control.getMouseOnScreen( event.clientX, event.clientY );

			} else {

				state = STATE.ROTATE;
				rotateStart = rotateEnd = control.getMouseProjectionOnBall( event.clientX, event.clientY );

			}

		}

	};

	function mousemove( event ) {

		if ( state == STATE.ROTATE ) {

			rotateEnd = control.getMouseProjectionOnBall( event.clientX, event.clientY );

		} else if ( state == STATE.PAN ) {

			panEnd = control.getMouseOnScreen( event.clientX, event.clientY );

		}

	};

	function mouseup( event ) {

		event.preventDefault();
		event.stopPropagation();

		state = STATE.NONE;

	};

	function mousewheel( event ) {

		if ( state == STATE.NONE ) {

			if ( event.wheelDelta ) {

				zoomFactor = ( event.wheelDelta >= 0 ) ? 1 : -1;

			} else if ( event.detail ) {

				zoomFactor = ( event.detail <= 0 ) ? 1 : -1;

			}

		}

	};

	//var glwindow = document.getElementById('webgl_01');
	window.addEventListener( 'mousedown',  mousedown,  false );
	window.addEventListener( 'mousemove',  mousemove,  false );
	window.addEventListener( 'mouseup',    mouseup,    false );
	window.addEventListener( 'mousewheel', mousewheel, false );
	window.addEventListener( 'DOMMouseScroll', mousewheel, false );

};

