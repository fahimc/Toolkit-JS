var ContextMenu = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(ContextMenu, UIElement);
	/*
	 * public functions
	 */
	_.state = "hidden";
	_.f12State = "enabled";
	_.customItems = [];
	_.build = function() {
		Class._super(this, "build");
		this.width(170);
		this.height(18);

		Utensil.addListener(document, "contextmenu", this.createHandler(this, "onRightClick"));

		this.layout(new VerticalLayout());
		this.layout().verticalGap = 5;

		this.layout(new PaddedLayout());
		this.layout().top = 10;
		this.layout().bottom = 0;

		this.addItems();

		this.setStyle();

	};
	_.addItems = function() {
		for (var a = 0; a < this.customItems.length; a++) {
			if (this.customItems[a].separatorBefore)
				this.customItems[a].display.style.borderTop = "1px solid #e9e9e9";
			if (this.customItems[a].separatorAfter)
				this.customItems[a].display.style.borderBottom = "1px solid #e9e9e9";
			this.addChild(this.customItems[a]);
		}
	};
	_.onRightClick = function(event) {
		if (this.state != "showing") {
			document.body.appendChild(this.display);
			this.x(Utensil.mouseX(document.body, event));
			this.y(Utensil.mouseY(document.body, event));
			this.arrange();
			this.state = "showing";
			Utensil.addListener(document, "click", this.createHandler(this, "onDOMClick"));
		}
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}

		return false;
	};
	_.onDOMClick = function(event) {
		//console.log("onDOMClick");
		document.body.removeChild(this.display);
		this.state = "hidden";
		Utensil.removeListener(document, "click", this.handlers["onDOMClick"]);
		this.removeHandler(this, "onDOMClick")
	};
	_.setStyle = function() {
		Class._super(this, "setStyle");
		this.display.style.backgroundColor = "#fff";
		this.display.style.border = "1px solid #bababa";
		this.display.style["-moz-box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";
		this.display.style["-webkit-box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";
		this.display.style["box-shadow"] = "5px 5px 5px rgba(68,68,68,0.6)";

	};
	_.disableF12 = function(value) {
		if (!value)
			return this.f12State;
		this.f12State = value;
		if (this.f12State) {
			Utensil.addListener(document, "keydown", this.onF12KeyPress);
		} else {
			Utensil.removeListener(document, "keydown", this.onF12KeyPress);
		}
	};
	_.onF12KeyPress = function(event) {
		console.log("here");
		event = (event || window.event);
		if (event.keyCode == 123) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}

			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
			return false;
		}
	};
	_.arrange = function() {
		this.height((this.customItems.length * 25) + this.layout().top + this.layout().bottom);
		Class._super(this, "arrange");
	};
})();
