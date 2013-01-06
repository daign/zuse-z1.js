$(function(){

	$('#sliderX').slider({ range: true, min: 0, max: 1000, values: [ 0, 1000 ],
		slide: function( event, ui ) { ZUSE.adderObj.selection.setFromSlider( 'x', ui.values[ 0 ], ui.values[ 1 ] ); }
	});
	$('#sliderY').slider({ range: true, min: 0, max: 1000, values: [ 0, 1000 ],
		slide: function( event, ui ) { ZUSE.adderObj.selection.setFromSlider( 'y', ui.values[ 0 ], ui.values[ 1 ] ); }
	});
	$('#sliderZ').slider({ range: true, min: 0, max: 8, values: [ 0, 8 ],
		slide: function( event, ui ) { ZUSE.adderObj.selection.setFromSlider( 'z', ui.values[ 0 ], ui.values[ 1 ] ); }
	});

	$('#sliderMovingSheet').slider({ range: "min", min: 0, max: 100, value: 100,
		slide: function( event, ui ) { ZUSE.Materials.MovingSheet.transparency.value = ( ui.value / 100 ); }
	});
	$('#sliderStaticSheet').slider({ range: "min", min: 0, max: 100, value: 100,
		slide: function( event, ui ) { ZUSE.Materials.StaticSheet.transparency.value = ( ui.value / 100 ); }
	});
	$('#sliderIntermediateSheet').slider({ range: "min", min: 0, max: 100, value: 100,
		slide: function( event, ui ) { ZUSE.Materials.IntermediateSheet.transparency.value = ( ui.value / 100 ); }
	});
	$('#sliderMovingPin').slider({ range: "min", min: 0, max: 100, value: 100,
		slide: function( event, ui ) { ZUSE.Materials.MovingPin.transparency.value = ( ui.value / 100 ); }
	});
	$('#sliderStaticPin').slider({ range: "min", min: 0, max: 100, value: 100,
		slide: function( event, ui ) { ZUSE.Materials.StaticPin.transparency.value = ( ui.value / 100 ); }
	});

	$('#sliderClippingTransparency').slider({ range: "min", min: 0, max: 100, value: 0,
		slide: function( event, ui ) { ZUSE.ShaderUniforms.clippingTransparency.value = ( ui.value / 100 ); }
	});
	$('#sliderFadingWidth').slider({ range: "min", min: 0, max: 100, value: 0,
		slide: function( event, ui ) { ZUSE.ShaderUniforms.fadingWidth.value = ui.value; }
	});

});

