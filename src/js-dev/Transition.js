ZUSE.Transition = function ( control, tact, nextInputs, changesTact ) {

	this.control = control;
	this.tact = tact;
	this.changesTact = changesTact;

	this.elements = new Array();

	if ( nextInputs !== undefined ) {

		for ( var i = 0; i < nextInputs.length; i++ ) {

			this.elements.push( nextInputs[ i ] );

		}

	}

	for ( var i = 0; i < this.elements.length; i++ ) {

		this.trigger( this.elements[ i ] );

	}

};

ZUSE.Transition.prototype = {

	constructor: ZUSE.Transition,

	initPulsers: function () {

		var pulsers = this.control.adder.pulsers;

		for ( var i = 0; i < pulsers.length; i++ ) {

			var pulser = pulsers[ i ];

			if ( 	( this.tact === 1 || this.tact === 3 ) && pulser.yMove ||
					( this.tact === 2 || this.tact === 4 ) && pulser.xMove ) {

				this.elements.push( pulser );
				this.trigger( pulser );

			}

		}

	},

	trigger: function ( actuator ) {

		var results = this.control.triggerRules.getTriggerResults( actuator, this.tact, false );

		for ( var i = 0; i < results.length; i++ ) {

			if ( this.elements.indexOf( results[ i ] ) === -1 ) {

				this.elements.push( results[ i ] );
				this.trigger( results[ i ] );

			}

		}

	},

	run: function ( repeat ) {

		if ( repeat && this.changesTact ) { SIMULATION.gui.status.activate( this.tact-1 ); }

		this.value = 0;

		this.highlight( true );
		if ( !repeat ) { this.changePositions(); }

		var callback = function () {

			for ( var i = 0; i < this.elements.length; i++ ) {

				this.elements[ i ].move( this.tact, this.value );

			}

		}

		var finish = function () {

			//if ( !repeat ) { this.changePositions(); }
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

		for ( var i = 0; i < this.elements.length; i++ ) {

			this.elements[ i ].move( this.tact, 10 );

		}

	},

	runBackwards: function () {

		if ( this.changesTact ) { SIMULATION.gui.status.activate( this.tact-1 ); }

		this.value = 10;

		this.highlight( true );

		var callback = function () {

			for ( var i = 0; i < this.elements.length; i++ ) {

				this.elements[ i ].move( this.tact, this.value );

			}

		}

		var finish = function () {

			for ( var i = 0; i < this.elements.length; i++ ) {

				this.elements[ i ].changePositionBack( this.tact );

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

		for ( var i = 0; i < this.elements.length; i++ ) {

			this.elements[ i ].setHighlight( bool );

		}

	},

	changePositions: function () {

		for ( var i = 0; i < this.elements.length; i++ ) {

			this.elements[ i ].changePosition( this.tact );

		}

	}

};

