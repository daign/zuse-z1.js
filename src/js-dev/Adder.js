ZUSE.Adder = function () {

	this.meshes = new THREE.Object3D();
	this.layers = new Array();
	this.getLayerNumber = new Object();
	this.layersByType = new Object();
	this.pulsers = new Array();
	this.spacingClosed = 3;
	this.spacingOpen = 20;
	this.cycleControl = new ZUSE.CycleControl( this );
	this.selectables = new Array();
	this.selectables2 = new Array();
	this.selectables2enabled = false;

	this.addLayer( 'D0' );
	this.addLayer( 'D'  );
	this.addLayer( 'CD' );
	this.addLayer( 'C'  );
	this.addLayer( 'BC' );
	this.addLayer( 'B'  );
	this.addLayer( 'AB' );
	this.addLayer( 'A'  );
	this.addLayer( '0A' );
	this.layersByType[ 'In' ] = new ZUSE.InputControlLayer();

	this.selection = new ZUSE.Selection( { x1: -40, x2: 320, y1: -15, y2: 265 }, this );
	this.meshes.add( this.selection.meshes );

	//this.meshes.rotation = new THREE.Vector3( -Math.PI / 2, 0, 0 );
	//this.meshes.position = new THREE.Vector3( -100, -300, 100 );
	SIMULATION.gui.webgl.scene.add( this.meshes );

};

ZUSE.Adder.prototype = {

	constructor: ZUSE.Adder,

	addLayer: function ( type ) {

		var layer = new ZUSE.Layer( type, this.spacingClosed, this );
		this.meshes.add( layer.meshes );
		this.layers.push( layer );
		this.getLayerNumber[ type ] = this.layers.length - 1;
		this.layersByType[ type ] = layer;
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
			animation.easing( TWEEN.Easing.Quadratic.EaseInOut );
			animation.start();

		}

	},

	switchSelectables2: function () {

		this.selectables2enabled = !this.selectables2enabled;

	},

	highlightPart: function ( name, tact, bool ) {

		var results = this.cycleControl.triggerRules.getTriggerResults( { name: name }, tact, true );
		results.push( this.cycleControl.triggerRules.getElement( name ) );

		for ( var i = 0; i < results.length; i++ ) {

			results[ i ].setHighlight( bool );

		}

	}

};

