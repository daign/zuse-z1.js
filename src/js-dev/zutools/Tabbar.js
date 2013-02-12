ZUTOOLS.Tabbar = function () {

	this.div = document.createElement( 'div' );
	this.div.style.position = 'absolute';
	document.body.appendChild( this.div );

	this.tabs = new Array();

	this.addTab( 'Logic', ZUSE.XMLUtils.loadXML( 'projects/adder/circuit.svg' ).lastChild );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Transparency</td></tr> \
			<tr><td>Moving Sheets:</td>			<td><div id="sliderMovingSheet"			style="width: 192px;"></div></td></tr> \
			<tr><td>Moving Pins:</td>			<td><div id="sliderMovingPin"			style="width: 192px;"></div></td></tr> \
			<tr><td>Static Sheets:</td>			<td><div id="sliderStaticSheet"			style="width: 192px;"></div></td></tr> \
			<tr><td>Static Pins:</td>			<td><div id="sliderStaticPin"			style="width: 192px;"></div></td></tr> \
			<tr><td>Intermediate Sheets:</td>	<td><div id="sliderIntermediateSheet"	style="width: 192px;"></div></td></tr> \
			<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Selection</td></tr> \
			<tr><td>Deselection Transparency:</td><td><div id="sliderClippingTransparency" style="width: 192px;"></div></td></tr> \
			<tr><td>Fading Width:</td>			<td><div id="sliderFadingWidth"			style="width: 192px;"></div></td></tr> \
		</table>';
	this.addTab( 'Options', content );

	var content = document.createElement( 'span' );
	content.innerHTML = ' \
		<table cellpadding="4px" style="font-size: x-small;"> \
			<tr><td>Width: </td><td><div id="sliderX" style="width: 300px;"></div></td></tr> \
			<tr><td>Depth: </td><td><div id="sliderY" style="width: 300px;"></div></td></tr> \
			<tr><td>Height:</td><td><div id="sliderZ" style="width: 300px;"></div></td></tr> \
		</table>';
	this.addTab( 'Selection', content );

	var content = document.createElement( 'span' );
	content.style.fontSize = 'small';
	content.style.whiteSpace = 'nowrap';
	content.innerHTML = '\
		<p>3D simulation of the Z1 adder</p> \
		<p>Based on the paper "Rechenvorrichtungen aus mechanischen Schaltgliedern" by Konrad Zuse.</p> \
		<p>Project on GitHub: <a href="https://github.com/daign/zuse-z1.js">github.com/daign/zuse-z1.js</a>.</p> \
		<p>With the friendly assistance of the <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>.</p> \
		<p>Version 06.02.2013</p> \
		<p>Responsible for this site:<br/> \
		Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
		E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p>';
	this.addTab( 'Imprint', content );

};

ZUTOOLS.Tabbar.prototype = {

	constructor: ZUTOOLS.Tabbar,

	setSize: function ( width, height, left ) {

		this.div.style.top  = height + 'px';
		this.div.style.left = left + 10 + 'px';

		var left = 0;

		for ( var i = 0; i < this.tabs.length; i++ ) {

			left = this.tabs[ i ].setPosition( left );

		}

	},

	addTab: function ( title, content ) {

		var tab = new ZUTOOLS.Tab( this, title, content );
		this.tabs.push( tab );

	},

	closeAll: function () {

		for ( var i = 0; i < this.tabs.length; i++ ) {

			this.tabs[ i ].close();

		};

	}

};

