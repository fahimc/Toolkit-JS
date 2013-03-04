var TouchController = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(TouchController, UIElement);
	/*
	 * public functions
	 */
	_.EVENT_DPAD_UP = "EVENT_DPAD_UP";
	_.EVENT_DPAD_DOWN = "EVENT_DPAD_DOWN";
	_.EVENT_DPAD_LEFT = "EVENT_DPAD_LEFT";
	_.EVENT_DPAD_RIGHT = "EVENT_DPAD_RIGHT";
	_.EVENT_DPAD_MOVE = "EVENT_DPAD_MOVE";
	_.dpad = null;
	_.dpadRing = null;
	_.dpadColor = "#ccc";
	_.dpadRadius = 25;
	_.dpadX = 10;
	_.dpadY = 10;
	_.timer = null;
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "build");
		this.buildDPad();
		this.alpha(0.7);
	};
	_.buildDPad = function() {
		this.dpadRing = new Sprite();
		this.dpadRing.build();
		this.dpadRing.lineStyle(2, "#ccc");
		this.dpadRing.drawCircle(0, 0, this.dpadRadius + 10, "none");
		this.dpadRing.setStyle();
		this.addChild(this.dpadRing);
		this.dpadRing.arrange();

		this.dpad = new Sprite();
		this.dpad.build();
		this.dpad.drawCircle(this.dpadX, this.dpadY, this.dpadRadius, this.dpadColor);
		this.dpad.setStyle();
		this.addChild(this.dpad);
		this.dpad.arrange();

		if ('ontouchstart' in window) {
			this.dpad.display.addEventListener("touchstart", this.createHandler(this, "onDpadMouseDown"));
		} else {
			Utensil.addListener(this.dpad.display, "mousedown", this.createHandler(this, "onDpadMouseDown"));
		}

	};
	_.onDpadMouseDown = function(event) {
		alert("onDpadMouseDown");
		this.timer = setInterval(this.createHandler(this, "onTimer"), 100);
		if ('ontouchstart' in window) {
			document.addEventListener("touchend", this.createHandler(this, "onDpadMouseUp"));
			document.addEventListener("touchmove", this.createHandler(this, "onDpadMouseMove"));
		} else {
			Utensil.addListener(document, "mouseup", this.createHandler(this, "onDpadMouseUp"));
			Utensil.addListener(document, "mousemove", this.createHandler(this, "onDpadMouseMove"));
		}

	};
	_.onDpadMouseUp = function(event) {
		if ('ontouchstart' in window) {
			document.removeEventListener("touchend", this.createHandler(this, "onDpadMouseUp"));
			document.removeEventListener("touchmove", this.createHandler(this, "onDpadMouseMove"));
		} else {
			Utensil.removeListener(document, "mousemove", this.handlers.onDpadMouseMove);
			Utensil.removeListener(document, "mousemove", this.handlers.onDpadMouseUp);
		}
		this.dpad.x(this.dpadX);
		this.dpad.y(this.dpadY);

		clearInterval(this.timer);
		this.timer = null;

	};
	_.onTimer = function() {
		var center = this.dpadRing.x() + (this.dpadRing.width() * 0.5);
		var xx = Math.abs(this.dpad.x());
		var yy = Math.abs(this.dpad.y());
		if (xx > yy) {
			if (this.dpad.x() > this.dpadX) {
				Event.dispatch(this, this.EVENT_DPAD_MOVE, null, this.EVENT_DPAD_RIGHT);
			}
			if (this.dpad.x() < this.dpadX) {
				Event.dispatch(this, this.EVENT_DPAD_MOVE, null, this.EVENT_DPAD_LEFT);
			}
		} else {
			if (this.dpad.y() < this.dpadY) {
				Event.dispatch(this, this.EVENT_DPAD_MOVE, null, this.EVENT_DPAD_UP);
			}
			if (this.dpad.y() > this.dpadY) {
				Event.dispatch(this, this.EVENT_DPAD_MOVE, null, this.EVENT_DPAD_DOWN);
			}
		}
	};
	_.onDpadMouseMove = function(event) {
		var mouseX = Utensil.mouseX(document.body, event) - this.x();
		var mouseY = Utensil.mouseY(document.body, event) - this.y();
		var center = this.dpadRing.x() + (this.dpadRing.width() * 0.5);
		if (mouseX <= (this.dpadRing.x() + center) && mouseX >= this.dpadRing.x()) {
			this.dpad.x(mouseX);
		} else {
			var xx = this.dpadRing.x() + center;
			if (mouseX < this.dpadRing.x())
				xx = this.dpadRing.x() - center;
			this.dpad.x(xx);
		}
		if (mouseY <= (this.dpadRing.y() + center) && mouseY >= this.dpadRing.y()) {
			this.dpad.y(mouseY);
		} else {
			var yy = this.dpadRing.y() + center;
			if (mouseY < this.dpadRing.y())
				yy = this.dpadRing.y() - center;
			this.dpad.y(yy);
		}

	};

})();
