ZUSE.Simulation = function () {

	if ( ZUTOOLS.WebGLErrorMessage() ) { return; }

	SIMULATION = this;

	ZUSE.InitZutools();
	ZUSE.InitObj();
	ZUSE.InitPicking();

};

