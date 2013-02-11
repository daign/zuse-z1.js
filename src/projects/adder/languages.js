english = [
'Z1 Adder',

'Home',
'Step Back',
'Repeat Last Step',
'Next Step',
'Expand Layer A',
'Expand Layer B',
'Expand Layer C',
'Expand Layer D',
'Activate Selection',
'Reset Selection',
'Reset View',
'Highlight Moving Elements',
'Pointing at Elements',

'1. Input',
'2. Compute Carryover',
'3. Compute Result',
'4. Reset',

'Logic',

'Options',
'<table cellpadding="4px" style="font-size: x-small;"> \
	<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Transparency</td></tr> \
	<tr><td>Moving Sheets:</td>			<td><div id="sliderMovingSheet"			style="width: 192px;"></div></td></tr> \
	<tr><td>Moving Pins:</td>			<td><div id="sliderMovingPin"			style="width: 192px;"></div></td></tr> \
	<tr><td>Static Sheets:</td>			<td><div id="sliderStaticSheet"			style="width: 192px;"></div></td></tr> \
	<tr><td>Static Pins:</td>			<td><div id="sliderStaticPin"			style="width: 192px;"></div></td></tr> \
	<tr><td>Intermediate Sheets:</td>	<td><div id="sliderIntermediateSheet"	style="width: 192px;"></div></td></tr> \
	<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Selection</td></tr> \
	<tr><td>Deselection Transparency:</td><td><div id="sliderClippingTransparency" style="width: 192px;"></div></td></tr> \
	<tr><td>Fading Width:</td>			<td><div id="sliderFadingWidth"			style="width: 192px;"></div></td></tr> \
</table>',

'Selection',
'<table cellpadding="4px" style="font-size: x-small;"> \
	<tr><td>Width: </td><td><div id="sliderX" style="width: 300px;"></div></td></tr> \
	<tr><td>Depth: </td><td><div id="sliderY" style="width: 300px;"></div></td></tr> \
	<tr><td>Height:</td><td><div id="sliderZ" style="width: 300px;"></div></td></tr> \
</table>',

'Imprint',
'<p>3D simulation of the Z1 adder</p> \
<p>Based on the paper "Rechenvorrichtungen aus mechanischen Schaltgliedern" by Konrad Zuse.</p> \
<p>Project on GitHub: <a href="https://github.com/daign/zuse-z1.js">github.com/daign/zuse-z1.js</a>.</p> \
<p>With the friendly assistance of the <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>.</p> \
<p>Version 06.02.2013</p> \
<p>Responsible for this site:<br/> \
Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p>',

'To view the simulation you need a browser with activated <a href="http://get.webgl.org/">WebGL</a>. \
<ol style="line-height: 1.6;"> \
	<li>Make sure you have a current version of your browser installed.</li> \
	<li>If necessary, activate WebGL in your browser. \
		<ul style="line-height: 2.4; font-size: 18px;"> \
			<li>Firefox: Open <tt>about:config</tt> und set <tt>webgl.force-enabled</tt> to <tt>true</tt>.</li> \
			<li>Chrome: Start Chrome with flag <tt>--ignore-gpu-blacklist</tt>.</li> \
			<li>Safari: Open a terminal and run the following command:<br/> \
				<tt>defaults write com.apple.Safari WebKitWebGLEnabled -bool YES</tt> \
			</li> \
			<li>Opera: Open <tt>opera:config</tt> and set \
				<tt>Enable WebGL</tt> and \
				<tt>Enable Hardware Acceleration</tt> to <tt>1</tt>. \
			</li> \
		</ul> \
	</li> \
</ol> \
<span style="font-size: 12px;"> \
	<h2>Imprint</h2> \
	<p>Responsible for this site:<br/> \
	Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
	E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p> \
</span><br/>\
Go to the <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>'
];

