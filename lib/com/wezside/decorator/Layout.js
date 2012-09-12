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
