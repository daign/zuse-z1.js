var uniforms = {
	color:        { type: "c",  value: new THREE.Color( 0x3d9ecb ) },
	clippingLow:  { type: "v3", value: new THREE.Vector3( -85, -26, -93 ) },
	clippingHigh: { type: "v3", value: new THREE.Vector3(  75,   6,   7 ) }
};

var capsUniforms = {
	color: { type: "c", value: new THREE.Color( 0xa7a7a7 ) }
};

ZUSE.WEBGL.SHADER = {

	vertex: '\
		uniform vec3 color;\
		varying vec3 pixelNormal;\
		\
		void main() {\
			\
			pixelNormal = normal;\
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
			\
		}',
	vertexClipping: '\
		uniform vec3 color;\
		uniform vec3 clippingLow;\
		uniform vec3 clippingHigh;\
		\
		varying vec3 pixelNormal;\
		varying vec4 worldPosition;\
		\
		void main() {\
			\
			pixelNormal = normal;\
			worldPosition = modelMatrix * vec4( position, 1.0 );\
			\
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
			\
		}',
	fragment: '\
		uniform vec3 color;\
		varying vec3 pixelNormal;\
		\
		void main( void ) {\
			\
			float shade = (\
				  3.0 * pow ( abs ( pixelNormal.y ), 2.0 )\
				+ 2.0 * pow ( abs ( pixelNormal.z ), 2.0 )\
				+ 1.0 * pow ( abs ( pixelNormal.x ), 2.0 )\
			) / 3.0;\
			\
			gl_FragColor = vec4( color * shade, 1.0 );\
			\
		}',
	fragmentClipping: '\
		uniform vec3 color;\
		uniform vec3 clippingLow;\
		uniform vec3 clippingHigh;\
		\
		varying vec3 pixelNormal;\
		varying vec4 worldPosition;\
		\
		void main( void ) {\
			\
			float shade = (\
				  3.0 * pow ( abs ( pixelNormal.y ), 2.0 )\
				+ 2.0 * pow ( abs ( pixelNormal.z ), 2.0 )\
				+ 1.0 * pow ( abs ( pixelNormal.x ), 2.0 )\
			) / 3.0;\
			\
			if (\
				   worldPosition.x >= clippingLow.x\
				&& worldPosition.x <= clippingHigh.x\
				&& worldPosition.y >= clippingLow.y\
				&& worldPosition.y <= clippingHigh.y\
				&& worldPosition.z >= clippingLow.z\
				&& worldPosition.z <= clippingHigh.z\
			) {\
				\
				gl_FragColor = vec4( color * shade, 1.0 );\
				\
			} else {\
				\
				discard;\
				\
			}\
			\
		}'

};

ZUSE.WEBGL.MATERIAL = {

	sheet: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClipping,
	} ),

	cap: new THREE.ShaderMaterial( {
		uniforms:       capsUniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertex,
		fragmentShader: ZUSE.WEBGL.SHADER.fragment
	} ),

	backStencil: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClipping,
		colorWrite: false,
		depthWrite: false,
		side: THREE.BackSide
	} ),

	frontStencil: new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   ZUSE.WEBGL.SHADER.vertexClipping,
		fragmentShader: ZUSE.WEBGL.SHADER.fragmentClipping,
		colorWrite: false,
		depthWrite: false,
	} )

};