german = [
'Additionswerk',

'Home',
'Schritt zurück',
'Letzten Schritt wiederholen',
'Nächster Schritt',
'Layer A expandieren',
'Layer B expandieren',
'Layer C expandieren',
'Layer D expandieren',
'Auswahl aktivieren',
'Auswahl zurücksetzen',
'Ansicht zurücksetzen',
'Bewegende Teile markieren',
'Beliebige Teile markieren',

'1. Eingabe',
'2. Überträge berechnen',
'3. Ergebnis berechnen',
'4. Zurücksetzen',

'Logik',

'Optionen',
'<table cellpadding="4px" style="font-size: x-small;"> \
	<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Transparenz</td></tr> \
	<tr><td>Bewegte Bleche:</td>  <td><div id="sliderMovingSheet"       style="width: 192px;"></div></td></tr> \
	<tr><td>Bewegte Stifte:</td>  <td><div id="sliderMovingPin"         style="width: 192px;"></div></td></tr> \
	<tr><td>Statische Bleche:</td><td><div id="sliderStaticSheet"       style="width: 192px;"></div></td></tr> \
	<tr><td>Statische Stifte:</td><td><div id="sliderStaticPin"         style="width: 192px;"></div></td></tr> \
	<tr><td>Zwischenebenen:</td>  <td><div id="sliderIntermediateSheet" style="width: 192px;"></div></td></tr> \
	<tr><td colspan="2" style="font-weight: bold; font-size: medium;">Auswahl</td></tr> \
	<tr><td>Transparenz Deselektion:</td><td><div id="sliderClippingTransparency" style="width: 192px;"></div></td></tr> \
	<tr><td>Breite Übergangsbereich:</td><td><div id="sliderFadingWidth"          style="width: 192px;"></div></td></tr> \
</table>',

'Auswahl',
'<table cellpadding="4px" style="font-size: x-small;"> \
	<tr><td>Breite:</td><td><div id="sliderX" style="width: 300px;"></div></td></tr> \
	<tr><td>Tiefe: </td><td><div id="sliderY" style="width: 300px;"></div></td></tr> \
	<tr><td>Höhe:  </td><td><div id="sliderZ" style="width: 300px;"></div></td></tr> \
</table>',

'Impressum',
'<p>3D-Simulation des Additionswerkes der Z1 von Konrad Zuse</p> \
<p>Dieses Projekt wurde von Jakob Mischek im Rahmen seiner \
<a href="http://www.inf.fu-berlin.de/inst/ag-ki/rojas_home/documents/Betreute_Arbeiten/Bachelor-Mischek.pdf">Bachelorarbeit</a> \
an der FU Berlin begonnen und<br/>wird als Open-Source-Projekt auf GitHub weiterentwickelt: \
<a href="https://github.com/daign/zuse-z1.js">github.com/daign/zuse-z1.js</a>.</p> \
<p>Das Additionswerk basiert auf Konrad Zuses Arbeit "Rechenvorrichtungen aus mechanischen Schaltgliedern".</p> \
Mit freundlicher Unterstützung durch das <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>.</p> \
<p>Version 30.01.2013</p> \
<p>Verantwortlich für diese Seite:<br/> \
Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
E-Mail: <a href="mailto:jakob.mischek@daign.de">jakob.mischek@daign.de</a></p>',

'Zum Anzeigen der Simulation benötigen Sie einen Browser mit aktiviertem <a href="http://get.webgl.org/">WebGL</a>. \
<ol style="line-height: 1.6;"> \
	<li>Stellen Sie sicher, dass Sie eine aktuelle Version Ihres Browsers installiert haben.</li> \
	<li>Falls erforderlich, aktivieren Sie WebGL in Ihrem Browser. \
		<ul style="line-height: 2.4; font-size: 18px;"> \
			<li>Firefox: Öffnen Sie <tt>about:config</tt> und setzen Sie <tt>webgl.force-enabled</tt> auf <tt>true</tt>.</li> \
			<li>Chrome: Starten Sie Chrome mit der Option <tt>--ignore-gpu-blacklist</tt>.</li> \
			<li>Safari: Öffnen Sie ein Terminal und führen Sie den folgenden Befehl aus:<br/> \
				<tt>defaults write com.apple.Safari WebKitWebGLEnabled -bool YES</tt> \
			</li> \
			<li>Opera: Öffnen Sie <tt>opera:config</tt> und setzen Sie \
				<tt>Enable WebGL</tt> sowie \
				<tt>Enable Hardware Acceleration</tt> auf <tt>1</tt>. \
			</li> \
		<!--<li>Internet Explorer: Sie müssen das Plug-In  \
				<a href="http://www.google.com/chromeframe">Google Chrome Frame</a> oder \
				<a href="http://iewebgl.com/">IEWebGL</a> installieren. \
			</li>--> \
		</ul> \
	</li> \
</ol> \
<span style="font-size: 12px;"> \
	<h2>Impressum</h2> \
	<p> \
		Jakob Mischek, Dauerwaldweg 1, 14055 Berlin<br/> \
		E-Mail: jakob.mischek@daign.de \
	</p> \
</span><br/>\
Zum Konrad Zuse Internet Archiv: <a href="http://zuse-z1.zib.de/">zuse-z1.zib.de</a>'
];

