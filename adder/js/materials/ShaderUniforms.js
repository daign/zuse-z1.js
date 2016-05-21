ZUSE.ShaderUniforms = {

	x1:                   { type: "f", value: 0.0 },
	x2:                   { type: "f", value: 0.0 },
	y1:                   { type: "f", value: 0.0 },
	y2:                   { type: "f", value: 0.0 },

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

