ZUSE.SVGUtils = {

	gates: {svgGateD3: { active: false, x1:  74, x2: 106, y1: 125, y2: 225, z1: 7, z2: 7 },
			svgGateD2: { active: false, x1: 114, x2: 146, y1: 125, y2: 225, z1: 7, z2: 7 },
			svgGateD1: { active: false, x1: 154, x2: 186, y1: 125, y2: 225, z1: 7, z2: 7 },
			svgGateD0: { active: false, x1: 194, x2: 226, y1: 125, y2: 225, z1: 7, z2: 7 },
			svgGateC3: { active: false, x1:  71, x2: 110, y1: 110, y2: 255, z1: 5, z2: 5 },
			svgGateC2: { active: false, x1: 111, x2: 150, y1: 110, y2: 255, z1: 5, z2: 5 },
			svgGateC1: { active: false, x1: 151, x2: 190, y1: 110, y2: 255, z1: 5, z2: 5 },
			svgGateC0: { active: false, x1: 191, x2: 230, y1: 110, y2: 255, z1: 5, z2: 5 },
			svgGateF4: { active: false, x1:  26, x2:  60, y1:  60, y2:  90, z1: 5, z2: 7 },
			svgGateF3: { active: false, x1:  66, x2: 100, y1:  60, y2:  90, z1: 5, z2: 7 },
			svgGateF2: { active: false, x1: 106, x2: 140, y1:  60, y2:  90, z1: 5, z2: 7 },
			svgGateF1: { active: false, x1: 146, x2: 180, y1:  60, y2:  90, z1: 5, z2: 7 },
			svgGateH3: { active: false, x1:  74, x2: 106, y1:  70, y2: 110, z1: 5, z2: 5 },
			svgGateH2: { active: false, x1: 114, x2: 146, y1:  70, y2: 110, z1: 5, z2: 5 },
			svgGateH1: { active: false, x1: 154, x2: 186, y1:  70, y2: 110, z1: 5, z2: 5 },
			svgGateH0: { active: false, x1: 194, x2: 226, y1:  70, y2: 110, z1: 5, z2: 5 },
			svgGateN3: { active: false, x1:  64, x2: 106, y1:   5, y2:  45, z1: 5, z2: 5 },
			svgGateN2: { active: false, x1: 106, x2: 146, y1:   5, y2:  45, z1: 5, z2: 5 },
			svgGateN1: { active: false, x1: 146, x2: 186, y1:   5, y2:  45, z1: 5, z2: 5 },
			svgGateN0: { active: false, x1: 186, x2: 226, y1:   5, y2:  45, z1: 5, z2: 5 },
			svgGateJ3: { active: false, x1:  60, x2:  95, y1:  45, y2:  60, z1: 5, z2: 7 },
			svgGateJ2: { active: false, x1: 100, x2: 135, y1:  45, y2:  60, z1: 5, z2: 7 },
			svgGateJ1: { active: false, x1: 140, x2: 175, y1:  45, y2:  60, z1: 5, z2: 7 },
			svgGateJ0: { active: false, x1: 180, x2: 215, y1:  45, y2:  60, z1: 5, z2: 7 },
			svgGateK3: { active: false, x1:  35, x2: 120, y1:  10, y2: 115, z1: 1, z2: 1 },
			svgGateK2: { active: false, x1:  75, x2: 160, y1:  10, y2: 115, z1: 3, z2: 3 },
			svgGateK1: { active: false, x1: 115, x2: 200, y1:  10, y2: 115, z1: 1, z2: 1 },
			svgGateK0: { active: false, x1: 155, x2: 240, y1:  10, y2: 115, z1: 3, z2: 3 }
	},

	reset: function () {

		for ( var i in this.gates ) {

			this.gates[ i ].active = false;
			var d = document.getElementById( i );
			if ( d !== null ) {
				d.setAttribute( 'fill', 'white' );
			} else {
				console.warn( 'undefined element in SVGUtils.gates' );
			}

		}

	},

	onclick: function ( g ) {

		this.reset();
		this.gates[ g.id ].active = true;
		g.setAttribute( 'fill', '#59b1d4' );

		ZUSE.adderObj.selection.setFromCircuit( this.gates[ g.id ] );

	},

	mouseover: function ( g ) {

		document.body.style.cursor = 'pointer';
		g.setAttribute( 'fill', ( this.gates[ g.id ].active ) ? '#59b1d4' : '#b0d9e8' );

	},

	mouseout: function ( g ) {

		document.body.style.cursor = 'auto';
		g.setAttribute( 'fill', ( this.gates[ g.id ].active ) ? '#59b1d4' : 'white' );

	}

};

