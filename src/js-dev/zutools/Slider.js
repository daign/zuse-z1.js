ZUTOOLS.Slider = function () {

	var self = this;

	this.domNode = document.createElement( 'div' );

	this.handle = document.createElement( 'div' );
	this.handle.setAttribute( 'class', 'handle action' );
	this.domNode.appendChild( this.handle );

	this.handle.addEventListener( 'click', onClick, false );

	function onClick ( event ) {

		console.log( 'Slider Click' );

	}

};

ZUTOOLS.Slider.prototype = {

	constructor: ZUTOOLS.Slider

};

