ZUTOOLS.TooltipTimer = function () {

	var self = this;
	this.timeout = undefined;
	this.timeoutFinished = false;
	this.popup = new ZUTOOLS.Tooltip();

	this.finish = function () {

		self.timeoutFinished = true;
		self.timeout = undefined;
		self.popup.setTooltip( self.getTooltip() );
		self.popup.setMetrics( self.getMetrics() );
		self.popup.show();

	}

};

ZUTOOLS.TooltipTimer.prototype = {

	constructor: ZUTOOLS.TooltipTimer,

	toolover: function ( getTooltip, getMetrics, hasInputs ) {

		if ( this.timeout === undefined ) {

			this.getTooltip = getTooltip;
			this.getMetrics = getMetrics;
			this.hasInputs = hasInputs;
			this.timeoutFinished = false;
			this.timeout = setTimeout( this.finish, 500 );

		}

	},

	toolout: function ( event ) {

		if ( this.timeoutFinished ) {

			if ( !this.hasInputs() || event.toElement.id !== 'TooltipBridge' ) {
				this.popup.hide();
			}

		} else {

			clearTimeout( this.timeout );
			this.timeout = undefined;

		}

	}

};

