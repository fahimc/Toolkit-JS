(function(window) {
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
})(window);