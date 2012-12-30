ZUSE.Simulation = function () {

	var gui = new ZUSE.GUI.LayoutManager();

	gui.toolbar.addTool( 0, 'layerA', fooA );
	gui.toolbar.addTool( 1, 'layerB', fooB );
	gui.toolbar.addTool( 1, 'layerB', fooB );
	gui.toolbar.addTool( 2, 'layerA', fooA );
	gui.toolbar.addTool( 2, 'layerA', fooA );
	gui.toolbar.addTool( 2, 'layerB', fooB );
	gui.toolbar.addTool( 2, 'layerB', fooB );

	ZUSE.Initializer();

	function fooA() {

		console.log( 'A' );

	}

	function fooB() {

		console.log( 'B' );

	}

};

