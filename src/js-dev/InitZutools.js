ZUSE.InitZutools = {

	toolDefinitions: {
		back: [ 'back', {
			click:     function () { ZUSE.adderObj.cycleControl.cycleBackwards(); },
			mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
			mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
		}, false, null, { disabled: true } ],
		replay: [ 'replay', {
			click:     function () { ZUSE.adderObj.cycleControl.repeatLast(); },
			mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightBack(); },
			mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
		}, false, null, { disabled: true } ],
		forward: [ 'forward', {
			click:     function () { ZUSE.adderObj.cycleControl.cycle(); },
			mouseover: function () { ZUSE.adderObj.cycleControl.preHighlightNext(); },
			mouseout:  function () { ZUSE.adderObj.cycleControl.preHighlightOff(); }
		}, false, null ],
		layerA: [ 'layerA', {
			click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.A ); }
		}, true, null ],
		layerB: [ 'layerB', {
			click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.B ); }
		}, true, null ],
		layerC: [ 'layerC', {
			click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.C ); }
		}, true, null ],
		layerD: [ 'layerD',	{
			click: function ( a ) { ZUSE.adderObj.changeSpacing( ZUSE.adderObj.getLayerNumber.D ); }
		}, true, null ],
		clipChange: [ 'clipChange', null, false, [
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
		clipDrag: [ 'clipDrag', {
			click: function ( a ) {
				var state = !ZUSE.adderObj.selection.enabled;
				ZUSE.adderObj.selection.setActivation( state );
				ZUSE.gui.toolbar.toolsByName.select.disable( state );
			}
		}, true, null ],
		clipReset: [ 'clipReset', {
			click: function () { ZUSE.adderObj.selection.reset(); }
		}, false, null ],
		clipFading: [ 'clipFading', {
			click: function ( a ) { ZUSE.ShaderUniforms.activateFadingWidth( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 20 ], onChange: function( values ) {
				ZUSE.ShaderUniforms.setFadingWidthValue( values[ 0 ] );
			} }
		] ],
		clipTransp: [ 'clipTransp', {
			click: function ( a ) { ZUSE.ShaderUniforms.activateClippingTransparency( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 40 ], onChange: function( values ) {
				ZUSE.ShaderUniforms.setClippingTransparencyValue( values[ 0 ] / 100 );
			} }
		] ],
		visMS: [ 'visMS', {
			click: function ( a ) { ZUSE.Materials.MovingSheet.setVisibility( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
				ZUSE.Materials.MovingSheet.setTransparency( values[ 0 ] / 100 );
			} }
		], { activated: true } ],
		visMP: [ 'visMP', {
			click: function ( a ) { ZUSE.Materials.MovingPin.setVisibility( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
				ZUSE.Materials.MovingPin.setTransparency( values[ 0 ] / 100 );
			} }
		], { activated: true } ],
		visSS: [ 'visSS', {
			click: function ( a ) { ZUSE.Materials.StaticSheet.setVisibility( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
				ZUSE.Materials.StaticSheet.setTransparency( values[ 0 ] / 100 );
			} }
		], { activated: true } ],
		visSP: [ 'visSP', {
			click: function ( a ) { ZUSE.Materials.StaticPin.setVisibility( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
				ZUSE.Materials.StaticPin.setTransparency( values[ 0 ] / 100 );
			} }
		], { activated: true } ],
		visIS: [ 'visIS', {
			click: function ( a ) { ZUSE.Materials.IntermediateSheet.setVisibility( a ); }
		}, true, [
			{ type: 'slider', min: 0, max: 100, values: [ 100 ], onChange: function( values ) {
				ZUSE.Materials.IntermediateSheet.setTransparency( values[ 0 ] / 100 );
			} }
		], { activated: true } ],
		viewReset: [ 'viewReset', {
			click: function () { ZUSE.gui.webgl.camera.controls.reset(); }
		}, false, null ],
		highlight: [ 'highlight', {
			click: function ( a ) { ZUSE.adderObj.cycleControl.switchHighlighting(); }
		}, true, null, { activated: true } ],
		select: [ 'select', {
			click: function ( a ) { ZUSE.adderObj.switchSelectables2(); }
		}, true, null ]
	},

	parseXML: function ( guiXML ) {

		var languages = new Object();
		var languagesXML = guiXML.getElementsByTagName( 'languages' );
		if ( languagesXML.length > 0 ) {
			languages.path = languagesXML[ 0 ].getAttribute( 'path' );
			languages.versions = new Object();
			var languageXML = languagesXML[ 0 ].getElementsByTagName( 'language' );
			for ( var i = 0; i < languageXML.length; i++ ) {
				var id = languageXML[ i ].getAttribute( 'id' );
				var name = languageXML[ i ].getAttribute( 'name' );
				languages.versions[ id ] = name;
				if ( i === 0 ) {
					languages.standard = id;
				}
			}
		}

		var tabs = new Array();
		var tabsXML = guiXML.getElementsByTagName( 'tabs' );
		if ( tabsXML.length > 0 ) {
			var tabXML = tabsXML[ 0 ].getElementsByTagName( 'tab' );
			for ( var i = 0; i < tabXML.length; i++ ) {
				tabs.push( tabXML[ i ].getAttribute( 'id' ) );
			}
		}

		var tools = new Array();
		var toolsXML = guiXML.getElementsByTagName( 'tools' );
		if ( toolsXML.length > 0 ) {
			var toolgroupsXML = toolsXML[ 0 ].getElementsByTagName( 'toolgroup' );
			for ( var i = 0; i < toolgroupsXML.length; i++ ) {
				var toolgroup = new Array();
				var toolXML = toolgroupsXML[ i ].getElementsByTagName( 'tool' );
				for ( var j = 0; j < toolXML.length; j++ ) {
					var toolname = toolXML[ j ].getAttribute( 'id' );
					if ( this.toolDefinitions[ toolname ] ) {
						toolgroup.push( this.toolDefinitions[ toolname ] );
					}
				}
				tools.push( toolgroup );
			}
		}

		ZUSE.gui = new ZUTOOLS.LayoutManager( {
			languages: languages,
			tabs: tabs,
			tools: tools
		} );

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

};

