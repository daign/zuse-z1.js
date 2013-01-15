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

	var foo = {	click:		function () { console.log( 'Click!' ); return true; },
				mouseover:	function () { console.log( 'Mouseover!' ); },
				mouseout:	function () { console.log( 'Mouseout!' ); } };
	var a3 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "A3", null ); } };
	var a2 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "A2", null ); } };
	var a1 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "A1", null ); } };
	var a0 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "A0", null ); } };
	var b3 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "B3", null ); } };
	var b2 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "B2", null ); } };
	var b1 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "B1", null ); } };
	var b0 = { click: function () { return ZUSE.adderObj.cycleControl.switchInput( "B0", null ); } };

	this.inputs = {

		A3: this.gui.controls.addDigit( 30,   7, false, a3 ).setToOne().inputOn(),
		A2: this.gui.controls.addDigit( 50,   7, false, a2 ).setToOne().inputOn(),
		A1: this.gui.controls.addDigit( 70,   7, false, a1 ).setToOne().inputOn(),
		A0: this.gui.controls.addDigit( 90,   7, false, a0 ).setToOne().inputOn(),
		Plus: this.gui.controls.addDigit( 10,  33, false ).setToPlus(),
		B3: this.gui.controls.addDigit( 30,  33, false, b3 ).setToZero().inputOn(),
		B2: this.gui.controls.addDigit( 50,  33, false, b2 ).setToZero().inputOn(),
		B1: this.gui.controls.addDigit( 70,  33, false, b1 ).setToZero().inputOn(),
		B0: this.gui.controls.addDigit( 90,  33, false, b0 ).setToZero().inputOn(),
		F4: this.gui.controls.addDigit( 21,  53, true  ).setToZero(),
		F3: this.gui.controls.addDigit( 41,  53, true  ).setToZero(),
		F2: this.gui.controls.addDigit( 61,  53, true  ).setToZero(),
		F1: this.gui.controls.addDigit( 81,  53, true  ).setToZero(),
		K4: this.gui.controls.addDigit( 10,  71, false ).setToZero(),
		K3: this.gui.controls.addDigit( 30,  71, false ).setToZero(),
		K2: this.gui.controls.addDigit( 50,  71, false ).setToZero(),
		K1: this.gui.controls.addDigit( 70,  71, false ).setToZero(),
		K0: this.gui.controls.addDigit( 90,  71, false ).setToZero(),
		Z1: this.gui.controls.addDigit( 126,  7, false ).setText( '   ' ),
		Z2: this.gui.controls.addDigit( 126, 33, false ).setText( '   ' ),
		Z3: this.gui.controls.addDigit( 126, 71, false ).setText( '   ' )

	}

	ZUSE.Initializer();

};

