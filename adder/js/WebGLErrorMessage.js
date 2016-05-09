ZUSE.WebGLErrorMessage = function () {

	var webGLSupport = ( function () {
		try {
			var canvas = document.createElement( 'canvas' );
			return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
		} catch( e ) {
			return false;
		}
	} )();

	if ( !webGLSupport ) {

		document.body.style.margin = '20px';
		document.body.style.overflow = 'auto';

		document.write( ' \
			To view the simulation you need a browser with activated <a href="http://get.webgl.org/">WebGL</a>. \
			<ol style="line-height: 1.6;"> \
				<li>Make sure you have a current version of your browser installed.</li> \
				<li>If necessary, activate WebGL in your browser. \
					<ul style="line-height: 2.4; font-size: 18px;"> \
						<li>Firefox: Open <tt class="greybox">about:config</tt> und set <tt class="greybox">webgl.force-enabled</tt> to <tt class="greybox">true</tt>.</li> \
						<li>Chrome: Start Chrome with flag <tt class="greybox">--ignore-gpu-blacklist</tt>.</li> \
						<li>Safari: Open a terminal and run the following command:<br/> \
							<tt class="greybox">defaults write com.apple.Safari WebKitWebGLEnabled -bool YES</tt> \
						</li> \
						<li>Opera: Open <tt class="greybox">opera:config</tt> and set \
							<tt class="greybox">Enable WebGL</tt> and \
							<tt class="greybox">Enable Hardware Acceleration</tt> to <tt class="greybox">1</tt>. \
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
			Go to the <a href="http://zuse.zib.de/">Konrad Zuse Internet Archive</a>' );

		return true;

	} else {

		return false;

	}

};

