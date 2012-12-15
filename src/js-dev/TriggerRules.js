ZUSE.TriggerRules = function ( adder ) {

	this.adder = adder;
	this.init();

};

ZUSE.TriggerRules.prototype = {

	constructor: ZUSE.TriggerRules,

	addTriggerRule: function ( n1, n2, tact, unused ) {

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

	addMultipleRules: function ( a, b, t, u ) {

		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '0' ], [ b[ 0 ], b[ 1 ] + '0', b[ 2 ] ], t, u );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '1' ], [ b[ 0 ], b[ 1 ] + '1', b[ 2 ] ], t, u );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '2' ], [ b[ 0 ], b[ 1 ] + '2', b[ 2 ] ], t, u );
		this.addTriggerRule( [ a[ 0 ], a[ 1 ] + '3' ], [ b[ 0 ], b[ 1 ] + '3', b[ 2 ] ], t, u );

	},

	getTriggerResults: function ( actuator, tact ) {

		var results = new Array();
		var conditions = this.getConditions( actuator, tact );

		if ( conditions !== undefined ) {

			for ( var i = 0; i < conditions.length; i++ ) {

				var element = this.getElement( conditions[ i ] );

				if ( element !== undefined ) {

					if ( this.evaluatePosition( element.position, actuator.position, conditions[ i ][ 2 ] ) ) {

						if ( results.indexOf( element ) === -1 ) {

							results.push( element );

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

				if ( constraint[ i ] < 0 ) { // schlechte Lösung ?

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

	init: function () {

		// A Pins
		this.addMultipleRules( [ 'In', 'A'   ], [ '0A', 'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'A',  'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'AB', 'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'B',  'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'BC', 'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'C',  'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'CD', 'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'D',  'A',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'In', 'A'   ], [ 'D0', 'A',       null ], [ 2, 4 ], true  );

		// A Pins Reset
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A0',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A1',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A2',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ '0A', 'X0'  ], [ 'In', 'A3',     [ 0 ] ],    [ 2 ], false );

		// B Pins
		this.addMultipleRules( [ 'In', 'B'   ], [ '0A', 'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'A',  'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'AB', 'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'B',  'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'BC', 'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'C',  'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'CD', 'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'D',  'B',       null ], [ 1, 3 ], true  );
		this.addMultipleRules( [ 'In', 'B'   ], [ 'D0', 'B',       null ], [ 1, 3 ], true  );

		// B Pins Reset
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B0',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B1',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B2',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ '0A', 'Y1'  ], [ 'In', 'B3',     [ 1 ] ],    [ 3 ], false );

		// F Pins
		this.addMultipleRules( [ 'A',  'F'   ], [ '0A', 'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'AB', 'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'B',  'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'BC', 'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'C',  'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'CD', 'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'D',  'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'F'   ], [ 'D0', 'F',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'B',  'F'   ], [ 'A',  'F',       null ], [ 2, 4 ], true  );

		// F4 Pin
		this.addTriggerRule(   [ 'A',  'F4'  ], [ '0A', 'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'AB', 'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'B',  'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'BC', 'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'C',  'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'CD', 'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'D',  'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'A',  'F4'  ], [ 'D0', 'F4',      null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'A',  'F4',      null ], [ 2, 4 ], true  );

		// J Pins
		this.addMultipleRules( [ 'A',  'J'   ], [ '0A', 'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'AB', 'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'B',  'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'BC', 'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'C',  'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'CD', 'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'D',  'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'A',  'J'   ], [ 'D0', 'J',       null ], [ 2, 4 ], true  );
		this.addMultipleRules( [ 'B',  'J'   ], [ 'A',  'J',       null ], [ 2, 4 ], true  );

		// V Pin
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'CD', 'V',       null ], [ 1, 3 ], true  );
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'D',  'V',       null ], [ 1, 3 ], true  );

		// Layer A
		this.addTriggerRule(   [ 'A',  'X1'  ], [ 'A',  'AP',      null ], [ 2, 4 ], false );

		// Layer A, all Digits
		this.addMultipleRules( [ 'A',  'A'   ], [ 'A',  'AA',      null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'A',  'AA'  ], [ 'A',  'D',       null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'A',  'B'   ], [ 'A',  'AB',      null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'A',  'AB'  ], [ 'A',  'D',      [ 0 ] ],    [ 1 ], false );
		this.addMultipleRules( [ 'A',  'AB'  ], [ 'A',  'D',      [ 2 ] ],    [ 3 ], false );
		this.addMultipleRules( [ 'A',  'D'   ], [ 'A',  'AD',      null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'A',  'AD'  ], [ 'A',  'E',       null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'A',  'E'   ], [ 'A',  'AE',      null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'A',  'AE'  ], [ 'A',  'J',       null ],    [ 2 ], false );

		// Layer A, Digit 0
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E0',     [ 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E0',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'AE0' ], [ 'A',  'F1',      null ],    [ 2 ], false );

		// Layer A, Digit 1
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E1',     [ 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E1',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'AE1' ], [ 'A',  'F2',      null ],    [ 2 ], false );

		// Layer A, Digit 2
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E2',     [ 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E2',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'AE2' ], [ 'A',  'F3',      null ],    [ 2 ], false );

		// Layer A, Digit 3
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E3',     [ 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'A',  'AP'  ], [ 'A',  'E3',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'AE3' ], [ 'A',  'F4',      null ],    [ 2 ], false );

		// Layer B
		this.addTriggerRule(   [ 'B',  'X0'  ], [ 'B',  'BQ0',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'Y1'  ], [ 'B',  'BQ0',     null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'B',  'X1'  ], [ 'B',  'BQ1',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q3',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q4',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q5',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q6',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q7',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'BQ1' ], [ 'B',  'Q8',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'B',  'Y3'  ], [ 'B',  'BN',      null ], [ 1, 3 ], false );

		// Layer B, BF0
		this.addTriggerRule(   [ 'In', 'F0'  ], [ 'B',  'BF0',     null ], [ 2, 4 ], true  );
		this.addTriggerRule(   [ 'B',  'X0'  ], [ 'In', 'F0',     [ 3 ] ],    [ 4 ], false );

		// Layer B, BF4
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'In', 'F4',      null ], [ 2, 4 ], true  );

		// Layer B, all Digits
		this.addMultipleRules( [ 'B',  'A'   ], [ 'B',  'BA',      null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'B',  'BA'  ], [ 'B',  'C',       null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'B',  'B'   ], [ 'B',  'BB',      null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'B',  'Q'   ], [ 'B',  'BB',      null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'B',  'BB'  ], [ 'B',  'C',   [ 0, 3 ] ],    [ 1 ], false );
		this.addMultipleRules( [ 'B',  'C'   ], [ 'B',  'BC',      null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'B',  'BC'  ], [ 'B',  'G',       null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'B',  'BC'  ], [ 'B',  'H',       null ], [ 1, 3 ], false );
		this.addMultipleRules( [ 'B',  'H'   ], [ 'B',  'BH',      null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'B',  'BH'  ], [ 'B',  'J',       null ], [ 2, 4 ], false );
		this.addMultipleRules( [ 'B',  'J'   ], [ 'B',  'BH',      null ],    [ 2 ], false );
		this.addMultipleRules( [ 'B',  'BH'  ], [ 'B',  'H',       null ],    [ 2 ], false );
		this.addMultipleRules( [ 'B',  'BF'  ], [ 'B',  'F',       null ],    [ 2 ], false );
		this.addMultipleRules( [ 'B',  'F'   ], [ 'B',  'BF',      null ],    [ 2 ], false ); //unklar
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'B',  'BF4',     null ],    [ 2 ], false ); //unklar
		this.addMultipleRules( [ 'B',  'F'   ], [ 'B',  'BF',     [ 3 ] ],    [ 4 ], false );
		this.addMultipleRules( [ 'B',  'BF'  ], [ 'B',  'G',      [ 1 ] ],    [ 2 ], false );

		// Layer B, Digit 0
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C0',     [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C0',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H0',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H0',     [ 3 ] ],    [ 4 ], false );

		// Layer B, Digit 1
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C1',     [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C1',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H1',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H1',     [ 3 ] ],    [ 4 ], false );

		// Layer B, Digit 2
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C2',     [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C2',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H2',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H2',     [ 3 ] ],    [ 4 ], false );

		// Layer B, Digit 3
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C3',     [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'B',  'BN'  ], [ 'B',  'C3',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H3',     [ 0 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'BQ0' ], [ 'B',  'H3',     [ 3 ] ],    [ 4 ], false );

		// Layer B, Carrychain
		this.addTriggerRule(   [ 'B',  'G0'  ], [ 'B',  'BF1',     null ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'G1'  ], [ 'B',  'BF2',     null ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'G2'  ], [ 'B',  'BF3',     null ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'G3'  ], [ 'B',  'BF4',     null ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'BF1' ], [ 'B',  'G0',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'B',  'BF2' ], [ 'B',  'G1',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'B',  'BF3' ], [ 'B',  'G2',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'B',  'G3',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'B',  'BF4' ], [ 'B',  'F4',      null ],    [ 2 ], false );
		this.addTriggerRule(   [ 'B',  'F4'  ], [ 'B',  'BF4',    [ 3 ] ],    [ 4 ], false );

		// Layer C
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'CR',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'CU',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'X0'  ], [ 'C',  'CS',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'S3',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'Y0'  ], [ 'C',  'V',      [ 1 ] ],    [ 3 ], false ); // Reset of V

		// Layer C, Digit 0
		this.addTriggerRule(   [ 'C',  'F0'  ], [ 'C',  'CF0',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CF0' ], [ 'C',  'K0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'J0'  ], [ 'C',  'CJ0',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CJ0' ], [ 'C',  'W0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CR'  ], [ 'C',  'W0',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW00',  [ -2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW00',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW10',  [ -1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'W0'  ], [ 'C',  'CW10',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'CW00'], [ 'C',  'K0',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CW10'], [ 'C',  'K0',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'K0'  ], [ 'C',  'CK0',     null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'C',  'M0',      null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'In', 'K0',      null ], [ 1, 3 ], true  );
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'M0',  [ 0, 3 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'M0'  ], [ 'C',  'CK0',     null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'CK0' ], [ 'C',  'K0',      null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'S1'  ], [ 'C',  'CW10',    null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'B0'  ], [ 'C',  'CM0',     null ], [ 1, 3 ], false );

		// Layer C, Digit 2
		this.addTriggerRule(   [ 'C',  'F2'  ], [ 'C',  'CF2',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CF2' ], [ 'C',  'K2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'J2'  ], [ 'C',  'CJ2',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CJ2' ], [ 'C',  'W2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CR'  ], [ 'C',  'W2',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW02',  [ -2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW02',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW12',  [ -1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'W2'  ], [ 'C',  'CW12',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'CW02'], [ 'C',  'K2',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CW12'], [ 'C',  'K2',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'K2'  ], [ 'C',  'CK2',     null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'C',  'M2',      null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'In', 'K2',      null ], [ 1, 3 ], true  );
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'M2',  [ 0, 3 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'M2'  ], [ 'C',  'CK2',     null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'CK2' ], [ 'C',  'K2',      null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'S0'  ], [ 'C',  'CW12',    null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'B2'  ], [ 'C',  'CM2',     null ], [ 1, 3 ], false );

		// Layer C, V Part
		this.addTriggerRule(   [ 'C',  'CU'  ], [ 'C',  'T',      [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'T',   [ 0, 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'C',  'CS'  ], [ 'C',  'T',      [ 2 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'C',  'T'   ], [ 'C',  'CV',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'T'   ], [ 'C',  'CT',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CV'  ], [ 'C',  'V',       null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'CT'  ], [ 'C',  'M0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'CT'  ], [ 'C',  'M2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'C',  'V'   ], [ 'C',  'CV',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'C',  'CV'  ], [ 'C',  'T',       null ], [ 1, 3 ], false );

		// Layer D
		this.addTriggerRule(   [ 'D',  'Y0'  ], [ 'D',  'DR',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'Y0'  ], [ 'D',  'DU',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'X0'  ], [ 'D',  'DS',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S0',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S2',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'S3',      null ], [ 2, 4 ], false );

		// Layer D, Digit 1
		this.addTriggerRule(   [ 'D',  'F1'  ], [ 'D',  'DF1',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DF1' ], [ 'D',  'K1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'J1'  ], [ 'D',  'DJ1',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DJ1' ], [ 'D',  'W1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DR'  ], [ 'D',  'W1',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW01',  [ -2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW01',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW11',  [ -1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'W1'  ], [ 'D',  'DW11',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'DW01'], [ 'D',  'K1',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DW11'], [ 'D',  'K1',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'K1'  ], [ 'D',  'DK1',     null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'D',  'M1',      null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'In', 'K1',      null ], [ 1, 3 ], true  );
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'M1',  [ 0, 3 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'M1'  ], [ 'D',  'DK1',     null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'DK1' ], [ 'D',  'K1',      null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'S1'  ], [ 'D',  'DW11',    null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'B1'  ], [ 'D',  'DM1',     null ], [ 1, 3 ], false );

		// Layer D, Digit 3
		this.addTriggerRule(   [ 'D',  'F3'  ], [ 'D',  'DF3',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DF3' ], [ 'D',  'K3',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'J3'  ], [ 'D',  'DJ3',     null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DJ3' ], [ 'D',  'W3',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DR'  ], [ 'D',  'W3',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW03',  [ -2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW03',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW13',  [ -1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'W3'  ], [ 'D',  'DW13',   [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'DW03'], [ 'D',  'K3',     [ 2 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DW13'], [ 'D',  'K3',     [ 1 ] ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'K3'  ], [ 'D',  'DK3',     null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'D',  'M3',      null ],    [ 3 ], false );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'In', 'K3',      null ], [ 1, 3 ], true  );
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'M3',  [ 0, 3 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'M3'  ], [ 'D',  'DK3',     null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'DK3' ], [ 'D',  'K3',      null ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'S0'  ], [ 'D',  'DW13',    null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'B3'  ], [ 'D',  'DM3',     null ], [ 1, 3 ], false );

		// Layer D, V Part
		this.addTriggerRule(   [ 'D',  'DU'  ], [ 'D',  'T',      [ 0 ] ],    [ 1 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'T',   [ 0, 1 ] ],    [ 2 ], false );
		this.addTriggerRule(   [ 'D',  'DS'  ], [ 'D',  'T',      [ 2 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'D',  'T'   ], [ 'D',  'DV',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'T'   ], [ 'D',  'DT',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DV'  ], [ 'D',  'V',       null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'DT'  ], [ 'D',  'M1',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'DT'  ], [ 'D',  'M3',      null ], [ 2, 4 ], false );
		this.addTriggerRule(   [ 'D',  'V'   ], [ 'D',  'DV',      null ], [ 1, 3 ], false );
		this.addTriggerRule(   [ 'D',  'DV'  ], [ 'D',  'T',       null ], [ 1, 3 ], false );

		// behelfsmäßig:
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F0',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F1',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F2',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F3',     [ 3 ] ],    [ 4 ], false );
		this.addTriggerRule(   [ 'A',  'X0'  ], [ 'A',  'F4',     [ 3 ] ],    [ 4 ], false );

	}

};

