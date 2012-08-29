var UIElement = function() {
	this.layoutCollection = [];
}; (function() {
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
	_.addChild = function(value) {
		this.display.appendChild(value.display);
	}
	_.removeChild = function(value) {
		this.display.removeChild(value.display);
	}
	_.layout = function(value) {
		if(value!=undefined)
		{
			this.layoutCollection.push(value);
		}else{
			return this.layoutCollection[this.layoutCollection.length-1];
		}
	}
	_.arrange = function() {
		for(var a = 0; a < this.layoutCollection.length; a++) {
			this.layoutCollection[a].arrange(this);
		}
	}
})();
