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
	content.style.fontSize = 'small';
	content.style.whiteSpace = 'nowrap';
	content.innerHTML = '\
		<p>3D-Simulation des Additionswerkes der Z1 von Konrad Zuse</p> \
		<p>Dieses Projekt wurde von Jakob Mischek im Rahmen seiner \
		<a href="http://www.inf.fu-berlin.de/inst/ag-ki/rojas_home/documents/Betreute_Arbeiten/Bachelor-Mischek.pdf">Bachelorarbeit</a> \
		an der FU Berlin begonnen und<br/>wird als Open-Source-Projekt auf GitHub weiterentwickelt: \
		<a href="https://github.com/daign/zuse-z1.js">github.com/daign/zuse-z1.js</a>.</p> \
		<p>Das Additionswerk basiert auf Konrad Zuses Arbeit "Rechenvorrichtungen aus mechanischen Schaltgliedern".</p> \
		Mit freundlicher Unterstützung durch das <a href="http://zuse-z1.zib.de/">Konrad Zuse Internet Archiv</a>.</p> \
		<p>Version 30.01.2013</p> \
		<p>Verantwortlich für diese Seite:<br/> \
		Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
		E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p>';
	this.addTab( 'Impressum', content );

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

