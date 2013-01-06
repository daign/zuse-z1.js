ZUSE.Simulation = function () {

	SIMULATION = this;

	this.gui = new ZUSE.GUI.LayoutManager();

	var back		= {	click:		function () { ZUSE.adderObj.cycleControl.cycleBackwards(); },
						mouseover:	function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
						mouseout:	function () { ZUSE.adderObj.cycleControl.preHighlightOff(); } };
	var replay		= {	click:		function () { ZUSE.adderObj.cycleControl.repeatLast(); },
						mouseover:	function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
						mouseout:	function () { ZUSE.adderObj.cycleControl.preHighlightOff(); } };
	var forward		= {	click:		function () { ZUSE.adderObj.cycleControl.cycle(); },
						mouseover:	function () { ZUSE.adderObj.cycleControl.preHighlightNext(); },
						mouseout:	function () { ZUSE.adderObj.cycleControl.preHighlightOff(); } };
	var layerA		= {	click:		function () { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.A ); } };
	var layerB		= {	click:		function () { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.B ); } };
	var layerC		= {	click:		function () { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.C ); } };
	var layerD		= {	click:		function () { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.D ); } };
	var clip		= {	click:		function () { ZUSE.adderObj.selection.setActivation( !ZUSE.adderObj.selection.enabled ); } };
	var clipReset	= {	click:		function () { ZUSE.adderObj.selection.reset(); } };
	var viewReset	= { click:		function () { SIMULATION.gui.webgl.camera.controls.reset(); } };
	var highlight	= { click:		function () { ZUSE.adderObj.cycleControl.switchHighlighting(); } };
	var select		= { click:		function () { ZUSE.adderObj.switchSelectables2(); } };
	var foo			= {	click:		function () { ; } };

	this.gui.toolbar.addTool( 0, 'home',		foo,       false, 'Home'						).disable();
	this.gui.toolbar.addTool( 1, 'back',		back,      false, 'Schritt zurück'				).disable();
	this.gui.toolbar.addTool( 1, 'replay',		replay,    false, 'Letzten Schritt wiederholen'	).disable();
	this.gui.toolbar.addTool( 1, 'forward',		forward,   false, 'Nächste Schritt'				);
	this.gui.toolbar.addTool( 2, 'layerA',		layerA,    true,  'Layer A expandieren'			);
	this.gui.toolbar.addTool( 2, 'layerB',		layerB,    true,  'Layer B expandieren'			);
	this.gui.toolbar.addTool( 2, 'layerC',		layerC,    true,  'Layer C expandieren'			);
	this.gui.toolbar.addTool( 2, 'layerD',		layerD,    true,  'Layer D expandieren'			);
	this.gui.toolbar.addTool( 3, 'clip',		clip,      true,  'Auswahl aktivieren'			);
	this.gui.toolbar.addTool( 3, 'clipReset',	clipReset, false, 'Auswahl zurücksetzen'		);
	this.gui.toolbar.addTool( 4, 'viewReset',	viewReset, false, 'Ansicht zurücksetzen'		);
	this.gui.toolbar.addTool( 4, 'highlight',	highlight, true,  'Bewegende Teile markieren'	).switchActivation();
	this.gui.toolbar.addTool( 4, 'select',		select,    true,  'Beliebige Teile markieren'	);

	ZUSE.Initializer();

};

