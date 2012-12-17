ZUSE.GUI.Button = function ( parent ) {

	var self = this;

	this.div = document.createElement( 'div' );
	this.div.style.background = '#4da';
	this.div.style.color = '#000';
	this.div.style.cursor = 'pointer';
	this.div.innerHTML = 'Button';
	parent.div.appendChild( this.div );

	this.div.addEventListener( 'mouseover', onMouseOver, false );
	this.div.addEventListener( 'mouseout',  onMouseOut,  false );

	function onMouseOver() {

		self.div.style.background = '#6fc';

	}

	function onMouseOut() {

		self.div.style.background = '#4da';

	}

};

ZUSE.GUI.Button.prototype = {

	constructor: ZUSE.GUI.Button,

	setSize: function ( width ) {

		this.div.style.width  = width + 'px';
		this.div.style.height = width + 'px';

	}

};

