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

	var a1 = {	click:		function () { console.log( 'Click!' ); return true; },
				mouseover:	function () { /*console.log( 'Mouseover!' );*/ },
				mouseout:	function () { /*console.log( 'Mouseout!' );*/ } };
	var a2 = {	mouseover:	function () { /*console.log( 'Mouseover!' );*/ },
				mouseout:	function () { /*console.log( 'Mouseout!' );*/ } };

	this.gui.controls.addDigit( 30,   7, false, a1 ).setToZero().inputOn();
	this.gui.controls.addDigit( 50,   7, false, a1 ).setToZero().inputOn();
	this.gui.controls.addDigit( 70,   7, false, a1 ).setToZero();
	this.gui.controls.addDigit( 90,   7, false, a1 ).setToOne();
	this.gui.controls.addDigit( 10,  33, false ).setToPlus();
	this.gui.controls.addDigit( 30,  33, false, a2 );
	this.gui.controls.addDigit( 50,  33, false, a2 );
	this.gui.controls.addDigit( 70,  33, false, a2 ).setToOne();
	this.gui.controls.addDigit( 90,  33, false, a2 ).setToZero();
	this.gui.controls.addDigit( 21,  53, true  ).setToOne();
	this.gui.controls.addDigit( 41,  53, true  ).setToEmpty();
	this.gui.controls.addDigit( 61,  53, true  ).setToZero();
	this.gui.controls.addDigit( 81,  53, true  ).setToZero();
	this.gui.controls.addDigit( 10,  71, false ).setToOne();
	this.gui.controls.addDigit( 30,  71, false ).setToOne();
	this.gui.controls.addDigit( 50,  71, false ).setToZero();
	this.gui.controls.addDigit( 70,  71, false ).setToOne();
	this.gui.controls.addDigit( 90,  71, false ).setToZero();
	this.gui.controls.addDigit( 126,  7, false ).setText( ' 12' );
	this.gui.controls.addDigit( 126, 33, false ).setText( '+34' );
	this.gui.controls.addDigit( 126, 71, false ).setText( ' 46' );

	ZUSE.Initializer();

};

