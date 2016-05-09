ZUSE.CycleControl = function ( adder ) {

	this.adder = adder;
	this.tact = 0;
	this.history = new Array();
	this.nextInputs = new Array();

	this.preHighlighted = undefined;
	this.highlightMoving = true;

};

ZUSE.CycleControl.prototype = {

	constructor: ZUSE.CycleControl,

	switchHighlighting: function () {

		this.highlightMoving = !this.highlightMoving;

	},

	preHighlightNext: function () {

		if ( ZUSE.CycleAccess.ask( true ) ) { return; }

		var nextTact = ( this.tact % 4 ) + 1;
		this.preHighlighted = new ZUSE.Transition( this, nextTact, this.nextInputs, true );
		this.preHighlighted.initPulsers();
		this.preHighlighted.highlight( true );

	},

	preHighlightBack: function () {

		if ( !ZUSE.CycleAccess.ask( true ) && this.history.length >= 1 ) {

			this.preHighlighted = this.history[ this.history.length - 1 ];
			this.preHighlighted.highlight( true );

		}

	},

	preHighlightOff: function () {

		if ( this.preHighlighted !== undefined ) {

			this.preHighlighted.highlight( false );

		}

	},

	cycle: function () {

		if ( ZUSE.CycleAccess.request( true ) ) {

			this.tact = ( this.tact % 4 ) + 1;

			ZUSE.TempCalculator.cycle( this.tact );

			var transition = new ZUSE.Transition( this, this.tact, this.nextInputs, true );
			transition.initPulsers();
			this.history.push( transition );
			ZUSE.gui.toolbar.toolsByName.back.disable( false );
			ZUSE.gui.toolbar.toolsByName.replay.disable( false );
			this.nextInputs = new Array();
			transition.run( false );

			this.adder.layersByType[ 'In' ].updateButtonState( this.tact );

		}

	},

	cycleBackwards: function () {

		if ( this.history.length >= 1 && ZUSE.CycleAccess.request( true ) ) {

			ZUSE.TempCalculator.cycleBackwards( this.tact );

			var transition = this.history.pop();
			this.nextInputs = new Array(); // consequences?
			transition.runBackwards();

			if ( transition.changesTact ) {
				this.tact = ( ( this.tact + 2 ) % 4 ) + 1;
			}

			this.adder.layersByType[ 'In' ].updateButtonState( this.tact );

			if ( this.history.length < 1 ) {
				ZUSE.gui.toolbar.toolsByName.back.disable( true );
				ZUSE.gui.toolbar.toolsByName.replay.disable( true );
			}

		}

	},

	repeatLast: function () {

		if ( this.history.length >= 1 && ZUSE.CycleAccess.request( true ) ) {

			this.history[ this.history.length - 1 ].run( true );

		}

	},

	switchInput: function ( name, evt ) {

		if ( !ZUSE.CycleAccess.ask( false ) ) {

			if ( this.tact === 0 || this.tact === 4 ) {

				switch ( name ) {

					case 'A0':
					case 'A1':
					case 'A2':
					case 'A3':

						ZUSE.CycleAccess.request( false );

						var element = this.adder.layersByType.In.namedElements[ name ];
						var direction = ( element.position === 0 ) ? 2 : 4;
						if ( evt ) { evt.target.value = ( evt.target.value === '0' ) ? '1' : '0'; }

						var value = !( element.position === 0 );
						ZUSE.TempCalculator.values[ name ] = value;
						ZUSE.TempCalculator.updateValues();

						var transition = new ZUSE.Transition( this, direction, [ element ], false );
						this.history.push( transition );
						//ZUSE.gui.toolbar.toolsByName.back.disable( false );
						//ZUSE.gui.toolbar.toolsByName.replay.disable( false );
						transition.run();

						return value;

						break;

					case 'B0':
					case 'B1':
					case 'B2':
					case 'B3':

						var element = this.adder.layersByType.In.namedElements[ name ];
						var index = this.nextInputs.indexOf( element );

						if ( index === -1 ) {

							this.nextInputs.push( element );
							ZUSE.inputs[ name ].setToOne();
							ZUSE.TempCalculator.values[ name ] = true;
							ZUSE.TempCalculator.updateValues();

							return true;

						} else {

							this.nextInputs.splice( index, 1 );
							ZUSE.inputs[ name ].setToZero();
							ZUSE.TempCalculator.values[ name ] = false;
							ZUSE.TempCalculator.updateValues();

							return false;

						}

						break;

				}

			} else if ( this.tact === 1 ) {

				switch ( name ) {

					case 'F0':

						var element = this.adder.layersByType.In.namedElements[ name ];
						var index = this.nextInputs.indexOf( element );

						if ( index === -1 ) {

							this.nextInputs.push( element );
							evt.target.value = '1';

						} else {

							this.nextInputs.splice( index, 1 );
							evt.target.value = '0';

						}

						break;

				}

			}

		} else { return undefined; }

	}

};

