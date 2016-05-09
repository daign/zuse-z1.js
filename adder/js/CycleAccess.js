ZUSE.CycleAccess = {

	blocked: false,
	exclusive: undefined,
	count: 0,

	request: function ( e ) {

		if ( e ) {

			if ( !this.blocked ) {

				this.blocked = true;
				this.exclusive = true;
				return true;

			} else {

				return false;

			}

		} else {

			if ( !this.blocked ) {

				this.blocked = true;
				this.exclusive = false;
				this.count++;
				return true;

			} else if ( this.exclusive === false ) {

				this.count++;
				return true;

			} else {

				return false;

			}

		}

	},

	ask: function ( e ) {

		return this.blocked && ( e || this.exclusive === true );

		// long version:
		//if ( e ) { return this.blocked; }
		//else { return ( this.blocked && this.exclusive === true ); }

	},

	release: function () {

		if ( this.exclusive || --this.count <= 0 ) {

			this.exclusive = undefined;
			this.blocked = false;

		}

	}

};

