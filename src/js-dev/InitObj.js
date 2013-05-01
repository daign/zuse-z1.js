ZUSE.InitObj = function () {

	ZUSE.adderObj = new ZUSE.Adder();

	// setting some elements to their start-position
	var inputs = new Array();
	inputs.push( ZUSE.adderObj.layersByType.In.namedElements[ 'A0' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.namedElements[ 'A1' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.namedElements[ 'A2' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.namedElements[ 'A3' ] );
	inputs.push( ZUSE.adderObj.layersByType.C.namedElements[ 'T' ] );
	inputs.push( ZUSE.adderObj.layersByType.D.namedElements[ 'T' ] );
	var transition = new ZUSE.Transition( ZUSE.adderObj.cycleControl, 2, inputs, false );
	transition.set();

}

