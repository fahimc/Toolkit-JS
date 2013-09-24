var Class = {
	/* @method
	 * @desc call this super class. Provide the object and the function as String.
	 * @return Null
	 * */
	_super : function(obj, name,args) {
		obj.baseConstructor[name].apply(obj,Array.prototype.slice.call(arguments, 2));
	},
	/* @method
	 * @desc extends a Class
	 * @return Null
	 * */
	extend : function(newObject, toClone) {
		newObject.prototype = new toClone();
		newObject.prototype.baseConstructor = new toClone();
		return newObject.prototype;
	},
	implement : function(newObject, toClone) {
		for (var prop in toClone) {
			if(!newObject.prototype[prop])newObject.prototype[prop] = toClone[prop];
		}
	}
};// JavaScript Document
( function(window) {
		/* @class Utensil
		 * @desc JavaScript Toolkit
		 */
		window.Utensil = {
			/* @method
			 * @desc get/set the stage Element
			 * @return Null
			 */
			_stage : window,
			stage : function(value, relative) {
				if (value != undefined) {
					this._stage = value;
					if (relative)
						this._stage.style.position = "relative";
				}
				return this._stage==window?document.body:this._stage;
			},
			/* @method
			 * @desc Add an element to the body.
			 * @return Null
			 */
			addChild : function(value) {
				document.body.appendChild(value);
			},
			/* @method
			 * @desc will return the width of the window.
			 * @return Number
			 */
			stageWidth : function(raw) {
				if(raw)return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
				return (this.stage() == window) ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) : (parseInt(this.stage().style.width.replace("px",""))>0?parseInt(this.stage().style.width.replace("px","")):this.stage().clientWidth);
			},
			/* @method
			 * @desc will return the height of the window.
			 * @return Number
			 */
			stageHeight : function(raw) {
				if(raw)return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
				return (this.stage() == window) ? (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) : (parseInt(this.stage().style.height.replace("px",""))>0?parseInt(this.stage().style.height.replace("px","")):this.stage().clientHeight);
			},
			/* @method
			 * @desc Provide it with an element and it will return the X position.
			 * @return Number
			 */
			getX : function(obj, raw) {
				if (raw) {
					var curleft = 0;
					var curtop = 0;
					if (obj.offsetParent) {
						do {
							curleft += obj.offsetLeft;
							curtop += obj.offsetTop;
						} while (obj = obj.offsetParent);
					}
					return curleft;
				}
				return isNaN(parseInt(obj.style.left.replace("px", ""))) ? 0 : parseInt(obj.style.left.replace("px", ""));
			},
			/* @method
			 * @desc Provide it with an element and it will return the Y position.
			 * @return Number
			 */
			getY : function(obj, raw) {
				if (raw) {
					var curtop = 0;
					if (obj.offsetParent)
						while (1) {
							curtop += obj.style.top;
							if (!obj.offsetParent)
								break;
							obj = obj.offsetParent;
						}
					else if (obj.y)
						curtop += obj.y;
					return curtop;
				}
				return isNaN(parseInt(obj.style.top.replace("px", ""))) ? 0 : parseInt(obj.style.top.replace("px", ""));
			},
			/* @method
			 * @desc Provide it with an element and it will return the width.
			 * @return Number
			 */
			getWidth : function(obj) {
				return isNaN(parseInt(obj.style.width.replace("px", ""))) ? 0 : parseInt(obj.style.width.replace("px", ""));
			},
			/* @method
			 * @desc Provide it with an element and it will return the height.
			 * @return Number
			 */
			getHeight : function(obj) {
				return isNaN(parseInt(obj.style.height.replace("px", ""))) ? 0 : parseInt(obj.style.height.replace("px", ""));
			},
			/* @method
			 * @desc Sends out comma delimited alerts.
			 * @return Null
			 */
			trace : function() {
				var toSend = "";
				for (var i in arguments) {
					toSend += arguments[i] + ",";
				}
				alert(toSend);

			},
			/* @method
			 * @desc Resets the element provided.
			 * @return Null
			 */
			resetStyle : function(obj) {
				obj.style.position = "absolute";
				obj.style.margin = "0";
				obj.style.padding = "0";

			},
			/* @method
			 * @desc Provide it with an element and an event to return the mouse X position.
			 * @return Number
			 */
			mouseX : function(elem, e) {
				var x;
				if (e.pageX) {
					x = e.pageX;
				} else {
					x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

				}
				if(e.touches)x=e.touches[0].pageX;
				x -= elem.offsetLeft;
				return x;
			},
			/* @method
			 * @desc Provide it with an element and an event to return the mouse Y position.
			 * @return Number
			 */
			mouseY : function(elem, e) {
				var y;
				if (e.pageY) {
					y = e.pageY;
				} else {
					y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

				}
				if(e.touches)y=e.touches[0].pageY;
				y -= elem.offsetTop;
				return y;
			},
			mouseLeave : function(e) {

				if (!e)
					var e = window.event;
				var tg = (window.event) ? e.srcElement : e.target;
				var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
				while (reltg != tg && reltg.nodeName != 'BODY')
				reltg = reltg.parentNode
				if (reltg == tg)
					return;
				// Mouseout took place when mouse actually left layer
				// Handle event
			},
			/* @method
			 * @desc loads an Image and calls a callback function.
			 * @return Null
			 */
			ImageLoader : function(src, callback) {
				var image = new Image();
				image.onload = function() {
					callback(image);
				};
				image.src = src;
			},
			/* @method
			 * @desc Send data via POST or GET methods
			 * @return Null
			 */
			postURL : function(path, params, method) {
				method = method || "post";
				// Set method to post by default, if not specified.

				// The rest of this code assumes you are not using a library.
				// It can be made less wordy if you use one.
				var form = document.createElement("form");
				form.setAttribute("method", method);
				form.setAttribute("action", path);

				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "data");
				hiddenField.setAttribute("value", params);

				form.appendChild(hiddenField);

				document.body.appendChild(form);
				form.submit();
			},
			/* @method
			 * @desc Load a URL/File
			 * @return Null
			 */
			URLLoader : {
				xhttp : "",
				cb : "",
				load : function(url, callback, method, params) {
					this.cb = callback;
					if (window.XMLHttpRequest) {
						this.xhttp = new XMLHttpRequest();
					} else// IE 5/6
					{
						this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
					}

					if (!method)
						method = "GET";
					if (method == "GET" && params) {
						url += "?" + params;

					}
					var par = this;
					this.xhttp.onreadystatechange = function() {
						par.onStatus()
					};
					this.xhttp.open(method, url, true);
					if (method == "POST") {
						this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						this.xhttp.setRequestHeader("Content-length", params.length);
						this.xhttp.setRequestHeader("Connection", "close");
					}
					try {
						this.xhttp.send(params);
					} catch(e) {

					}
				},
				onStatus : function(e) {
					if (this.xhttp.readyState == 4) {
						if (this.xhttp.status == 200 || window.location.href.indexOf("http") == -1) {
							this.cb(this.xhttp.responseText, this.xhttp.responseXML);

						} else {
							//trace("error 1")
						}
					} else {
						//trace("error 2")
					}
				}
			},

			/* @
			 * @desc Provides detail of the browser.
			 * @return Null
			 */
			Browser : {
				/*
				 * @desc Browser.getInternetExplorerVersion() Gets the IE Version.
				 * @return String
				 */
				getInternetExplorerVersion : function() {
					var rv = -1;
					// Return value assumes failure.
					if (navigator.appName == 'Microsoft Internet Explorer') {
						var ua = navigator.userAgent;
						var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
						if (re.exec(ua) != null)
							rv = parseFloat(RegExp.$1);
					}
					return rv;
				},
				/*
				 * @desc Browser.isIE returns true if broswer is IE.
				 * @return Boolean
				 */
				isIE : (navigator.appVersion.indexOf("MSIE") != -1),
				/*
				 * @desc Browser.isIE9() returns true if broswer is IE9.
				 * @return Boolean
				 */
				isIE9 : function() {
					return Utensil.Browser.getInternetExplorerVersion() > 8
				},
				/*
				 * @desc Browser.isMobile returns true if broswer is mobile.
				 * @return Boolean
				 */
				isMobile : (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))

			},
			/* @method
			 * @desc Provide it an event and it will get the target (cross-broswer).
			 * @return String
			 */
			getTarget : function(event) {
				return (event.currentTarget) ? event.currentTarget : event.srcElement;
			},
			events : {

			},
			/* @method
			 * @desc A Cross Browser event listener.
			 * @return Null
			 */
			addListener : function(obj, event, callback) {
				if (obj.attachEvent) {
					obj.attachEvent("on" + event, callback);
				} else {
					obj.addEventListener(event, callback);
				}
			},
			/* @method
			 * @desc A Cross Browser remove event listener.
			 * @return Null
			 */
			removeListener : function(obj, event, callback) {
				if (obj.detachEvent) {
					obj.detachEvent("on" + event, callback);
				} else {
					obj.removeEventListener(event, callback);
				}
			},
			/* @method
			 * @desc get url parameters
			 * @return a value
			 */
			loadParams : {
				getValue : function(name) {
					name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
					var regexS = "[\\?&]" + name + "=([^&#]*)";
					var regex = new RegExp(regexS);
					var results = regex.exec(window.location.href);
					if (results == null)
						return "";
					else
						return results[1];
				},
				getHostURL : function() {
					var url = new String(document.URL.replace(/\/[^\/]+$/, ''));
					if (url.charAt(url.length - 1) != "/")
						url = url + "/";
					return url;
				}
			},
			/* @method
			 * @desc Add packages to the Utensil framework.
			 * @return Null
			 */
			addPackage : function(packages, packageName) {
				var parent = this;
				if (packageName && !this[packageName]) {
					this[packageName] = {};
					parent = this[packageName];
				}
				for (var keys in packages) {
					var obj = packages[keys];
					parent[keys] = obj;
				}
			}
		};
	}(window));var Collection = function(arr) {
	this._collection = arr ? arr : [];
	this.reverse = function() {
		this._collection = this._collection.reverse();
	};
	this.iterator = function() {
		return new ArrayIterator(this._collection);
	}
	this.find = function(prop, value) {
		var it = this.iterator();
		var item;

		// Returns the first item
		if (prop == "" && !value && it.hasNext()) {
			item = it.next();
		}
		if (item) {
			it.purge();
			it = null;
			return item;
		}

		while (it.hasNext()) {
			item = it.next();
			if (item.hasOwnProperty(prop) && item[prop] == value)
				return item;

			if ((prop || value ) && (item == prop || item == value ))
				return item;
		}
		it.purge();
		it = null;
		return null;
	};
	this.addItem = function(value) {
		this._collection.push(value);
	};
	this.addItemAt = function(value, index) {
		this._collection.splice(index, 0, value);
	};
	this.getItemAt = function(index) {
		return this._collection[index];
	};
	this.removeItem = function(prop, value) {
		var removeIndex = -1;
		var it = this.iterator();
		while (it.hasNext()) {
			var item = it.next();
			if (item.hasOwnProperty(prop) && item[prop] == value) {
				removeIndex = it.index() - 1;
				break;
			}
		}
		it.purge();
		it = null;
		return this._collection.splice(removeIndex, 1);
	};
	this.removeItemAt = function(index) {
		this._collection.splice(index, 1);
	}

	this.length = function() {
		return this._collection ? this._collection.length : 0;
	};
	this.purge=function()
	{
		if(!this._collection)return;
		while(this._collection.length>0)
		{
			this.removeItemAt(this._collection.length-1);
		}
	};

};var Layout = function() {
}

