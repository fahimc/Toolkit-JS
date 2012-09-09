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
			child.style.top = currentY+"px";
			var h = child.clientHeight;
			 if(h==0)h = child.style.height.replace("px","") ;
			currentY += parseInt(h) + this.verticalGap; 
		}
	}
}; (function() {
	var _ = Class.extend(VerticalLayout, Layout);
	
})();

var HorizontalLayout = function() {
	this.arrange = function(e) {
		var obj = e.childContainer;
		var currentX = 0;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			child.style.left = currentX+"px";
			var w = child.clientWidth;
			 if(w==0)w = child.style.width.replace("px","") ;
			currentX += parseInt(w) + this.horizontalGap; 
		}
	}
}; (function() {
	var _ = Class.extend(HorizontalLayout, Layout);
	
})();

var PaddedLayout = function() {
	this.arrange = function(e) {
		var obj = e.childContainer;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			var x = parseInt(child.style.left.replace("px","")?child.style.left.replace("px",""):0);
			var y = parseInt(child.style.top.replace("px","")?child.style.top.replace("px",""):0);
			child.style.top = parseInt(y+this.top)+"px";
			child.style.left = parseInt(x+this.left)+"px";
			
		}
	}
}; (function() {
	var _ = Class.extend(PaddedLayout, Layout);
	
})();
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
