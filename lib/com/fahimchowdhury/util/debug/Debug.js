var Debug = {
	show : true,
	report : false,
	ERROR_PREFIX : "ERROR: ",
	ERROR_LINENUMBER : " ON LINE ",
	ERROR_URLPREFIX : " FOR ",
	ERROR_REPORT_URL : "",
	POST_URL : "url",
	POST_MSG : "msg",
	onError : function(message, url, linenumber) {

		if (window.console && Debug.show)
			console.log(Debug.ERROR_PREFIX + message + Debug.ERROR_LINENUMBER + linenumber + Debug.ERROR_URLPREFIX + url);
	},
	reporter : function(message, url, linenumber) {
		if (!this.report && this.ERROR_REPORT_URL == "")
			return;
		var url = this.ERROR_REPORT_URL;
		var msg = Debug.ERROR_PREFIX + Debug.browser()+", " + message + Debug.ERROR_LINENUMBER + linenumber + Debug.ERROR_URLPREFIX + url;
		Utensil.URLLoader.load(url, this.onReportComplete, "POST", "url=" + url + "&msg=" + msg);
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
		console.log("onReportComplete", t);
	},
	browser : function() {
		var N = navigator.appName, ua = navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && ( tem = ua.match(/version\/([\.\d]+)/i)) != null)
			M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

		return M;
	}
};

window.onerror = function(message, url, linenumber) {
	Debug.reporter(message, url, linenumber);
	if (!Debug.show)
		return Utensil.Browser.isIE ? false : true;
};
if (window.console)
	Debug.console._console = window.console;
window.console = Debug.console;

