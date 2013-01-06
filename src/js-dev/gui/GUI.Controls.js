ZUSE.GUI.Controls = function () {

	var self = this;

	this.expanded = true;

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	this.div.style.top      =  '10px';
	this.div.style.width    =  '240px';
	document.body.appendChild( this.div );

	this.div.style.color = '#000';

	this.title = document.createElement( 'div' );
	this.title.innerHTML = '<b>Additionswerk</b><br/>';
	this.title.setAttribute( 'class', 'action topcorners' );
	this.title.style.padding = '8px';
	this.title.style.cursor = 'pointer';
	this.div.appendChild( this.title );

	this.input = document.createElement( 'div' );
	this.input.setAttribute( 'class', 'greybox' );
	this.input.innerHTML = ' \
<tt><b>A:</b></tt> \
<input type="button" value="1" id="ButtonA3" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A3&quot;, event );"/> \
<input type="button" value="1" id="ButtonA2" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A2&quot;, event );"/> \
<input type="button" value="1" id="ButtonA1" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A1&quot;, event );"/> \
<input type="button" value="1" id="ButtonA0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A0&quot;, event );"/><br/> \
<tt><b>B:</b></tt> \
<input type="button" value="0" id="ButtonB3" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B3&quot;, event );"/> \
<input type="button" value="0" id="ButtonB2" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B2&quot;, event );"/> \
<input type="button" value="0" id="ButtonB1" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B1&quot;, event );"/> \
<input type="button" value="0" id="ButtonB0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B0&quot;, event );"/> \
<tt><b>&nbsp;F0:</b></tt> \
<input type="button" value="0" id="ButtonF0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;F0&quot;, event );" disabled /><br/> \
<tt><b>K:</b></tt> \
<input type="button" value="0" id="ButtonK3" disabled /> \
<input type="button" value="0" id="ButtonK2" disabled /> \
<input type="button" value="0" id="ButtonK1" disabled /> \
<input type="button" value="0" id="ButtonK0" disabled /> \
<tt><b>&nbsp;F4:</b></tt> \
<input type="button" value="0" id="ButtonF4" disabled /> \
<div id="log"></div>';

	this.div.appendChild( this.input );

	this.title.addEventListener( 'click', onClick, false );

	function onClick() {

		self.expanded = !self.expanded;
		self.input.style.display = self.expanded ? 'block' : 'none';

	}

};

ZUSE.GUI.Controls.prototype = {

	constructor: ZUSE.GUI.Controls,

	setSize: function ( width, height, left ) {

		this.div.style.left = left + 10 + 'px';

	}

};