Layout.prototype = {
	verticalGap : 0,
	horizontalGap : 0,
	left : 0,
	top : 0,
	bottom : 0,
	right : 0,
	arrange : function(obj) {
	}
};var DisplayObject = function() {
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
};var LoaderInfo = {
	loadParams : {
		getValue : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null)
				return "";
			else
				return results[1];
		},
		getHostURL : function() {
			var url = new String(document.URL.replace(/\/[^\/]+$/, ''));
			if (url.charAt(url.length - 1) != "/")
				url = url + "/";
			return url;
		}
	}
};var Event =
{
	COMPLETE:"EVENT_COMPLETE",
	PROGRESS:"EVENT_PROGRESS",
	/*
	 * event handlers
	 */
	addListener : function(obj,type, callback, scope) {
		var args = [];
		var numOfArgs = arguments.length;
		for(var i = 0; i < numOfArgs; i++) {
			args.push(arguments[i]);
		}
		args = args.length > 3 ? args.splice(3, args.length - 1) : [];
		if(!obj.listeners)obj.listeners={};
		if( typeof obj.listeners[type] != "undefined") {
			obj.listeners[type].push({
				scope : scope,
				callback : callback,
				args : args
			});
		} else {
			obj.listeners[type] = [{
				scope : scope,
				callback : callback,
				args : args
			}];
		}
	},
	removeListener : function(obj,type, callback, scope) {
		if( typeof obj.listeners[type] != "undefined") {
			var numOfCallbacks = obj.listeners[type].length;
			var newArray = [];
			for(var i = 0; i < numOfCallbacks; i++) {
				var listener = obj.listeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {

				} else {
					newArray.push(listener);
				}
			}
			obj.listeners[type] = newArray;
		}
	},
	dispatch : function(obj,type, target,args) {
		var numOfListeners = 0;
		var event = {
			type : type,
			target : target,
			args:args
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i = 0; i < numOfArgs; i++) {
			args.push(arguments[i]);
		};
		args = args.length > 2 ? args.splice(2, args.length - 1) : [];
		args = [event].concat(args);
		
		if(obj.listeners && typeof obj.listeners[type] != "undefined") {
			var numOfCallbacks = obj.listeners[type].length;
			for(var i = 0; i < numOfCallbacks; i++) {
				var listener = obj.listeners[type][i];
				if(listener && listener.callback) {
					listener.args = args.concat(listener.args);
					listener.callback.apply(listener.scope, listener.args);
					numOfListeners += 1;
				}
			}
		}
	}
};var JSONLoader=function(){};
(function()
{
	var _ =JSONLoader.prototype;
	
	_.urlRequest=null;
	_.SCRIPT_NAME="jsonpLoader";
	_.CALLBACK_PREFIX="callback";
	_.CALLBACK_SUFFIX=0;
	
	_.load=function(urlRequest)
	{
		if(!urlRequest||!urlRequest.url)return;
		 
		 this.urlRequest=urlRequest;
		var url = urlRequest.data!=null?this.getURL():urlRequest.url;
		url = this.addCallback(url);
		//addCallback
		
		
		
		var script; 
		if(document.getElementById(this.SCRIPT_NAME)) {
			var s = this.createScript();
			script.parentNode.replaceChild(s, document.getElementById(this.SCRIPT_NAME));
		} else {
			script = this.createScript();
			document.getElementsByTagName("head")[0].appendChild(script);
		}
		
		
		script.setAttribute("src", url); 
	};
	_.addCallback=function(url)
	{
		
		window.scriptCompleteEventsCount++;
		CALLBACK_SUFFIX = window.scriptCompleteEventsCount;
		var par = this;
		window.scriptCompleteEvents[this.CALLBACK_PREFIX+this.CALLBACK_SUFFIX]=function(json)
		{
			if(par.urlRequest.callback)par.urlRequest.callback(json);
			Event.dispatch(par,Event.COMPLETE,null,json);
			delete window.scriptCompleteEvents[par.CALLBACK_PREFIX+par.CALLBACK_SUFFIX];
		};
		url+=(url.indexOf("?")<0)?"?":"&";
		url+="callback=scriptCompleteEvents."+this.CALLBACK_PREFIX+this.CALLBACK_SUFFIX;
		
		return url;
	};
	_.getURL=function()
	{
		var url =this.urlRequest.url;
		for(var key in this.urlRequest.data.data)
		{
			url+=(url.indexOf("?")<0)?"?":"&";
			url+=key+"="+this.urlRequest.data.data[key];
		}
		return url;
	};
	_.createScript=function() {
		var s = document.createElement("script");
		s.setAttribute("type", "text/javascript");
		s.id=this.SCRIPT_NAME;
		return s;

	};
	
})();
window.scriptCompleteEvents=[];
window.scriptCompleteEventsCount=0;var URLRequest=function(url){
	this.init(url);
};
(function()
{
	var _ = URLRequest.prototype;
	
	//global variables
	_.url="";
	_.data=null;
	_.callback=null;
	//methods
	_.init=function(url)
	{
		this.url=url;
	};
})();var URLVariables=function(){};
(function()
{
	var _ = URLVariables.prototype;
	
	//global variables
	_.data={};
	//methods
	_.set=function(key,value){
		this.data[key]=value; 
	};
	_.get=function(key)
	{
		return this.data[key];
	}; 
})();var StyleSheet = {
	props : {
		defaultFontSize : null,
		defaultStageWidth : null,
		defaultStageHeight : null
	},
	getFontSize : function(element) {
		var size = this.getStyle(element, 'font-size');
		if (size.indexOf('em') > -1) {
			var defFont = this.getStyle(document.body, 'font-size');
			if (defFont.indexOf('pt') > -1) {
				defFont = Math.round(parseInt(defFont) * 96 / 72);
			} else {
				defFont = parseInt(defFont);
			}
			size = Math.round(defFont * parseFloat(size));
		} else if (size.indexOf('pt') > -1) {
			size = Math.round(parseInt(size) * 96 / 72)
		}
		return parseInt(size);
	},
	getStyle : function(element, property) {
		var s = false;
		if (element.currentStyle) {
			var p = property.split('-');
			var str = new String('');
			for (i in p) {
				str += (i > 0) ? (p[i].substr(0, 1).toUpperCase() + p[i].substr(1)) : p[i];
			}
			s = element.currentStyle[str];
		} else if (window.getComputedStyle) {
			s = window.getComputedStyle(element, null).getPropertyValue(property);
		}
		return s;
	},
	autoSizeFont : function(value) {

		if (value) {
			Utensil.addListener(window, "resize", StyleSheet.resizeFont);
			StyleSheet.resizeFont();
		} else {
			Utensil.removeListener(window, "resize", StyleSheet.resizeFont);
		}
	},
	resizeRatio : function() {
		if (!StyleSheet.props.defaultStageWidth) {
			StyleSheet.props.defaultStageWidth = Utensil.stageWidth();
			StyleSheet.props.defaultStageHeight = Utensil.stageHeight();
		}
		var r = Utensil.stageWidth() / StyleSheet.props.defaultStageWidth;
		var hr = Utensil.stageHeight() / StyleSheet.props.defaultStageHeight;
		/*
		 * Calculate the ratio
		 */
		if (hr < r)
			r = hr;
		r = r.toFixed(2);
		if (r > 1)
			r = 1;

		return r;
	},
	resizeFont : function() {
		if (!StyleSheet.props.defaultFontSize) {
			StyleSheet.props.defaultFontSize = StyleSheet.getFontSize(Utensil.stage(), "font-size");
			StyleSheet.props.defaultStageWidth = Utensil.stageWidth();
			StyleSheet.props.defaultStageHeight = Utensil.stageHeight();
		}
		var r = StyleSheet.resizeRatio();
		var fontSize = ((10 / StyleSheet.props.defaultFontSize) * 100) * r;
		fontSize = fontSize.toFixed(2);

		Utensil.stage().style.fontSize = Math.round(fontSize) + "%";
	}
};(function(window) {
	//apply localstorage
		if(!window.localStorage)window.localStorage =  null;
	//apply JSON.stringify	
		if(!window.JSON)window.JSON =  {};
	JSON.stringify = JSON.stringify || function(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			return String(obj);
		} else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t == "string")
					v = '"' + v + '"';
				else if (t == "object" && v !== null)
					v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	// implement JSON.parse de-serialization
	JSON.parse = JSON.parse || function(str) {
		if (str === "")
			str = '""';
		eval("var p=" + str + ";");
		return p;
	};

	window.removeProperty = function(obj, a) {
		if (obj.style.removeProperty) {
			obj.style.removeProperty(a);
		} else {
			obj.removeAttribute(a);
		}
	}
})(window);var Debug = {
	show : true,
	report : false,
	ERROR_PREFIX : "ERROR: ",
	ERROR_LINENUMBER : " ON LINE ",
	ERROR_URLPREFIX : " FOR ",
	ERROR_REPORT_URL : "",
	POST_URL : "url",
	POST_MSG : "msg",
	DEBUG_PREFIX : "DEBUG MESSAGE: ",
	timers:[],
	timerInterval:30,
	onError : function(message, url, linenumber) {

		if (window.console && Debug.show)
			console.log(Debug.ERROR_PREFIX + message + Debug.ERROR_LINENUMBER + linenumber + Debug.ERROR_URLPREFIX + url);
	},
	loadTime : function() {
		if (window.performance && window.performance.timing) {
			var now = new Date().getTime();
			var page_load_time = now - performance.timing.navigationStart;
			console.log(this.DEBUG_PREFIX+"Page Loading Time: " + page_load_time+" ms");
			// var perfData = window.performance.timing; 
			// var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			// console.log(this.DEBUG_PREFIX+"Total required loading time: " + pageLoadTime);
			// console.log(perfData.loadEventEnd - perfData.responseEnd);
		}
	},
	reporter : function(message, url, linenumber) {
		if (!this.report && this.ERROR_REPORT_URL == "")
			return;
		var error_url = this.ERROR_REPORT_URL;
		var msg = Debug.ERROR_PREFIX + Debug.browser() + ", " + message + Debug.ERROR_LINENUMBER + linenumber + Debug.ERROR_URLPREFIX + url;
		if(Utensil)Utensil.URLLoader.load(error_url, this.onReportComplete, "POST", "url=" + url + "&msg=" + msg);
	},
	console : {
		_console : null,
		log : function(message) {
			if (Debug.show) {
				if (Debug.console._console) {
					Debug.console._console.log(message);
				} else {

					alert(message);
				}
			}
		}
	},
	onReportComplete : function(t, x) {
		console.log(Debug.DEBUG_PREFIX+"Reporting Complete", t);
	},
	browser : function() {
		var N = navigator.appName, ua = navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && ( tem = ua.match(/version\/([\.\d]+)/i)) != null)
			M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

		return M;
	},
	start:function(id)
	{
		if(this.timers[id])
		{
			this.timers[id].start=null;
			this.timers[id].end=null;
		}
		
			this.timers[id]={start:new Date(),end:0};
		
		
	},
	stop:function(id)
	{
		if(!this.timers[id])return;
		this.timers[id].end = new Date();
		var dif = this.timers[id].end-this.timers[id].start;
		console.log(this.DEBUG_PREFIX+"Debug_Timer: "+id+" took "+(dif)+" ms");
		this.timers[id].time=0;
	},
	methodPerformance:function(obj,objectName,methodName,params)
	{
		this.start(objectName+"->"+methodName);
		obj[methodName](params);
		this.stop(objectName+"->"+methodName);
	}
	
};

