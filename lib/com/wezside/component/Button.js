var Button = function() {

};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Button, UIElement);
	/*
	 * public functions
	 */
	_.bgImage = null;
	_.buttonMouseOver = null;
	_.buttonMouseOut = null;
	_.buttonMouseClick = null;
	_.labelClassName = function(value) {
		this.label.className(value);
	}
	_.label = null;
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "build");

		this.label = new Label();
		this.label.build();

		this.label.text("");
		this.addChild(this.label);
		this.disableSelection(this.label.display);
	}
	_.setStyle = function() {
		Class._super(this, "setStyle");
		this.label.width(this.width());
		if(!this.labelClassName) {
			this.label.display.style.textAlign = "center";
		}
	}
	_.asset = function(value) {
		if(value) {
			this.bgImage =new Image();
			this.bgImage.src =  typeof(value)=="object"?value.src:value;
			this.display.style.backgroundImage = "url(" + this.bgImage.src + ")";

		}
	}
	_.text = function(value) {
		if(value != undefined) {
			this.label.display.innerHTML = value;
		} else {
			return this.label.displayinnerHTML;
		}
	}
	_.activate = function() {
		this.display.style.cursor = "pointer";
		var par = this;
		this.buttonMouseOver = function(event) {
			par.onMouseOver(event)
		};
		this.buttonMouseOut = function(event) {
			par.onMouseOut(event)
		};
		this.buttonMouseClick = function(event) {
			par.onMouseClick(event)
		};
		Utensil.addListener(this.display, "mouseover", this.buttonMouseOver);
		Utensil.addListener(this.display, "mouseout", this.buttonMouseOut);
		Utensil.addListener(this.display, "mousedown", this.buttonMouseClick);
	}
	_.deactivate = function() {
		this.display.style.cursor = "default";
		Utensil.removeListener(this.display, "mouseover", this.buttonMouseOver);
		Utensil.removeListener(this.display, "mouseout", this.buttonMouseOut);
		Utensil.removeListener(this.display, "mousedown", this.buttonMouseClick);
		this.buttonMouseOver = null;
		this.buttonMouseOut = null;
	}
	_.onMouseOver = function(event) {
	//	this.display.style.backgroundPositionY = -this.height() + "px";
		this.display.style.backgroundPosition = "0px -"+this.height() + "px";
	}
	_.onMouseOut = function(event) {
		// this.display.style.backgroundPositionY = "0px";
		this.display.style.backgroundPosition = "0px "+"0px";
	}
	_.onMouseClick = function(event) {
		// this.display.style.backgroundPositionY = -(this.height() * 2) + "px";
		this.display.style.backgroundPosition = "0px -"+(this.height() * 2) + "px";
	}
	_.disable = function() {
		this.deactivate();
		// this.display.style.backgroundPositionY = -(this.height() * 3) + "px";
		this.display.style.backgroundPosition = "0px -"+(this.height() * 3) + "px";
	}
	_.disableSelection = function(target) {
		target.style["-moz-user-select"]="-moz-none";
		target.style["-khtml-user-select"]="none";
		target.style["-ms-user-select"]="none";
		target.style["user-selectt"]="none";
		target.style["-webkit-user-select"]="none";
	}
})();
