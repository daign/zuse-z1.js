ZUSE.Shapes = {

	paths: new Object(),

	parsePath: function ( pathElement ) {

		var path = { commands: new Array() };

		if ( pathElement.tagName === 'circle' ) {

			var x = parseInt( pathElement.getAttribute( 'cx' ) );
			var y = parseInt( pathElement.getAttribute( 'cy' ) );
			var r = parseInt( pathElement.getAttribute( 'r' ) );

			path.stepSize = 10;
			path.commands.push( [ 'M', x, y ] );
			path.commands.push( [ 'c', r ] );

		} else {

			path.stepSize = parseInt( pathElement.getAttribute( 'stepSize' ) );

			var dataRaw = pathElement.getAttribute( 'd' ).split( ' ' );
			var dataMode;

			for ( var i = 0; i < dataRaw.length; i++ ) {

				if ( dataRaw[ i ].length === 1 ) {

					dataMode = dataRaw[ i ];

				} else {

					var valuesRaw = dataRaw[ i ].split( ',' );

					switch ( dataMode ) {

						case 'M':

							path.commands.push( [ 'M', parseInt( valuesRaw[ 0 ] ), parseInt( valuesRaw[ 1 ] ) ] );
							break;

						case 'l':

							path.commands.push( [ 'l', parseInt( valuesRaw[ 0 ] ), parseInt( valuesRaw[ 1 ] ) ] );
							break;

						case 'a':

							var v1 = parseInt( valuesRaw[ 5 ] );
							var v2 = parseInt( valuesRaw[ 6 ] );

							if ( v1 === 0 || v2 === 0 ) {

								path.commands.push( [ 'a', v1, v2 ] );

							} else {

								path.commands.push( [ 'b', v1 ] );

							}

							break;

						case 'q':

							var v1 = parseInt( valuesRaw[ 0 ] );
							var v2 = parseInt( valuesRaw[ 1 ] );
							var v3 = parseInt( valuesRaw[ 2 ] );
							var v4 = parseInt( valuesRaw[ 3 ] );
							path.commands.push( [ 'q', v1, v2, v3, v4 ] );
							break;

					}

				}

			}

		}

		return path;

	},

	addPath: function ( type ) {

		var xmlDoc = ZUSE.XMLUtils.loadXML( 'projects/adder/sheets/' + ZUSE.ShapeFiles[ type ] + '.svg' );

		var defs = xmlDoc.documentElement.firstElementChild.nextElementSibling;

		for ( var i = 1; i < defs.childNodes.length; i+=2 ) {

			var holeKey = '#' + defs.childNodes[ i ].getAttribute( 'id' );

			if ( this.paths[ holeKey ] === undefined ) {

				this.paths[ holeKey ] = this.parsePath( defs.childNodes[ i ] );

			}

		}

		var pathGroup = xmlDoc.documentElement.lastElementChild;
		var path = this.parsePath( pathGroup.firstElementChild );

		var holesGroup = pathGroup.lastElementChild;
		path.holes = new Array();

		for ( var i = 1; i < holesGroup.childNodes.length; i+=2 ) {

			var href = holesGroup.childNodes[ i ].href.baseVal;
			var x = parseInt( holesGroup.childNodes[ i ].getAttribute( 'x' ) );
			var y = parseInt( holesGroup.childNodes[ i ].getAttribute( 'y' ) );

			path.holes.push( [ href, x, y ] );

		}

		this.paths[ type ] = path;

	},

	executeCommands: function ( shape, commands ) {

		for ( var i = 0; i < commands.length; i++ ) {

			switch ( commands[ i ][ 0 ] ) {

				case 'M':

					shape.moveBy( commands[ i ][ 1 ], commands[ i ][ 2 ] );
					break;

				case 'l':

					shape.stepBy( commands[ i ][ 1 ], commands[ i ][ 2 ] );
					break;

				case 'a':

					shape.arcBy( commands[ i ][ 1 ], commands[ i ][ 2 ] );
					break;

				case 'b':

					shape.quarterArc( commands[ i ][ 1 ] );
					break;

				case 'c':

					shape.circle( commands[ i ][ 1 ] );
					break;

				case 'q':

					shape.quadraticCurveBy( commands[ i ][ 1 ], commands[ i ][ 2 ], commands[ i ][ 3 ], commands[ i ][ 4 ] );
					break;

			}

		}

	},

	drawShape: function ( path, x, y ) {

		var shape = new THREE.Shape();
		shape.moveTo( x, y );
		shape.setStepSize( path.stepSize );
		this.executeCommands( shape, path.commands );

		for ( var i = 0; i < path.holes.length; i++ ) {

			var holePath = new THREE.Path();
			holePath.moveTo( x + path.holes[ i ][ 1 ], y + path.holes[ i ][ 2 ] );

			var holePathSource = this.paths[ path.holes[ i ][ 0 ] ];
			holePath.setStepSize( holePathSource.stepSize );
			this.executeCommands( holePath, holePathSource.commands );

			shape.holes.push( holePath );

		}

		return shape;

	},

	getShape: function ( type, x, y ) {

		if ( this.paths[ type ] === undefined ) {

			this.addPath( type );

		}

		return this.drawShape( this.paths[ type ], x, y );

	}

};

