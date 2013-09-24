var JSONLoader=function(){};
(function()
{
	var _ =JSONLoader.prototype;
	
	_.urlRequest=null;
	_.SCRIPT_NAME="jsonpLoader";
	_.CALLBACK_PREFIX="callback";
	_.CALLBACK_SUFFIX=0;
	
	_.load=function(urlRequest,callback)
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
window.scriptCompleteEventsCount=0;