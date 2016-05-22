ZUSE.Layer = function ( layerNode, layerDefaults, s, p ) {

	this.parent = p;
	this.type = layerNode.getAttribute( 'id' );
	this.levels = layerNode.getAttribute( 'levels' );
	this.spacing = layerNode.getAttribute( 'spacing' ) || s;
	this.intermediate = layerNode.getAttribute( 'intermediate' ) === 'true';

	this.open = false;

	this.namedElements = new Object();
	this.unnamedElements = new Array();
	this.meshes = new THREE.Object3D();

	this.parseElements( layerNode );
	this.parseElements( layerDefaults );

};

ZUSE.Layer.prototype = {

	constructor: ZUSE.Layer,

	parseElements: function ( layerNode ) {

		var elementNodesArray = layerNode.getElementsByTagName( 'elem' );

		for ( var i = 0; i < elementNodesArray.length; i++ ) {

			var elementNode = elementNodesArray[ i ];
			var id = elementNode.getAttribute( 'id' );
			var pulser = elementNode.getAttribute( 'pulser' );
			this.addElement( id, pulser, elementNode );

		}

	},

	addElement: function ( id, pulser, elementNode ) {

		var params = { spacing: this.spacing, intermediate: this.intermediate, levels: this.levels };

		var elem = new ZUSE.Element( [ this.type, id ], elementNode, params );

		this.meshes.add( elem.mesh );
		if ( id !== null ) {
			this.namedElements[ id ] = elem;
		} else {
			this.unnamedElements.push( elem );
		}

		if ( pulser !== null ) {
			this.parent.pulsers[ pulser ].push( elem );
		}

	},

	changeSpacing: function () {

		for ( var i in this.namedElements ) {
			this.namedElements[ i ].setHeight( this.spacing );
		}
		for ( var i = 0; i < this.unnamedElements.length; i++ ) {
			this.unnamedElements[ i ].setHeight( this.spacing );
		}

	},

	getHeight: function () {

		return this.levels * 2 * this.spacing;

	},

	setVisibility: function ( bool ) {

		for ( var i = 0; i < this.meshes.children.length; i++ ) {

			this.meshes.children[ i ].children[ 0 ].visible = bool;

		}

	}

};

