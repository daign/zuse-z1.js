ZUSE.Layer = function ( layerNode, layerDefaults, s, p ) {

	this.parent = p;
	this.type = layerNode.getAttribute( 'id' );
	this.levels = layerNode.getAttribute( 'levels' );
	this.spacing = layerNode.getAttribute( 'spacing' ) || s;
	this.intermediate = layerNode.getAttribute( 'intermediate' ) === 'true';

	this.open = false;
	this.meshes = new THREE.Object3D();
	this.sheets = new Array();
	this.pins = new Array();
	this.cycleAccess = new Object();

	this.parseElements( layerNode );
	this.parseElements( layerDefaults );

};

ZUSE.Layer.prototype = {

	constructor: ZUSE.Layer,

	parseElements: function ( node ) {

		var elements = node.getElementsByTagName( 'elem' );

		for ( var i = 0; i < elements.length; i++ ) {

			var id = elements[ i ].getAttribute( 'id' );
			var obj3d = elements[ i ].firstElementChild;
			switch ( obj3d.getAttribute( 'type' ) ) {
				case 'Sheet':
					this.addSheet( id, obj3d );
					break;
				case 'Pin':
					var x = parseInt( obj3d.getAttribute( 'x' ) );
					var y = parseInt( obj3d.getAttribute( 'y' ) );
					var z1 = parseInt( obj3d.getAttribute( 'z1' ) );
					var z2 = parseInt( obj3d.getAttribute( 'z2' ) );
					var radius = parseInt( obj3d.getAttribute( 'radius' ) ) || 4;
					var pulser = elements[ i ].getAttribute( 'pulser' );
					if ( obj3d.childElementCount > 0 ) {
						var anim = obj3d.firstElementChild;
						var x2 = ( anim.getAttribute( 'x' ) === 'true' ) ? x+10 : x;
						var y2 = ( anim.getAttribute( 'y' ) === 'true' ) ? y-10 : y;
						this.addMovingPin(x, x2, y, y2, id, z1, z2, radius, pulser );
					} else {
						this.addStaticPin( x, y, z1, z2, radius, pulser );
					}
					break;
			}

		}

	},

	addSheet: function ( id, obj3d ) {

		var sheet = new ZUSE.Element( [ this.type, id ], this.spacing, this.intermediate, obj3d );

		this.meshes.add( sheet.mesh );
		this.sheets.push( sheet );
		this.cycleAccess[ id ] = sheet;
		this.parent.selectables2.push( sheet.mesh );

	},

	addStaticPin: function ( x, y, z1, z2, radius, pulser ) {

		if ( isNaN( z1 ) ) { z1 = 0; }
		if ( isNaN( z2 ) ) { z2 = 2 * this.levels; }

		var pin = new ZUSE.Pin( null, x, x, y, y, z1, z2, this.spacing, radius, false );

		this.meshes.add( pin.mesh );
		this.pins.push( pin );

		this.parent.selectables2.push( pin.mesh );

	},

	addMovingPin: function ( x1, x2, y1, y2, name, z1, z2, radius, pulser ) {

		if ( isNaN( z1 ) ) { z1 = 0; } else { z1 = z1*2; }
		if ( isNaN( z2 ) ) { z2 = 2 * this.levels; } else { z2 = 2*z2+2; }

		var pin = new ZUSE.Pin( [ this.type, name ], x1, x2, y1, y2, z1, z2, this.spacing, radius, true );

		this.meshes.add( pin.mesh );
		this.pins.push( pin );
		this.cycleAccess[ name ] = pin;

		if ( pulser !== null ) {
			this.parent.pulsers[ pulser ].push( pin );
		}

		this.parent.selectables2.push( pin.mesh );

	},

	changeSpacing: function () {

		for ( var i = 0; i < this.sheets.length; i++ ) {

			var z = this.sheets[ i ].level * this.spacing;
			this.sheets[ i ].setHeight( z );

		}

		for ( var i = 0; i < this.pins.length; i++ ) {

			var z1 = this.pins[ i ].l1 * this.spacing;
			var z2 = this.pins[ i ].l2 * this.spacing;
			this.pins[ i ].setHeight( z1, z2 );

		}

	},

	getHeight: function () {

		return this.levels * 2 * this.spacing;

	},

	setVisibility: function ( bool ) {

		for ( var i = 0; i < this.meshes.children.length; i++ ) {

			this.meshes.children[ i ].visible = bool;

		}

	}

};

