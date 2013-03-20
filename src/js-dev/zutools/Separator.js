ZUTOOLS.Separator = function ( parent ) {

	var self = this;
	this.parent = parent;
	this.left = undefined;

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top = '0px';
	this.div.setAttribute( 'class', 'action col' );
	document.body.appendChild( this.div );

	this.div.addEventListener( 'mousedown', beginDrag, false );

	function beginDrag( event ) {

		var leftStart = self.left;
		var resizeStart = event.clientX;

		document.addEventListener( 'selectstart', cancelSelect, false );
		document.addEventListener( 'mousemove',   continueDrag, false );
		document.addEventListener( 'mouseup',     endDrag,      false );

		function cancelSelect( event ) {

			event.preventDefault();
			event.stopPropagation();

		}

		function continueDrag( event ) {

			self.parent.setColumns( 0, leftStart + event.clientX - resizeStart );
			self.parent.setSizes();

		}

		function endDrag() {

			document.removeEventListener( 'selectstart', cancelSelect, false );
			document.removeEventListener( 'mousemove',   continueDrag, false );
			document.removeEventListener( 'mouseup',     endDrag,      false );

		}

	}

};

ZUTOOLS.Separator.prototype = {

	constructor: ZUTOOLS.Separator,

	setSize: function ( width, height, left ) {

		this.div.style.width  = width  + 'px';
		this.div.style.height = height + 'px';
		this.left = left;
		this.div.style.left   = left   + 'px';	

	}

};

