ZUTOOLS.Popup = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.setAttribute( 'class', 'popup bottomcorners topcorners small' );
	this.div.style.zIndex = 3;
	this.hide();
	document.body.appendChild( this.div );

};

ZUTOOLS.Popup.prototype = {

	constructor: ZUTOOLS.Popup,

	setPosition: function ( top, left ) {

		this.div.style.top  = top  + 'px';
		this.div.style.left = left + 'px';

	},

	show: function ( x, y, f ) {

		this.setPosition( (y+1)*f, (x+23)*f );
		this.div.style.display = 'block';

	},

	hide: function () {

		this.div.style.display = 'none';

	}

};

