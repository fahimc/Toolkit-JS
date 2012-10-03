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
			if(obj.offsetParent)
				while(1) {
					curtop += obj.style.top;
					if(!obj.offsetParent)
						break;
					obj = obj.offsetParent;
				}
			else if(obj.y)
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
	dispatch : function(obj,type, target) {
		var numOfListeners = 0;
		var event = {
			type : type,
			target : target
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i = 0; i < numOfArgs; i++) {
			args.push(arguments[i]);
		};
		args = args.length > 2 ? args.splice(2, args.length - 1) : [];
		args = [event].concat(args);
		if( typeof obj.listeners[type] != "undefined") {
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
		if(typeof(value) == "string")
		{
			this.copyUrl=value;
		}else{
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
		this.currentIndex=0;
		this.checkAssetJson(this.currentIndex);
	},
	checkAssetJson:function(index)
	{
			if(this.assetJson[index])
			{
				this.currentIndex = index;
				if(typeof(this.assetJson[index]) == "string")
				{
					Utensil.URLLoader.load(this.assetJson[index],this.onAssetLoaded);
				}else{
					this.onAssetLoaded();
				}
			}else{
				this.assetsInitialised();
			}
				
			
		
	},
	assetsInitialised:function()
	{
		this.currentIndex=0;
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
			if(this.currentAsset != null) {
				this.currentIndex++;
				var img = new Image();
				this.images[this.currentAsset.name] = img;
				Utensil.addListener(img, "load", function() {
					par.onAssetComplete()
				});
				img.src = this.currentAsset.path;
			}
		}
	},
	onAssetComplete : function(event) {

		this.currentAsset = null;
		if(this.currentIndex >= this.totalAssets) {
			this.currentIndex = 0;
			if(this.copyUrl)
			{
				Utensil.URLLoader.load(this.copyUrl,this.onCopyLoaded);
			}else{
			Event.dispatch(this, Event.COMPLETE);				
			}
		} else {
			this.loadAsset();
		}
	},
	onAssetLoaded:function(t,x)
	{
		if(t)ResourceManager.assetJson[ResourceManager.currentIndex]= eval("(" + t + ')');
		ResourceManager.currentIndex++;
		ResourceManager.checkAssetJson(ResourceManager.currentIndex);
	},
	onCopyLoaded:function(t,x)
	{

		ResourceManager.copy = eval("(" + t + ')');
		Event.dispatch(ResourceManager, Event.COMPLETE);
	},
	getAssetByName : function(value) {
		for(var prop in this.assets) {
			if(prop == value) {
				var asset = this.assets[prop];
				var img = this.images[asset.name];
				// var div= document.createElement("div");
				// div.style.background ="url("+img.src+") no-repeat";
				// if(asset.x)div.style.backgroundPositionX = "-"+asset.x+"px";
				// if(asset.y)div.style.backgroundPositionY = "-"+asset.y+"px";
				// if(asset.width)
				// {
					// div.style.width = asset.width+"px";
				// }else{
					// div.style.width =img.width+"px";
				// }
				// if(asset.height)
				// {
					// div.style.height= asset.height+"px";
				// }else{
					// div.style.height =img.height+"px";
				// }
				// return div;
				return img;
			}
		}
		return null;
	},
	getCopyByID:function(value)
	{
		if(this.copy[value])return this.copy[value];
	}
};
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
	this.verticalClassName = function(value) {
		uiscroller.className.verticalPrefix = value;
	}
	this.horizontalClassName = function(value) {
		uiscroller.className.horizontalPrefix = value;
	}
	this.arrange = function(e) {

		var obj = e.childContainer;
		obj.style.overflow = "hidden";
		obj.style.width = e.width() + "px";
		obj.style.height = e.height() + "px";

		var maxHeight = obj.clientHeight;
		var container = e.wrapper ? e.wrapper : obj;
		for (var count = 0; count < container.childNodes.length; count++) {
			var child = container.childNodes[count];
			if (child.className.indexOf("scroll") < 0 && child.className.indexOf(uiscroller.className.mcontentwrapper) < 0) {
				var y = child.style.top ? child.style.top.replace("px", "") : 0;
				var h = child.clientHeight;

				var max = parseInt(y) + parseInt(h);
				if (max > maxHeight) {
					maxHeight = max;
				}
			}
		}
		obj.setAttribute("maxHeight", maxHeight);
		if (!obj.scrollbar)
			uiscroller.scrollbarMain(e, obj);
		obj.scrollbar.updateScrollBars();

	}
};
Class.extend(ScrollLayout, Layout);

