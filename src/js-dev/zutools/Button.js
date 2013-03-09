ZUTOOLS.Button = function ( text, onclick ) {

	var self = this;
	this.onclick = onclick;

	this.domNode = document.createElement( 'div' );
	this.domNode.setAttribute( 'class', 'button action corners small' );
	this.domNode.innerHTML = text;

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

