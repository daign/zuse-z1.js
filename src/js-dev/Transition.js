ZUSE.Transition = function ( control, tact, nextInputs, changesTact ) {

	this.control = control;
	this.tact = tact;
	this.changesTact = changesTact;

	this.elements = { active: [], inactive: [] };

	if ( nextInputs !== undefined ) {

		for ( var i = 0; i < nextInputs.length; i++ ) {

			this.elements.active.push( nextInputs[ i ] );

		}

	}

	for ( var i = 0; i < this.elements.active.length; i++ ) {

		this.trigger( this.elements.active[ i ] );

	}

};

ZUSE.Transition.prototype = {

	constructor: ZUSE.Transition,

	initPulsers: function () {

		var pulsers = this.control.adder.pulsers;

		var dir = ( this.tact === 1 || this.tact === 3 ) ? 'y' : 'x';

		for ( var i = 0; i < pulsers[ dir ].length; i++ ) {

			var pulser = pulsers[ dir ][ i ];
			this.elements.active.push( pulser );
			this.trigger( pulser );

		}

	},

	trigger: function ( actuator ) {

		var results = this.control.triggerRules.getTriggerResults( actuator, this.tact, false );

		for ( var i = 0; i < results.active.length; i++ ) {
			if ( this.elements.active.indexOf( results.active[ i ] ) === -1 ) {
				this.elements.active.push( results.active[ i ] );
				var d = this.elements.inactive.indexOf( results.active[ i ] );
				if ( d !== -1 ) {
					this.elements.inactive.splice( d, 1 );
				}
				this.trigger( results.active[ i ] );
			}
		}

		for ( var i = 0; i < results.inactive.length; i++ ) {
			if (
				   this.elements.active.indexOf( results.inactive[ i ] ) === -1
				&& this.elements.inactive.indexOf( results.inactive[ i ] ) === -1
			) {
				this.elements.inactive.push( results.inactive[ i ] );
				this.intrigger( results.inactive[ i ] );
			}
		}

	},

	intrigger: function ( actuator ) {

		var results = this.control.triggerRules.getTriggerResults( actuator, this.tact, false );

		for ( var i = 0; i < results.active.length; i++ ) {
			if (
				   this.elements.active.indexOf( results.active[ i ] ) === -1
				&& this.elements.inactive.indexOf( results.active[ i ] ) === -1
			) {
				this.elements.inactive.push( results.active[ i ] );
				this.intrigger( results.active[ i ] );
			}
		}

		for ( var i = 0; i < results.inactive.length; i++ ) {
			if (
				   this.elements.active.indexOf( results.inactive[ i ] ) === -1
				&& this.elements.inactive.indexOf( results.inactive[ i ] ) === -1
			) {
				this.elements.inactive.push( results.inactive[ i ] );
				this.intrigger( results.inactive[ i ] );
			}
		}

	},

	run: function ( repeat ) {

		if ( repeat && this.changesTact ) { SIMULATION.gui.status.activate( this.tact-1 ); }

		this.value = 0;

		this.highlight( true );
		if ( !repeat ) { this.changePositions(); }

		var callback = function () {

			for ( var i = 0; i < this.elements.active.length; i++ ) {

				this.elements.active[ i ].move( this.tact, this.value );

			}

		}

		var finish = function () {

			this.highlight( false );
			ZUSE.CycleAccess.release();

			if ( this.changesTact ) { SIMULATION.gui.status.activate( this.tact % 4 ); }

		}

		var animation = new TWEEN.Tween( this ).to( { value : 10 }, 1000 );
		animation.onUpdate( callback );
		animation.onComplete( finish );
		animation.easing( TWEEN.Easing.Quadratic.EaseInOut );
		animation.start();

	},

	set: function () {

		this.changePositions();

		for ( var i = 0; i < this.elements.active.length; i++ ) {

			this.elements.active[ i ].move( this.tact, 10 );

		}

	},

	runBackwards: function () {

		if ( this.changesTact ) { SIMULATION.gui.status.activate( this.tact-1 ); }

		this.value = 10;

		this.highlight( true );

		var callback = function () {

			for ( var i = 0; i < this.elements.active.length; i++ ) {

				this.elements.active[ i ].move( this.tact, this.value );

			}

		}

		var finish = function () {

			for ( var i = 0; i < this.elements.active.length; i++ ) {

				this.elements.active[ i ].changePositionBack( this.tact );

			}

			this.highlight( false );
			ZUSE.CycleAccess.release();

		}

		var animation = new TWEEN.Tween( this ).to( { value : 0 }, 1000 );
		animation.onUpdate( callback );
		animation.onComplete( finish );
		animation.easing( TWEEN.Easing.Quadratic.EaseInOut );
		animation.start();

	},

	highlight: function ( bool ) {

		for ( var i = 0; i < this.elements.active.length; i++ ) {

			this.elements.active[ i ].setHighlight( bool );

		}

	},

	changePositions: function () {

		for ( var i = 0; i < this.elements.active.length; i++ ) {
			this.elements.active[ i ].changePosition( this.tact );
		}

		for ( var i = 0; i < this.elements.inactive.length; i++ ) {
			this.elements.inactive[ i ].failedToChange( this.tact );
		}

	}

};