var uiscroller = {
	uiScrollerlist : [],
	className : {
		verticalPrefix : "vscroller",
		track : "base",
		thumb : "bar",
		horizontalPrefix : "hscroller",
		mcontentwrapper : "mcontentwrapper"
	},
	scrollbarInit : function() {
		if (document.getElementById) {
			document.write('<style type="text/css">.scrollbar-hide-default {overflow: hidden !important;}</style>')
		};
		this.addTrggr(window, 'load', this.globalInit)
	},
	scrollbarMain : function(displayObject, g) {
		var h = document, wD = window, nV = navigator;
		if (g == null || nV.userAgent.indexOf('OmniWeb') != -1 || ((nV.userAgent.indexOf('AppleWebKit') != -1 || nV.userAgent.indexOf('Safari') != -1) && !( typeof (HTMLElement) != "undefined" && HTMLElement.prototype)) || nV.vendor == 'KDE' || (nV.platform.indexOf('Mac') != -1 && nV.userAgent.indexOf('MSIE') != -1)) {
			if (g != null)
				classChange(g, 'scrollbar-failed', 'scrollbar-hide-default');
			if (window.onscrollbarFail)
				window.onscrollbarFail(g);
			return
		};
		if (g.scrollbar) {
			g.scrollbar.updateScrollBars();
			return
		};
		if (uiscroller.checkHidden(g))
			return;
		if (!g.id || g.id == '') {
			var k = "uiScroller__", c = 1;
			while (document.getElementById(k + c) != null) {
				c++
			};
			g.id = k + c
		}
		g.uiScrollerdata = new Object();
		g.scrollbar = new Object();
		var l = g.id, sC = g.uiScrollerdata, sfU = g.scrollbar;
		sC.keyAct = {
			_37 : ['-1s', 0],
			_38 : [0, '-1s'],
			_39 : ['1s', 0],
			_40 : [0, '1s'],
			_33 : [0, '-1p'],
			_34 : [0, '1p'],
			_36 : [0, '-100p'],
			_35 : [0, '+100p']
		};
		sC.wheelAct = ["-2s", "2s"];
		sC.baseAct = ["-2s", "2s"];
		sC.scrollPosition = [[false, false], [false, false]];
		var m = createDiv('contentwrapper', true), mDv = createDiv('mcontentwrapper', true), tDv = createDiv('scrollwrapper', true), pDv = createDiv('copyholder', true);
		displayObject.wrapper = m;
		var o = createDiv('domfixdiv', true), fDv = createDiv('zoomdetectdiv', true), stdMode = false;
		pDv.sY.border = '1px solid blue';
		pDv.fHide();
		g.style.overflow = 'hidden';
		fDv.sY.fontSize = "12px";
		fDv.sY.height = "1em";
		fDv.sY.width = "1em";
		fDv.sY.position = "absolute";
		fDv.sY.zIndex = "-999";
		fDv.fHide();
		var p = g.offsetHeight, brdWidth = g.offsetWidth;
		copyStyles(g, pDv, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
		var q = g.offsetHeight, intlWidth = g.offsetWidth, brdWidthLoss = brdWidth - intlWidth, brdHeightLoss = p - q;
		var s = (g.scrollTop) ? g.scrollTop : 0, oScrollX = (g.scrollLeft) ? g.scrollLeft : 0;
		var t = document.location.href, uReg = /#([^#.]*)$/;
		var u = ['textarea', 'input', 'select'];
		sC.scroller = [];
		sC.forcedBar = [];
		sC.containerSize = sC.cntRSize = [];
		sC.contentSize = sC.cntSize = [];
		sC.edge = [false, false];
		sC.touchPrevent = false;
		sC.touchFlick = false;
		sC.reqS = [];
		sC.barSpace = [0, 0];
		sC.forcedHide = [];
		sC.forcedPos = [];
		sC.paddings = [];
		sC.externaL = [false, false];
		sC.touchPos = [0, 0];
		while (g.firstChild) {
			m.appendChild(g.firstChild)
		};
		m.appendChild(o);
		g.appendChild(mDv);
		g.appendChild(pDv);
		var w = getStyle(g, 'position');
		if (w != 'absolute' && w != 'fixed') {
			g.style.position = w = "relative"
		};
		if (w == 'fixed')
			g.style.position = "absolute";
		var x = getStyle(g, 'text-align');
		g.style.textAlign = 'left';
		mDv.sY.width = "100px";
		mDv.sY.height = "100px";
		mDv.sY.top = "0px";
		mDv.sY.left = "0px";
		copyStyles(g, pDv, "0px", ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
		var y = g.offsetWidth, postHeight = g.offsetHeight, mHeight;
		mHeight = mDv.offsetHeight;
		mDv.sY.borderBottom = "2px solid black";
		if (mDv.offsetHeight > mHeight)
			stdMode = true;
		mDv.sY.borderBottomWidth = "0px";
		copyStyles(pDv, g, false, ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
		findPos(mDv);
		findPos(g);
		sC.paddings[0] = mDv.yPos - g.yPos;
		sC.paddings[2] = mDv.xPos - g.xPos;
		g.style.paddingTop = getStyle(g, "padding-bottom");
		g.style.paddingLeft = getStyle(g, "padding-right");
		findPos(mDv);
		findPos(g);
		sC.paddings[1] = mDv.yPos - g.yPos;
		sC.paddings[3] = mDv.xPos - g.xPos;
		g.style.paddingTop = getStyle(pDv, "padding-top");
		g.style.paddingLeft = getStyle(pDv, "padding-left");
		var z = sC.paddings[2] + sC.paddings[3], padHeightComp = sC.paddings[0] + sC.paddings[1];
		g.style.position = w;
		mDv.style.textAlign = x;
		copyStyles(g, mDv, false, ['padding-left', 'padding-right', 'padding-top', 'padding-bottom']);
		tDv.sY.width = g.offsetWidth + 'px';
		tDv.sY.height = g.offsetHeight + 'px';
		mDv.sY.width = y + 'px';
		mDv.sY.height = postHeight + 'px';
		tDv.sY.position = 'absolute';
		tDv.sY.top = '0px';
		tDv.sY.left = '0px';
		sC.tDivZ = tDv.sY.zIndex;
		mDv.appendChild(m);
		g.appendChild(tDv);
		tDv.appendChild(fDv);
		m.sY.position = 'relative';
		mDv.sY.position = 'relative';
		m.sY.top = "0";
		m.sY.width = "100%";
		mDv.sY.overflow = 'hidden';
		mDv.sY.left = "-" + sC.paddings[2] + "px";
		mDv.sY.top = "-" + sC.paddings[0] + "px";
		sC.zTHeight = fDv.offsetHeight;
		sC.getContentWidth = function() {
			var a = m.childNodes, maxCWidth = compPad = 0;
			for (var i = 0; i < a.length; i++) {
				if (a[i].offsetWidth) {
					maxCWidth = Math.max(a[i].offsetWidth, maxCWidth)
				}
			};
			sC.cntRSize[0] = ((sC.reqS[1] && !sC.forcedHide[1]) || sC.forcedBar[1]) ? g.offsetWidth - sC.barSpace[0] : g.offsetWidth;
			sC.cntSize[0] = maxCWidth + z;
			return sC.cntSize[0]
		};
		sC.getContentHeight = function() {
			sC.cntRSize[1] = ((sC.reqS[0] && !sC.forcedHide[0]) || sC.forcedBar[0]) ? g.offsetHeight - sC.barSpace[1] : g.offsetHeight;
			sC.cntSize[1] = (g.getAttribute("maxHeight")) - 2;

			return sC.cntSize[1];
		};
		sC.fixIEDispBug = function() {
			m.sY.display = 'none';
			m.sY.display = 'block'
		};
		sC.setWidth = function() {
			mDv.sY.width = (stdMode) ? (sC.cntRSize[0] - z - brdWidthLoss) + 'px' : sC.cntRSize[0] + 'px'
		};
		sC.setHeight = function() {
			mDv.sY.height = (stdMode) ? (sC.cntRSize[1] - padHeightComp - brdHeightLoss) + 'px' : sC.cntRSize[1] + 'px'
		};
		sC.createScrollBars = function() {
			sC.getContentWidth();
			sC.getContentHeight();
			tDv.vrt = new Array();
			var a = tDv.vrt;
			createScrollBars(a, uiscroller.className.verticalPrefix, 1);
			a.barPadding = [parseInt(getStyle(a.sBr, 'padding-top')), parseInt(getStyle(a.sBr, 'padding-bottom'))];
			a.sBr.sY.padding = '0px';
			a.sBr.curPos = 0;
			a.sBr.vertical = true;
			a.sBr.indx = 1;
			m.vBar = a.sBr;
			prepareScroll(a, 0);
			sC.barSpace[0] = (sC.externaL[1]) ? 0 : a.sDv.offsetWidth;
			sC.setWidth();
			tDv.hrz = new Array();
			var b = tDv.hrz;
			createScrollBars(b, uiscroller.className.horizontalPrefix, 0);
			b.barPadding = [parseInt(getStyle(b.sBr, 'padding-left')), parseInt(getStyle(b.sBr, 'padding-right'))];
			b.sBr.sY.padding = '0px';
			b.sBr.curPos = 0;
			b.sBr.vertical = false;
			b.sBr.indx = 0;
			m.hBar = b.sBr;
			if (wD.opera)
				b.sBr.sY.position = 'relative';
			prepareScroll(b, 0);
			sC.barSpace[1] = (sC.externaL[0]) ? 0 : b.sDv.offsetHeight;
			sC.setHeight();
			tDv.sY.height = g.offsetHeight + 'px';
			b.jBox = createDiv('scrollerjogbox');
			tDv.appendChild(b.jBox);
			b.jBox.onmousedown = function() {
				b.sBr.scrollBoth = true;
				sC.goScroll = b.sBr;
				b.sBr.clicked = true;
				b.sBr.moved = false;
				tDv.vrt.sBr.moved = false;
				uiscroller.addTrggr(h, 'selectstart', retFalse);
				uiscroller.addTrggr(h, 'mousemove', mMoveBar);
				uiscroller.addTrggr(h, 'mouseup', mMouseUp);
				return false
			}
		};
		sC.goScroll = null;
		sC.createScrollBars();
		this.putAway(o, tDv);
		if (!this.addChckTrggr(g, 'mousewheel', mWheelProc) || !this.addChckTrggr(g, 'DOMMouseScroll', mWheelProc)) {
			g.onmousewheel = mWheelProc
		};
		this.addChckTrggr(g, 'mousewheel', mWheelProc);
		this.addChckTrggr(g, 'DOMMouseScroll', mWheelProc);
		this.addChckTrggr(m, 'touchstart', handleTouch);
		this.addChckTrggr(tDv, 'touchstart', handleTouch);
		g.setAttribute('tabIndex', '0');
		this.addTrggr(g, 'keydown', function(e) {
			if (g.focusProtect)
				return;
			if (!e) {
				var e = wD.event
			};
			var a = e.keyCode;
			sC.pkeY = a;
			sfU.mDPosFix();
			if (sC.keyAct['_' + a] && !window.opera) {
				sfU.setScrollPos(sC.keyAct['_'+a][0], sC.keyAct['_'+a][1], true);
				if (e.preventDefault)
					e.preventDefault();
				return false
			}
		});
		this.addTrggr(g, 'keypress', function(e) {
			if (g.focusProtect)
				return;
			if (!e) {
				var e = wD.event
			};
			var a = e.keyCode;
			if (sC.keyAct['_' + a]) {
				sfU.setScrollPos(sC.keyAct['_'+a][0], sC.keyAct['_'+a][1], true);
				if (e.preventDefault)
					e.preventDefault();
				return false
			}
		});
		this.addTrggr(g, 'keyup', function() {
			sC.pkeY = false
		});
		this.addTrggr(h, 'mouseup', intClear);
		this.addTrggr(g, 'mousedown', handleTextSelect);
		function handleTextSelect(e) {
			if (!e)
				e = wD.event;
			var a = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
			if (!a || (a.className && a.className.match(RegExp("\\bscrollgeneric\\b"))))
				return;
			sC.inMposX = e.clientX;
			sC.inMposY = e.clientY;
			pageScrolled();
			findPos(g);
			intClear();
			uiscroller.addTrggr(h, 'mousemove', tSelectMouse);
			sC.mTBox = [g.xPos + 10, g.xPos + sC.cntRSize[0] - 10, g.yPos + 10, g.yPos + sC.cntRSize[1] - 10]
		};
		function tSelectMouse(e) {
			if (!e)
				e = wD.event;
			var a = e.clientX, mY = e.clientY, mdX = a + sC.xScrld, mdY = mY + sC.yScrld;
			sC.mOnXEdge = (mdX < sC.mTBox[0] || mdX > sC.mTBox[1]) ? 1 : 0;
			sC.mOnYEdge = (mdY < sC.mTBox[2] || mdY > sC.mTBox[3]) ? 1 : 0;
			sC.xAw = a - sC.inMposX;
			sC.yAw = mY - sC.inMposY;
			sC.sXdir = (sC.xAw > 40) ? 1 : (sC.xAw < -40) ? -1 : 0;
			sC.sYdir = (sC.yAw > 40) ? 1 : (sC.yAw < -40) ? -1 : 0;
			if ((sC.sXdir != 0 || sC.sYdir != 0) && !sC.tSelectFunc)
				sC.tSelectFunc = wD.setInterval(function() {
					if (sC.sXdir == 0 && sC.sYdir == 0) {
						wD.clearInterval(sC.tSelectFunc);
						sC.tSelectFunc = false;
						return
					};
					pageScrolled();
					if (sC.mOnXEdge == 1 || sC.mOnYEdge == 1)
						sfU.setScrollPos((sC.sXdir * sC.mOnXEdge) + "s", (sC.sYdir * sC.mOnYEdge) + "s", true)
				}, 45)
		};
		function intClear() {
			uiscroller.remTrggr(h, 'mousemove', tSelectMouse);
			if (sC.tSelectFunc)
				wD.clearInterval(sC.tSelectFunc);
			sC.tSelectFunc = false;
			if (sC.barClickRetard)
				wD.clearTimeout(sC.barClickRetard);
			if (sC.barClickScroll)
				wD.clearInterval(sC.barClickScroll)
		};
		function flickClear(a) {
			if (sC.touchFlick) {
				window.clearInterval(sC.touchFlick);
				sC.touchFlick = false
			}
			if (!a)
				tDv.sY.zIndex = sC.tDivZ
		};
		function pageScrolled() {
			sC.xScrld = (wD.pageXOffset) ? wD.pageXOffset : (h.documentElement && h.documentElement.scrollLeft) ? h.documentElement.scrollLeft : 0;
			sC.yScrld = (wD.pageYOffset) ? wD.pageYOffset : (h.documentElement && h.documentElement.scrollTop) ? h.documentElement.scrollTop : 0
		};
		sfU.formUpdate = function() {
			for (var j = 0, inputName; inputName = u[j]; j++) {
				var a = g.getElementsByTagName(inputName);
				for (var i = 0, formItem; formItem = a[i]; i++) {
					if (!formItem.uiScrollerprocess) {
						uiscroller.addTrggr(formItem, 'focus', function() {
							g.focusProtect = true
						});
						uiscroller.addTrggr(formItem, 'blur', onblur = function() {
							g.focusProtect = false
						});
						formItem.uiScrollerprocess = true
					}
				}
			}
		};
		g.scrollUpdate = sfU.updateScrollBars = function(a) {
			if (tDv.getSize[1]() === 0 || tDv.getSize[0]() === 0)
				return;
			m.sY.padding = '1px';
			var b = sC.reqS[0], reqV = sC.reqS[1], vBr = tDv.vrt, hBr = tDv.hrz, vUpReq, hUpReq, cPSize = [];
			tDv.sY.width = g.offsetWidth - brdWidthLoss + 'px';
			tDv.sY.height = g.offsetHeight - brdHeightLoss + 'px';
			cPSize[0] = sC.cntRSize[0];
			cPSize[1] = sC.cntRSize[1];
			sC.reqS[0] = sC.getContentWidth() > sC.cntRSize[0];
			sC.reqS[1] = sC.getContentHeight() > sC.cntRSize[1];
			var c = (b != sC.reqS[0] || reqV != sC.reqS[1] || cPSize[0] != sC.cntRSize[0] || cPSize[1] != sC.cntRSize[1]) ? true : false;

			vBr.sDv.setVisibility(sC.reqS[1]);

			hBr.sDv.setVisibility(sC.reqS[0]);
			vUpReq = (sC.reqS[1] || sC.forcedBar[1]);
			hUpReq = (sC.reqS[0] || sC.forcedBar[0]);
			sC.getContentWidth();
			sC.getContentHeight();
			sC.setHeight();
			sC.setWidth();
			if (!sC.reqS[0] || !sC.reqS[1] || sC.forcedHide[0] || sC.forcedHide[1])
				hBr.jBox.fHide();
			else
				hBr.jBox.fShow();
			if (vUpReq)
				updateScroll(vBr, (hUpReq && !sC.forcedHide[0]) ? sC.barSpace[1] : 0);
			else
				m.sY.top = "0";
			if (hUpReq)
				updateScroll(hBr, (vUpReq && !sC.forcedHide[1]) ? sC.barSpace[0] : 0);
			else
				m.sY.left = "0";
			if (c && !a)
				sfU.updateScrollBars(true);
			m.sY.padding = '0px';
			sC.edge[0] = sC.edge[1] = false
		};
		g.contentScroll = sfU.setScrollPos = function(a, b, c, d) {
			var e;
			if ((a || a === 0) && sC.scroller[0]) {
				a = calcCScrollVal(a, 0);
				e = tDv.hrz.sBr;
				e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - a), 0) : -a;
				e.realScrollPos()
			}
			if ((b || b === 0) && sC.scroller[1]) {
				b = calcCScrollVal(b, 1);
				e = tDv.vrt.sBr;
				e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - b), 0) : -b;
				e.realScrollPos()
			}
			if (!c)
				sC.edge[0] = sC.edge[1] = false;
			if (g.onscrollbar && !d)
				g.onscrollbar();
			return sC.scrollPosition
		};
		sfU.scrollContent = function(a, b) {
			return sfU.setScrollPos(a, b, true)
		};
		sfU.scrollToElement = function(a) {
			if (a == null || !isddvChild(a))
				return;
			var b = findRCpos(a);
			sfU.setScrollPos(b[0] + sC.paddings[2], b[1] + sC.paddings[0], false);
			sfU.setScrollPos(0, 0, true)
		};
		copyStyles(pDv, g, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
		this.putAway(pDv, tDv);
		g.scrollTop = 0;
		g.scrollLeft = 0;
		sfU.formUpdate();
		this.uiScrollerlist[this.uiScrollerlist.length] = g;
		classChange(g, 'scrollbaractive', false);
		sfU.updateScrollBars();
		sfU.setScrollPos(oScrollX, s, true);
		if (t.match(uReg)) {
			sfU.scrollToElement(h.getElementById(t.match(uReg)[1]))
		};
		sC.sizeChangeDetect = wD.setInterval(function() {
			var n = fDv.offsetHeight;
			if (n != sC.zTHeight) {
				sfU.updateScrollBars();
				sC.zTHeight = n
			}
		}, 2500);
		function calcCScrollVal(v, i) {
			var a = v.toString();
			v = parseFloat(a);
			return parseInt((a.match(/p$/)) ? v * sC.cntRSize[i] * 0.9 : (a.match(/s$/)) ? v * sC.cntRSize[i] * 0.1 : v)
		};
		function getStyle(a, b) {
			return uiscroller.getStyle(a, b)
		};
		function copyStyles(a, b, c, d) {
			var e = new Array();
			for (var i = 0; i < d.length; i++) {
				e[i] = uiscroller.camelConv(d[i]);
				b.style[e[i]] = getStyle(a, d[i], e[i]);
				if (c)
					a.style[e[i]] = c
			}
		};
		function createDiv(b, c, d, e) {
			var f = (d) ? d : h.createElement('div');
			if (!d) {
				f.id = l + '_' + b;
				f.className = (c) ? b : b + ' scrollgeneric'
			};
			f.getSize = [
			function() {
				return f.offsetWidth
			},
			function() {
				return f.offsetHeight
			}];
			f.setSize = (e) ? [retFalse, retFalse] : [
			function(a) {
				f.sY.width = a
			},
			function(a) {
				f.sY.height = a
			}];
			f.getPos = [
			function() {
				return getStyle(f, "left")
			},
			function() {
				return getStyle(f, "top")
			}];
			f.setPos = (e) ? [retFalse, retFalse] : [
			function(a) {
				f.sY.left = a
			},
			function(a) {
				f.sY.top = a
			}];
			f.fHide = function() {
				f.sY.visibility = "hidden"
			};
			f.fShow = function(a) {
				f.sY.visibility = (a) ? getStyle(a, 'visibility') : "visible"
			};
			f.sY = f.style;
			return f
		};
		function createScrollBars(a, b, c) {
			var d = document.getElementById(l + '-scrollbar-' + b);
			var e = (d != null) ? true : false;
			if (e) {
				a.sDv = createDiv(false, false, d, true);
				sC.externaL[c] = true;
				a.sFDv = createDiv(b + 'basebeg');
				a.sSDv = createDiv(b + 'baseend');
				a.sBr = createDiv(false, false, uiscroller.getByClassName(d,'div','scrollbar-scrollbar')[0]);
				a.sFBr = createDiv(b + 'barbeg');
				a.sSBr = createDiv(b + 'barend')
			} else {
				a.sDv = createDiv(b + uiscroller.className.track);
				a.sFDv = createDiv(b + 'basebeg');
				a.sSDv = createDiv(b + 'baseend');
				a.sBr = createDiv(b + uiscroller.className.thumb);
				a.sFBr = createDiv(b + 'barbeg');
				a.sSBr = createDiv(b + 'barend');
				tDv.appendChild(a.sDv);
				a.sDv.appendChild(a.sBr);
				a.sDv.appendChild(a.sFDv);
				a.sDv.appendChild(a.sSDv);
				a.sBr.appendChild(a.sFBr);
				a.sBr.appendChild(a.sSBr)
			}
		};
		function prepareScroll(b, c) {
			var d = b.sDv, sBr = b.sBr, i = sBr.indx;
			sBr.trgtScrll = 0;
			sBr.minPos = b.barPadding[0];
			sBr.ofstParent = d;
			sBr.mDv = mDv;
			sBr.scrlTrgt = m;
			sBr.targetSkew = 0;
			updateScroll(b, c, true);
			sBr.doBarPos = function(a) {
				if (!a)
					sBr.curPos = parseInt((sBr.trgtScrll * sBr.maxPos) / sBr.mxScroll);
				sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
				sBr.setPos[i](sBr.curPos + sBr.minPos + "px");
				if (!sBr.targetSkew)
					sBr.targetSkew = sBr.trgtScrll - parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
				sBr.targetSkew = (sBr.curPos == 0) ? 0 : (sBr.curPos == sBr.maxPos) ? 0 : (!sBr.targetSkew) ? 0 : sBr.targetSkew;
				if (a) {
					sBr.trgtScrll = parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
					m.setPos[i](sBr.trgtScrll + sBr.targetSkew + "px");
					sC.scrollPosition[i] = [-sBr.trgtScrll - sBr.targetSkew, -sBr.mxScroll]
				}
			};
			sBr.realScrollPos = function() {
				sBr.curPos = parseInt((sBr.trgtScrll * sBr.sRange) / sBr.mxScroll);
				sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
				m.setPos[i](sBr.trgtScrll + "px");
				sC.scrollPosition[i] = [-sBr.trgtScrll, -sBr.mxScroll];
				sBr.targetSkew = false;
				sBr.doBarPos(false)
			};
			sC.barZ = getStyle(sBr, 'z-index');
			sBr.sY.zIndex = (sC.barZ == "auto" || sC.barZ == "0" || sC.barZ == 'normal') ? 2 : sC.barZ;
			mDv.sY.zIndex = getStyle(sBr, 'z-index');
			sBr.onmousedown = function() {
				sBr.clicked = true;
				sC.goScroll = sBr;
				sBr.scrollBoth = false;
				sBr.moved = false;
				uiscroller.addTrggr(h, 'selectstart', retFalse);
				uiscroller.addTrggr(h, 'mousemove', mMoveBar);
				uiscroller.addTrggr(h, 'mouseup', mMouseUp);
				return false
			};
			sBr.onmouseover = intClear;
			d.onmousedown = d.ondblclick = function(e) {
				if (!e) {
					var e = wD.event
				};
				if (e.target && (e.target == b.sFBr || e.target == b.sSBr || e.target == b.sBr))
					return;
				if (e.srcElement && (e.srcElement == b.sFBr || e.srcElement == b.sSBr || e.srcElement == b.sBr))
					return;
				var a, mV = [];
				pageScrolled();
				sfU.mDPosFix();
				findPos(sBr);
				a = (sBr.vertical) ? e.clientY + sC.yScrld - sBr.yPos : e.clientX + sC.xScrld - sBr.xPos;
				mV[sBr.indx] = (a < 0) ? sC.baseAct[0] : sC.baseAct[1];
				mV[1 - sBr.indx] = 0;
				sfU.setScrollPos(mV[0], mV[1], true);
				if (e.type != "dblclick") {
					intClear();
					sC.barClickRetard = wD.setTimeout(function() {
						sC.barClickScroll = wD.setInterval(function() {
							sfU.setScrollPos(mV[0], mV[1], true)
						}, 80)
					}, 425)
				};
				return false
			};
			d.setVisibility = function(r) {
				if (r) {
					d.fShow(g);
					sC.forcedHide[i] = (getStyle(d, "visibility") == "hidden" || sC.externaL[i]) ? true : false;
					if (!sC.forcedHide[i])
						sBr.fShow(g);
					else if (!sC.externaL[i])
						sBr.fHide();
					sC.scroller[i] = true;
					classChange(d, "", "uiScrollerinactive")
				} else {
					d.fHide();
					sBr.fHide();
					sC.forcedBar[i] = (getStyle(d, "visibility") != "hidden") ? true : false;
					sC.scroller[i] = false;
					sBr.curPos = 0;
					m.setPos[i]('0px');
					sC.scrollPosition[i] = [false, false];
					classChange(d, "uiScrollerinactive", "")
				};
				mDv.setPos[1-i]((sC.forcedPos[i] && (r || sC.forcedBar[i]) && !sC.forcedHide[i]) ? sC.barSpace[1 - i] - sC.paddings[i * 2] + "px" : "-" + sC.paddings[i * 2] + "px")
			};
			d.onmouseclick = retFalse
		};
		function updateScroll(a, b, c) {
			var d = a.sDv, sBr = a.sBr, sFDv = a.sFDv, sFBr = a.sFBr, sSDv = a.sSDv, sSBr = a.sSBr, i = sBr.indx;
			d.setSize[i](tDv.getSize[i]() - b + 'px');
			d.setPos[1-i](tDv.getSize[1-i]() - d.getSize[1-i]() + 'px');
			sC.forcedPos[i] = (parseInt(d.getPos[1-i]()) === 0) ? true : false;
			a.padLoss = a.barPadding[0] + a.barPadding[1];
			a.baseProp = parseInt((d.getSize[i]() - a.padLoss) * 0.75);
			sBr.aSize = Math.min(Math.max(Math.min(parseInt(sC.cntRSize[i] / sC.cntSize[i] * d.getSize[i]()), a.baseProp), 45), a.baseProp);
			sBr.setSize[i](sBr.aSize + 'px');
			sBr.maxPos = d.getSize[i]() - sBr.getSize[i]() - a.padLoss;
			sBr.curPos = Math.min(Math.max(0, sBr.curPos), sBr.maxPos);
			sBr.setPos[i](sBr.curPos + sBr.minPos + 'px');
			sBr.mxScroll = mDv.getSize[i]() - sC.cntSize[i];
			sBr.sRange = sBr.maxPos;
			sFDv.setSize[i](d.getSize[i]() - sSDv.getSize[i]() + 'px');
			sFBr.setSize[i](sBr.getSize[i]() - sSBr.getSize[i]() + 'px');
			sSBr.setPos[i](sBr.getSize[i]() - sSBr.getSize[i]() + 'px');
			sSDv.setPos[i](d.getSize[i]() - sSDv.getSize[i]() + 'px');
			if (!c)
				sBr.realScrollPos();
			sC.fixIEDispBug()
		};
		sfU.mDPosFix = function() {
			mDv.scrollTop = 0;
			mDv.scrollLeft = 0;
			g.scrollTop = 0;
			g.scrollLeft = 0
		};
		this.addTrggr(wD, 'load', function() {
			if (g.scrollbar)
				sfU.updateScrollBars()
		});
		this.addTrggr(wD, 'resize', function() {
			if (g.refreshTimeout)
				wD.clearTimeout(g.refreshTimeout);
			g.refreshTimeout = wD.setTimeout(function() {
				if (g.scrollbar)
					sfU.updateScrollBars()
			}, 80)
		});
		function retFalse() {
			return false
		};
		function mMoveBar(e) {
			if (!e) {
				var e = wD.event
			};
			var a = sC.goScroll, movBr, maxx, xScroll, yScroll;
			if (a == null)
				return;
			if (!uiscroller.w3events && !e.button)
				mMouseUp();
			maxx = (a.scrollBoth) ? 2 : 1;
			for (var i = 0; i < maxx; i++) {
				movBr = (i == 1) ? a.scrlTrgt.vBar : a;
				if (a.clicked) {
					if (!movBr.moved) {
						sfU.mDPosFix();
						findPos(movBr);
						findPos(movBr.ofstParent);
						movBr.pointerOffsetY = e.clientY - movBr.yPos;
						movBr.pointerOffsetX = e.clientX - movBr.xPos;
						movBr.inCurPos = movBr.curPos;
						movBr.moved = true
					};
					movBr.curPos = (movBr.vertical) ? e.clientY - movBr.pointerOffsetY - movBr.ofstParent.yPos - movBr.minPos : e.clientX - movBr.pointerOffsetX - movBr.ofstParent.xPos - movBr.minPos;
					if (a.scrollBoth)
						movBr.curPos = movBr.curPos + (movBr.curPos - movBr.inCurPos);
					movBr.doBarPos(true);
					if (g.onscrollbar)
						g.onscrollbar()
				} else
					movBr.moved = false
			}
		};
		function mMouseUp() {
			if (sC.goScroll != null) {
				sC.goScroll.clicked = false;
				sC.goScroll.trgtScrll += sC.goScroll.targetSkew
			}
			sC.goScroll = null;
			uiscroller.remTrggr(h, 'selectstart', retFalse);
			uiscroller.remTrggr(h, 'mousemove', mMoveBar);
			uiscroller.remTrggr(h, 'mouseup', mMouseUp)
		};
		function handleTouch(e) {
			if (!e)
				e = wD.event;
			if (this == tDv)
				tDv.sY.zIndex = sC.tDivZ;
			if (e.targetTouches.length != 1 || (!sC.scroller[0] && !sC.scroller[1]))
				return false;
			var a = '', touchLink = (e.target && (e.target.href || (e.target.nodeType == 3 && e.target.parentNode.href))) ? true : false;
			sC.touchPos = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
			flickClear();
			uiscroller.addChckTrggr(g, 'touchmove', handleTouchMove);
			uiscroller.addChckTrggr(g, 'touchend', handleTouchEnd);
			sC.touchBar = (e.target && e.target.id && e.target.id.match(/_[vh]scrollerba[rs]e?/)) ? true : false;
			return false
		};
		function handleTouchMove(e) {
			if (!e)
				e = wD.event;
			if (e.targetTouches.length != 1)
				return false;
			uiscroller.remTrggr(g, 'mousedown', handleTextSelect);
			var a = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
			sC.touchPrevent = true;
			sC.moveDelta = [sC.touchPos[0] - a[0], sC.touchPos[1] - a[1]];
			if (sC.touchBar) {
				sC.moveDelta[0] *= -(sC.cntSize[0] / sC.cntRSize[0]);
				sC.moveDelta[1] *= -(sC.cntSize[1] / sC.cntRSize[1])
			};
			sfU.scrollContent(sC.moveDelta[0], sC.moveDelta[1]);
			sC.touchPos[0] = a[0];
			sC.touchPos[1] = a[1];
			for (var i = 0; i < 2; i++) {
				if (sC.moveDelta[i] !== 0 && sC.scroller[i] && (sC.moveDelta[1 - i] == 0 || !sC.scroller[1 - i])) {
					if ((sC.moveDelta[i] > 0 && sC.scrollPosition[i][1] == sC.scrollPosition[i][0]) || (sC.moveDelta[i] < 0 && sC.scrollPosition[i][0] == 0))
						sC.touchPrevent = false
				};
				if (!sC.scroller[i] && sC.moveDelta[1 - i] !== 0 && Math.abs(sC.moveDelta[i] / sC.moveDelta[1 - i]) > 1.1)
					sC.touchPrevent = false
			};
			if (sC.touchPrevent) {
				e.preventDefault();
				tDv.sY.zIndex = '9999'
			} else {
				tDv.sY.zIndex = sC.tDivZ
			}
		};
		function handleTouchEnd(e) {
			if (!e)
				e = wD.event;
			e.preventDefault();
			if (e.targetTouches.length > 0)
				return false;
			uiscroller.remTrggr(g, 'touchmove', handleTouchMove);
			uiscroller.remTrggr(g, 'touchend', handleTouchEnd);
			if ((sC.scroller[0] && Math.abs(sC.moveDelta[0]) > 6) || (sC.scroller[1] && Math.abs(sC.moveDelta[1]) > 6)) {
				var a = 0;
				flickClear(true);
				sC.touchFlick = window.setInterval(function() {
					sfU.scrollContent(easeInOut(sC.moveDelta[0], 0, 10, a, 0.3), easeInOut(sC.moveDelta[1], 0, 10, a, 0.3));
					a++;
					if (a > 10)
						flickClear()
				}, 100)
			}
		};
		function mWheelProc(e) {
			if (!e)
				e = wD.event;
			if (!this.scrollbar)
				return;
			var a = this, vEdge, hEdge, hoverH = false, delta = 0, iNDx;
			sfU.mDPosFix();
			hElem = (e.target) ? e.target : (e.srcElement) ? e.srcElement : this;
			if (hElem.id && hElem.id.match(/_hscroller/))
				hoverH = true;
			if (e.wheelDelta)
				delta = -e.wheelDelta;
			if (e.detail)
				delta = e.detail;
			delta = (delta < 0) ? -1 : +1;
			iNDx = (delta < 0) ? 0 : 1;
			sC.edge[1 - iNDx] = false;
			if ((sC.edge[iNDx] && !hoverH) || (!sC.scroller[0] && !sC.scroller[1]))
				return;
			if (sC.scroller[1] && !hoverH)
				scrollState = sfU.setScrollPos(false, sC.wheelAct[iNDx], true);
			vEdge = !sC.scroller[1] || hoverH || (sC.scroller[1] && ((scrollState[1][0] == scrollState[1][1] && delta > 0) || (scrollState[1][0] == 0 && delta < 0)));
			if (sC.scroller[0] && (!sC.scroller[1] || hoverH))
				scrollState = sfU.setScrollPos(sC.wheelAct[iNDx], false, true);
			hEdge = !sC.scroller[0] || (sC.scroller[0] && sC.scroller[1] && vEdge && !hoverH) || (sC.scroller[0] && ((scrollState[0][0] == scrollState[0][1] && delta > 0) || (scrollState[0][0] == 0 && delta < 0)));
			if (vEdge && hEdge && !hoverH)
				sC.edge[iNDx] = true;
			else
				sC.edge[iNDx] = false;
			if (e.preventDefault)
				e.preventDefault();
			return false
		};
		function isddvChild(a) {
			while (a.parentNode) {
				a = a.parentNode;
				if (a == g)
					return true
			}
			return false
		};
		function findPos(a) {
			var b = a, curleft = curtop = 0;
			if (b.offsetParent) {
				while (b) {
					curleft += b.offsetLeft;
					curtop += b.offsetTop;
					b = b.offsetParent
				}
			} else if (b.x) {
				curleft += b.x;
				curtop += b.y
			}
			;
			a.xPos = curleft;
			a.yPos = curtop
		};
		function findRCpos(a) {
			var b = a;
			curleft = curtop = 0;
			while (!b.offsetHeight && b.parentNode && b != m && getStyle(b, 'display') == "inline") {
				b = b.parentNode
			};
			if (b.offsetParent) {
				while (b != m) {
					curleft += b.offsetLeft;
					curtop += b.offsetTop;
					b = b.offsetParent
				}
			};
			return [curleft, curtop]
		};
		function classChange(a, b, c) {
			uiscroller.classChange(a, b, c)
		};
		function easeInOut(a, b, c, d, e) {
			c = Math.max(c, 1);
			var f = b - a, stepp = a + (Math.pow(((1 / c) * d), e) * f);
			return (stepp > 0) ? Math.floor(stepp) : Math.ceil(stepp)
		}

	},
	globalInit : function() {
		if (uiscroller.catchFastInit)
			window.clearInterval(uiscroller.catchFastInit);
		uiscroller.prepAnchors();
		uiscroller.initByClass();
		if (window.onscrollbarRun)
			window.onscrollbarRun()
	},
	classChange : function(a, b, c) {
		if (!a.className)
			a.className = '';
		var d = a.className;
		if (b && !d.match(RegExp("(^|\\s)" + b + "($|\\s)")))
			d = d.replace(/(\S$)/, '$1 ') + b;
		if (c)
			d = d.replace(RegExp("((^|\\s)+" + c + ")+($|\\s)", "g"), '$2').replace(/\s$/, '');
		a.className = d
	},
	prepAnchors : function() {
		var d = /#([^#.]*)$/, urlExt = /(.*)#.*$/, regExer = /(^|\s)scrollbar-in-page-link($|\s)/, matcH, claSS, i, anchoR, anchorList = document.getElementsByTagName("a"), urlBase = document.location.href;
		if (urlBase.match(urlExt))
			urlBase = urlBase.match(urlExt)[1];
		for ( i = 0; anchoR = anchorList[i]; i++) {
			claSS = (anchoR.className) ? anchoR.className : '';
			if (anchoR.href && !anchoR.uiScrolleranchor && anchoR.href.match(d) && ((anchoR.href.match(urlExt) && urlBase === anchoR.href.match(urlExt)[1]) || claSS.match(regExer))) {
				anchoR.uiScrolleranchor = true;
				uiscroller.addTrggr(anchoR, 'click', function(e) {
					if (!e)
						e = window.event;
					var a = (e.srcElement) ? e.srcElement : this;
					while (!a.uiScrolleranchor && a.parentNode) {
						a = a.parentNode
					};
					if (!a.uiScrolleranchor)
						return;
					var b = document.getElementById(a.href.match(d)[1]), eScroll = false;
					if (b == null)
						b = ( b = document.getElementsByName(a.href.match(d)[1])[0]) ? b : null;
					if (b != null) {
						var c = b;
						while (c.parentNode) {
							c = c.parentNode;
							if (c.scrollbar) {
								c.scrollbar.scrollToElement(b);
								eScroll = c
							}
						};
						if (eScroll) {
							if (e.preventDefault)
								e.preventDefault();
							document.location.href = urlBase + "#" + a.href.match(d)[1];
							eScroll.scrollbar.mDPosFix();
							return false
						}
					}
				})
			}
		}
	},
	initByClass : function(a) {
		uiscroller.initialized = true;
		var b = uiscroller.getByClassName(document.getElementsByTagName("body")[0], "div", (a) ? a : 'scrollbar');
		for (var i = 0, tgDiv; tgDiv = b[i]; i++)
			if (!tgDiv.scrollbar)
				uiscroller.scrollbarMain(tgDiv)
	},
	scrollTo : function(a, b) {
		if ( typeof (a) == 'string')
			a = document.getElementById(a);
		if (a == null)
			return false;
		var c = a;
		while (c.parentNode) {
			c = c.parentNode;
			if (c.scrollbar) {
				if (b) {
					document.location.href = "#" + b
				};
				c.scrollbar.scrollToElement(a);
				c.scrollbar.mDPosFix();
				return true
			}
		};
		return false
	},
	updateScrollBars : function(a, b) {
		for (var i = 0, uiScrollerdiv; uiScrollerdiv = uiscroller.uiScrollerlist[i]; i++) {
			uiScrollerdiv.scrollbar.updateScrollBars();
			if (b)
				uiScrollerdiv.scrollbar.formUpdate()
		};
		if (a)
			uiscroller.prepAnchors()
	},
	camelConv : function(a) {
		var a = a.split('-'), reT = a[0], i;
		for ( i = 1; parT = a[i]; i++) {
			reT += parT.charAt(0).toUpperCase() + parT.substr(1)
		};
		return reT
	},
	getByClassName : function(a, b, c) {
		if ( typeof (a) == 'string')
			a = document.getElementById(a);
		if (a == null)
			return false;
		var d = new RegExp("(^|\\s)" + c + "($|\\s)"), clsnm, retArray = [], key = 0;
		var e = a.getElementsByTagName(b);
		for (var i = 0, pusher; pusher = e[i]; i++) {
			if (pusher.className && pusher.className.match(d)) {
				retArray[key] = pusher;
				key++
			}
		}
		return retArray
	},
	checkHidden : function(a) {
		if (a == null)
			return true;
		var b;
		while (a.parentNode) {
			b = uiscroller.getStyle(a, 'display');
			if (b == 'none')
				return true;
			a = a.parentNode
		};
		return false
	},
	getStyle : function(a, b) {
		if (window.getComputedStyle)
			return window.getComputedStyle(a, null).getPropertyValue(b);
		if (a.currentStyle)
			return a.currentStyle[uiscroller.camelConv(b)];
		return false
	},
	catchFastInit : window.setInterval(function() {
		var a = document.getElementById('scrollbar-init');
		if (a != null) {
			uiscroller.initByClass();
			window.clearInterval(uiscroller.catchFastInit)
		}
	}, 100),
	putAway : function(a, b) {
		a.parentNode.removeChild(a);
		a.style.display = "none";
		b.appendChild(a)
	},
	addTrggr : function(a, b, c) {
		if (!uiscroller.addChckTrggr(a, b, c) && a.attachEvent) {
			a.attachEvent('on' + b, c)
		}
	},
	addChckTrggr : function(a, b, c) {
		if (a.addEventListener) {
			a.addEventListener(b, c, false);
			uiscroller.w3events = true;
			window.addEventListener("unload", function() {
				uiscroller.remTrggr(a, b, c)
			}, false);
			return true
		} else
			return false
	},
	remTrggr : function(a, b, c) {
		if (!uiscroller.remChckTrggr(a, b, c) && a.detachEvent)
			a.detachEvent('on' + b, c)
	},
	remChckTrggr : function(a, b, c) {
		if (a.removeEventListener) {
			a.removeEventListener(b, c, false);
			return true
		} else
			return false
	}
};
function CSBscrollbar(a) {
	uiscroller.scrollbarMain(a)
};
uiscroller.scrollbarInit();

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
			return this.props.alpha==undefined?1:this.props.alpha;
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
var UIElement = function() {
	this.layoutCollection = [];
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(UIElement, DisplayObject);
	/*
	 * public functions
	 */
	_.childContainer = null;
	_.state="";
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "init");
		var c = document.createElement("div");
		this.childContainer=c;
		this.display.appendChild(c);
		this.styleChildContainer();
	}
	_.styleChildContainer=function()
	{
		this.childContainer.style.position="relative";
		this.childContainer.style.display="block";
	}
	_.addChild = function(value) {
		this.childContainer.appendChild(value.display?value.display:value);
	}
	_.removeChild = function(value) {
		this.childContainer.removeChild(value.display?value.display:value);
	}
	_.addUIChild = function(value) {
		this.display.appendChild(value.display?value.display:value);
	}
	_.removeUIChild = function(value) {
		this.display.removeChild(value.display?value.display:value);
	}
	_.layout = function(value) {
		if(value!=undefined)
		{
			this.layoutCollection.push(value);
		}else{
			return this.layoutCollection[this.layoutCollection.length-1];
		}
	}
	_.setStyle=function()
	{
		
	}
	_.arrange = function() {
		for(var a = 0; a < this.layoutCollection.length; a++) {
			this.layoutCollection[a].arrange(this);
		}
	} 
})(); 
var Label = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Label, UIElement);
	/*
	 * public functions
	 */
	
	
	_.text=function(value)
	{
		if(value!=undefined)
		{
			this.display.innerHTML = value;
		}else{
			return this.display.innerHTML ;
		}
	}
})();
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
var Sprite = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Sprite, UIElement);
	/*
	 * public functions
	 */
	
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
		
	}
	_.drawCircle= function(x,y,rad,c)
	{
		
		this.x(x);
		this.y(y);
		this.width(rad*2);
		this.height(rad*2);
		this.setColor(c);
		this.setCorners(rad);
		
	}
	_.setColor=function(c)
	{
		this.display.style.backgroundColor = c;
	};
	_.setCorners=function(rad)
	{
		this.display.style.behavior= 'url(lib/com/wezside/component/border-radius.htc)';
		this.display.style.webkitBorderRadius = rad+"px";
		this.display.style.MozBorderRadius = rad+"px";
		this.display.style['-moz-border-radius']=rad+"px";
		this.display.style.borderRadius =rad+"px";
		this.display.style['border-radius']=rad+'px '+rad+'px '+rad+'px '+rad+'px'; 
	}
})();
