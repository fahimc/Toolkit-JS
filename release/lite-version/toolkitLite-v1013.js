var Class = {
	/* @method
	 * @desc call this super class. Provide the object and the function as String.
	 * @return Null
	 * */
	_super : function(obj, name) {
		obj.baseConstructor[name].call(obj);
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
			stageWidth : function() {

				return this.stage() == window ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) : this.stage().clientWidth;
			},
			/* @method
			 * @desc will return the height of the window.
			 * @return Number
			 */
			stageHeight : function() {
				return this.stage() == window ? (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) : this.stage().clientHeight;
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
	}(window));
var Event =
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
}
var ResourceManager = {
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
		this.checkAssetJson(this.currentIndex);
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
				Utensil.URLLoader.load(this.copyUrl, this.onCopyLoaded);
			} else {
				Event.dispatch(this, Event.COMPLETE);
			}
		} else {
			this.loadAsset();
		}
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
};

var VerticalLayout = function() {
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
Class.extend(VerticalLayout, Layout);

var HorizontalLayout = function() {
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
Class.extend(HorizontalLayout, Layout);

var PaddedLayout = function() {
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
Class.extend(PaddedLayout, Layout);
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
})();
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
	_.htcURL ="lib/com/fahimchowdhury/border-radius.htc";
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
})();
var MovieClip = function() {
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
})();
