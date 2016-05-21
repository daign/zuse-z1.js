ZUSE.Shader = {

	vertexShader: [

		"uniform  vec3 color;",
		"uniform float clippingX1;",
		"uniform float clippingX2;",
		"uniform float clippingY1;",
		"uniform float clippingY2;",

		"varying vec3 pixelCoordinates;",
		"varying vec3 pixelNormal;",

		"void main() {",

			"pixelCoordinates = position;",
			"pixelNormal = normal;",
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform  vec3 color;",
		"uniform float clippingX1;",
		"uniform float clippingX2;",
		"uniform float clippingY1;",
		"uniform float clippingY2;",

		"varying vec3 pixelCoordinates;",
		"varying vec3 pixelNormal;",

		"void main( void ) {",

			"float shade = (\
				  3.0 * pow ( abs ( pixelNormal.z ), 2.0 )\
				+ 2.0 * pow ( abs ( pixelNormal.y ), 2.0 )\
				+ 1.0 * pow ( abs ( pixelNormal.x ), 2.0 )\
			) / 3.0;",

			"if (\
				   ( pixelCoordinates.x + 0.01 ) >= clippingX1\
				&& ( pixelCoordinates.x - 0.01 ) <= clippingX2\
				&& ( pixelCoordinates.y + 0.01 ) >= clippingY1\
				&& ( pixelCoordinates.y - 0.01 ) <= clippingY2\
			) {",

				"gl_FragColor = vec4( color * shade, 1.0 );",

			"} else {",

				"discard;",

			"}",

		"}"

	].join("\n"),

	invisibleVertexShader: [

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	invisibleFragmentShader: [

		"void main( void ) {",

			"gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );",
			"discard;",

		"}"

	].join("\n")

};

