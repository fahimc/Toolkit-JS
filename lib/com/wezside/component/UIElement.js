var UIElement = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(UIElement, DisplayObject);
	/*
	 * public functions
	 */
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "init");
	}
	_.addChild=function(value)
	{
		this.display.appendChild(value.display);
	}
	_.removeChild=function(value)
	{
		this.display.removeChild(value.display);
	}
	_.layout = null;
	_.arrange = function()
	{
		if(this.layout)this.layout.arrange(this);
	}
})();
