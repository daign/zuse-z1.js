ZUSE.GUI.Tab = function ( parent, title, content ) {

	var self = this;
	this.parent = parent;
	this.expanded = false;

	this.title = document.createElement( 'div' );
	this.title.style.position = 'absolute';
	this.title.setAttribute( 'class', 'action topcorners' );
	this.title.style.padding = '8px';
	this.title.style.cursor  = 'pointer';
	this.title.innerHTML     = title;
	this.title.style.zIndex = 2;
	parent.div.appendChild( this.title );

	this.closer = document.createElement( 'div' );
	this.closer.style.position = 'absolute';
	this.closer.setAttribute( 'class', 'closer' );
	this.closer.style.padding = '8px';
	this.closer.style.cursor  = 'pointer';
	this.closer.innerHTML     = title;
	this.closer.style.zIndex = 1;
	parent.div.appendChild( this.closer );

	this.content = document.createElement( 'div' );
	this.content.style.position = 'absolute';
	this.content.style.top      = '0px';
	this.content.style.left     = '0px';
	this.content.setAttribute( 'class', 'topborder greybox bigpadding' );
	this.content.appendChild( content );
	parent.div.appendChild( this.content );

	this.title.addEventListener( 'click', onClick, false );

	function onClick() {

		self.switchExpanded();

	}

	this.closer.addEventListener( 'click', onClickCloser, false );

	function onClickCloser() {

		self.close();

	}

};

ZUSE.GUI.Tab.prototype = {

	constructor: ZUSE.GUI.Tab,

	setPosition: function ( left ) {

		this.setPositionTop();

		this.title.style.left = left + 'px';
		this.closer.style.left = left + 'px';
		return left + this.title.offsetWidth + 2;

	},

	setPositionTop: function () {

		if ( this.expanded ) {

			this.title.style.top   = -this.content.offsetHeight -this.title.offsetHeight + 'px';
			this.content.style.top = -this.content.offsetHeight + 'px';

		} else {

			this.title.style.top   = -this.title.offsetHeight + 'px';
			this.content.style.top = '0px';

		}

		this.closer.style.top = -this.title.offsetHeight + 'px'	;

	},

	close: function () {

		this.expanded = false;
		this.content.style.display = 'none';
		this.setPositionTop();

	},

	open: function () {

		this.expanded = true;
		this.content.style.display = 'block';
		this.setPositionTop();

	},

	switchExpanded: function () {

		if ( this.expanded ) {

			this.close();

		} else {

			this.parent.closeAll();
			this.open();

		}

	}

};

