
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