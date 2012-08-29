var DisplayObject = function() {
	/*
	 * local variables
	 */
	this.display = null;
	this.elemName= "div";
}
/*
 * public variables
 */
DisplayObject.prototype = {
	/*
	 * holds the style properties if the display doesn't exist
	 */
	props : {},
	/*
	 * add the default styles
	 */
	style : function(display) {
		display.style.position = "absolute";
	},
	/*
	 *  this function sets the display and its styles
	 */
	init : function() {
		
		var d = document.createElement(this.elemName);
		this.display = d;
		for(prop in this.props) {
			this.styleProp(prop, this.props[prop].value, this.props[prop].suffix);
		}
		this.style(d);
	},
	/*
	 *  a helper method to update and retrieve a style value
	 */
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
			return this.display.style[prop]?this.display.style[prop].replace("px", ""):"";
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
		return this.styleProp("height", value, "px")!=""?this.styleProp("height", value, "px"):this.display.clientHeight;
	},
	visible : function(value) {
		if(value != undefined) {value == true ? value = "visible" : value = "hidden";
			this.styleProp("visibility ", value);
		} else {
			return this.styleProp("visibility ", value) == "visible" ? true : false;

		}
	},
	alpha : function(value) {
		if(value != undefined) {
			this.props.alpha = value;
			if(this.display)
			{
				this.display.style["opacity"] = value;
				this.display.style["-khtml-opacity"] = value;
				this.display.style["-moz-opacity"] = value;
				this.display.style["filter"] = "alpha(opacity="+(value*100)+")";
				this.display.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity="+(value*100)+")";
			}
		} else {
			return this.props.alpha;
		}
	},
	buttonMode:function(value)
	{
		if(value==true)
		{
			this.display.style.cursor="pointer";
		}else{
			this.display.style.cursor="auto";
		}
	}
};
