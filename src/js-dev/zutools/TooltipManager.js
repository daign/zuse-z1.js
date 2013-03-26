ZUTOOLS.TooltipManager = function () {

	var self = this;
	this.timeout = undefined;
	this.timeoutFinished = false;
	this.clickOpened = undefined;
	this.tooltip = new ZUTOOLS.Tooltip();

	this.finish = function () {

		self.timeoutFinished = true;
		self.timeout = undefined;
		self.showTooltip( false );

	}

};

ZUTOOLS.TooltipManager.prototype = {

	constructor: ZUTOOLS.TooltipManager,

	toolclick: function () {

		if ( this.clickOpened ) {
			this.hideTooltip();
		}

	},

	toolclickopen: function ( id, getTooltipContent, getMetrics, hasInputs ) {

		if ( this.clickOpened === id ) {

			this.hideTooltip();

		} else {

			this.clickOpened = id;
			this.cancelTimeout();
			this.timeoutFinished = false;

			this.getTooltipContent = getTooltipContent;
			this.getMetrics = getMetrics;
			this.hasInputs = hasInputs;

			this.showTooltip( true );

		}

	},

	toolover: function ( getTooltipContent, getMetrics, hasInputs ) {

		if ( !this.clickOpened && this.timeout === undefined ) {

			this.getTooltipContent = getTooltipContent;
			this.getMetrics = getMetrics;
			this.hasInputs = hasInputs;

			this.timeoutFinished = false;
			this.timeout = setTimeout( this.finish, 500 );

		}

	},

	toolout: function ( event ) {

		if ( this.timeoutFinished ) {

			if ( !this.hasInputs() || !this.tooltip.isPartOfTooltip( event.relatedTarget ) ) {
				this.hideTooltip();
			}

		} else {

			this.cancelTimeout();

		}

	},

	showTooltip: function ( wasClicked ) {

		this.tooltip.setContent( this.getTooltipContent() );
		this.tooltip.setMetrics( this.getMetrics() );
		this.tooltip.wasClicked = wasClicked;
		this.tooltip.show();

	},

	hideTooltip: function () {

		this.clickOpened = undefined;
		this.tooltip.hide();

	},

	cancelTimeout: function () {

		if ( this.timeout ) {
			clearTimeout( this.timeout );
			this.timeout = undefined;
		}

	}

};

