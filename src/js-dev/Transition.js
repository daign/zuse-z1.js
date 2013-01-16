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

		var results = this.control.triggerRules.getTriggerResults( actuator, this.tact );

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

		var callback = function () {

			for ( var i = 0; i < this.elements.length; i++ ) {

				this.elements[ i ].move( this.tact, this.value );

			}

		}

		var finish = function () {

			for ( var i = 0; i < this.elements.length; i++ ) {

				if ( !repeat ) { this.elements[ i ].changePosition( this.tact ); }

			}

			this.highlight( false );
			if ( !repeat ) { this.writeLog(); }
			this.control.isMoving = false;

			if ( this.changesTact ) { SIMULATION.gui.status.activate( this.tact % 4 ); }

		}

		var animation = new TWEEN.Tween( this ).to( { value : 10 }, 1000 );
		animation.onUpdate( callback );
		animation.onComplete( finish );
		animation.easing( TWEEN.Easing.Quadratic.EaseInOut );
		animation.start();

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
			this.control.isMoving = false;

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

	writeLog: function () {

/*		var logtext = '';
			switch ( this.tact ) {
				case 1:
					logtext += 'Eingabe:<br/>';
					logtext += '&nbsp;&nbsp;A = ';
					logtext += document.getElementById( 'ButtonA3' ).value;
					logtext += document.getElementById( 'ButtonA2' ).value;
					logtext += document.getElementById( 'ButtonA1' ).value;
					logtext += document.getElementById( 'ButtonA0' ).value;
					logtext += '<br/>&nbsp;&nbsp;B = ';
					logtext += document.getElementById( 'ButtonB3' ).value;
					logtext += document.getElementById( 'ButtonB2' ).value;
					logtext += document.getElementById( 'ButtonB1' ).value;
					logtext += document.getElementById( 'ButtonB0' ).value;
					logtext += '<br/>';
					break;
				case 2:
					var carryover = document.getElementById( 'ButtonF0' ).value;
					logtext += ( carryover === '1') ? '+ Übertrag F0<br/>' : '';
					var overflow = document.getElementById( 'ButtonF4' ).value;
					logtext += ( overflow === '1') ? 'Überlauf!<br/>' : '';
					break;
				case 3:
					logtext += 'A+B = ';
					logtext += document.getElementById( 'ButtonK3' ).value;
					logtext += document.getElementById( 'ButtonK2' ).value;
					logtext += document.getElementById( 'ButtonK1' ).value;
					logtext += document.getElementById( 'ButtonK0' ).value;
					logtext += '<br/><br/>';
					break;
				case 4:
					break;
			}*/
//debugtab			document.getElementById( 'log' ).innerHTML += logtext;
//debugtab			document.getElementById( 'log' ).scrollTop = document.getElementById( 'log' ).scrollHeight;

	}

};

