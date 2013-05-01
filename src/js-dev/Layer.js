ZUSE.Layer = function ( layerNode, layerDefaults, s, p ) {

	this.parent = p;
	this.type = layerNode.getAttribute( 'id' );
	this.levels = layerNode.getAttribute( 'levels' );
	this.spacing = layerNode.getAttribute( 'spacing' ) || s;
	this.intermediate = layerNode.getAttribute( 'intermediate' ) === 'true';

	this.open = false;
	this.meshes = new THREE.Object3D();
	this.elements = new Array();
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
			var pulser = elements[ i ].getAttribute( 'pulser' );
			var obj3d = elements[ i ].firstElementChild;

			switch ( obj3d.getAttribute( 'type' ) ) {
				case 'Sheet':
					this.addSheet( id, pulser, obj3d );
					break;
				case 'Pin':
					this.addPin( id, pulser, obj3d );
					break;
			}

		}

	},

	addSheet: function ( id, pulser, obj3d ) {

		var params = { spacing: this.spacing, intermediate: this.intermediate, levels: this.levels };

		var elem = new ZUSE.Element( [ this.type, id ], obj3d, params );

		this.meshes.add( elem.mesh );
		this.elements.push( elem );
		this.cycleAccess[ id ] = elem;
		this.parent.selectables2.push( elem.mesh );

	},

	addPin: function ( id, pulser, obj3d ) {

		var params = { spacing: this.spacing, intermediate: this.intermediate, levels: this.levels };

		var elem = new ZUSE.Element( [ this.type, id ], obj3d, params );

		this.meshes.add( elem.mesh );
		this.elements.push( elem );
		if ( id !== null ) {
			this.cycleAccess[ id ] = elem;
		}

		if ( pulser !== null ) {
			this.parent.pulsers[ pulser ].push( elem );
		}

		this.parent.selectables2.push( elem.mesh );

	},

	changeSpacing: function () {

		for ( var i = 0; i < this.elements.length; i++ ) {
			this.elements[ i ].setHeight( this.spacing );
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

