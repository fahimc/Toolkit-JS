var ScrollLayout = function() {

	this.arrange = function(e) {
		if (!window.scrollerIndex)
			window.scrollerIndex = 0;

		if (!this.trackId)
			this.trackId += window.scrollerIndex;
		if (!this.holderId)
			this.holderId += window.scrollerIndex;
		if (!this.thumbId)
			this.thumbId += window.scrollerIndex;
		if (!this.thumbId)
			window.scrollerIndex++;

		this.e = e;
		var c = e.childContainer;
		e.height(this.scrollHeight);
		this.maxHeight = e.childContainer.clientHeight;
		//
		for (var count = 0; count < e.childContainer.childNodes.length; count++) {
			var child = e.childContainer.childNodes[count];
			var y = child.style.top ? child.style.top.replace("px", "") : 0;
			var h = child.clientHeight;

			var max = parseInt(y) + parseInt(h);
			if (max > this.maxHeight) {
				this.maxHeight = max;
			}

		}
		if (this.maxHeight > this.scrollHeight) {
			this.childHeight(e.childContainer, this.maxHeight);
			this.removeScroller();
			this.createScrollbar(e);
			e.width(e.width() - this.track.clientWidth);
			this.childX(this.track, parseInt(e.width()));
		} else {

			var tw = this.removeScroller();
			e.width(e.width() + tw);
		}
	}
	this.createScrollbar = function(e) {
		if (!e)
			return;
		var c = e.childContainer;
		if (!this.holder) {
			this.holder = document.createElement("div");
			this.holder.id = this.holderId;
			this.holder.style.overflow = "hidden";
			this.holder.style.position = "relative";
			//this.resetStyle(this.holder);
			this.childHeight(this.holder, this.scrollHeight);
			e.display.removeChild(c);
			this.holder.appendChild(c);
			e.display.appendChild(this.holder);
		}
		if (!this.track) {
			this.track = document.createElement("div");
			this.track.id = this.trackId;
			this.resetStyle(this.track);
			this.track.className = this.trackStyle;
			this.childHeight(this.track, this.scrollHeight);
			e.addUIChild(this.track);
			this.childX(this.track, parseInt(e.width()));
			this.childWidth(c, parseInt(e.width()) - ( parseInt(this.horizontalGap)));
			this.childWidth(this.holder, parseInt(e.width()) - (parseInt(this.horizontalGap)));

		}
		if (!this.thumb) {
			this.thumb = document.createElement("div");
			this.thumb.id = this.thumbId;
			this.resetStyle(this.thumb);
			this.thumb.className = this.thumbStyle;
			this.thumb.style.cursor = "pointer";
			var thumbHeight = this.scrollHeight / this.maxHeight;
			this.childHeight(this.thumb, thumbHeight * this.scrollHeight);
			this.track.appendChild(this.thumb);

			var root = this;
			this.onMouseDownHandler = function(e) {
				root.onMouseDown(e);
			}
			this.onScrollWheelHandler = function(e) {
				root.onScrollWheel(e);
			}
			Utensil.addListener(this.thumb, "mousedown", this.onMouseDownHandler);
			this.addEvent(e.display, "mousewheel", this.onScrollWheelHandler);
		}
	}
	this.removeScroller = function() {
		var c = this.e.childContainer;
		var w = 0;
		if (this.track) {
			w = this.track.clientWidth;
			if (document.getElementById(this.trackId))
				document.getElementById(this.trackId).parentNode.removeChild(this.track);
			this.track = null;

		}

		if (this.thumb) {
			if (document.getElementById(this.thumbId))
				document.getElementById(this.thumbId).parentNode.removeChild(this.thumb);
			Utensil.removeListener(this.thumb, "mousedown", this.onMouseDownHandler);
			this.thumb = null;

			if (this.holder) {
				if (document.getElementById(this.holderId)) {
					this.e.display.removeChild(this.holder);
					this.holder.removeChild(c);
				}
				this.e.display.appendChild(c);
				this.holder = null;
			}

		}
		this.removeEvent(this.e.display, "mousewheel", this.onScrollWheelHandler);
		this.reset();
		return w;
	}
	this.reset = function() {
		this.e.childContainer.style.top = "0px";
	}
	this.onScrollWheel = function(e) {
		e = e ? e : window.event;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
		this.startY = (parseInt(this.childY(this.thumb)) + Number(wheelData));
		this.onMouseMove(e, parseInt(this.childY(this.thumb)) - Number(wheelData * 10));
	}
	this.onMouseDown = function(e) {
		this.startX = Utensil.mouseX(document.body, e);
		this.startY = Utensil.mouseY(document.body, e) - this.childY(this.thumb);
		var root = this;
		this.onMouseMoveHandler = function(e) {
			root.onMouseMove(e);
		}
		this.onMouseUpHandler = function(e) {
			root.onMouseUp(e);
		}
		Utensil.addListener(document, "mousemove", this.onMouseMoveHandler);
		Utensil.addListener(document, "mouseup", this.onMouseUpHandler);
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}
	this.onMouseMove = function(e, data) {
		var y = data != undefined ? data : (Utensil.mouseY(document.body, e) - this.startY);
		var p = 0;
		if (y <= 0)
			y = 0;

		if (Number(y) + parseInt(this.thumb.clientHeight) >= this.scrollHeight) {
			y = this.scrollHeight - parseInt(this.thumb.clientHeight);
			p = this.paddingBottom;

		}

		this.childY(this.thumb, y);
		var thumbHeight = this.maxHeight / this.scrollHeight;
		this.e.childContainer.style.top = -(parseInt(this.childY(this.thumb) * thumbHeight) + p) + "px";
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}
	this.onMouseUp = function(e) {
		Utensil.removeListener(document, "mousemove", this.onMouseMoveHandler);
		Utensil.removeListener(document, "mouseup", this.onMouseUpHandler);
	}
	this.childX = function(div, xx) {
		if (xx == undefined) {
			return div.style.left ? div.style.left.replace("px", "") : 0;
		} else {
			div.style.left = xx + "px";
		}
	};
	this.childY = function(div, y) {
		if (y == undefined) {
			return div.style.top ? div.style.top.replace("px", "") : 0;
		} else {
			div.style.top = y + "px";
		}
	};
	this.childWidth = function(div, value) {
		if (value == undefined) {
			return div.style.width ? div.style.width.replace("px", "") : 0;
		} else {
			div.style.width = value + "px";
		}
	};
	this.childHeight = function(div, value) {
		if (value == undefined) {
			return div.style.height ? div.style.height.replace("px", "") : 0;
		} else {
			div.style.height = value + "px";
		}
	}
	this.resetStyle = function(elem) {
		elem.style.position = "absolute";
		elem.style.top = "0px";
	}
	this.addEvent = function(element, eventName, callback) {
		if ( typeof (element) == "string")
			element = document.getElementById(element);
		if (element == null)
			return;
		if (element.addEventListener) {
			if (eventName == 'mousewheel')
				eventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
			element.addEventListener(eventName, callback, false);

		} else if (element.attachEvent)
			element.attachEvent("on" + eventName, callback);
	}
	this.removeEvent = function(element, eventName, callback) {
		if ( typeof (element) == "string")
			element = document.getElementById(element);
		if (element == null)
			return;
		if (element.removeEventListener) {
			if (eventName == 'mousewheel')
				eventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
			element.removeEventListener(eventName, callback, false);

		} else if (element.detachEvent)
			element.detachEvent("on" + eventName, callback);
	}
};
Class.extend(ScrollLayout, Layout);
var _ = ScrollLayout.prototype;
_.track
_.thumb
_.holder
_.scrollHeight = 10;
_.paddingBottom = 10;
_.trackStyle = "scrollTrack";
_.thumbStyle = "scrollThumb";
_.holderId = "scrollHolder";
_.trackId = "scrollTrack";
_.thumbId = "scrollThumb";
_.e
_.startX
_.startY
_.maxHeight = 0;
