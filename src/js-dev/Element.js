ZUSE.Element = function ( name, elementNode, params ) {

	this.name = name;
	this.position = 0;

	this.mesh = new THREE.Object3D();
	this.objects = [];
	this.parseObjects( elementNode, params );

};

ZUSE.Element.prototype = {

	constructor: ZUSE.Element,

	parseObjects: function ( elementNode, params ) {

		var obj3dArray = elementNode.getElementsByTagName( 'obj3d' );
		for ( var i = 0; i < obj3dArray.length; i++ ) {
			var obj3d = new ZUSE.WebGL[ obj3dArray[ i ].getAttribute( 'type' ) ]( obj3dArray[ i ], params );
			this.objects.push( obj3d );
			this.mesh.add( obj3d.mesh );
			this.selectable = obj3d.mesh; // :(
		}

		var svgArray = elementNode.getElementsByTagName( 'svg' );
		for ( var i = 0; i < svgArray.length; i++ ) {
			var svg = new ZUSE.SVG[ svgArray[ i ].getAttribute( 'type' ) ]( svgArray[ i ] );
			//this.objects.push( svg );
		}

	},

	distribute: function ( func, args ) {

		for ( var i = 0; i < this.objects.length; i++ ) {
			if ( this.objects[ i ][ func ] ) {
				this.objects[ i ][ func ].apply( this.objects[ i ], args );
			}
		}

	},

	setHeight: function ( spacing ) { this.distribute( 'setHeight', [ spacing ] ); },
	setHighlight: function ( bool ) { this.distribute( 'setHighlight', [ bool ] ); },
	move: function ( tact, value ) { this.distribute( 'move', [ tact, value ] ); },

	changePosition: function ( tact ) {

		var p = this.position + 1;

		if ( p === tact ) {

			this.position = p % 4;

		} else if ( ( p % 4 ) + 1 === tact ) {

			this.position = ( p + 2 ) % 4;

		} else {

			console.warn( 'Unable to change position of ' + this.name + '.' );

		}

		this.distribute( 'setPosition', [ this.position ] );

	},

	changePositionBack: function ( tact ) {

		var p = this.position;

		if ( p === ( tact % 4 ) ) {

			this.position = ( p + 3 ) % 4;

		} else if ( p === ( tact + 1 ) % 4 ) {

			this.position = ( p + 1 ) % 4;

		} else {

			console.warn( 'Unable to change position of ' + this.name + '.' );

		}

	},

	provideMeshTo: function ( collector ) {

		collector.push( this.selectable );

	}

};

