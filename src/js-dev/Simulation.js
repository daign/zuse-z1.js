ZUSE.Simulation = function () {

	if ( ZUSE.WebGLErrorMessage() ) { return; }

	SIMULATION = this;

	ZUSE.InitZutools();
	ZUSE.InitObj();
	ZUSE.InitPicking();

};

