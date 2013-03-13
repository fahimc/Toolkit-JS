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
}/* @class Utensil
 * @desc JavaScript Toolkit
 */
window.Utensil = {
	/* @method
	 * @desc create a document element
	 * @return Null
	 */
	createElement : function(value) {
		return document.createElement(value);
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

		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	},
	/* @method
	 * @desc will return the height of the window.
	 * @return Number
	 */
	stageHeight : function() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	},
	/* @method
	 * @desc Provide it with an element and it will return the X position.
	 * @return Number
	 */
	getX : function(obj, raw) {
		if(raw) {
			var curleft = 0;
			var curtop = 0;
			if(obj.offsetParent) {
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
		if(raw) {
			var curtop = 0;
			if(obj.offsetParent) {
				do {
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
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
		for(var i in arguments) {
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
		if (e.touches) {
			if (e.touches[0] && e.touches[0].pageX)
				return e.touches[0].pageX;
		}
		var x;
		if(e.pageX) {
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
		if (e.touches) {
			if (e.touches[0] && e.touches[0].pageY)
				return e.touches[0].pageY;
		}
		var y;
		if(e.pageY) {
			y = e.pageY;
		} else {
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

		}
		y -= elem.offsetTop;
		return y;
	},
	mouseLeave : function(e) {

		if(!e)
			var e = window.event;
		var tg = (window.event) ? e.srcElement : e.target;
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		while(reltg != tg && reltg.nodeName != 'BODY')
		reltg = reltg.parentNode
		if(reltg == tg)
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
		image.onload = function() { callback(image);
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
			if(window.XMLHttpRequest) {
				this.xhttp = new XMLHttpRequest();
			} else// IE 5/6
			{
				this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			if(!method)
				method = "GET";
			if(method == "GET" && params) {
				url += "?" + params;

			}
			var par = this;
			this.xhttp.onreadystatechange = function() {
				par.onStatus()
			};
			this.xhttp.open(method, url, true);
			if(method == "POST") {
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
			if(this.xhttp.readyState == 4) {
				if(this.xhttp.status == 200 || window.location.href.indexOf("http") == -1) {
					this.cb(this.xhttp.responseText, this.xhttp.responseXML);

				} else {
					//trace("error 1")
				}
			} else {
				//trace("error 2")
			}
		}
	},
	tweener : {
		index : 0,
		rotate : function(props, value) {
			if(Utensil.getTransformProperty() != "ie") {
				props.transform += " rotate(" + value + "deg)";
			}
		},
		scale : function(props, value) {
			if(Utensil.getTransformProperty() != "ie") {
				props.transform += " scale(" + value + ")";
			}
		},
		transition : function(props, prop, value) {
			if(Utensil.getTransformProperty() != "ie") {
				switch(prop) {
					case "left":
						props.transform += " translateX(" + value + ") ";
						break;
					case "top":
						props.transform += " translateY(" + value + ") ";
						break;
					case "rotateY":
						props.transform += " rotateY(" + value + "deg) ";
						props.transition += Utensil.getTransformProperty() + "transform-style: preserve-3d; ";
						break;
					default:
						props.transition += prop + ":" + value + ";";
				}

			}
		},
		tranisitionEndList : {
			'transition' : 'transitionEnd',
			'OTransition' : 'oTransitionEnd',
			'MSTransition' : 'msTransitionEnd',
			'MozTransition' : 'transitionend',
			'WebkitTransition' : 'webkitTransitionEnd'
		},
		TransitionEnd : function() {
			var t;
			var el = document.createElement('fakeelement');
			for(t in this.tranisitionEndList) {
				if(el.style[t] !== undefined) {
					return this.tranisitionEndList[t];
				}
			}
			el = null;
			t = null;
		}
	},
	/* @method
	 * @desc animates an elements property.
	 * @return Null
	 */
	tween : function(obj, duration, args, type, callback, delay) {

		if(this.getTransformProperty() != "ie") {
			if(!duration)
				duration = 1;
			if(!type)
				type = "linear";
			if(!delay) {
				delay = "0s";

			} else {
				delay += "s";
			}
			var props = {
				transform : "",
				transition : "",
				filter : ""

			};
			for(var prop in args) {
				if(this.tweener[prop]) {
					this.tweener[prop](props, args[prop]);
				} else {

					this.tweener.transition(props, prop, args[prop]);

				}
			}

			this.addListener(obj, this.tweener.TransitionEnd(), innerCallback, false);

			var index = this.tweener.index++;
			var style = document.createElement('style');
			style.type = 'text/css';
			style.id = "utensil-animate-" + index;
			style.innerHTML = ".utensil-animate-" + index + "{";

			style.innerHTML += props.transition;
			if(props.transform != "")
				style.innerHTML += this.getTransformProperty() + "transform: " + props.transform + "; ";
			style.innerHTML += this.getTransformProperty() + "transition: all" + " " + duration + "s " + type + " " + delay + "; ";
			style.innerHTML += "}";
			document.getElementsByTagName('head')[0].appendChild(style);
			obj.className += " utensil-animate-" + index;
		} else {
			this.tweenIE(obj, duration, args, type, callback, delay);
			//style.innerHTML += "filter: " + props.filter + "; ";
		}

		function innerCallback() {
			//document.getElementsByTagName('head')[0].removeChild(style);
			//obj.className=obj.className.replace("utensil-animate-" + index,"");
			style = null;
			index = null;
			props = null;
			Utensil.removeListener(obj, Utensil.tweener.TransitionEnd(), innerCallback, false);
			if(callback)
				callback();
		}

	},
	tweenIE : function(obj, duration, args, type, callback, delay) {
	},
	/* @method
	 * @desc Returns the CSS transform prefix
	 * @return String
	 */
	getTransformProperty : function(element) {
		// Note that in some versions of IE9 it is critical that
		// msTransform appear in this list before MozTransform
		var properties = ['transition', 'WebkitTransition', 'msTransition', 'MozTransition', 'OTransition'];
		var p;
		while( p = properties.shift()) {

			if( typeof document.body.style[p] != 'undefined') {
				switch(p) {
					case 'transition':
						p = "";
						break;
					case 'WebkitTransition':
						p = "-webkit-";
						break;
					case 'MozTransition':
						p = "-moz-";
						break;
					case 'OTransition':
						p = "-o-";
						break;
					case 'msTransition':
						p = "-ms-";
						break;
					default:
						p = "ie";
				}
				return p;
			}
		}
		return "ie";
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
			if(navigator.appName == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if(re.exec(ua) != null)
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
		if(obj.attachEvent) {
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
		if(obj.detachEvent) {
			obj.detachEvent("on" + event, callback);
		} else {
			obj.removeEventListener(event, callback);
		}
	},
	/* @method
	 * @desc Add packages to the Utensil framework.
	 * @return Null
	 */
	addPackage : function(packages, packageName) {
		var parent = this;
		if(packageName && !this[packageName]) {
			this[packageName] = {};
			parent = this[packageName];
		}
		for(var keys in packages) {
			var obj = packages[keys];
			parent[keys] = obj;
		}
	}
};
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
};var Int=function(value)
{
	return parseInt(value);
}
var Layout = function() {
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
var GridLayout = function() {
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
Class.extend(GridLayout, Layout);
var ScrollLayout = function() {

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
_.maxHeight = 0;
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
		this.rotateObj(this.display,deg);
	},
	rotateObj:function(obj,deg)
	{
		deg_str = deg + "";
		rotate_transform = "rotate(" + deg + "deg)";
		matrix_str = this.degreeToIEMatrix(deg);
		filter_str = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " + matrix_str + ")";

		obj.style["rotation"] = deg_str + "deg";
		obj.style["-ms-transform"] =rotate_transform;
		obj.style.MozTransform = rotate_transform;
		obj.style.OTransform = rotate_transform;
		obj.style.WebkitTransform = rotate_transform;
		if(Utensil.Browser.isIE && Utensil.Browser.getInternetExplorerVersion()<9)
		{
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
	
})(); var Label = function() {
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
})();
var Sprite = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Sprite, UIElement);
	/*
	 * public functions
	 */
	_.isGradient = false;
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
		this.display.style.behavior= 'url(lib/com/wezside/component/border-radius.htc)';
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
		frame = frame ? frame : 0;
		this.resetMC();
		this.setFrame(frame);
	};
	_.gotoAndPlay = function(from, to, loop) {
		this.TO = to;
		this.FROM = from;
		this.LOOP = loop ? loop : false;
		this.setFrame(from);
		window.clips.push(this);
		var root = this;
		if (!window.enterFrameTimer) {
			this.timer = setInterval(function() {
				window.onEnterFrame();
			}, window.frameRate);
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
					mc.setFrame(current, String(loop) == "true" ? from : null);
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
	_.setFrame = function(frame, loop) {

		var bgWidth = this.img.width;
		// var size = eval("(" + obj + ')');
		// var width = this.getStyle(this.img, "width");

		var left = (this.width() * frame);

		if (left > bgWidth) {
			if (loop != null) {
				frame = loop;
			} else {
				frame = Math.round(bgWidth / this.width());
			}
			left = loop != null ? loop : (bgWidth / this.width() ) * frame;
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
var Engine = function() {
	this.event = {
		READY : "ENGINE_READY"
	};
	 this.prop = {
		width : 0,
		height : 0,
		grid : false,
		cellSize : 10,
		gridCellIndex : 0,
		gridCellId : "cell-",
		occupiedXY : [],
		ignoreCells : [],
		layer : {
			bgId : "engineBGLayer",
			character : "engineCharacterLayer",
			front : "engineFrontLayer"
		},
		container : null
	};
	this.holder = null;
	this.container = function(id) {
		if (id == undefined) {
			var c;
			if (!this.prop.container) {
				c = document.body;
			} else {
				c = document.getElementById(this.prop.container);
			}
			return c;
		}
		this.prop.container = id;
	}
	this.showGrid = function(value) {
		if (value == undefined) {
			return this.prop.grid;
		} else {
			this.prop.grid = value;
		}
	};
	this.init = function() {
		this.createGrid();
		this.astar.parent = this;
	};
	this.createGrid = function() {
		
		this.holder = new UIElement();
		this.holder.build();
		this.holder.width(this.width());
		this.holder.height(this.height());
		this.holder.setStyle();

		var cols = parseInt(this.width() / this.cellSize());
		var rows = parseInt(this.height() / this.cellSize());
		this.astar.rows = rows;
		this.astar.cols = cols;
		var currentRow = 0;
		var currentCol = 0;
		var end = false;
		var sp;
		
			
		while (!end) {
			if (!this.astar.grid[currentRow])
				this.astar.grid[currentRow] = [];
			this.astar.setCell(currentRow, currentCol, false);
			
			if (this.prop.grid)
			{
				sp = new Sprite();
				sp.build();
				sp.lineStyle();
				sp.drawRect(currentCol * this.cellSize(), currentRow * this.cellSize(), this.cellSize(), this.cellSize(), null);
				sp.setStyle();
				this.holder.addChild(sp);
				sp.arrange();
				sp.display.id = this.prop.gridCellId + currentCol + "_" + currentRow;
			}
			
			this.prop.gridCellIndex++;
			currentCol++;
			if (currentCol >= cols) {
				currentRow++;
				currentCol = 0;
			}
			if (currentRow >= rows) {
				end = true;

			}
		}
		this.holder.arrange();

		this.createLayers();

		this.container().appendChild(this.holder.display);
		//Event.dispatch(this, this.event.READY);
	};

	this.createLayers = function() {
		var layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.bgId;
		this.holder.addChild(layer);

		layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.character;
		this.holder.addChild(layer);

		layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.front;
		this.holder.addChild(layer);

	};
	this.addToBackgroundLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.bgId);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.addToCharacterLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.character);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.addToFrontLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.front);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.setCell = function(x, y, color) {

		var id = this.prop.gridCellId + x + "_" + y;
		var cell = document.getElementById(id);
		if (!cell)
			return;
		cell.style.backgroundColor = color ? color : "#f00";
	};
	this.ignoreBlocks = function(obj, y) {
		var startX = this.getXCell(y == undefined ? obj.x() : obj);
		var startY = this.getYCell(y == undefined ? obj.y() : y);
		var endX = this.getXCell(y == undefined ? (Int(obj.x()) + Int(obj.width())) : obj);
		var endY = this.getYCell(y == undefined ? (Int(obj.y()) + Int(obj.height())) : y);
		var end = false;
		var cX = startX;
		while (!end) {
			this.setIgnoreXY(cX, startY);

			cX++;
			if (cX >= endX) {
				cX = startX;
				startY++;
			}
			if (startY >= endY)
				end = true;
		}
	};
	this.addObstacle = function(obj, y) {
		var startX = this.getXCell(y == undefined ? obj.x() : obj);
		var startY = this.getYCell(y == undefined ? obj.y() : y);
		var endX = this.getXCell(y == undefined ? (Int(obj.x()) + Int(obj.width())) : obj);
		var endY = this.getYCell(y == undefined ? (Int(obj.y()) + Int(obj.height())) : y);
		// this.astar.setblock({
		// x : startX,
		// y : startY
		// }, {
		// x : endX,
		// y : endY
		// }, true, this.astar);
		
		var a = startX;
		var b = startY;
		while (a < endX) {
			while (b < endY) {
				
				this.setOccupiedXY(a, b);
				this.astar.setCell(b, a, true);
				b++;
			}
			b=startY;
			a++;
		

	}
	delete a;
	delete b;
	delete startX;
	delete startY;
	delete endX;
	delete endY;
};
this.setOccupiedXY = function(x, y) {
	if (!this.prop.occupiedXY[x])
		this.prop.occupiedXY[x] = [];
	this.prop.occupiedXY[x][y] = x + "," + y;
};
this.setIgnoreXY = function(x, y) {
	if (!this.prop.ignoreCells[x])
		this.prop.ignoreCells[x] = [];
	this.prop.ignoreCells[x][y] = x + "," + y;
};
this.getOccupiedXY = function(x, y) {
	var startX;
	var startY;
	if (x.x) {
		startX = this.getXCell(x.x());
		startY = this.getYCell(x.y());
		var endX = this.getXCell(Int(x.x()) + Int(x.width()));
		var endY = this.getYCell(Int(x.y()) + Int(x.height()));
		var cX = startX;
		var occupied = false;
		var end = false;
		while (!end) {
			if (this.prop.occupiedXY[cX] && this.prop.occupiedXY[cX][startY])
				occupied = true;
			cX++;
			if (cX >= endX) {
				cX = startX;
				startY++;
			}
			if (startY > endY)
				end = true;
		}
		if (occupied)
			return true;
	} else {
		startX = this.getXCell(x);
		startY = this.getYCell(y);
		if (this.prop.occupiedXY[startX] && this.prop.occupiedXY[startX][startY])
			return true;
	}

	return false;
};
this.findPathTo = function(obj, x, y) {
	var startX = this.getXCell(obj.x());
	var startY = this.getYCell(obj.y());
	var endX = this.getXCell(x);
	var endY = this.getYCell(y);
	this.setCell(startX, startY, "purple");
	this.setCell(endX, endY, "yellow");
	return this.astar.search(startX, startY, endX, endY);

	// this.drawPath(paths);
};
this.drawPath = function(paths) {
	if (!this.prop.grid)
		return;
	for (var a = 0; a < paths.length; a++) {
		this.setCell(paths[a][0], paths[a][0], "#00f");
	}
}
this.getXCell = function(x) {
	return Math.floor(x / this.cellSize());
};
this.getYCell = function(y) {
	return Math.floor(y / this.cellSize());
};
this.cellSize = function(value) {
	if (value == undefined) {
		return this.prop.cellSize;
	} else {
		this.prop.cellSize = value;
	}
};
this.width = function(value) {
	if (value == undefined) {
		return this.prop.width;
	} else {
		this.prop.width = value;
	}
};
this.height = function(value) {
	if (value == undefined) {
		return this.prop.height;
	} else {
		this.prop.height = value;
	}
};
this.astar = {
	//http://en.literateprograms.org/A*_search_(JavaScript)
	grid : [],
	opened : [],
	start : null,
	target : null,
	parent : null,
	last : null,
	rows : 0,
	cols : 0,
	pos : function(x, y) {
		this.x = x;
		this.y = y;
		this.cost = 0;
		this.totalcost = 0;
		this.blocked = false;
		this.closed = false;
		this.prev = null;

		this.str = function() {
			return this.x + "," + this.y;
		}
		this.equal = function(p) {
			return this.x == p.x && this.y == p.y;
		}
	},
	opencell : function(p, cost, prev) {

		if (!p || p.blocked)
			return null;

		if (prev && prev.prev && !prev.equal(this.start)) {
			if (p.x - prev.x != prev.x - prev.prev.x || p.y - prev.y != prev.y - prev.prev.y)
				cost += 4;
		}

		var totalcost = parseFloat(cost) + 14 * (Math.abs(p.x - this.target.x) + Math.abs(p.y - this.target.y));
		/* If position is already considered: check for better cost */
		if (p.totalcost != 0) {
			if (totalcost < p.totalcost) {
				var nn;
				for ( nn = 0; nn < this.opened.length; ++nn) {
					if (p.equal(this.opened[nn])) {
						this.opened.splice(nn, 1);
						break;
					}
				}
			} else
				return null;
		}

		p.cost = cost;
		p.prev = prev;
		p.totalcost = totalcost;

		var n = 0;
		for ( n = 0; n < this.opened.length; ++n) {
			if (p.totalcost < this.opened[n].totalcost) {
				this.opened.splice(n, 0, p);
				break;
			}
		}
		if (n >= this.opened.length)
			this.opened[n] = p;
		if (!this.grid[p.y])
			return null;
		this.grid[p.y][p.x] = p;
		this.last = p;
		//if(!p.equal(this.start)) this.parent.setCell(p.x,p.y);

		return p;
	},
	openadjacent : function(p) {
		var cost = this.grid[p.y][p.x].cost + 10;
		if (p.x > 0)
			this.opencell(this.grid[p.y][p.x - 1], cost, p);
		if (p.y > 0)
			this.opencell(this.grid[p.y-1][p.x], cost, p);
		if (p.y < (this.rows - 1))
			this.opencell(this.grid[p.y-(-1)][p.x], cost, p);
		if (p.x < (this.cols - 1))
			this.opencell(this.grid[p.y][p.x - (-1)], cost, p);
	},
	search : function(sx, sy, tx, ty) {

		var best;
		var n = 0;
		this.setstart(new this.pos(sx, sy));
		this.settarget(new this.pos(tx, ty));

		//var chb = document.getElementById("chb_paintopen");
		//paint_open = chb.checked;

		best = this.opencell(this.start, 0, this.start);
		while (best && !best.equal(this.target)) {
			best.closed = true;
			this.opened.shift();
			this.openadjacent(best);

			if (this.opened.length > 0)
				best = this.opened[0];
			else
				best = null;

			if (++n > 10000) {
				best = null;
				break;
			}	/* Catch non-stop loops (should never happen) */
		}

		if (!best) {
			//console.log("No route found");
			return;
		}
		var posArray = [];
		/* Find way back */
		while (!best.equal(this.start)) {
			posArray.push({
				x : best.x * this.parent.cellSize(),
				y : best.y * this.parent.cellSize()
			});
			this.parent.setCell(best.x, best.y, "#00f");

			best = best.prev;
			if (!best) {
				//console.log("Something strange happend");
				/* Should never happen */
				break;
			}
		}
		if (posArray)
			posArray.reverse();
		return posArray;
	},
	setCell : function(y, x, blocked) {
		if (!this.grid[y])
			return;
		this.grid[y][x] = {};
		this.grid[y][x].cost = 0;
		this.grid[y][x].totalcost = 0;
		this.grid[y][x].prev = null;
		this.grid[y][x].closed = false;
		this.grid[y][x].blocked = blocked ? true : false;
		this.grid[y][x].x = x;
		this.grid[y][x].y = y;
		this.grid[y][x].str = function() {
			return this.x + "," + this.y;
		}
		this.grid[y][x].equal = function(p) {
			return this.x == p.x && this.y == p.y;
		}
		if (blocked)
			this.parent.setCell(x, y, "#f00");
	},
	setblock : function(p1, p2, block, parent) {

		for (var y = p1.y; y <= p2.y; ++y) {
			for (var x = p1.x; x <= p2.x; ++x) {
				if (!parent.grid[y] || !parent.grid[y][x])
					return;
				if (block) {

					//setcolor(this.grid[y][x], blocked_color);
					parent.parent.setCell(x, y, "#f00");
					parent.grid[y][x].blocked = true;
				} else {
					//setcolor(this.grid[y][x], nothing_color);
					parent.parent.setCell(x, y);
					parent.grid[y][x].blocked = false;
				}
			}
		}
	},
	wipe : function() {
		var y, x;
		if (!this.parent || !this.start)
			return;
		this.opened = [];

		for ( y = 0; y < this.rows; ++y) {
			for ( x = 0; x < this.cols; ++x) {
				this.grid[y][x].cost = 0;
				this.grid[y][x].totalcost = 0;
				this.grid[y][x].prev = null;
				this.grid[y][x].closed = false;

				if (this.grid[y][x].blocked)
					this.parent.setCell(x, y, "#f00");
				
else
					this.parent.setCell(x, y, "#fff");
			}
		}

		this.parent.setCell(this.start.x, this.start.y, "none");
		this.parent.setCell(this.target.x, this.target.y, "none");
	},
	setstart : function(p) {
		if (this.start) {
			//settext(start, "");
			this.parent.setCell(p.x, p.y, "yellow");
		}
		this.start = p;
		// settext(start, "S");
		// setcolor(start, start_color);
		this.parent.setCell(p.x, p.y, "purple");
	},
	settarget : function(p) {
		if (this.target) {
			// settext(target, "");
			this.parent.setCell(p.x, p.y, "yellow");
		}
		this.target = p;
		// settext(target, "T");
		// setcolor(target, target_color);
		this.parent.setCell(p.x, p.y, "yellow");
	}
}

};
var IIterator = {
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
}
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
Class.implement(ArrayIterator,IIterator);
var Collection = function(arr) {
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

}