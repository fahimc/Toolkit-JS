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
	_.layoutCollection = null;
	_.childContainer = null;
	_.state = "";
	_.handlers = {};
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "init");
		var c = document.createElement("div");
		this.childContainer = c;
		this.display.appendChild(c);
		this.styleChildContainer();
	}
	_.styleChildContainer = function() {
		this.childContainer.style.position = "relative";
		this.childContainer.style.display = "block";
	}
	_.addChild = function(value) {
		this.childContainer.appendChild(value.display ? value.display : value);
	}
	_.removeChild = function(value) {
		this.childContainer.removeChild(value.display ? value.display : value);
	}
	_.addUIChild = function(value) {
		this.display.appendChild(value.display ? value.display : value);
	}
	_.removeUIChild = function(value) {
		if (!value)
			return;

		this.display.removeChild(value.display ? value.display : value);
	}
	_.layout = function(value) {
		if (!this.layoutCollection)
			this.layoutCollection = [];
		if (value != undefined) {
			this.layoutCollection.push(value);
		} else {
			return this.layoutCollection[this.layoutCollection.length - 1];
		}
	}
	_.createHandler=function(parent,funcName)
	{
		var root = parent;
		parent.handlers[funcName] = function(event) {
			root[funcName](event);
		}
		return parent.handlers[funcName];
	};
	_.removeHandler=function(parent,funcName)
	{
		
		if(parent.handlers[funcName])
		{
			delete parent.handlers[funcName];
		}
	};
	_.setStyle = function() {

	}
	_.arrange = function() {
		if (!this.layoutCollection)
			return;
		for (var a = 0; a < this.layoutCollection.length; a++) {
			this.layoutCollection[a].arrange(this);
		}
	}
	_.bareWidth = function() {
		return this.childContainer.clientWidth;
	}
	_.bareHeight = function() {
		return this.childContainer.clientHeight;
	}
	
})(); 