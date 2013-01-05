ZUSE.Simulation = function () {

	var gui = new ZUSE.GUI.LayoutManager();

	gui.toolbar.addTool( 0, 'home',      fooA,    false ).disable();
	gui.toolbar.addTool( 1, 'back',      back,    false );
	gui.toolbar.addTool( 1, 'replay',    replay,  false );
	gui.toolbar.addTool( 1, 'forward',   forward, false );
	gui.toolbar.addTool( 2, 'layerA',    layerA,  true  );
	gui.toolbar.addTool( 2, 'layerB',    layerB,  true  );
	gui.toolbar.addTool( 2, 'layerC',    layerC,  true  );
	gui.toolbar.addTool( 2, 'layerD',    layerD,  true  );
	gui.toolbar.addTool( 3, 'clip',      fooA,    true  ).disable();
	gui.toolbar.addTool( 3, 'clipReset', fooA,    false ).disable();

	ZUSE.Initializer();

	function back()    { ZUSE.adderObj.cycleControl.cycleBackwards(); }
	function replay()  { ZUSE.adderObj.cycleControl.repeatLast(); }
	function forward() { ZUSE.adderObj.cycleControl.cycle(); }
	function layerA()  { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.A ); }
	function layerB()  { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.B ); }
	function layerC()  { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.C ); }
	function layerD()  { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.D ); }

	function fooA() { ; }

};

