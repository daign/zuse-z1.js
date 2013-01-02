ZUSE.Simulation = function () {

	var gui = new ZUSE.GUI.LayoutManager();

	gui.toolbar.addTool( 0, 'home',      fooA,   false );
	gui.toolbar.addTool( 1, 'layerA',    layerA, true  );
	gui.toolbar.addTool( 1, 'layerB',    layerB, true  );
	gui.toolbar.addTool( 1, 'layerC',    layerC, true  );
	gui.toolbar.addTool( 1, 'layerD',    layerD, true  );
	gui.toolbar.addTool( 2, 'back',      fooA,   false );
	gui.toolbar.addTool( 2, 'replay',    fooA,   false );
	gui.toolbar.addTool( 2, 'forward',   fooA,   false );
	gui.toolbar.addTool( 3, 'clip',      fooA,   false );
	gui.toolbar.addTool( 3, 'clipReset', fooA,   false );

	ZUSE.Initializer();

	function layerA() { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.A ); }
	function layerB() { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.B ); }
	function layerC() { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.C ); }
	function layerD() { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.D ); }

	function fooA() { console.log( 'A' ); }

};