window.onerror = function(message, url, linenumber) {
	Debug.reporter(message, url, linenumber);
	if (!Debug.show)
		return Utensil.Browser.isIE ? false : true;
};
if (window.console)
	Debug.console._console = window.console;
window.console = Debug.console;var Int=function(value)
{
	return parseInt(value);
};var ResourceManager = {
	assetJson : [],
	assets : null,
	copyUrl : null,
	copy : null,
	currentIndex : 0,
	currentAsset : null,
	images : [],
	totalAssets : 0,
	preloadImages:true,
	addAssets : function(value) {
		/*
		 * store assets objects into an array
		 */
	
		this.assetJson.push(value);
	},
	addCopy : function(value) {
		/*
		 * store assets objects into an array
		 */
		if( typeof (value) == "string") {
			this.copyUrl = value;
		} else {
			this.copy = value;
		}
	},
	mergeObjects : function() {
		this.assets = {};
		for(var a = 0; a < this.assetJson.length; a++) {
			for(prop in this.assetJson[a]) {
				this.assets[prop] = this.assetJson[a][prop];
			}
		}
		this.assetJson = null;
	},
	init : function() {
		this.currentIndex = 0;
		if(this.assetJson.length>0)
		{
			this.checkAssetJson(this.currentIndex);
		}else if(this.copyUrl){
			this.loadCopyFile();
		}else{
			Event.dispatch(this, Event.COMPLETE);
		}
	},
	checkAssetJson : function(index) {
		
		if(this.assetJson[index]) {
			this.currentIndex = index;
			if( typeof (this.assetJson[index]) == "string") {
				Utensil.URLLoader.load(this.assetJson[index], this.onAssetLoaded);
			} else {
				this.onAssetLoaded();
			}
		} else {
			this.assetsInitialised();
		}

	},
	assetsInitialised : function() {
		this.currentIndex = 0;
		this.mergeObjects();
		this.loadAsset();
	},
	loadAsset : function() {
		
		if(this.assets) {
			var index = 0;
			for(var prop in this.assets) {
				if(index == this.currentIndex) {
					this.currentAsset = this.assets[prop];
					this.currentAsset.name = prop;
				}
				index++;
			}
			this.totalAssets = index;

			var par = this;
				
			if(this.currentAsset != null && this.currentAsset.path != null) {
				this.currentIndex++;
				var suffixAr = this.currentAsset.path.split(".");
				var suffix = suffixAr[suffixAr.length-1];
				var isImage = (suffix.toLowerCase().indexOf("jpg") >= 0 || suffix.toLowerCase().indexOf("jpeg") >= 0 || suffix.toLowerCase().indexOf("png") >= 0 || suffix.toLowerCase().indexOf("gif") >= 0);
				if(this.preloadImages==true && isImage) {
				
					var img = new Image();
					this.images[this.currentAsset.name] = img;
					Utensil.addListener(img, "load", function() {
						par.onAssetComplete();
					});
					img.src = this.currentAsset.path;
				}else{
					par.onAssetComplete();
				}
			}
		}
	},
	onAssetComplete : function(event) {

		this.currentAsset = null;
		if(this.currentIndex >= this.totalAssets) {
			this.currentIndex = 0;
			if(this.copyUrl) {
				this.loadCopyFile();
			} else {
				Event.dispatch(this, Event.COMPLETE);
			}
		} else {
			this.loadAsset();
		}
	},
	loadCopyFile:function()
	{
		Utensil.URLLoader.load(this.copyUrl, this.onCopyLoaded);
	},
	onAssetLoaded : function(t, x) {
		if(t)
			ResourceManager.assetJson[ResourceManager.currentIndex] = eval("(" + t + ')');
		ResourceManager.currentIndex++;
		ResourceManager.checkAssetJson(ResourceManager.currentIndex);
	},
	onCopyLoaded : function(t, x) {
		
		ResourceManager.copy = eval("(" + t + ')');
		Event.dispatch(ResourceManager, Event.COMPLETE);
	},
	getAssetByName : function(value) {
		for(var prop in this.assets) {
			if(prop == value) {
				var asset = this.assets[prop];
				var suffix = asset.path.split(".")[1];
				var isImage = (suffix.toLowerCase().indexOf("jpg") >= 0 || suffix.toLowerCase().indexOf("jpeg") >= 0 || suffix.toLowerCase().indexOf("png") >= 0 || suffix.toLowerCase().indexOf("gif") >= 0);
				if(this.preloadImages==true && isImage) {
				var img = this.images[asset.name];
				return img;
				}else{
					return asset;
				} 
			}
		}
		return null;
	},
	getCopyByID : function(value) {
		if(this.copy[value])
			return this.copy[value];
	}
};var UIElement = function() {
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
		if (value != undefined && typeof (value) == "object") {
			this.layoutCollection.push(value);
		} else if (value != undefined && typeof (value) == "function") {
			for (var a = 0; a < this.layoutCollection.length; a++) {
				if (this.layoutCollection[a] instanceof value) {
					return this.layoutCollection[a];
				}
			}
		} else {

			return this.layoutCollection[this.layoutCollection.length - 1];
		}
		return null;
	}
	_.removeLayout = function(value) {
		if (value != undefined && typeof (value) == "function") {
			for (var a = 0; a < this.layoutCollection.length; a++) {
				if (this.layoutCollection[a] instanceof value) {
					delete this.layoutCollection[a];
					this.layoutCollection.splice(a,1);
				}
			}
		}
	}
	_.createHandler = function(parent, funcName) {
		var root = parent;
		parent.handlers[funcName] = function(event) {
			root[funcName](event);
		}
		return parent.handlers[funcName];
	};
	_.removeHandler = function(parent, funcName) {

		if (parent.handlers[funcName]) {
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
})();var Button = function() {

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
})();var Label = function() {
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

})();var MovieClip = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(MovieClip, UIElement);
	/*
	 * public functions
	 */
	window.frameRate = 50;
	window.frameCount = 0;
	window.clips = [];
	_.frameRate = 100;
	_.timer = null;
	_.TO = 0;
	_.FROM = 0;
	_.BG_SIZE = "bg_size";
	_.LOOP = false;
	_.img = null;

	_.cFrame = 0;

	_.attach = function(img) {
		this.img = img;
		this.img.style.position = "absolute";
		this.display.style.overflow = "hidden";
		this.addChild(img);
	};
	_.stop = function() {
		for (var a = 0; a < window.clips.length; a++) {
			if (window.clips[a] == this) {

				this.resetMC();
				window.clips.splice(a, 1);
				if (window.clips.length == 0) {
					clearInterval(window.enterFrameTimer);
					window.enterFrameTimer = null;
				}
				return;
			}
		}
	};
	_.currentFrame = function() {
		return Math.round(this.width() / this.getPos().left);
	};
	_.resetMC = function() {
		this.TO = 0;
		this.FROM = 0;
		this.LOOP = false;
	}
	_.gotoAndStop = function(frame) {
		this.stop();
		frame = frame ? frame : 0;
		this.resetMC();
		this.setFrame(frame);
	};
	_.gotoAndPlay = function(from, to, loop) {
		this.stop();
		this.TO = to;
		this.FROM = from;
		this.LOOP = loop ? loop : false;
		this.setFrame(from);
		window.clips.push(this);
		
		var root = this;
		if (!window.enterFrameTimer) {
			 window.enterFrameTimer =setInterval(window.onEnterFrame, window.frameRate);
		}
	};
	
	window.onEnterFrame = function() {
		for (var a = 0; a < window.clips.length; a++) {
				var mc = window.clips[a];
				var remainder  =( Math.round(window.frameCount * window.frameRate) % mc.frameRate)/100;
			if (remainder==0) {

				var to = mc.TO;
				var from = mc.FROM;
				
				var loop = mc.LOOP;
				var current = mc.cFrame;
				current++;

				if (current <= to || String(loop) == "true") {
					mc.setFrame(current, String(loop) == "true" ? from : null,to);
				} else {
					window.clips.splice(a, 1);
					mc.resetMC();
					if (window.clips.length == 0) {
						clearInterval(window.enterFrameTimer);
						window.enterFrameTimer = null;
					}
				}
			}

		}

		window.frameCount++;
		if (window.frameCount >= 1000) {
			window.frameCount = 0;
		}
	};
	_.setFrame = function(frame, loop,to) {
		
		var bgWidth = this.img.width;
		// var size = eval("(" + obj + ')');
		// var width = this.getStyle(this.img, "width");

		var left = (this.width() * frame);

		if (left > bgWidth|| loop != null && to!=null && to <frame) {
			if (loop != null) {
				frame = loop;
			} else {
				frame = Math.round(bgWidth / this.width());
			}
			left =  (this.width() * frame);
		} else {

		}
		
		var top = this.getPos().top;
		this.img.style.top = top + "px";
		this.img.style.left = "-" + left + "px ";
		this.cFrame = frame;
	};
	_.getPos = function() {

		var y = this.img.style.top;

		var x = this.img.style.left;
		if (y) {
			y = this.replaceSuffix(y);
		} else {
			y = "0";
		}
		if (x) {
			x = this.replaceSuffix(x);
		} else {
			x = "0";
		}

		return {
			left : x,
			top : y
		};
	};
	_.replaceSuffix = function(value) {
		value = value.replace("%", "");
		value = value.replace("px", "");
		return value;
	};
	_.getBGSize = function() {
		var imageSrc = this.getStyle("backgroundImage");
		imageSrc = imageSrc.replace("url(", "");
		imageSrc = imageSrc.replace(")", "");
		imageSrc = imageSrc.replace('"', "");
		imageSrc = imageSrc.replace('"', "");

		var image = new Image();
		image.src = imageSrc;
		var width = image.width, height = image.height;
		image = null;
		return {
			width : width,
			height : height
		};
	};
	_.topPosition = function(value) {
		if (value == undefined) {
			return this.getPos().top;
		} else {
			this.img.style.top = value + "px";
		}
	};
	_.getStyle = function(cssprop) {
		if (this.img.currentStyle)//IE
			return this.img.currentStyle[cssprop] ? this.img.currentStyle[cssprop].replace("px", "") : "";
		else if (document.defaultView && document.defaultView.getComputedStyle)//Firefox
			return document.defaultView.getComputedStyle(this.img, "")[cssprop].replace("px", "");
		else//try and get inline style
			return this.img.style[cssprop].replace("px", "");
	};
})();var Sprite = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Sprite, UIElement);
	/*
	 * public functions
	 */
	_.isGradient = false;
	_.htcURL ="lib/com/fahimchowdhury/PIE.htc";
	_.lineStyle=function(thickness,color)
	{
		var t=thickness!=undefined?thickness:1;
		var c=color!=undefined?color:"#000";
		this.display.style.border="solid "+t+"px "+c;
		delete t;
		delete c;
	};
	_.beginGradientFill=function(type,colors,alpha)
	{
		this.isGradient=true;
		this.display.style.background = colors[0];
		this.display.style.background = '-webkit-gradient(linear, left top, left bottom, from('+colors[0]+'), to('+colors[1]+'))';
		this.display.style.background = '-moz-linear-gradient(top,  '+colors[0]+',  '+colors[0]+')';
		this.display.style['filter'] = "progid:DXImageTransform.Microsoft.gradient(startColorstr='"+colors[0]+"', endColorstr='"+colors[1]+"',GradientType=0);";
	};
	_.drawRect=function(x,y,w,h,c,z)
	{
		this.x(x);
		this.y(y);
		this.width(w);
		this.height(h);
		this.setColor(c);
	};
	_.drawRoundRect= function(x,y,w,h,rad,c)
	{
		
		this.x(x);
		this.y(y);
		this.width(w);
		this.height(h);
		this.setColor(c);
		this.setCorners(rad);
		
	};
	_.drawCircle= function(x,y,rad,c)
	{
		
		this.x(x);
		this.y(y);
		this.width(rad*2);
		this.height(rad*2);
		this.setColor(c);
		this.setCorners(rad);
		
	};
	_.setColor=function(c)
	{
		if(c && !this.isGradient)this.display.style.backgroundColor = c;
	};
	_.setCorners=function(rad)
	{
		this.display.style.behavior= 'url('+this.htcURL+')';
		this.display.style.webkitBorderRadius = rad+"px";
		this.display.style.MozBorderRadius = rad+"px";
		this.display.style['-moz-border-radius']=rad+"px";
		this.display.style.borderRadius =rad+"px";
		this.display.style['border-radius']=rad+'px '+rad+'px '+rad+'px '+rad+'px'; 
	};
})();var IIterator = {
	reset : function() {
	},
	next : function() {
	},
	hasNext : function() {
	},
	index : function() {
	},
	purge : function() {
	},
	length : function() {
	}
};
var ArrayIterator =function(collection){
	this._index = 0;
	this._collection=collection;
	this.reset =function()
	{
		this._index = 0;
	};
	this.next =function()
	{
		return this._collection[this._index++];
	};
	this.hasNext =function()
	{
		return this._index < this._collection.length;
	};
	this.length =function()
	{
		return this._collection.length;
	};
	this.index =function()
	{
		return this._index;
	};
	this.purge =function()
	{
		delete this._collection;
	};
	
	
};
Class.implement(ArrayIterator,IIterator);var GridLayout = function() {
	this.arrange = function(e) {
		var obj = e.wrapper?e.wrapper:e.childContainer;
		var currentX = this.left;
		var currentY = this.top;
		var col = 0;
		var row = 0;
		var maxWidth = parseInt(e.width() - this.right);
		this.clearGrid(obj);
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			if(child.className.indexOf("scroll")<0 && child.className.indexOf("mcontentwrapper")<0)
			{
				
			var x = parseInt(child.style.left.replace("px", "") ? child.style.left.replace("px", "") : 0);
			var y = parseInt(child.style.top.replace("px", "") ? child.style.top.replace("px", "") : 0);

			if(count > 0) {

				if(currentX + parseInt(child.clientWidth) >= maxWidth) {
					row++;
					col = 0;
					currentX = this.left;
				}
			}
			if(row > 0) {
				var data = this.getChildHeight(obj, row - 1, col);
				;
				currentY = parseInt(data.y) + parseInt(data.height)+ parseInt(this.verticalGap);
			}
			child.style.top = parseInt(currentY) + "px";
			child.style.left = parseInt(currentX) + "px";
			child.setAttribute("gridCol", col);
			child.setAttribute("gridRow", row);
			currentX += parseInt(child.clientWidth) + parseInt(this.horizontalGap);
			col++;
			}
		}
	}
	this.getChildHeight = function(obj, r, c) {
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			if(parseInt(child.getAttribute("gridCol")) == c && parseInt(child.getAttribute("gridRow")) == r) {
				return {
					height : child.clientHeight,
					y : parseInt(child.style.top.replace("px", "") ? child.style.top.replace("px", "") : 0)
				};
			}
		}
	}
	this.clearGrid = function(obj) {
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			child.setAttribute("gridCol", "");
			child.setAttribute("gridRow", "");
		}
	}
};
Class.extend(GridLayout, Layout);var HorizontalLayout = function() {
	this.arrange = function(e) {
		var obj = e.childContainer;
		var currentX = 0;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			child.style.left = currentX + "px";
			var w = child.clientWidth;
			if(w == 0)
				w = child.style.width.replace("px", "");
			currentX += parseInt(w) + this.horizontalGap;
		}
	}
};
Class.extend(HorizontalLayout, Layout);var PaddedLayout = function() {
	this.arrange = function(e) {
		var obj = e.childContainer;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			var x = parseInt(child.style.left.replace("px", "") ? child.style.left.replace("px", "") : 0);
			var y = parseInt(child.style.top.replace("px", "") ? child.style.top.replace("px", "") : 0);
			child.style.top = parseInt(y + this.top) + "px";
			child.style.left = parseInt(x + this.left) + "px";

		}
	}
};
Class.extend(PaddedLayout, Layout);﻿var ScrollLayout = function() {

	this.arrange = function(e) {
		if (!window.scrollerIndex)
			window.scrollerIndex = 0;

		if (!this.trackId)
			this.trackId += window.scrollerIndex;
		if (!this.holderId)
			this.holderId += window.scrollerIndex;
		if (!this.thumbId)
			this.thumbId += window.scrollerIndex;
		if (!this.thumbId)
			window.scrollerIndex++;

		this.e = e;
		var c = e.childContainer;
		e.height(this.scrollHeight);
		this.maxHeight = e.childContainer.clientHeight;
		//
		for (var count = 0; count < e.childContainer.childNodes.length; count++) {
			var child = e.childContainer.childNodes[count];
			var y = child.style.top ? child.style.top.replace("px", "") : 0;
			var h = child.clientHeight;

			var max = parseInt(y) + parseInt(h);
			if (max > this.maxHeight) {
				this.maxHeight = max;
			}

		}
		if (this.maxHeight > this.scrollHeight) {
			this.childHeight(e.childContainer, this.maxHeight);
			this.removeScroller();
			this.createScrollbar(e);
			e.width(e.width() - this.track.clientWidth);
			this.childX(this.track, parseInt(e.width()));
		} else {

			var tw = this.removeScroller();
			e.width(e.width() + tw);
		}
	}
	this.createScrollbar = function(e) {
		if (!e)
			return;
		var c = e.childContainer;
		if (!this.holder) {
			this.holder = document.createElement("div");
			this.holder.id = this.holderId;
			this.holder.style.overflow = "hidden";
			this.holder.style.position = "relative";
			//this.resetStyle(this.holder);
			this.childHeight(this.holder, this.scrollHeight);
			e.display.removeChild(c);
			this.holder.appendChild(c);
			e.display.appendChild(this.holder);
		}
		if (!this.track) {
			this.track = document.createElement("div");
			this.track.id = this.trackId;
			this.resetStyle(this.track);
			this.track.className = this.trackStyle;
			this.childHeight(this.track, this.scrollHeight);
			e.addUIChild(this.track);
			this.childX(this.track, parseInt(e.width()));
			this.childWidth(c, parseInt(e.width()) - ( parseInt(this.horizontalGap)));
			this.childWidth(this.holder, parseInt(e.width()) - (parseInt(this.horizontalGap)));

		}
		if (!this.thumb) {
			this.thumb = document.createElement("div");
			this.thumb.id = this.thumbId;
			this.resetStyle(this.thumb);
			this.thumb.className = this.thumbStyle;
			this.thumb.style.cursor = "pointer";
			var thumbHeight = this.scrollHeight / this.maxHeight;
			this.childHeight(this.thumb, thumbHeight * this.scrollHeight);
			this.track.appendChild(this.thumb);

			var root = this;
			this.onMouseDownHandler = function(e) {
				root.onMouseDown(e);
			}
			this.onScrollWheelHandler = function(e) {
				root.onScrollWheel(e);
			}
			Utensil.addListener(this.thumb, "mousedown", this.onMouseDownHandler);
			this.addEvent(e.display, "mousewheel", this.onScrollWheelHandler);
		}
	}
	this.removeScroller = function() {
		var c = this.e.childContainer;
		var w = 0;
		if (this.track) {
			w = this.track.clientWidth;
			if (document.getElementById(this.trackId))
				document.getElementById(this.trackId).parentNode.removeChild(this.track);
			this.track = null;

		}

		if (this.thumb) {
			if (document.getElementById(this.thumbId))
				document.getElementById(this.thumbId).parentNode.removeChild(this.thumb);
			Utensil.removeListener(this.thumb, "mousedown", this.onMouseDownHandler);
			this.thumb = null;

			if (this.holder) {
				if (document.getElementById(this.holderId)) {
					this.e.display.removeChild(this.holder);
					this.holder.removeChild(c);
				}
				this.e.display.appendChild(c);
				this.holder = null;
			}

		}
		this.removeEvent(this.e.display, "mousewheel", this.onScrollWheelHandler);
		this.reset();
		return w;
	}
	this.reset = function() {
		this.e.childContainer.style.top = "0px";
	}
	this.onScrollWheel = function(e) {
		e = e ? e : window.event;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
		this.startY = (parseInt(this.childY(this.thumb)) + Number(wheelData));
		this.onMouseMove(e, parseInt(this.childY(this.thumb)) - Number(wheelData * 10));
	}
	this.onMouseDown = function(e) {
		this.startX = Utensil.mouseX(document.body, e);
		this.startY = Utensil.mouseY(document.body, e) - this.childY(this.thumb);
		var root = this;
		this.onMouseMoveHandler = function(e) {
			root.onMouseMove(e);
		}
		this.onMouseUpHandler = function(e) {
			root.onMouseUp(e);
		}
		Utensil.addListener(document, "mousemove", this.onMouseMoveHandler);
		Utensil.addListener(document, "mouseup", this.onMouseUpHandler);
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}
	this.onMouseMove = function(e, data) {
		var y = data != undefined ? data : (Utensil.mouseY(document.body, e) - this.startY);
		var p = 0;
		if (y <= 0)
			y = 0;

		if (Number(y) + parseInt(this.thumb.clientHeight) >= this.scrollHeight) {
			y = this.scrollHeight - parseInt(this.thumb.clientHeight);
			p = this.paddingBottom;

		}

		this.childY(this.thumb, y);
		var thumbHeight = this.maxHeight / this.scrollHeight;
		this.e.childContainer.style.top = -(parseInt(this.childY(this.thumb) * thumbHeight) + p) + "px";
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}
	this.onMouseUp = function(e) {
		Utensil.removeListener(document, "mousemove", this.onMouseMoveHandler);
		Utensil.removeListener(document, "mouseup", this.onMouseUpHandler);
	}
	this.childX = function(div, xx) {
		if (xx == undefined) {
			return div.style.left ? div.style.left.replace("px", "") : 0;
		} else {
			div.style.left = xx + "px";
		}
	};
	this.childY = function(div, y) {
		if (y == undefined) {
			return div.style.top ? div.style.top.replace("px", "") : 0;
		} else {
			div.style.top = y + "px";
		}
	};
	this.childWidth = function(div, value) {
		if (value == undefined) {
			return div.style.width ? div.style.width.replace("px", "") : 0;
		} else {
			div.style.width = value + "px";
		}
	};
	this.childHeight = function(div, value) {
		if (value == undefined) {
			return div.style.height ? div.style.height.replace("px", "") : 0;
		} else {
			div.style.height = value + "px";
		}
	}
	this.resetStyle = function(elem) {
		elem.style.position = "absolute";
		elem.style.top = "0px";
	}
	this.addEvent = function(element, eventName, callback) {
		if ( typeof (element) == "string")
			element = document.getElementById(element);
		if (element == null)
			return;
		if (element.addEventListener) {
			if (eventName == 'mousewheel')
				eventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
			element.addEventListener(eventName, callback, false);

		} else if (element.attachEvent)
			element.attachEvent("on" + eventName, callback);
	}
	this.removeEvent = function(element, eventName, callback) {
		if ( typeof (element) == "string")
			element = document.getElementById(element);
		if (element == null)
			return;
		if (element.removeEventListener) {
			if (eventName == 'mousewheel')
				eventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
			element.removeEventListener(eventName, callback, false);

		} else if (element.detachEvent)
			element.detachEvent("on" + eventName, callback);
	}
};
Class.extend(ScrollLayout, Layout);
var _ = ScrollLayout.prototype;
_.track
_.thumb
_.holder
_.scrollHeight = 10;
_.paddingBottom = 10;
_.trackStyle = "scrollTrack";
_.thumbStyle = "scrollThumb";
_.holderId = "scrollHolder";
_.trackId = "scrollTrack";
_.thumbId = "scrollThumb";
_.e
_.startX
_.startY
_.maxHeight = 0;var VerticalLayout = function() {
	this.arrange = function(e) {
		var obj = e.childContainer;
		var currentY = 0;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			child.style.top = currentY + "px";
			var h = child.clientHeight;
			if(h == 0)
				h = child.style.height.replace("px", "");
			currentY += parseInt(h) + this.verticalGap;
		}
	}
};
Class.extend(VerticalLayout, Layout);var IModel = {
	set : function(name, value) {
	},
	get : function(name) {

	},
	remove : function(name) {

	}
};
var Model = function(data) {
	this.set = function(name, value) {
		this[name] = value;
	};
	this.get = function(name) {
		if (this[name]!=undefined) {
			return this[name];
		}
		return null;
	};
	this.remove = function(name) {
		if (this[name])
			delete this[name];
	};
	if(data)
	{
		for(var n in data)
		{
			this.set(n,data[n]);
		}
	};
};
Class.implement(Model, IModel);var ContextMenu = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(ContextMenu, UIElement);
	/*
	 * public functions
	 */
	_.state = "hidden";
	_.f12State = "enabled";
	_.customItems = [];
	_.build = function() {
		Class._super(this, "build");
		this.width(170);
		this.height(18);

		Utensil.addListener(document, "contextmenu", this.createHandler(this, "onRightClick"));

		this.layout(new VerticalLayout());
		this.layout().verticalGap = 5;

		this.layout(new PaddedLayout());
		this.layout().top = 10;
		this.layout().bottom = 0;

		this.addItems();

		this.setStyle();

	};
	_.addItems = function() {
		for (var a = 0; a < this.customItems.length; a++) {
			if (this.customItems[a].separatorBefore)
				this.customItems[a].display.style.borderTop = "1px solid #e9e9e9";
			if (this.customItems[a].separatorAfter)
				this.customItems[a].display.style.borderBottom = "1px solid #e9e9e9";
			this.addChild(this.customItems[a]);
		}
	};
	_.onRightClick = function(event) {
		if (this.state != "showing") {
			document.body.appendChild(this.display);
			this.x(Utensil.mouseX(document.body, event));
			this.y(Utensil.mouseY(document.body, event));
			this.arrange();
			this.state = "showing";
			Utensil.addListener(document, "click", this.createHandler(this, "onDOMClick"));
		}
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}

		return false;
	};
	_.onDOMClick = function(event) {
		//console.log("onDOMClick");
		document.body.removeChild(this.display);
		this.state = "hidden";
		Utensil.removeListener(document, "click", this.handlers["onDOMClick"]);
		this.removeHandler(this, "onDOMClick")
	};
	_.setStyle = function() {
		Class._super(this, "setStyle");
		this.display.style.backgroundColor = "#fff";
		this.display.style.border = "1px solid #bababa";
		this.display.style["-moz-box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";
		this.display.style["-webkit-box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";
		this.display.style["box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";

	};
	_.disableF12 = function(value) {
		if (!value)
			return this.f12State;
		this.f12State = value;
		if (this.f12State) {
			Utensil.addListener(document, "keydown", this.onF12KeyPress);
		} else {
			Utensil.removeListener(document, "keydown", this.onF12KeyPress);
		}
	};
	_.onF12KeyPress = function(event) {
		
		event = (event || window.event);
		if (event.keyCode == 123) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}

			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
			return false;
		}
	};
	_.arrange = function() {
		this.height((this.customItems.length * 25) + this.layout().top + this.layout().bottom);
		Class._super(this, "arrange");
	};
})();var ContextMenuItem = function(value, func) {
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
	};
	_.mouseOut = function(event) {
		this.display.style.backgroundColor = "transparent";
	};
	_.setStyle = function() {
		this.display.style.fontFamily = "Arial, Helvetica, sans-serif";
		this.display.style.fontSize = "11px";
		this.display.style.textAlign = "center";
		this.display.style.paddingTop = "2px";
		this.width(170);
		this.height(15);
	};
})();