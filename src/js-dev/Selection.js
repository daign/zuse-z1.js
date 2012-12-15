ZUSE.Selection = function ( limits, parent ) {

	this.parent = parent;

	this.limits = limits;
	this.limits.z1 = -10;
	this.limits.z2 = this.getHeight() + 10;

	this.initShaderUniforms();

	this.oldValue = 0;
	this.values = { x1: this.limits.x1,
					x2: this.limits.x2,
					y1: this.limits.y1,
					y2: this.limits.y2,
					z1: this.limits.z1,
					z2: this.limits.z2 };

	this.visibleLayers = { z1: 0, z2: 8 };

	this.vertices = [   new THREE.Vector3(), new THREE.Vector3(),
						new THREE.Vector3(), new THREE.Vector3(),
						new THREE.Vector3(), new THREE.Vector3(),
						new THREE.Vector3(), new THREE.Vector3() ];
	this.updateVertices();

	this.meshes = new THREE.Object3D();
	this.geometries = new Array();

	this.addFace( { a: 'y', d: 1 }, 0, 1, 5, 4 );
	this.addFace( { a: 'z', d: 1 }, 0, 2, 3, 1 );
	this.addFace( { a: 'x', d: 1 }, 0, 4, 6, 2 );
	this.addFace( { a: 'x', d: 2 }, 7, 5, 1, 3 );
	this.addFace( { a: 'y', d: 2 }, 7, 3, 2, 6 );
	this.addFace( { a: 'z', d: 2 }, 7, 6, 4, 5 );

	this.enabled = false;
	this.setActivation( false );

};

