var DisplayObject = function() {
	/*
	 * local variables
	 */
	this.display = null;
	this.elemName = "div";
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
		for (prop in this.props) {
			this.styleProp(prop, this.props[prop].value, this.props[prop].suffix);
		}
		this.style(d);
	},
	/*
	 *  a helper method to update and retrieve a style value
	 */
	styleProp : function(prop, value, suffix) {
		if (!this.display) {
			this.props[prop] = {
				value : value,
				suffix : suffix
			};
			return value;
		}
		if (value != undefined) {
			this.display.style[prop] = value + ( suffix ? suffix : "");
		} else {
			return this.display.style[prop] ? this.display.style[prop].replace("px", "") : "";
		}
	},
	className : function(value) {
		if (value != undefined) {
			this.display.className = value;
		} else {
			return this.display.className;
		}
	},
	x : function(value) {
		return Number(this.styleProp("left", value, "px"));
	},
	y : function(value) {
		return Number(this.styleProp("top", value, "px"));
	},
	width : function(value) {
		return Number(this.styleProp("width", value, "px"));
	},
	height : function(value) {
		return Number(this.styleProp("height", value, "px") != "" ? this.styleProp("height", value, "px") : this.display.clientHeight);
	},
	visible : function(value) {
		if (value != undefined) {
			value == true ? value = "visible" : value = "hidden";
			this.styleProp("visibility ", value);
		} else {
			return this.styleProp("visibility ", value) == "visible" ? true : false;

		}
	},
	alpha : function(value) {
		if (value != undefined) {
			this.props.alpha = value;
			if (this.display) {
				this.display.style["opacity"] = value;
				this.display.style["-khtml-opacity"] = value;
				this.display.style["-moz-opacity"] = value;
				this.display.style["filter"] = "alpha(opacity=" + (value * 100) + ")";
				// this.display.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity="+(value*100)+")";
			}
		} else {
			return Number(this.props.alpha == undefined ? 1 : this.props.alpha);
		}
	},
	buttonMode : function(value) {
		if (value == true) {
			this.display.style.cursor = "pointer";
		} else {
			this.display.style.cursor = "auto";
		}
	},
	startX : function() {
		var x = this.x();
		if (Utensil.getX(this.display, true) > x) {
			return Utensil.getX(this.display, true) - x;
		}
		return x;
	},
	startY : function() {
		var y = this.y();
		if (Utensil.getY(this.display, true) > y) {
			return Utensil.getY(this.display, true) - y;
		}
		return y;
	},
	startDrag : function() {
		var eventName = "mousemove";
		if ('ontouchstart' in document.documentElement)
			eventName = "ontouchstart";
		var root = this;
		var sx = this.startX();
		var sy = this.startY();
		this.dragHandler = function(event) {
			root.onDragMove(event, sx, sy);
		};
		Utensil.addListener(document, eventName, this.dragHandler);
	},
	onDragMove : function(event, sx, sy) {
		this.x(Utensil.mouseX(document.body, event) - sx);
		this.y(Utensil.mouseY(document.body, event) - sy);

	},
	stopDrag : function() {
		var eventName = "mousemove";
		if ('ontouchstart' in document.documentElement)
			eventName = "ontouchstart";
		Utensil.removeListener(document, eventName, this.dragHandler);
	},
	hitTestObject : function(value) {
		var x = parseInt(this.x());
		var vx = parseInt(value.x());
		var xw = x + parseInt(this.width());
		var vxw = vx + parseInt(value.width());

		var y = parseInt(this.y());
		var vy = parseInt(value.y());
		var yh = y + parseInt(this.height());
		var vyh = vy + parseInt(value.height());
		if (xw >= vx && x <= vxw) {
		} else {
			return false;
		}
		if (yh >= vy && y <= vyh) {
		} else {
			return false;
		}
		return true;

	},
	hitTestPoint : function(xx, yy) {
		if (xx >= this.x() && xx <= parseInt(this.x()) + parseInt(this.width()) && yy >= this.y() && yy <= parseInt(this.y()) + parseInt(this.height())) {
			return true;
		}
		return false;
	},
	rotation : function(deg) {
		this.rotateObj(this.display, deg);
	},
	rotateObj : function(obj, deg) {
		deg_str = deg + "";
		rotate_transform = "rotate(" + deg + "deg)";
		matrix_str = this.degreeToIEMatrix(deg);
		filter_str = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " + matrix_str + ")";

		obj.style["rotation"] = deg_str + "deg";
		obj.style["-ms-transform"] = rotate_transform;
		obj.style.MozTransform = rotate_transform;
		obj.style.OTransform = rotate_transform;
		obj.style.WebkitTransform = rotate_transform;

		radians = parseInt(deg) * Math.PI * 2 / 360;
		calSin = Math.sin(radians);
		calCos = Math.cos(radians);
		if(obj.style.filter)
		{
			obj.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + calCos + ', M12=-' + calSin + ',M21=' + calSin + ', M22=' + calCos + ', sizingMethod="auto expand")';
			//obj.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
		}
		
		if(obj.style["ms-filter"] )obj.style["ms-filter"]  = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + calCos + ', M12=-' + calSin + ',M21=' + calSin + ', M22=' + calCos + ', sizingMethod="auto expand")';

		if (Utensil.Browser.isIE && Utensil.Browser.getInternetExplorerVersion() < 9) {
			obj.style.filter = filter_str;
			obj.style["ms-filter"] = filter_str;
			obj.style["zoom"] = "1";
		}
	},
	degreeToIEMatrix : function(deg) {
		var deg2radians = Math.PI * 2 / 360;
		var rad = deg * deg2radians;
		var costheta = Math.cos(rad);
		var sintheta = Math.sin(rad);

		var M11 = costheta;
		var M12 = -sintheta;
		var M21 = sintheta;
		var M22 = costheta;
		return 'M11=' + M11 + ', M12=' + M12 + ', M21=' + M21 + ', M22=' + M22;
	}
};
