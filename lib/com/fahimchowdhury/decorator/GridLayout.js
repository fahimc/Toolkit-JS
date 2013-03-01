var GridLayout = function() {
	this.arrange = function(e) {
		var obj = e.wrapper?e.wrapper:e.childContainer;
		var currentX = this.left;
		var currentY = this.top;
		var col = 0;
		var row = 0;
		var maxWidth = parseInt(e.width() - this.right);
		this.clearGrid(obj);
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			if(child.className.indexOf("scroll")<0 && child.className.indexOf("mcontentwrapper")<0)
			{
				
			var x = parseInt(child.style.left.replace("px", "") ? child.style.left.replace("px", "") : 0);
			var y = parseInt(child.style.top.replace("px", "") ? child.style.top.replace("px", "") : 0);

			if(count > 0) {

				if(currentX + parseInt(child.clientWidth) >= maxWidth) {
					row++;
					col = 0;
					currentX = this.left;
				}
			}
			if(row > 0) {
				var data = this.getChildHeight(obj, row - 1, col);
				;
				currentY = parseInt(data.y) + parseInt(data.height)+ parseInt(this.verticalGap);
			}
			child.style.top = parseInt(currentY) + "px";
			child.style.left = parseInt(currentX) + "px";
			child.setAttribute("gridCol", col);
			child.setAttribute("gridRow", row);
			currentX += parseInt(child.clientWidth) + parseInt(this.horizontalGap);
			col++;
			}
		}
	}
	this.getChildHeight = function(obj, r, c) {
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			if(parseInt(child.getAttribute("gridCol")) == c && parseInt(child.getAttribute("gridRow")) == r) {
				return {
					height : child.clientHeight,
					y : parseInt(child.style.top.replace("px", "") ? child.style.top.replace("px", "") : 0)
				};
			}
		}
	}
	this.clearGrid = function(obj) {
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			child.setAttribute("gridCol", "");
			child.setAttribute("gridRow", "");
		}
	}
};
Class.extend(GridLayout, Layout);
