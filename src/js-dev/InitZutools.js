ZUSE.InitZutools = function () {

	SIMULATION.gui = new ZUTOOLS.LayoutManager( {
		title: 'Z1 Adder',
		standard_language: 'en',
		languages: { en: 'English', de: 'Deutsch' }
	} );

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
	var foo			= {	click:		function () { ; } };

//	SIMULATION.gui.toolbar.addTool( 0, 'home',		foo,       false, 'Home'						).disable();
	SIMULATION.gui.toolbar.addTool( 1, 'back',		back,      false, 'Step Back'					).disable();
	SIMULATION.gui.toolbar.addTool( 1, 'replay',	replay,    false, 'Repeat Last Step'			).disable();
	SIMULATION.gui.toolbar.addTool( 1, 'forward',	forward,   false, 'Next Step'					);
	SIMULATION.gui.toolbar.addTool( 2, 'layerA',	layerA,    true,  'Expand Layer A'				);
	SIMULATION.gui.toolbar.addTool( 2, 'layerB',	layerB,    true,  'Expand Layer B'				);
	SIMULATION.gui.toolbar.addTool( 2, 'layerC',	layerC,    true,  'Expand Layer C'				);
	SIMULATION.gui.toolbar.addTool( 2, 'layerD',	layerD,    true,  'Expand Layer D'				);
	SIMULATION.gui.toolbar.addTool( 3, 'clip',		clip,      true,  'Activate Selection'			);
	SIMULATION.gui.toolbar.addTool( 3, 'clipReset',	clipReset, false, 'Reset Selection'				);
	SIMULATION.gui.toolbar.addTool( 4, 'viewReset',	viewReset, false, 'Reset View'					);
	SIMULATION.gui.toolbar.addTool( 4, 'highlight',	highlight, true,  'Highlight Moving Elements'	).switchActivation();
	SIMULATION.gui.toolbar.addTool( 4, 'select',	select,    true,  'Pointing at Elements'		);

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

	SIMULATION.gui.addTab( 'Logic', ZUSE.XMLUtils.loadXML( 'projects/adder/circuit.svg' ).lastChild );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Transparency</td></tr> \
			<tr><td>Moving Sheets:</td>			<td><div id="sliderMovingSheet"			style="width: 192px;"></div></td></tr> \
			<tr><td>Moving Pins:</td>			<td><div id="sliderMovingPin"			style="width: 192px;"></div></td></tr> \
			<tr><td>Static Sheets:</td>			<td><div id="sliderStaticSheet"			style="width: 192px;"></div></td></tr> \
			<tr><td>Static Pins:</td>			<td><div id="sliderStaticPin"			style="width: 192px;"></div></td></tr> \
			<tr><td>Intermediate Sheets:</td>	<td><div id="sliderIntermediateSheet"	style="width: 192px;"></div></td></tr> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Selection</td></tr> \
			<tr><td>Deselection Transparency:</td><td><div id="sliderClippingTransparency" style="width: 192px;"></div></td></tr> \
			<tr><td>Fading Width:</td>			<td><div id="sliderFadingWidth"			style="width: 192px;"></div></td></tr> \
		</table>';
	SIMULATION.gui.addTab( 'Options', content );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td>Width: </td><td><div id="sliderX" style="width: 300px;"></div></td></tr> \
			<tr><td>Depth: </td><td><div id="sliderY" style="width: 300px;"></div></td></tr> \
			<tr><td>Height:</td><td><div id="sliderZ" style="width: 300px;"></div></td></tr> \
		</table>';
	SIMULATION.gui.addTab( 'Selection', content );

	var content = document.createElement( 'span' );
	content.style.fontSize = 'small';
	content.style.whiteSpace = 'nowrap';
	content.innerHTML = '\
		<p>3D simulation of the Z1 adder</p> \
		<p>Based on the paper "Rechenvorrichtungen aus mechanischen Schaltgliedern" by Konrad Zuse.</p> \
		<p>Project on GitHub: <a href="https://github.com/daign/zuse-z1.js">github.com/daign/zuse-z1.js</a>.</p> \
		<p>With the friendly assistance of the <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>.</p> \
		<p>Version 06.02.2013</p> \
		<p>Responsible for this site:<br/> \
		Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
		E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p>';
	SIMULATION.gui.addTab( 'Imprint', content );

}

