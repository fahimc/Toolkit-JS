var LoaderInfo = {
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
}
