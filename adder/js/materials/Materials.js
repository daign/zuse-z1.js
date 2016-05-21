ZUSE.Materials = {

	MovingSheet:       new ZUSE.Material( ZUSE.Colors.BlueSheet ),
	StaticSheet:       new ZUSE.Material( ZUSE.Colors.BlueStatic ),
	IntermediateSheet: new ZUSE.Material( ZUSE.Colors.BlueStatic ),
	MovingPin:         new ZUSE.Material( ZUSE.Colors.BluePin ),
	StaticPin:         new ZUSE.Material( ZUSE.Colors.BlueStatic ),
	Highlight:         new ZUSE.Material( ZUSE.Colors.Highlight ),
	BoxBackFace:       new THREE.MeshBasicMaterial( { color: 0xEEDDCC } ),
	BoxWireframe:      new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } ),
	BoxWireActive:     new THREE.LineBasicMaterial( { color: 0xf83610, linewidth: 4 } ),
	Invisible:         new THREE.ShaderMaterial( {
		vertexShader:ZUSE.Shader[ "invisibleVertexShader" ],
		fragmentShader: ZUSE.Shader[ "invisibleFragmentShader" ]
	} )

};

