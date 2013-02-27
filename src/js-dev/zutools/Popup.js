ZUTOOLS.Popup = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.setAttribute( 'class', 'popup bottomcorners topcorners' );
	this.hide();

	this.div.innerHTML = "Popup";
	this.setPosition( 100, 100 );

};

ZUTOOLS.Popup.prototype = {

	constructor: ZUTOOLS.Popup,

	append: function () {

		document.body.appendChild( this.div );

	},

	setPosition: function ( top, left ) {

		this.div.style.top  = top  + 'px';
		this.div.style.left = left + 'px';

	},

	show: function () {

		//console.log( 'showing' );
		this.div.style.display = 'block';

	},

	hide: function () {

		//console.log( 'hiding' );
		this.div.style.display = 'none';

	}

};

