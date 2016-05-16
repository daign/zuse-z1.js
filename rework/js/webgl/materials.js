var uniforms = {
	color:        { type: "c",  value: new THREE.Color( 0x3d9ecb ) },
	clippingLow:  { type: "v3", value: new THREE.Vector3( -60, -6, -7 ) },
	clippingHigh: { type: "v3", value: new THREE.Vector3(  30,  6,  7 ) }
};

var capsUniforms = {
	color: { type: "c", value: new THREE.Color( 0xa7a7a7 ) }
};

ZUSE.WEBGL.MATERIAL = {

	sheet: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClipping
	} ),

	cap: new THREE.ShaderMaterial( {
		uniforms:       capsUniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertex,
		fragmentShader: ZUSE.WEBGL.SHADER.fragment
	} ),

	backStencil: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClippingFront,
		colorWrite: false,
		depthWrite: false,
		side: THREE.BackSide
	} ),

	frontStencil: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClippingFront,
		colorWrite: false,
		depthWrite: false,
	} )

};

