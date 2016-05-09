ZUSE.Simulation = function () {

	if ( ZUSE.WebGLErrorMessage() ) { return; }

	var xmlDoc = this.loadProjectFile();

	var getXML = function ( tag ) {
		var results = xmlDoc.getElementsByTagName( tag );
		if ( results.length > 0 ) {
			return results[ 0 ];
		} else {
			return null;
		}
	};

	ZUSE.InitZutools.parseXML(  getXML( 'gui' ) );
	ZUSE.InitObj(               getXML( 'structure' ) );
	ZUSE.TriggerRules.parseXML( getXML( 'rules' ) );
	ZUSE.InitPicking();

};

ZUSE.Simulation.prototype = {

	constructor: ZUSE.Simulation,

	loadProjectFile: function () {

		var file = 'projects/adder/Project.xml';
		var xmlDoc = ZUSE.XMLUtils.loadXML( file );
		return xmlDoc;

	}

};

