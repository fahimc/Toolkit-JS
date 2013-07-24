var Debug = {
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
window.console = Debug.console;

