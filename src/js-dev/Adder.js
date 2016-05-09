ZUSE.Adder = function ( xml ) {

	this.meshes = new THREE.Object3D();
	this.layers = new Array();
	this.getLayerNumber = new Object();
	this.layersByType = new Object();
	this.pulsers = { x: [], y: [] };
	this.spacingClosed = 3;
	this.spacingOpen = 20;
	this.selectables = new Array();
	this.selectables2 = new Array();
	this.selectables2enabled = false;
	this.cycleControl = new ZUSE.CycleControl( this );

	this.parseXML( xml );
	this.layersByType[ 'In' ] = new ZUSE.InputControlLayer();

	this.selection = new ZUSE.Selection( { x1: -40, x2: 320, y1: -15, y2: 265 }, this );
	this.meshes.add( this.selection.touchMeshes );
	this.meshes.add( this.selection.displayMeshes );

	ZUSE.gui.webgl.scene.add( this.meshes );

};

ZUSE.Adder.prototype = {

	constructor: ZUSE.Adder,

	parseXML: function ( structure ) {

		var layerDefaults = undefined;

		for ( var i = 0; i < structure.childNodes.length; i++ ) {

			var node = structure.childNodes[ i ];
			if ( node.nodeName === 'layer' ) {
				this.addLayer( node, layerDefaults );
			} else if ( node.nodeName === 'default' ) {
				layerDefaults = node;
			}

		}

	},

	addLayer: function ( layerNode, layerDefaults ) {

		var layer = new ZUSE.Layer( layerNode, layerDefaults, this.spacingClosed, this );
		this.meshes.add( layer.meshes );
		this.layers.push( layer );
		this.getLayerNumber[ layer.type ] = this.layers.length - 1;
		this.layersByType[ layer.type ] = layer;
		this.setHeight( this.layers.length - 1 );

	},

	setHeight: function ( n ) {

		if ( n > 0 ) {

			this.layers[ n ].meshes.position.z = 	this.layers[ n - 1 ].meshes.position.z +
													this.layers[ n - 1 ].getHeight();

		}

	},

	changeSpacing: function ( n ) {

		if ( !this.layers[ n ].intermediate ) {

			var callback = function () {

				this.changeSpacing();
				for ( var i = n + 1; i < this.parent.layers.length; i++ ) {
					this.parent.setHeight( i );
				}

				this.parent.selection.updateBoxHeight();
				this.parent.selection.updateHeightLimit();

			}

			var s = this.layers[ n ].open ? this.spacingClosed : this.spacingOpen;
			this.layers[ n ].open = !this.layers[ n ].open;
			var animation = new TWEEN.Tween( this.layers[ n ] ).to( { spacing : s }, 1000 );
			animation.onUpdate( callback );
			animation.easing( TWEEN.Easing.Quadratic.InOut );
			animation.start();

		}

	},

	switchSelectables2: function () {

		this.selectables2enabled = !this.selectables2enabled;

	},

	highlightPart: function ( name, tact, bool ) {

		var results = ZUSE.TriggerRules.getTriggerResults( { name: name }, tact, true );
		results.active.push( ZUSE.TriggerRules.getElement( name ) );

		for ( var i = 0; i < results.active.length; i++ ) {

			results.active[ i ].setHighlight( bool );

		}

	}

};

