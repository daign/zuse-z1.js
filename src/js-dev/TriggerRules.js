ZUSE.TriggerRules = function ( adder, rules ) {

	this.adder = adder;
	this.parseRules( rules );
	//this.init();

};

ZUSE.TriggerRules.prototype = {

	constructor: ZUSE.TriggerRules,

	addTriggerRule: function ( n1, n2, tact ) {

		if ( this[ n1[ 0 ] ] === undefined ) {

			this[ n1[ 0 ] ] = new Object();

		}

		if ( this[ n1[ 0 ] ][ n1[ 1 ] ] === undefined ) {

			this[ n1[ 0 ] ][ n1[ 1 ] ] = new Array();

		}

		for ( var i = 0; i < tact.length; i++ ) {

			if ( this[ n1[ 0 ] ][ n1[ 1 ] ][ tact[ i ] ] === undefined ) {

				this[ n1[ 0 ] ][ n1[ 1 ] ][ tact[ i ] ] = new Array();

			}

			this[ n1[ 0 ] ][ n1[ 1 ] ][ tact[ i ] ].push( n2 );

		}

	},

	addMultipleRules: function ( a, b, t ) {

		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '0' ], [ b[ 0 ], b[ 1 ] + '0', b[ 2 ], b[ 3 ] ], t );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '1' ], [ b[ 0 ], b[ 1 ] + '1', b[ 2 ], b[ 3 ] ], t );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '2' ], [ b[ 0 ], b[ 1 ] + '2', b[ 2 ], b[ 3 ] ], t );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '3' ], [ b[ 0 ], b[ 1 ] + '3', b[ 2 ], b[ 3 ] ], t );

	},

	getTriggerResults: function ( actuator, tact, onlycombined ) {

		var results = new Array();
		var conditions = this.getConditions( actuator, tact );

		if ( conditions !== undefined ) {

			for ( var i = 0; i < conditions.length; i++ ) {

				var element = this.getElement( conditions[ i ] );

				if ( element !== undefined ) {

					if ( this.evaluatePosition( element.position, actuator.position, conditions[ i ][ 2 ] ) ) {

						if ( !onlycombined || conditions[ i ][ 3 ] ) {

							if ( results.indexOf( element ) === -1 ) {

								results.push( element );

							}

						}

					}

				} else {

					console.warn( 'Looking for undefined Element ' + conditions[ i ][ 0 ] + ':' + conditions[ i ][ 1 ] + '.' );

				}

			}

		}

		return results;

	},

	getConditions: function ( actuator, tact ) {

		if ( this[ actuator.name[ 0 ] ] !== undefined ) {

			if ( this[ actuator.name[ 0 ] ][ actuator.name[ 1 ] ] !== undefined ) {

				return this[ actuator.name[ 0 ] ][ actuator.name[ 1 ] ][ tact ];

			}

		}

		return undefined;

	},

	getElement: function ( condition ) {

		var layer = this.adder.layersByType[ condition[ 0 ] ];

		if ( layer !== undefined ) {

			return layer.cycleAccess[ condition[ 1 ] ];

		} else {

			return undefined;

		}

	},

	evaluatePosition: function ( position, position2, constraint ) {

		if ( constraint !== null ) {

			for ( var i = 0; i < constraint.length; i++ ) {

				if ( constraint[ i ] < 0 ) { // bad solution?

					if ( position2 === ( constraint[ i ] * -1 ) ) {

						return true;

					}

				} else {

					if ( position === constraint[ i ] ) {

						return true;

					}

				}

			}

			return false;

		} else {

			return true;

		}

	},

	parseRules: function ( node ) {

		var rules = node.getElementsByTagName( 'rule' );

		for ( var i = 0; i < rules.length; i++ ) {

			var tact = rules[ i ].getAttribute( 'tact' ).split( ',' );
			for ( var j = 0; j < tact.length; j++ ) {
				tact[ j ] = parseInt( tact[ j ] );
			}

			var continuous = rules[ i ].getAttribute( 'continuous' ) === 'true';

			var condition = [];

			var getSource = rules[ i ].getElementsByTagName( 'source' );
			if ( getSource.length > 0 ) {
				var source = getSource[ 0 ].getAttribute( 'id' ).split( '-' );
				var sourceCondition = getSource[ 0 ].getAttribute( 'condition' );
				if ( sourceCondition !== null ) {
					sourceCondition = sourceCondition.split( ',' );
					for ( var j = 0; j < sourceCondition.length; j++ ) {
						condition.push( -1 * parseInt( sourceCondition[ j ] ) );
					}
				}
			}

			var getTarget = rules[ i ].getElementsByTagName( 'target' );
			if ( getTarget.length > 0 ) {
				var target = getTarget[ 0 ].getAttribute( 'id' ).split( '-' );
				var targetCondition = getTarget[ 0 ].getAttribute( 'condition' );
				if ( targetCondition !== null ) {
					targetCondition = targetCondition.split( ',' );
					for ( var j = 0; j < targetCondition.length; j++ ) {
						condition.push( parseInt( targetCondition[ j ] ) );
					}
				}
			}

			condition = ( condition.length > 0 ) ? condition : null;

			var repeat = rules[ i ].getAttribute( 'repeat' );
			if ( repeat !== null ) {
				repeat = repeat.split( ',' );
				for ( var j = 0; j < repeat.length; j++ ) {
					var sourceId = [ source[ 0 ], source[ 1 ] + repeat[ j ] ];
					var targetId = [ target[ 0 ], target[ 1 ] + repeat[ j ] ];
					targetId.push( condition );
					targetId.push( continuous );
					this.addTriggerRule( sourceId, targetId, tact );
				}
			} else {
				var sourceId = [ source[ 0 ], source[ 1 ] + source[ 2 ] ];
				var targetId = [ target[ 0 ], target[ 1 ] + target[ 2 ] ];
				targetId.push( condition );
				targetId.push( continuous );
				this.addTriggerRule( sourceId, targetId, tact );
			}

		}

	},

	init: function () {

		// A Pins
		this.addMultipleRules( [ 'In', 'A'   ], [ '0A', 'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'A',  'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'AB', 'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'B',  'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'BC', 'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'C',  'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'CD', 'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'D',  'A',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'D0', 'A',       null, true  ], [ 2, 4 ] );

		// A Pins Reset
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A0',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A1',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A2',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A3',     [ 0 ], false ],    [ 2 ] );

		// B Pins
		this.addMultipleRules( [ 'In', 'B'   ], [ '0A', 'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'A',  'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'AB', 'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'B',  'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'BC', 'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'C',  'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'CD', 'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'D',  'B',       null, true  ], [ 1, 3 ] );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'D0', 'B',       null, true  ], [ 1, 3 ] );

		// B Pins Reset
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B0',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B1',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B2',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B3',     [ 1 ], false ],    [ 3 ] );

		// F Pins
		this.addMultipleRules( [ 'A',  'F'   ], [ '0A', 'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'AB', 'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'B',  'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'BC', 'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'C',  'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'CD', 'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'D',  'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'D0', 'F',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'F'   ], [ 'A',  'F',       null, true  ], [ 2, 4 ] );

		// F4 Pin
		this.addTriggerRule(   [ 'A',  'F4'  ], [ '0A', 'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'AB', 'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'B',  'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'BC', 'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'C',  'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'CD', 'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'D',  'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'D0', 'F4',      null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'A',  'F4',      null, true  ], [ 2, 4 ] );

		// J Pins
		this.addMultipleRules( [ 'A',  'J'   ], [ '0A', 'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'AB', 'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'B',  'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'BC', 'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'C',  'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'CD', 'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'D',  'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'D0', 'J',       null, true  ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'J'   ], [ 'A',  'J',       null, true  ], [ 2, 4 ] );

		// V Pin
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'CD', 'V',       null, true  ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'D',  'V',       null, true  ], [ 1, 3 ] );

		// Layer A
		this.addTriggerRule(   [ 'A',  'X1'  ], [ 'A',  'AP',      null, false ], [ 2, 4 ] );

		// Layer A, all Digits
		this.addMultipleRules( [ 'A',  'A'   ], [ 'A',  'AA',      null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'AA'  ], [ 'A',  'D',       null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'B'   ], [ 'A',  'AB',      null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'A',  'AB'  ], [ 'A',  'D',      [ 0 ], false ],    [ 1 ] );
		this.addMultipleRules( [ 'A',  'AB'  ], [ 'A',  'D',      [ 2 ], false ],    [ 3 ] );
		this.addMultipleRules( [ 'A',  'D'   ], [ 'A',  'AD',      null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'A',  'AD'  ], [ 'A',  'E',       null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'A',  'E'   ], [ 'A',  'AE',      null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'A',  'AE'  ], [ 'A',  'J',       null, false ],    [ 2 ] );

		// Layer A, Digit 0
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E0',     [ 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E0',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'AE0' ], [ 'A',  'F1',      null, false ],    [ 2 ] );

		// Layer A, Digit 1
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E1',     [ 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E1',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'AE1' ], [ 'A',  'F2',      null, false ],    [ 2 ] );

		// Layer A, Digit 2
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E2',     [ 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E2',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'AE2' ], [ 'A',  'F3',      null, false ],    [ 2 ] );

		// Layer A, Digit 3
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E3',     [ 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E3',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'AE3' ], [ 'A',  'F4',      null, false ],    [ 2 ] );

		// Layer B
		this.addTriggerRule(   [ 'B',  'X0'  ], [ 'B',  'BQ0',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'Y1'  ], [ 'B',  'BQ0',     null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'B',  'X1'  ], [ 'B',  'BQ1',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q3',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q4',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q5',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q6',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q7',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q8',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'Y3'  ], [ 'B',  'BN',      null, false ], [ 1, 3 ] );

		// Layer B, BF0
		this.addTriggerRule(   [ 'In', 'F0'  ], [ 'B',  'BF0',     null, true  ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'B',  'X0'  ], [ 'In', 'F0',     [ 3 ], false ],    [ 4 ] );

		// Layer B, BF4
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'In', 'F4',      null, true  ], [ 2, 4 ] );

		// Layer B, all Digits
		this.addMultipleRules( [ 'B',  'A'   ], [ 'B',  'BA',      null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'BA'  ], [ 'B',  'C',       null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'B'   ], [ 'B',  'BB',      null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'B',  'Q'   ], [ 'B',  'BB',      null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'BB'  ], [ 'B',  'C',   [ 0, 3 ], false ],    [ 1 ] );
		this.addMultipleRules( [ 'B',  'C'   ], [ 'B',  'BC',      null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'B',  'BC'  ], [ 'B',  'G',       null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'B',  'BC'  ], [ 'B',  'H',       null, false ], [ 1, 3 ] );
		this.addMultipleRules( [ 'B',  'H'   ], [ 'B',  'BH',      null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'BH'  ], [ 'B',  'J',       null, false ], [ 2, 4 ] );
		this.addMultipleRules( [ 'B',  'J'   ], [ 'B',  'BH',      null, false ],    [ 2 ] );
		this.addMultipleRules( [ 'B',  'BH'  ], [ 'B',  'H',       null, false ],    [ 2 ] );
		this.addMultipleRules( [ 'B',  'BF'  ], [ 'B',  'F',       null, false ],    [ 2 ] );
		this.addMultipleRules( [ 'B',  'F'   ], [ 'B',  'BF',      null, false ],    [ 2 ] ); //unklar
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'B',  'BF4',     null, false ],    [ 2 ] ); //unklar
		this.addMultipleRules( [ 'B',  'F'   ], [ 'B',  'BF',     [ 3 ], false ],    [ 4 ] );
		this.addMultipleRules( [ 'B',  'BF'  ], [ 'B',  'G',      [ 1 ], false ],    [ 2 ] );

		// Layer B, Digit 0
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C0',     [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C0',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H0',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H0',     [ 3 ], false ],    [ 4 ] );

		// Layer B, Digit 1
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C1',     [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C1',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H1',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H1',     [ 3 ], false ],    [ 4 ] );

		// Layer B, Digit 2
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C2',     [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C2',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H2',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H2',     [ 3 ], false ],    [ 4 ] );

		// Layer B, Digit 3
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C3',     [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C3',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H3',     [ 0 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H3',     [ 3 ], false ],    [ 4 ] );

		// Layer B, Carrychain
		this.addTriggerRule(   [ 'B',  'G0'  ], [ 'B',  'BF1',     null, false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'G1'  ], [ 'B',  'BF2',     null, false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'G2'  ], [ 'B',  'BF3',     null, false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'G3'  ], [ 'B',  'BF4',     null, false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'BF1' ], [ 'B',  'G0',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'B',  'BF2' ], [ 'B',  'G1',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'B',  'BF3' ], [ 'B',  'G2',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'B',  'G3',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'B',  'F4',      null, false ],    [ 2 ] );
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'B',  'BF4',    [ 3 ], false ],    [ 4 ] );

		// Layer C
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'CR',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'CU',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'X0'  ], [ 'C',  'CS',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S3',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'V',      [ 1 ], false ],    [ 3 ] ); // Reset of V

		// Layer C, Digit 0
		this.addTriggerRule(   [ 'C',  'F0'  ], [ 'C',  'CF0',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CF0' ], [ 'C',  'K0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'J0'  ], [ 'C',  'CJ0',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CJ0' ], [ 'C',  'W0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CR'  ], [ 'C',  'W0',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW00',  [ -2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW00',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW10',  [ -1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW10',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'CW00'], [ 'C',  'K0',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CW10'], [ 'C',  'K0',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'K0'  ], [ 'C',  'CK0',     null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'C',  'M0',      null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'In', 'K0',      null, true  ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'M0',  [ 0, 3 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'M0'  ], [ 'C',  'CK0',     null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'C',  'K0',      null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'S1'  ], [ 'C',  'CW10',    null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'B0'  ], [ 'C',  'CM0',     null, false ], [ 1, 3 ] );

		// Layer C, Digit 2
		this.addTriggerRule(   [ 'C',  'F2'  ], [ 'C',  'CF2',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CF2' ], [ 'C',  'K2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'J2'  ], [ 'C',  'CJ2',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CJ2' ], [ 'C',  'W2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CR'  ], [ 'C',  'W2',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW02',  [ -2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW02',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW12',  [ -1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW12',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'CW02'], [ 'C',  'K2',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CW12'], [ 'C',  'K2',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'K2'  ], [ 'C',  'CK2',     null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'C',  'M2',      null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'In', 'K2',      null, true  ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'M2',  [ 0, 3 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'M2'  ], [ 'C',  'CK2',     null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'C',  'K2',      null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'S0'  ], [ 'C',  'CW12',    null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'B2'  ], [ 'C',  'CM2',     null, false ], [ 1, 3 ] );

		// Layer C, V Part
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'T',      [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'T',   [ 0, 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'T',      [ 2 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'C',  'T'   ], [ 'C',  'CV',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'T'   ], [ 'C',  'CT',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CV'  ], [ 'C',  'V',       null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'CT'  ], [ 'C',  'M0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'CT'  ], [ 'C',  'M2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'C',  'CV',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'C',  'CV'  ], [ 'C',  'T',       null, false ], [ 1, 3 ] );

		// Layer D
		this.addTriggerRule(   [ 'D',  'Y0'  ], [ 'D',  'DR',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'Y0'  ], [ 'D',  'DU',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'X0'  ], [ 'D',  'DS',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S0',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S2',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S3',      null, false ], [ 2, 4 ] );

		// Layer D, Digit 1
		this.addTriggerRule(   [ 'D',  'F1'  ], [ 'D',  'DF1',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DF1' ], [ 'D',  'K1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'J1'  ], [ 'D',  'DJ1',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DJ1' ], [ 'D',  'W1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DR'  ], [ 'D',  'W1',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW01',  [ -2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW01',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW11',  [ -1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW11',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'DW01'], [ 'D',  'K1',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DW11'], [ 'D',  'K1',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'K1'  ], [ 'D',  'DK1',     null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'D',  'M1',      null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'In', 'K1',      null, true  ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'M1',  [ 0, 3 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'M1'  ], [ 'D',  'DK1',     null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'D',  'K1',      null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'S1'  ], [ 'D',  'DW11',    null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'B1'  ], [ 'D',  'DM1',     null, false ], [ 1, 3 ] );

		// Layer D, Digit 3
		this.addTriggerRule(   [ 'D',  'F3'  ], [ 'D',  'DF3',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DF3' ], [ 'D',  'K3',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'J3'  ], [ 'D',  'DJ3',     null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DJ3' ], [ 'D',  'W3',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DR'  ], [ 'D',  'W3',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW03',  [ -2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW03',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW13',  [ -1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW13',   [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'DW03'], [ 'D',  'K3',     [ 2 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DW13'], [ 'D',  'K3',     [ 1 ], false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'K3'  ], [ 'D',  'DK3',     null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'D',  'M3',      null, false ],    [ 3 ] );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'In', 'K3',      null, true  ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'M3',  [ 0, 3 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'M3'  ], [ 'D',  'DK3',     null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'D',  'K3',      null, false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'S0'  ], [ 'D',  'DW13',    null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'B3'  ], [ 'D',  'DM3',     null, false ], [ 1, 3 ] );

		// Layer D, V Part
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'T',      [ 0 ], false ],    [ 1 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'T',   [ 0, 1 ], false ],    [ 2 ] );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'T',      [ 2 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'D',  'T'   ], [ 'D',  'DV',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'T'   ], [ 'D',  'DT',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DV'  ], [ 'D',  'V',       null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'DT'  ], [ 'D',  'M1',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'DT'  ], [ 'D',  'M3',      null, false ], [ 2, 4 ] );
		this.addTriggerRule(   [ 'D',  'V'   ], [ 'D',  'DV',      null, false ], [ 1, 3 ] );
		this.addTriggerRule(   [ 'D',  'DV'  ], [ 'D',  'T',       null, false ], [ 1, 3 ] );

		// behelfsmäßig:
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F0',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F1',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F2',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F3',     [ 3 ], false ],    [ 4 ] );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F4',     [ 3 ], false ],    [ 4 ] );

	}

};

