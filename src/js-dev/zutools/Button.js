ZUTOOLS.Button = function ( settings ) {

	var self = this;
	this.onclick = settings.onclick;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'button action corners small' );
	this.domNode.innerHTML = settings.text;

	this.domNode.addEventListener( 'click', onClick, false );

	function onClick ( event ) {

		self.onclick();

	}

};

ZUTOOLS.Button.prototype = {

	constructor: ZUTOOLS.Button,

	select: function ( b ) {

		b = ( b === undefined ) ? true : b;
		this.domNode.setAttribute( 'class', 'button action corners small' + ( b ? ' selected' : '' ) );

	}

};

