ZUSE.Material = function ( color, transparency ) {

	this.color        = { type: "c", value: color };
	this.transparency = { type: "f", value: transparency };

	var uniforms = {
		color:                this.color,
		transparency:         this.transparency,
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

