ZUSE.ShaderUniforms = {

	x1:                   { type: "f", value: 0.0 },
	x2:                   { type: "f", value: 0.0 },
	y1:                   { type: "f", value: 0.0 },
	y2:                   { type: "f", value: 0.0 },
	clippingTransparency: { type: "f", value: 0.0, active: false, activeValue: 0.4 },
	fadingWidth:          { type: "f", value: 0.0, active: false, activeValue: 20.0 },

	activateFadingWidth: function ( b ) { this.activate( this.fadingWidth, b ); },
	setFadingWidthValue: function ( v ) { this.setValue( this.fadingWidth, v ); },
	activateClippingTransparency: function ( b ) { this.activate( this.clippingTransparency, b ); },
	setClippingTransparencyValue: function ( v ) { this.setValue( this.clippingTransparency, v ); },

	activate: function ( uniform, b ) {
		uniform.active = b;
		uniform.value = b ? uniform.activeValue : 0.0;
	},

	setValue: function ( uniform, v ) {
		uniform.activeValue = v;
		if ( uniform.active ) {
			uniform.value = v;
		}
	}

};

