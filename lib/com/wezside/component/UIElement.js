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
	_.childContainer = null;
	_.state="";
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "init");
		var c = document.createElement("div");
		this.childContainer=c;
		this.display.appendChild(c);
		this.styleChildContainer();
	}
	_.styleChildContainer=function()
	{
		this.childContainer.style.position="relative";
		this.childContainer.style.display="block";
	}
	_.addChild = function(value) {
		this.childContainer.appendChild(value.display?value.display:value);
	}
	_.removeChild = function(value) {
		this.childContainer.removeChild(value.display?value.display:value);
	}
	_.addUIChild = function(value) {
		this.display.appendChild(value.display?value.display:value);
	}
	_.removeUIChild = function(value) {
		this.display.removeChild(value.display?value.display:value);
	}
	_.layout = function(value) {
		if(value!=undefined)
		{
			this.layoutCollection.push(value);
		}else{
			return this.layoutCollection[this.layoutCollection.length-1];
		}
	}
	_.setStyle=function()
	{
		
	}
	_.arrange = function() {
		for(var a = 0; a < this.layoutCollection.length; a++) {
			this.layoutCollection[a].arrange(this);
		}
	} 
})(); 
