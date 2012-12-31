ZUSE.Simulation = function () {

	var gui = new ZUSE.GUI.LayoutManager();

	gui.toolbar.addTool( 0, 'home', fooA );
	gui.toolbar.addTool( 1, 'layerA', fooA );
	gui.toolbar.addTool( 1, 'layerB', fooB );
	gui.toolbar.addTool( 1, 'layerC', fooC );
	gui.toolbar.addTool( 1, 'layerD', fooD );
	gui.toolbar.addTool( 2, 'back',    fooA );
	gui.toolbar.addTool( 2, 'replay',  fooA );
	gui.toolbar.addTool( 2, 'forward', fooA );
	gui.toolbar.addTool( 3, 'clip',      fooA );
	gui.toolbar.addTool( 3, 'clipReset', fooA );

	ZUSE.Initializer();

	function fooA() { console.log( 'A' ); }
	function fooB() { console.log( 'B' ); }
	function fooC() { console.log( 'C' ); }
	function fooD() { console.log( 'D' ); }

};

