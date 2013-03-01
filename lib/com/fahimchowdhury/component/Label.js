var Label = function() {
	this.field
	this.text = function(value) {
		if(!this.field) {
			this.field = document.createElement("div");
			this.field.style.position = "relative";
			this.addChild(this.field);
		}
		if(value != undefined) {
			this.field.innerHTML = value;
		} else {
			return this.field.innerHTML;
		}
	}
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Label, UIElement);
	/*
	 * public functions
	 */

})();