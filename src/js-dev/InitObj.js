ZUSE.InitObj = function () {

	ZUSE.adderObj = new ZUSE.Adder();

	// setting some elements to their start-position
	var inputs = new Array();
	inputs.push( ZUSE.adderObj.layersByType.In.cycleAccess[ 'A0' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.cycleAccess[ 'A1' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.cycleAccess[ 'A2' ] );
	inputs.push( ZUSE.adderObj.layersByType.In.cycleAccess[ 'A3' ] );
	inputs.push( ZUSE.adderObj.layersByType.C.cycleAccess[ 'T' ] );
	inputs.push( ZUSE.adderObj.layersByType.D.cycleAccess[ 'T' ] );
	var transition = new ZUSE.Transition( ZUSE.adderObj.cycleControl, 2, inputs, false );
	transition.set();

}

