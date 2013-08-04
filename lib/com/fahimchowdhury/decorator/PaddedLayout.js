
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
