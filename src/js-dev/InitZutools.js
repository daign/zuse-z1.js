ZUSE.InitZutools = function () {

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
	var clip		= {	click:		function () {	var state = !ZUSE.adderObj.selection.enabled;
													ZUSE.adderObj.selection.setActivation( state );
													SIMULATION.gui.toolbar.toolsByName.select.disable( state ); } };
	var clipReset	= {	click:		function () { ZUSE.adderObj.selection.reset(); } };
	var viewReset	= { click:		function () { SIMULATION.gui.webgl.camera.controls.reset(); } };
	var highlight	= { click:		function () { ZUSE.adderObj.cycleControl.switchHighlighting(); } };
	var select		= { click:		function () { ZUSE.adderObj.switchSelectables2(); } };

	SIMULATION.gui = new ZUTOOLS.LayoutManager( {
		languages: {	path: 'projects/adder/languages/',
						standard: 'en',
						versions: {	en: 'English',
									de: 'Deutsch' }
		},
		tabs: [ 'logic', 'options', 'selection', 'imprint' ],
		tools: [
			[
				[ 'home', null, false, null ]
			], [
				[ 'back',		back,      false, null ],
				[ 'replay',		replay,    false, null ],
				[ 'forward',	forward,   false, null ]
			], [
				[ 'layerA',		layerA,    true,  [
					{ type: 'button', text: 'Button', onclick: function () { console.log( 'A Click' ); } }
				] ],
				[ 'layerB',		layerB,    true,  [
					{ type: 'slider' },
					{ type: 'slider' }
				] ],
				[ 'layerC',		layerC,    true,  null ],
				[ 'layerD',		layerD,    true,  null ]
			], [
				[ 'clip',		clip,      true,  null ],
				[ 'clipReset',	clipReset, false, null ]
			], [
				[ 'viewReset',	viewReset, false, null ],
				[ 'highlight',	highlight, true,  null ],
				[ 'select',		select,    true,  null ]
			]
		]
	} );

	SIMULATION.gui.toolbar.toolsByName.back.disable();
	SIMULATION.gui.toolbar.toolsByName.replay.disable();
	SIMULATION.gui.toolbar.toolsByName.highlight.switchActivation();

	var a3 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "A3", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A3' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A3' ], 2, false ); } };
	var a2 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "A2", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A2' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A2' ], 2, false ); } };
	var a1 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "A1", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A1' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A1' ], 2, false ); } };
	var a0 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "A0", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A0' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'A0' ], 2, false ); } };
	var b3 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "B3", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B3' ], 1, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B3' ], 1, false ); } };
	var b2 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "B2", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B2' ], 1, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B2' ], 1, false ); } };
	var b1 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "B1", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B1' ], 1, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B1' ], 1, false ); } };
	var b0 = {	click:		function () { return ZUSE.adderObj.cycleControl.switchInput( "B0", null ); },
				mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B0' ], 1, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'In', 'B0' ], 1, false ); } };
	var f4 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF4' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF4' ], 2, false ); } };
	var f3 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF3' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF3' ], 2, false ); } };
	var f2 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF2' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF2' ], 2, false ); } };
	var f1 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF1' ], 2, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'B', 'BF1' ], 2, false ); } };
	var k3 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'D', 'DK3' ], 3, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'D', 'DK3' ], 3, false ); } };
	var k2 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'C', 'CK2' ], 3, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'C', 'CK2' ], 3, false ); } };
	var k1 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'D', 'DK1' ], 3, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'D', 'DK1' ], 3, false ); } };
	var k0 = {	mouseover:	function () { ZUSE.adderObj.highlightPart( [ 'C', 'CK0' ], 3, true ); },
				mouseout:	function () { ZUSE.adderObj.highlightPart( [ 'C', 'CK0' ], 3, false ); } };

	SIMULATION.inputs = {

		A3:  SIMULATION.gui.controls.addDigit( 30,  7, false, a3 ).setToZero().inputOn(),
		A2:  SIMULATION.gui.controls.addDigit( 50,  7, false, a2 ).setToZero().inputOn(),
		A1:  SIMULATION.gui.controls.addDigit( 70,  7, false, a1 ).setToZero().inputOn(),
		A0:  SIMULATION.gui.controls.addDigit( 90,  7, false, a0 ).setToZero().inputOn(),
		Plu: SIMULATION.gui.controls.addDigit( 10, 33, false ).setToPlus(),
		B3:  SIMULATION.gui.controls.addDigit( 30, 33, false, b3 ).setToZero().inputOn(),
		B2:  SIMULATION.gui.controls.addDigit( 50, 33, false, b2 ).setToZero().inputOn(),
		B1:  SIMULATION.gui.controls.addDigit( 70, 33, false, b1 ).setToZero().inputOn(),
		B0:  SIMULATION.gui.controls.addDigit( 90, 33, false, b0 ).setToZero().inputOn(),
		F4s: SIMULATION.gui.controls.addDigit( 21, 53, true,  f4 ),
		F3s: SIMULATION.gui.controls.addDigit( 41, 53, true,  f3 ),
		F2s: SIMULATION.gui.controls.addDigit( 61, 53, true,  f2 ),
		F1s: SIMULATION.gui.controls.addDigit( 81, 53, true,  f1 ),
		K4s: SIMULATION.gui.controls.addDigit( 10, 71, false, f4 ), // sic!
		K3s: SIMULATION.gui.controls.addDigit( 30, 71, false, k3 ),
		K2s: SIMULATION.gui.controls.addDigit( 50, 71, false, k2 ),
		K1s: SIMULATION.gui.controls.addDigit( 70, 71, false, k1 ),
		K0s: SIMULATION.gui.controls.addDigit( 90, 71, false, k0 ),
		Z1: SIMULATION.gui.controls.addDigit( 126,  7, false ).setText( '  0' ),
		Z2: SIMULATION.gui.controls.addDigit( 126, 33, false ).setText( '+ 0' ),
		Z3: SIMULATION.gui.controls.addDigit( 126, 71, false ).setText( '   ' )

	}

}

