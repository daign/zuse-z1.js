THREE.Path.prototype.moveBy = function ( x, y ) {

	if ( this.actions.length === 1 ) {

		this.actions[ 0 ].args[ 0 ] += x;
		this.actions[ 0 ].args[ 1 ] += y;

	}

};

THREE.Path.prototype.lineBy = function ( x, y ) {

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	this.lineTo( x0 + x, y0 + y );

};

THREE.Path.prototype.stepSize = 0;

THREE.Path.prototype.setStepSize = function ( s ) {

	this.stepSize = Math.floor( Math.abs( s ) );

};

THREE.Path.prototype.stepBy = function ( x, y ) {

	if ( x != 0 && y != 0 ) {

		this.lineBy( x, y );

	} else if ( x != 0 && y == 0 ) {

		if ( this.stepSize == 0 ) {

			this.lineBy( x, 0 );

		} else {

			var distance = Math.abs( x );
			var sign = x / distance;

			var steps = Math.floor( distance / this.stepSize );
			for ( var i = 0; i < steps; i ++ ) {
				this.lineBy( this.stepSize * sign, 0 );
			}

			var remainder = distance % this.stepSize;
			if ( remainder != 0 ) {
				this.lineBy( remainder * sign, 0 );
			}

		}

	} else if ( x == 0 && y != 0 ) {

		if ( this.stepSize == 0 ) {

			this.lineBy( 0, y );

		} else {

			var distance = Math.abs( y );
			var sign = y / distance;

			var steps = Math.floor( distance / this.stepSize );
			for ( var i = 0; i < steps; i ++ ) {
				this.lineBy( 0, this.stepSize * sign );
			}

			var remainder = distance % this.stepSize;
			if ( remainder != 0 ) {
				this.lineBy( 0, remainder * sign );
			}

		}

	}

};

THREE.Path.prototype.quadraticCurveBy = function( aCPx, aCPy, aX, aY ) {

	var lastargs = this.actions[ this.actions.length - 1 ].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.QuadraticBezierCurve(	new THREE.Vector2(        x0,        y0 ),
												new THREE.Vector2( aCPx + x0, aCPy + y0 ),
												new THREE.Vector2(   aX + x0,   aY + y0 ) );
	this.curves.push( curve );

	var args = [ aCPx + x0, aCPy + y0, aX + x0, aY + y0 ];
	this.actions.push( { action: 'quadraticCurveTo', args: args } );

};

THREE.Path.prototype.arcBy = function ( x, y ) {

	var lastargs = this.actions[ this.actions.length - 1 ].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var distance = Math.abs( x + y );
	var sign = ( x + y ) / distance;

	var xM = x0 + x / 2;
	var yM = y0 + y / 2;
	var radius = - distance / 2;
	var startAngle = Math.PI * ( ( x !== 0 ? 1 : 2 ) - sign ) / 2;
	var endAngle   = Math.PI * ( ( x !== 0 ? 3 : 4 ) - sign ) / 2;

	var curve = new THREE.ArcCurve( xM, yM, radius, startAngle, endAngle, true );
	this.curves.push( curve );

	var args = [ xM, yM, radius, startAngle, endAngle, true, x0 + x, y0 + y ];
	this.actions.push( { action: 'arc', args: args } );

};

THREE.Path.prototype.quarterArc = function ( r ) {

	var lastargs = this.actions[ this.actions.length - 1 ].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var xM = x0 + r;
	var yM = y0;
	var radius = - r;
	var startAngle = 0;
	var endAngle   = Math.PI / 2;

	var curve = new THREE.ArcCurve( xM, yM, radius, startAngle, endAngle, true );
	this.curves.push( curve );

	var args = [ xM, yM, radius, startAngle, endAngle, true, x0 + r, y0 - r ];
	this.actions.push( { action: 'arc', args: args } );

};

THREE.Path.prototype.circle = function( radius ) {

	if ( this.actions.length === 1 ) {

		var xM = this.actions[ 0 ].args[ 0 ];
		var yM = this.actions[ 0 ].args[ 1 ];
		var startAngle = 0;
		var endAngle   = Math.PI * 2;

		this.actions[ 0 ].args[ 0 ] += radius;

		var curve = new THREE.ArcCurve( xM, yM, radius, startAngle, endAngle, true );
		this.curves.push( curve );

		var args = [ xM, yM, radius, startAngle, endAngle, true, xM + radius, yM ];
		this.actions.push( { action: 'arc', args: args } );

	}

};

