var Gesture = {
	event : {
		SWIPE_LEFT : "swipeleft",
		SWIPE_RIGHT : "swiperight",
		SWIPE_UP : "swipeup",
		SWIPE_DOWN : "swipedown",
		DRAG : "drag",
		HOLD : "hold"
	},
	threshold : 0.1,
	handlers : [],
	callbacks : [],
	startX : null,
	startY : null,
	state : "",
	holdTimer : null,
	holdDuration : 1000,
	sp:null,
	debug:function(value)
	{
		if(value)
		{
			this.sp = new Sprite();
			this.sp.build();
			this.sp.drawCircle(0,0,10,"#333");
			this.sp.lineStyle(2,"#999");
			this.sp.setStyle();
			this.sp.display.style.display="none";
			Utensil.stage().appendChild(this.sp.display);
			this.sp.arrange();
		}else if(this.sp)
		{
			Utensil.stage().removeChild(this.sp.display);
			this.sp = null;
		}
	},
	activate : function() {
		if ('ontouchstart' in document.documentElement) {
			Utensil.addListener(document, "touchstart", this.handler("onMouseDown"));
		} else {
			Utensil.addListener(document, "mousedown", this.handler("onMouseDown"));
		}

	},
	deactivate : function() {
		if ('ontouchstart' in document.documentElement) {
			Utensil.removeListener(document, "touchstart", this.handler("onMouseDown"));
		} else {
			Utensil.removeListener(document, "mousedown", this.handler("onMouseDown"));
		}
		this.onMouseUp();
	},
	handler : function(callback) {
		if (!this.handlers[callback]) {
			var root = this;
			this.handlers[callback] = function(event) {
				root[callback](event);
			};
		}
		return this.handlers[callback];

	},
	addListener : function(eventName, callback) {
		if (!this.callbacks[eventName])
			this.callbacks[eventName] = [];
		this.callbacks[eventName].push(callback);
	},
	removeListener : function(eventName, callback) {
		if (!this.callbacks[eventName])
			return;
		for (var a = 0; a < this.callbacks[eventName].length; a++) {
			if (this.callbacks[eventName][a] == callback) {
				this.callbacks[eventName].splice(a, 1);
				return;
			}
		}
	},
	onCallback : function(eventName, event) {
		if (!this.callbacks[eventName])
			return;
		for (var a = 0; a < this.callbacks[eventName].length; a++) {
			this.callbacks[eventName][a](event);
		}
	},
	onMouseDown : function(event) {
		if ('ontouchstart' in document.documentElement) {
			Utensil.addListener(document, "touchend", this.handler("onMouseUp"));
			Utensil.addListener(document, "touchmove", this.handler("onMouseMove"));
		} else {
			Utensil.addListener(document, "mouseup", this.handler("onMouseUp"));
			Utensil.addListener(document, "mousemove", this.handler("onMouseMove"));
		}

		this.startX = Utensil.mouseX(document.body, event);
		this.startY = Utensil.mouseY(document.body, event);
		this.holdTimer = setTimeout(this.onHold, this.holdDuration);
		
		if(this.sp)this.sp.display.style.display="block";
	},
	onHold : function() {
		if (Gesture.holdTimer)
			clearTimeout(Gesture.holdTimer);
		Gesture.onCallback(Gesture.event.HOLD, null);
	},
	onMouseUp : function(event) {
		if (this.holdTimer)
			clearTimeout(this.holdTimer);
		this.state = "";
		if ('ontouchstart' in document.documentElement) {
			Utensil.removeListener(document, "touchend", this.handler("onMouseUp"));
			Utensil.removeListener(document, "touchmove", this.handler("onMouseMove"));
		} else {
			Utensil.removeListener(document, "mouseup", this.handler("onMouseUp"));
			Utensil.removeListener(document, "mousemove", this.handler("onMouseMove"));
		}
		if(this.sp)this.sp.display.style.display="none";
		
	},
	onMouseMove : function(event) {
		var x = Utensil.mouseX(document.body, event);
		var y = Utensil.mouseY(document.body, event);
		var xPerc = Math.abs(this.startX - x) / Utensil.stageWidth();
		var yPerc = Math.abs(this.startY - y) / Utensil.stageHeight();
		if (xPerc >= this.threshold) {
			this.state = (this.startX - x > 0 ? Gesture.event.SWIPE_LEFT : Gesture.event.SWIPE_RIGHT);
		} else if (yPerc >= this.threshold) {
			this.state = (this.startY - y > 0 ? Gesture.event.SWIPE_UP : Gesture.event.SWIPE_DOWN);
		}
		if (this.state != "") {
			this.onCallback(this.state, event);
		}
		event.drag = {
			x : x,
			y : y,
			startX : this.startX,
			startY : this.startY
		};
		this.onCallback(Gesture.event.DRAG, event);
		if(this.sp)
		{
			this.sp.x(x);
			this.sp.y(y);
		}
	}
}
