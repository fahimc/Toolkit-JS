var ContextMenuItem = function(value, func) {
	this.itemName = value;
	this.itemCallback = func;

	this.build();
	this.setStyle();
	this.arrange();
	return this;
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(ContextMenuItem, Label);
	/*
	 * public functions
	 */
	_.separatorBefore =false;
	_.separatorAfter =false;
	_.build = function() {
		Class._super(this, "build");
		this.text(this.itemName);
		if (this.itemCallback) {
			Utensil.addListener(this.display, "click", this.itemCallback);
			Utensil.addListener(this.display, "mouseover", this.createHandler(this, "mouseOver"));
			Utensil.addListener(this.display, "mouseout", this.createHandler(this, "mouseOut"));
			this.display.style.cursor = "pointer";
		}
	};
	_.mouseOver = function(event) {
		this.display.style.backgroundColor = "#efefef";
	}
	_.mouseOut = function(event) {
		this.display.style.backgroundColor = "transparent";
	}
	_.setStyle = function() {
		this.display.style.fontFamily = "Arial, Helvetica, sans-serif";
		this.display.style.fontSize = "11px";
		this.display.style.textAlign = "center";
		this.display.style.paddingTop = "2px";
		this.width(170);
		this.height(15);
	}
})();
