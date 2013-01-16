ZUSE.TempCalculator = {

	values: {	A3: true,  A2: true,  A1: true,  A0: true,
				B3: false, B2: false, B1: false, B0: false,
				F4: false, F3: false, F2: false, F1: false, F0: false,
				K4: false, K3: true,  K2: true,  K1: true,  K0: true,
				Z1: 15, Z2: 0, Z3: 15 },

	updateValues: function () {

		var a0 = this.values.A0;
		var a1 = this.values.A1;
		var a2 = this.values.A2;
		var a3 = this.values.A3;
		var b0 = this.values.B0;
		var b1 = this.values.B1;
		var b2 = this.values.B2;
		var b3 = this.values.B3;

		this.values.F1 = ( a0 && b0 ) || ( ( a0 || b0 ) && this.values.F0 );
		this.values.F2 = ( a1 && b1 ) || ( ( a1 || b1 ) && this.values.F1 );
		this.values.F3 = ( a2 && b2 ) || ( ( a2 || b2 ) && this.values.F2 );
		this.values.F4 = ( a3 && b3 ) || ( ( a3 || b3 ) && this.values.F3 );
		this.values.K0 = ( ( a0 && b0 ) || !( a0 || b0 ) ) === this.values.F0;
		this.values.K1 = ( ( a1 && b1 ) || !( a1 || b1 ) ) === this.values.F1;
		this.values.K2 = ( ( a2 && b2 ) || !( a2 || b2 ) ) === this.values.F2;
		this.values.K3 = ( ( a3 && b3 ) || !( a3 || b3 ) ) === this.values.F3;
		this.values.K4 = this.values.F4;

		this.values.Z1 = a3*8 + a2*4 + a1*2 + a0*1;
		this.values.Z2 = b3*8 + b2*4 + b1*2 + b0*1;
		this.values.Z3 = this.values.Z1 + this.values.Z2;
		this.updateZs();

	},

	resetValues: function () {

		this.values.A0 = false;
		this.values.A1 = false;
		this.values.A2 = false;
		this.values.A3 = false;
		this.values.B0 = false;
		this.values.B1 = false;
		this.values.B2 = false;
		this.values.B3 = false;
		this.updateValues();

	},

	string: function ( z, b ) {

		return ( b ? '+' : ' ' ) + ( ( z < 10 ) ? ' ' : '' ) + z;

	},

	updateZs: function () {

		SIMULATION.inputs.Z1.setText( this.string( this.values.Z1, false ) );
		SIMULATION.inputs.Z2.setText( this.string( this.values.Z2, true ) );

	},

	cycle: function ( tact ) {

		switch ( tact ) {

			case 1:

				break;

			case 2:

				SIMULATION.inputs.F4s.setValue( this.values.F4 );
				SIMULATION.inputs.F3s.setValue( this.values.F3 );
				SIMULATION.inputs.F2s.setValue( this.values.F2 );
				SIMULATION.inputs.F1s.setValue( this.values.F1 );
				break;

			case 3:

				SIMULATION.inputs.K4s.setValue( this.values.K4 );
				SIMULATION.inputs.K3s.setValue( this.values.K3 );
				SIMULATION.inputs.K2s.setValue( this.values.K2 );
				SIMULATION.inputs.K1s.setValue( this.values.K1 );
				SIMULATION.inputs.K0s.setValue( this.values.K0 );
				SIMULATION.inputs.Z3.setText( this.string( this.values.Z3, false ) );
				break;

			case 4:

				SIMULATION.inputs.A3.setToZero();
				SIMULATION.inputs.A2.setToZero();
				SIMULATION.inputs.A1.setToZero();
				SIMULATION.inputs.A0.setToZero();
				SIMULATION.inputs.B3.setToZero();
				SIMULATION.inputs.B2.setToZero();
				SIMULATION.inputs.B1.setToZero();
				SIMULATION.inputs.B0.setToZero();
				SIMULATION.inputs.F4s.setToEmpty();
				SIMULATION.inputs.F3s.setToEmpty();
				SIMULATION.inputs.F2s.setToEmpty();
				SIMULATION.inputs.F1s.setToEmpty();
				SIMULATION.inputs.K4s.setToEmpty();
				SIMULATION.inputs.K3s.setToEmpty();
				SIMULATION.inputs.K2s.setToEmpty();
				SIMULATION.inputs.K1s.setToEmpty();
				SIMULATION.inputs.K0s.setToEmpty();
				SIMULATION.inputs.Z1.setText( '  0' ),
				SIMULATION.inputs.Z2.setText( '+ 0' ),
				SIMULATION.inputs.Z3.setText( '   ' );
				this.resetValues();
				break;

		}

	},

	cycleBackwards: function ( tact ) {

		switch ( tact ) {

			case 1:

				break;

			case 2:

				SIMULATION.inputs.F4s.setToEmpty();
				SIMULATION.inputs.F3s.setToEmpty();
				SIMULATION.inputs.F2s.setToEmpty();
				SIMULATION.inputs.F1s.setToEmpty();
				break;

			case 3:

				SIMULATION.inputs.K4s.setToEmpty();
				SIMULATION.inputs.K3s.setToEmpty();
				SIMULATION.inputs.K2s.setToEmpty();
				SIMULATION.inputs.K1s.setToEmpty();
				SIMULATION.inputs.K0s.setToEmpty();
				SIMULATION.inputs.Z3.setText( '   ' );
				break;

			case 4:

				break;

		}

	}

};

