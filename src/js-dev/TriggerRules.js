ZUSE.TriggerRules = {

	init: function ( adder, rules ) {

		this.adder = adder;
		this.parseRules( rules );

	},

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

	getTriggerResults: function ( actuator, tact, onlycombined ) {

		var results = { active: [], inactive: [] };
		var conditions = this.getConditions( actuator, tact );

		if ( conditions !== undefined ) {

			for ( var i = 0; i < conditions.length; i++ ) {

				var element = this.getElement( conditions[ i ] );

				if ( element !== undefined ) {

					if ( this.evaluatePosition( element.position, actuator.position, conditions[ i ][ 2 ] ) ) {

						if ( !onlycombined || conditions[ i ][ 3 ] ) {

							if ( results.active.indexOf( element ) === -1 ) {
								results.active.push( element );
							}

						} // add to inactive else?

					} else {

						if ( results.inactive.indexOf( element ) === -1 ) {
							results.inactive.push( element );
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

			return layer.namedElements[ condition[ 1 ] ];

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

	}

};

