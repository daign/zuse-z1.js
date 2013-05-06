ZUSE.InitZutools = function () {

	ZUSE.gui = new ZUTOOLS.LayoutManager( {
		languages: {
			path: 'projects/adder/languages/',
			standard: 'en',
			versions: {
				en: 'English',
				de: 'Deutsch'
			}
		},
		tabs: [ 'logic', 'imprint' ],
		tools: [
			[
				//[ 'home', null, false, null ]
			], [
				[ 'back', {
					click:     function () { ZUSE.adderObj.cycleControl.cycleBackwards(); },
					mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
					mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
				}, false, null ],
				[ 'replay', {
					click:     function () { ZUSE.adderObj.cycleControl.repeatLast(); },
					mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
					mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
				}, false, null ],
				[ 'forward', {
					click:     function () { ZUSE.adderObj.cycleControl.cycle(); },
					mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightNext(); },
					mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
				}, false, null ]
			], [
				[ 'layerA', {
					click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.A ); }
				}, true, null ],
				[ 'layerB', {
					click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.B ); }
				}, true, null ],
				[ 'layerC', {
					click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.C ); }
				}, true, null ],
				[ 'layerD',	{
					click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.D ); }
				}, true, null ]
			], [
				[ 'clipChange', null, false, [
					{ type: 'slider', min: 0, max: 1000, values: [ 0, 1000 ], onChange: function( values ) {
						ZUSE.adderObj.selection.setFromSlider( 'x', values[ 0 ], values[ 1 ] );
					} },
					{ type: 'slider', min: 0, max: 1000, values: [ 0, 1000 ], onChange: function( values ) {
						ZUSE.adderObj.selection.setFromSlider( 'y', values[ 0 ], values[ 1 ] );
					} },
					{ type: 'slider', min: 0, max: 8, values: [ 0, 8 ], onChange: function( values ) {
						ZUSE.adderObj.selection.setFromSlider( 'z', values[ 0 ], values[ 1 ] );
					} }
				] ],
				[ 'clipDrag', {
					click: function ( a ) {
						var state = !ZUSE.adderObj.selection.enabled;
						ZUSE.adderObj.selection.setActivation( state );
						ZUSE.gui.toolbar.toolsByName.select.disable( state );
					}
				}, true, null ],
				[ 'clipReset', {
					click: function () { ZUSE.adderObj.selection.reset(); }
				}, false, null ],
				[ 'clipFading', {
					click: function ( a ) { ZUSE.ShaderUniforms.activateFadingWidth( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 20 ], onChange: function( values ) {
						ZUSE.ShaderUniforms.setFadingWidthValue( values[ 0 ] );
					} }
				] ],
				[ 'clipTransp', {
					click: function ( a ) { ZUSE.ShaderUniforms.activateClippingTransparency( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 40 ], onChange: function( values ) {
						ZUSE.ShaderUniforms.setClippingTransparencyValue( values[ 0 ] / 100 );
					} }
				] ]
			], [
				[ 'visMS', {
					click: function ( a ) { ZUSE.Materials.MovingSheet.setVisibility( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
						ZUSE.Materials.MovingSheet.setTransparency( values[ 0 ] / 100 );
					} }
				] ],
				[ 'visMP', {
					click: function ( a ) { ZUSE.Materials.MovingPin.setVisibility( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
						ZUSE.Materials.MovingPin.setTransparency( values[ 0 ] / 100 );
					} }
				] ],
				[ 'visSS', {
					click: function ( a ) { ZUSE.Materials.StaticSheet.setVisibility( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
						ZUSE.Materials.StaticSheet.setTransparency( values[ 0 ] / 100 );
					} }
				] ],
				[ 'visSP', {
					click: function ( a ) { ZUSE.Materials.StaticPin.setVisibility( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
						ZUSE.Materials.StaticPin.setTransparency( values[ 0 ] / 100 );
					} }
				] ],
				[ 'visIS', {
					click: function ( a ) { ZUSE.Materials.IntermediateSheet.setVisibility( a ); }
				}, true, [
					{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
						ZUSE.Materials.IntermediateSheet.setTransparency( values[ 0 ] / 100 );
					} }
				] ]
			], [
				[ 'viewReset', {
					click: function () { ZUSE.gui.webgl.camera.controls.reset(); }
				}, false, null ],
				[ 'highlight', {
					click: function ( a ) { ZUSE.adderObj.cycleControl.switchHighlighting(); }
				}, true, null ],
				[ 'select', {
					click: function ( a ) { ZUSE.adderObj.switchSelectables2(); }
				}, true, null ]
			]
		]
	} );

	ZUSE.gui.toolbar.toolsByName.back.disable();
	ZUSE.gui.toolbar.toolsByName.replay.disable();
	ZUSE.gui.toolbar.toolsByName.visMS.switchActivation();
	ZUSE.gui.toolbar.toolsByName.visMP.switchActivation();
	ZUSE.gui.toolbar.toolsByName.visSS.switchActivation();
	ZUSE.gui.toolbar.toolsByName.visSP.switchActivation();
	ZUSE.gui.toolbar.toolsByName.visIS.switchActivation();
	ZUSE.gui.toolbar.toolsByName.highlight.switchActivation();

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

	ZUSE.inputs = {

		A3:  ZUSE.gui.controls.addDigit( 30,  7, false, a3 ).setToZero().inputOn(),
		A2:  ZUSE.gui.controls.addDigit( 50,  7, false, a2 ).setToZero().inputOn(),
		A1:  ZUSE.gui.controls.addDigit( 70,  7, false, a1 ).setToZero().inputOn(),
		A0:  ZUSE.gui.controls.addDigit( 90,  7, false, a0 ).setToZero().inputOn(),
		Plu: ZUSE.gui.controls.addDigit( 10, 33, false ).setToPlus(),
		B3:  ZUSE.gui.controls.addDigit( 30, 33, false, b3 ).setToZero().inputOn(),
		B2:  ZUSE.gui.controls.addDigit( 50, 33, false, b2 ).setToZero().inputOn(),
		B1:  ZUSE.gui.controls.addDigit( 70, 33, false, b1 ).setToZero().inputOn(),
		B0:  ZUSE.gui.controls.addDigit( 90, 33, false, b0 ).setToZero().inputOn(),
		F4s: ZUSE.gui.controls.addDigit( 21, 53, true,  f4 ),
		F3s: ZUSE.gui.controls.addDigit( 41, 53, true,  f3 ),
		F2s: ZUSE.gui.controls.addDigit( 61, 53, true,  f2 ),
		F1s: ZUSE.gui.controls.addDigit( 81, 53, true,  f1 ),
		K4s: ZUSE.gui.controls.addDigit( 10, 71, false, f4 ), // sic!
		K3s: ZUSE.gui.controls.addDigit( 30, 71, false, k3 ),
		K2s: ZUSE.gui.controls.addDigit( 50, 71, false, k2 ),
		K1s: ZUSE.gui.controls.addDigit( 70, 71, false, k1 ),
		K0s: ZUSE.gui.controls.addDigit( 90, 71, false, k0 ),
		Z1: ZUSE.gui.controls.addDigit( 126,  7, false ).setText( '  0' ),
		Z2: ZUSE.gui.controls.addDigit( 126, 33, false ).setText( '+ 0' ),
		Z3: ZUSE.gui.controls.addDigit( 126, 71, false ).setText( '   ' )

	}

}

