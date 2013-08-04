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
