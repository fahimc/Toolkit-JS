var Layout = function() {
}

Layout.prototype = {
	verticalGap : 0,
	arrange : function(obj) {
	}
};

var VerticalLayout = function() {
	this.arrange = function(e) {
		var obj = e.display;
		var currentY = 0;
		for(var count = 0; count < obj.childNodes.length; count++) {
			
			obj.childNodes[count].style.top = currentY+"px"
			currentY = obj.childNodes[count].clientHeight + this.verticalGap;
		}
	}
}; (function() {
	var _ = Class.extend(VerticalLayout, Layout);
	
})();
