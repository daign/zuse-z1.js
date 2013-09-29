ZUSE.Materials = {

	MovingSheet:       new ZUSE.Material( ZUSE.Colors.NewBlue1,  1.0 ),
	StaticSheet:       new ZUSE.Material( ZUSE.Colors.NewBlue2,  1.0 ),
	IntermediateSheet: new ZUSE.Material( ZUSE.Colors.NewBlue3,  1.0 ),
	MovingPin:         new ZUSE.Material( ZUSE.Colors.NewBlue4,  1.0 ),
	StaticPin:         new ZUSE.Material( ZUSE.Colors.NewBlue4,  1.0 ),
	Highlight:         new ZUSE.Material( ZUSE.Colors.Highlight, 1.0 ),
	BoxBackFace:       new THREE.MeshBasicMaterial( { color: 0xEEDDCC, transparent: true } ),
	BoxWireframe:      new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } ),
	BoxWireActive:     new THREE.LineBasicMaterial( { color: 0xf83610, linewidth: 4 } )

};

