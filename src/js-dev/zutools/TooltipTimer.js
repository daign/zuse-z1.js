ZUTOOLS.TooltipTimer = function () {

	var self = this;
	this.timeout = undefined;
	this.timeoutFinished = false;
	this.tooltip = new ZUTOOLS.Tooltip();

	this.finish = function () {

		self.timeoutFinished = true;
		self.timeout = undefined;
		self.tooltip.setTooltip( self.getTooltip() );
		self.tooltip.setMetrics( self.getMetrics() );
		self.tooltip.show();

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

			if ( !this.hasInputs() || !this.tooltip.isPartOfTooltip( event.toElement ) ) {
				this.tooltip.hide();
			} else {
				this.tooltip.checkIfContentActive( event.toElement );
			}

		} else {

			clearTimeout( this.timeout );
			this.timeout = undefined;

		}

	}

};
