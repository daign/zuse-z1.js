ZUSE.Material = function ( color ) {

	this.visible      = true;
	this.colorUniform = { type: "c", value: color };

	var uniforms = {
		color:      this.colorUniform,
		clippingX1: ZUSE.ShaderUniforms.x1,
		clippingX2: ZUSE.ShaderUniforms.x2,
		clippingY1: ZUSE.ShaderUniforms.y1,
		clippingY2: ZUSE.ShaderUniforms.y2,
	};

	this.shader = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		vertexShader:   ZUSE.Shader[ "vertexShader" ],
		fragmentShader: ZUSE.Shader[ "fragmentShader" ],
		visible: true

	} );

};

ZUSE.Material.prototype = {

	constructor: ZUSE.Material,

	setVisibility: function ( b ) {

		this.visible = b;
		this.shader.visible = b;

	}

};

