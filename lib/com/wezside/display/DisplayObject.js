var DisplayObject = function() {
	/*
	 * local variables
	 */
	this.display = null;
}
/*
 * public variables
 */
DisplayObject.prototype = {
	props : {},
	style : function(display) {
		display.style.position = "absolute";
	},
	init : function() {
		var d = document.createElement("div");
		this.display = d;
		for(prop in this.props) {
			this.styleProp(prop, this.props[prop].value, this.props[prop].suffix);
		}
		this.style(d);
	},
	styleProp : function(prop, value, suffix) {
		if(!this.display) {
			this.props[prop] = {
				value : value,
				suffix : suffix
			};
			return value;
		}
		if(value != undefined) {
			this.display.style[prop] = value + ( suffix ? suffix : "");
		} else {
			return this.display.style[prop].replace("px", "");
		}
	},
	className : function(value) {
		if(value != undefined) {
			this.display.className = value;
		} else {
			return this.display.className;
		}
	},
	x : function(value) {
		return this.styleProp("left", value, "px");
	},
	y : function(value) {
		return this.styleProp("top", value, "px");
	},
	width : function(value) {
		return this.styleProp("width", value, "px");
	},
	height : function(value) {
		return this.styleProp("height", value, "px");
	},
	visible : function(value) {
		if(value != undefined) {value == true ? value = "block" : value = "none";
			this.styleProp("display", value);
		} else {
			return this.styleProp("display", value) == "block" ? true : false;

		}
	}
};
