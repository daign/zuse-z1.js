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

});

