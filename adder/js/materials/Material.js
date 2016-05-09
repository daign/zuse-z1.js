ZUSE.Material = function ( color, transparency ) {

	this.visible      = true;
	this.transparency = transparency;
	this.colorUniform        = { type: "c", value: color };
	this.transparencyUniform = { type: "f", value: transparency };

	var uniforms = {
		color:                this.colorUniform,
		transparency:         this.transparencyUniform,
		clippingX1:           ZUSE.ShaderUniforms.x1,
		clippingX2:           ZUSE.ShaderUniforms.x2,
		clippingY1:           ZUSE.ShaderUniforms.y1,
		clippingY2:           ZUSE.ShaderUniforms.y2,
		clippingTransparency: ZUSE.ShaderUniforms.clippingTransparency,
		fadingWidth:          ZUSE.ShaderUniforms.fadingWidth
	};

	this.shader = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		vertexShader:   ZUSE.Shader[ "vertexShader" ],
		fragmentShader: ZUSE.Shader[ "fragmentShader" ],
		transparent:    true

	} );

};

ZUSE.Material.prototype = {

	constructor: ZUSE.Material,

	setTransparency: function ( v ) {

		this.transparency = v;
		if ( this.visible ) {
			this.transparencyUniform.value = v;
		}

	},

	setVisibility: function ( b ) {

		this.visible = b;
		this.transparencyUniform.value = b ? this.transparency : 0.0;

	}

};

