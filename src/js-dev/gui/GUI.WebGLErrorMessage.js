ZUSE.GUI.WebGLErrorMessage = function () {

	var webGLSupport = ( function () {
		try {
			return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
		} catch( e ) {
			return false;
		}
	} )();

	if ( !webGLSupport ) {

		document.body.style.margin = '20px';
		document.body.style.overflow = 'auto';

		document.write( ' \
			Zum Anzeigen der Simulation benötigen Sie einen Browser mit aktiviertem <a href="http://get.webgl.org/">WebGL</a>. \
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
			Zum Konrad Zuse Internet Archiv: <a href="http://zuse-z1.zib.de/">zuse-z1.zib.de</a>' );

		return true;

	} else {

		return false;

	}

};