ZUSE.Selection.prototype = {

	constructor: ZUSE.Selection,

	initShaderUniforms: function () {

		ZUSE.ShaderUniforms.x1.value = this.limits.x1;
		ZUSE.ShaderUniforms.x2.value = this.limits.x2;
		ZUSE.ShaderUniforms.y1.value = this.limits.y1;
		ZUSE.ShaderUniforms.y2.value = this.limits.y2;

	},

	addFace: function ( axis, n0, n1, n2, n3 ) {

		axis.toString = function () { return this.a + this.d; };

		var frontFaceGeometry = new ZUSE.PlaneGeometry( this.vertices[ n0 ],
														this.vertices[ n1 ],
														this.vertices[ n2 ],
														this.vertices[ n3 ] );
		frontFaceGeometry.dynamic = true;
		this.geometries.push( frontFaceGeometry );

		var frontFaceMesh = new THREE.Mesh( frontFaceGeometry, ZUSE.Materials.BoxWireframe );
		frontFaceMesh.axis = axis;
		this.meshes.add( frontFaceMesh );
		this.parent.selectables.push( frontFaceMesh );

		var backFaceGeometry = new ZUSE.PlaneGeometry(  this.vertices[ n3 ],
														this.vertices[ n2 ],
														this.vertices[ n1 ],
														this.vertices[ n0 ] );
		backFaceGeometry.dynamic = true;
		this.geometries.push( backFaceGeometry );

		var backFaceMesh = new THREE.Mesh( backFaceGeometry, ZUSE.Materials.BoxBackFace );
	//	var backFaceMesh = THREE.SceneUtils.createMultiMaterialObject( backFaceGeometry,
	//							[ ZUSE.Materials.BoxBackFace, ZUSE.Materials.BoxStandard.shader ] );
		this.meshes.add( backFaceMesh );

	},

	setBoxValue: function ( axis, value ) {

		this.values[ axis ] = value;
		this.updateVertices();
		this.updateGeometries();

	},

	setDisplayValue: function ( axis, value ) {

		switch ( axis.a ) {

			case 'x':
			case 'y':

				ZUSE.ShaderUniforms[ axis ].value = value;
				break;

			case 'z':

				this.setVisibleLayers( axis, value, false );
				break;

			default:

				console.warn( 'axis ' + axis.a + ' invalid' );

		}

	},

	setDisplayValuesAnimated: function ( values ) {

		this.time = 0;

		var old = {
			x1: ZUSE.ShaderUniforms.x1.value,
			x2: ZUSE.ShaderUniforms.x2.value,
			y1: ZUSE.ShaderUniforms.y1.value,
			y2: ZUSE.ShaderUniforms.y2.value }

		var callback = function () {

			ZUSE.ShaderUniforms.x1.value = old.x1 + this.time * ( values.x1 - old.x1 );
			ZUSE.ShaderUniforms.x2.value = old.x2 + this.time * ( values.x2 - old.x2 );
			ZUSE.ShaderUniforms.y1.value = old.y1 + this.time * ( values.y1 - old.y1 );
			ZUSE.ShaderUniforms.y2.value = old.y2 + this.time * ( values.y2 - old.y2 );

		}

		var finish = function () {

			this.setVisibleLayers( new ZUSE.Axis( 'z', 1 ), values.z1, false );
			this.setVisibleLayers( new ZUSE.Axis( 'z', 2 ), values.z2, false );

		}

		var animation = new TWEEN.Tween( this ).to( { time : 1 }, 1000 );
		animation.onUpdate( callback );
		animation.onComplete( finish );
		animation.easing( TWEEN.Easing.Quadratic.EaseInOut );
		animation.start();

		this.setVisibleLayers( new ZUSE.Axis( 'z', 1 ), values.z1, true );
		this.setVisibleLayers( new ZUSE.Axis( 'z', 2 ), values.z2, true );

	},

	setVisibleLayers: function ( axis, value, maximize ) {

		if ( this.visibleLayers[ axis ] !== value ) {

			if ( maximize &&  ( ( axis.d === 1 && value > this.visibleLayers[ axis ] ) ||
								( axis.d === 2 && value < this.visibleLayers[ axis ] ) ) ) { return; }

			this.visibleLayers[ axis ] = value;

			for ( var i = 0; i < this.parent.layers.length; i++ ) {

				this.parent.layers[ i ].setVisibility(  i >= this.visibleLayers.z1 &&
														i <= this.visibleLayers.z2 );

			}

		}

	},

	conformRange: function ( axis, value ) {

		var buffer = ( axis.a === 'z' ) ? 40 : 20;

		switch ( axis.d ) {

			case 1:

				value = Math.max( value, this.limits[ axis ] );
				value = Math.min( value, this.values[ axis.a + 2 ] - buffer );
				break;

			case 2:

				value = Math.max( value, this.values[ axis.a + 1 ] + buffer );
				value = Math.min( value, this.limits[ axis ] );
				break;

			default:

				console.warn( 'axis direction ' + axis.d + ' invalid' );

		}

		return value;

	},

	conformLayerRange: function ( axis, value ) {

		if ( axis.a === 'z' ) {

			switch ( axis.d ) {

				case 1:

					value = Math.max( value, 0 );
					value = Math.min( value, this.visibleLayers.z2 );
					break;

				case 2:

					value = Math.max( value, this.visibleLayers.z1 );
					value = Math.min( value, 8 );
					break;

				default:

					console.warn( 'axis direction ' + axis.d + ' invalid' );

			}

		} else {

			value = this.conformRange( axis, value );

		}

		return value;

	},

	computeLayerFromBox: function ( axis, value ) {

		if ( axis.a === 'z' ) {

			var height = 0;
			var layer = 0;

			for ( var n = 0; n < this.parent.layers.length; n++ ) {

				if ( axis.d === 1 && value > height ) { layer = n + 1; }
				height += this.parent.layers[ n ].getHeight();
				if ( axis.d === 2 && value >= height ) { layer = n; }

			}

			value = layer;

		}

		return value;

	},

	computeBoxFromLayer: function ( axis, value ) {

		if ( axis.a === 'z' ) {

			n = value;
			value = this.parent.layers[ n ].meshes.position.z;
			value += ( axis.d === 2 ) ? this.parent.layers[ n ].getHeight() : 0;

		}

		return value;

	},

	updateVertices: function () {

		this.vertices[ 0 ].set( this.values.x1, this.values.y1, this.values.z1 );
		this.vertices[ 1 ].set( this.values.x2, this.values.y1, this.values.z1 );
		this.vertices[ 2 ].set( this.values.x1, this.values.y2, this.values.z1 );
		this.vertices[ 3 ].set( this.values.x2, this.values.y2, this.values.z1 );
		this.vertices[ 4 ].set( this.values.x1, this.values.y1, this.values.z2 );
		this.vertices[ 5 ].set( this.values.x2, this.values.y1, this.values.z2 );
		this.vertices[ 6 ].set( this.values.x1, this.values.y2, this.values.z2 );
		this.vertices[ 7 ].set( this.values.x2, this.values.y2, this.values.z2 );

	},

	updateGeometries: function () {

		for ( var i = 0; i < this.geometries.length; i++ ) {

			this.geometries[ i ].computeCentroids();
			this.geometries[ i ].verticesNeedUpdate = true;

		}

	},

	getHeight: function () {

		var lastLayer = this.parent.layers[ this.parent.layers.length - 1 ];

		return lastLayer.meshes.position.z + lastLayer.getHeight();

	},

	updateHeightLimit: function () {

		this.limits.z2 = this.getHeight() + 10;

	},

	updateBoxHeight: function () {

		var axis1 = { a: 'z', d: 1, toString: function () { return this.a + this.d; } };
		var axis2 = { a: 'z', d: 2, toString: function () { return this.a + this.d; } };

		var v1 = this.computeBoxFromLayer( axis1, this.visibleLayers.z1 );
		var v2 = this.computeBoxFromLayer( axis2, this.visibleLayers.z2 );
		this.setBoxValue( axis1, v1 );
		this.setBoxValue( axis2, v2 );

	},

	dragStart: function ( axis ) {

		this.oldValue = this.values[ axis ];

	},

	setFromMouse: function ( axis, value, relative ) {

		value += ( relative ) ? this.oldValue : 0;

		value = this.conformRange(        axis, value );
		this.setBoxValue(                 axis, value );

		value = this.computeLayerFromBox( axis, value );
		value = this.conformLayerRange(   axis, value );
		this.setDisplayValue(             axis, value );
		this.setSlider(                   axis, value );

	},

	setFromSlider: function ( a, s1, s2 ) {

		this.setOneFromSlider( new ZUSE.Axis( a, 1 ), this.transformValueFromSlider( a, s1 ), false );
		this.setOneFromSlider( new ZUSE.Axis( a, 2 ), this.transformValueFromSlider( a, s2 ), false );

	},

	setOneFromSlider: function ( axis, value, updateSlider ) {

		value = this.conformLayerRange(       axis, value );
		this.setDisplayValue(                 axis, value );
		if ( updateSlider ) { this.setSlider( axis, value ); }

		value = this.computeBoxFromLayer(     axis, value );
		value = this.conformRange(            axis, value );
		this.setBoxValue(                     axis, value );

	},

	setFromCircuit: function ( values ) {

		this.setDisplayValuesAnimated( values );

		this.setOneFromCircuit( new ZUSE.Axis( 'x', 1 ), values.x1, true );
		this.setOneFromCircuit( new ZUSE.Axis( 'x', 2 ), values.x2, true );
		this.setOneFromCircuit( new ZUSE.Axis( 'y', 1 ), values.y1, true );
		this.setOneFromCircuit( new ZUSE.Axis( 'y', 2 ), values.y2, true );
		this.setOneFromCircuit( new ZUSE.Axis( 'z', 1 ), values.z1, true );
		this.setOneFromCircuit( new ZUSE.Axis( 'z', 2 ), values.z2, true );

	},

	setOneFromCircuit: function ( axis, value, updateSlider ) {

		if ( updateSlider ) { this.setSlider( axis, value ); }

		value = this.computeBoxFromLayer(     axis, value );
		this.setBoxValue(                     axis, value );

	},

	setSlider: function ( axis, value ) {

		var sliderName;

		switch ( axis.a ) {

			case 'x':

				sliderName = '#sliderX';
				break;

			case 'y':

				sliderName = '#sliderY';
				break;

			case 'z':

				sliderName = '#sliderZ';
				break;

			default:

				console.warn( 'axis ' + axis.a + ' invalid' );

		}

		value = this.transformValueToSlider( axis.a, value );
		$( sliderName ).slider( "values", axis.d - 1, value );

	},

	transformValueFromSlider: function ( axis, value ) {

		if ( axis !== 'z' ) {

			value = value / 1000 * ( this.limits[ axis + 2 ] - this.limits[ axis + 1 ] ) + this.limits[ axis + 1 ];

		}

		return value;

	},

	transformValueToSlider: function ( axis, value ) {

		if ( axis !== 'z' ) {

			value = ( value - this.limits[ axis + 1 ] ) / ( this.limits[ axis + 2 ] - this.limits[ axis + 1 ] ) * 1000;

		}

		return value;

	},

	reset: function () {

		var values = {  x1: this.limits.x1,
						x2: this.limits.x2,
						y1: this.limits.y1,
						y2: this.limits.y2,
						z1: 0,
						z2: 8 };
		this.setFromCircuit( values );

	/*	this.setFromMouse( new ZUSE.Axis( 'x', 1 ), this.limits.x1, false );
		this.setFromMouse( new ZUSE.Axis( 'x', 2 ), this.limits.x2, false );
		this.setFromMouse( new ZUSE.Axis( 'y', 1 ), this.limits.y1, false );
		this.setFromMouse( new ZUSE.Axis( 'y', 2 ), this.limits.y2, false );
		this.setFromMouse( new ZUSE.Axis( 'z', 1 ), this.limits.z1, false );
		this.setFromMouse( new ZUSE.Axis( 'z', 2 ), this.limits.z2, false );	*/
		ZUSE.SVGUtils.reset();

	},

	setActivation: function ( bool ) {

		this.enabled = bool;

		for ( var i = 0; i < this.meshes.children.length; i++ ) {

			this.meshes.children[ i ].visible = bool;

			if ( this.meshes.children[ i ].children.length >= 2 ) {

				this.meshes.children[ i ].children[ 0 ].visible = bool;
				this.meshes.children[ i ].children[ 1 ].visible = bool;

			}

		}

		if ( !bool ) { document.body.style.cursor = 'auto'; }

	}

};

