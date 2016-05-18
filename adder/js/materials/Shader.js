ZUSE.Shader = {

	vertexShader: [

		"uniform  vec3 color;",
		"uniform float transparency;",
		"uniform float clippingX1;",
		"uniform float clippingX2;",
		"uniform float clippingY1;",
		"uniform float clippingY2;",
		"uniform float clippingTransparency;",
		"uniform float fadingWidth;",

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
		"uniform float transparency;",
		"uniform float clippingX1;",
		"uniform float clippingX2;",
		"uniform float clippingY1;",
		"uniform float clippingY2;",
		"uniform float clippingTransparency;",
		"uniform float fadingWidth;",

		"varying vec3 pixelCoordinates;",
		"varying vec3 pixelNormal;",

		"void main( void ) {",

			"if ( transparency < 0.01 ) {",

				"discard;",

			"} else {",

				"float shade = (	3.0 * pow ( abs ( pixelNormal.z ), 2.0 ) + \
									2.0 * pow ( abs ( pixelNormal.y ), 2.0 ) + \
									1.0 * pow ( abs ( pixelNormal.x ), 2.0 ) ) / 3.0;",

				"if ( clippingTransparency >= transparency ) {",

					"gl_FragColor = vec4( color * shade, transparency );",

				"} else if (    ( pixelCoordinates.x + 0.01 ) >= clippingX1 && \
								( pixelCoordinates.x - 0.01 ) <= clippingX2 && \
								( pixelCoordinates.y + 0.01 ) >= clippingY1 && \
								( pixelCoordinates.y - 0.01 ) <= clippingY2 ) {",

					"gl_FragColor = vec4( color * shade, transparency );",

				"} else if ( fadingWidth < 0.01 ) {",

					"if ( clippingTransparency < 0.01 ) {",

						"discard;",

					"} else {",

						"gl_FragColor = vec4( color * shade, clippingTransparency );",

					"}",

				"} else {",

					"float fadingX = min( \
						max( 1.0 - ( clippingX1 - pixelCoordinates.x ) / fadingWidth, 0.0 ), \
						max( 1.0 - ( pixelCoordinates.x - clippingX2 ) / fadingWidth, 0.0 ) );",

					"float fadingY = min( \
						max( 1.0 - ( clippingY1 - pixelCoordinates.y ) / fadingWidth, 0.0 ), \
						max( 1.0 - ( pixelCoordinates.y - clippingY2 ) / fadingWidth, 0.0 ) );",

					"float fadingTransparency = min( fadingX, fadingY ) * \
												( transparency - clippingTransparency ) + \
												clippingTransparency;",

					"if ( fadingTransparency < 0.01 ) {",

						"discard;",

					"} else {",

						"gl_FragColor = vec4( color * shade, fadingTransparency );",

					"}",

				"}",

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

