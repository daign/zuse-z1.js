ZUSE.GUI.Tabbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.tabs = new Array();

	this.addTab( 'Logik', ZUSE.XMLUtils.loadXML( 'projects/adder/circuit.svg' ).lastChild );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Transparenz</td></tr> \
			<tr><td>Bewegte Bleche:</td>  <td><div id="sliderMovingSheet"       style="width: 192px;"></div></td></tr> \
			<tr><td>Bewegte Stifte:</td>  <td><div id="sliderMovingPin"         style="width: 192px;"></div></td></tr> \
			<tr><td>Statische Bleche:</td><td><div id="sliderStaticSheet"       style="width: 192px;"></div></td></tr> \
			<tr><td>Statische Stifte:</td><td><div id="sliderStaticPin"         style="width: 192px;"></div></td></tr> \
			<tr><td>Zwischenebenen:</td>  <td><div id="sliderIntermediateSheet" style="width: 192px;"></div></td></tr> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Auswahl</td></tr> \
			<tr><td>Transparenz Deselektion:</td><td><div id="sliderClippingTransparency" style="width: 192px;"></div></td></tr> \
			<tr><td>Breite Übergangsbereich:</td><td><div id="sliderFadingWidth"          style="width: 192px;"></div></td></tr> \
		</table>';
	this.addTab( 'Optionen', content );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td>Breite:</td><td><div id="sliderX" style="width: 300px;"></div></td></tr> \
			<tr><td>Tiefe: </td><td><div id="sliderY" style="width: 300px;"></div></td></tr> \
			<tr><td>Höhe:  </td><td><div id="sliderZ" style="width: 300px;"></div></td></tr> \
		</table>';
	this.addTab( 'Auswahl', content );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<p>Version 27.01.2013</p> \
		<p>Projekt auf GitHub: <a href="https://github.com/daign/zuse-z1.js">zuse-z1.js</a></p> \
		<p>Verantwortlich:<br/> \
		Jakob&nbsp;Mischek,&nbsp;Dauerwaldweg&nbsp;1,&nbsp;14055&nbsp;Berlin<br/> \
		E-Mail: <a href="mailto:jakob.mischek@zuse-z1.de">jakob.mischek@zuse-z1.de</a></p>';
	this.addTab( 'Impressum', content );

/*	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table style="width:500px"><tr><td> \
		<tt><b>A:</b></tt> \
		<input type="button" value="1" id="ButtonA3" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A3&quot;, event );" disabled /> \
		<input type="button" value="1" id="ButtonA2" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A2&quot;, event );" disabled /> \
		<input type="button" value="1" id="ButtonA1" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A1&quot;, event );" disabled /> \
		<input type="button" value="1" id="ButtonA0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;A0&quot;, event );" disabled /><br/> \
		<tt><b>B:</b></tt> \
		<input type="button" value="0" id="ButtonB3" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B3&quot;, event );" disabled /> \
		<input type="button" value="0" id="ButtonB2" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B2&quot;, event );" disabled /> \
		<input type="button" value="0" id="ButtonB1" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B1&quot;, event );" disabled /> \
		<input type="button" value="0" id="ButtonB0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;B0&quot;, event );" disabled /> \
		<tt><b>&nbsp;F0:</b></tt> \
		<input type="button" value="0" id="ButtonF0" onclick="ZUSE.adderObj.cycleControl.switchInput( &quot;F0&quot;, event );" disabled /><br/> \
		<tt><b>K:</b></tt> \
		<input type="button" value="0" id="ButtonK3" disabled /> \
		<input type="button" value="0" id="ButtonK2" disabled /> \
		<input type="button" value="0" id="ButtonK1" disabled /> \
		<input type="button" value="0" id="ButtonK0" disabled /> \
		<tt><b>&nbsp;F4:</b></tt> \
		<input type="button" value="0" id="ButtonF4" disabled /> \
		<td><div id="log"></div></table>';
	this.addTab( 'Debug', content, false );*/

};

ZUSE.GUI.Tabbar.prototype = {

	constructor: ZUSE.GUI.Tabbar,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height + 'px';
		this.div.style.left = left + 10 + 'px';

		var left = 0;

		for ( var i = 0; i < this.tabs.length; i++ ) {

			left = this.tabs[ i ].setPosition( left );

		}

	},

	addTab: function ( title, content ) {

		var tab = new ZUSE.GUI.Tab( this, title, content );
		this.tabs.push( tab );

	},

	closeAll: function () {

		for ( var i = 0; i < this.tabs.length; i++ ) {

			this.tabs[ i ].close();

		};

	}

};

