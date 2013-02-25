var MovieClip = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(MovieClip, UIElement);
	/*
	 * public functions
	 */
	window.frameRate = 50;
	window.frameCount = 0;
	window.clips = [];
	_.frameRate = 100;
	_.timer = null;
	_.TO = 0;
	_.FROM = 0;
	_.BG_SIZE = "bg_size";
	_.LOOP = false;
	_.img = null;

	_.cFrame = 0;

	_.attach = function(img) {
		this.img = img;
		this.img.style.position = "absolute";
		this.display.style.overflow = "hidden";
		this.addChild(img);
	};
	_.stop = function() {
		for (var a = 0; a < window.clips.length; a++) {
			if (window.clips[a] == this) {

				this.resetMC();
				window.clips.splice(a, 1);
				if (window.clips.length == 0) {
					clearInterval(window.enterFrameTimer);
					window.enterFrameTimer = null;
				}
				return;
			}
		}
	};
	_.currentFrame = function() {
		return Math.round(this.width() / this.getPos().left);
	};
	_.resetMC = function() {
		this.TO = 0;
		this.FROM = 0;
		this.LOOP = false;
	}
	_.gotoAndStop = function(frame) {
		frame = frame ? frame : 0;
		this.resetMC();
		this.setFrame(frame);
	};
	_.gotoAndPlay = function(from, to, loop) {
		this.TO = to;
		this.FROM = from;
		this.LOOP = loop ? loop : false;
		this.setFrame(from);
		window.clips.push(this);
		var root = this;
		if (!window.enterFrameTimer) {
			this.timer = setInterval(function() {
				window.onEnterFrame();
			}, window.frameRate);
		}
	};
	window.onEnterFrame = function() {
		for (var a = 0; a < window.clips.length; a++) {
				var mc = window.clips[a];
				var remainder  =( Math.round(window.frameCount * window.frameRate) % mc.frameRate)/100;
			if (remainder==0) {

				var to = mc.TO;
				var from = mc.FROM;
				var loop = mc.LOOP;
				var current = mc.cFrame;
				current++;

				if (current <= to || String(loop) == "true") {
					mc.setFrame(current, String(loop) == "true" ? from : null);
				} else {
					window.clips.splice(a, 1);
					mc.resetMC();
					if (window.clips.length == 0) {
						clearInterval(window.enterFrameTimer);
						window.enterFrameTimer = null;
					}
				}
			}

		}

		window.frameCount++;
		if (window.frameCount >= 1000) {
			window.frameCount = 0;
		}
	};
	_.setFrame = function(frame, loop) {

		var bgWidth = this.img.width;
		// var size = eval("(" + obj + ')');
		// var width = this.getStyle(this.img, "width");

		var left = (this.width() * frame);

		if (left > bgWidth) {
			if (loop != null) {
				frame = loop;
			} else {
				frame = Math.round(bgWidth / this.width());
			}
			left = loop != null ? loop : (bgWidth / this.width() ) * frame;
		} else {

		}
		var top = this.getPos().top;
		this.img.style.top = top + "px";
		this.img.style.left = "-" + left + "px ";
		this.cFrame = frame;
	};
	_.getPos = function() {

		var y = this.img.style.top;

		var x = this.img.style.left;
		if (y) {
			y = this.replaceSuffix(y);
		} else {
			y = "0";
		}
		if (x) {
			x = this.replaceSuffix(x);
		} else {
			x = "0";
		}

		return {
			left : x,
			top : y
		};
	};
	_.replaceSuffix = function(value) {
		value = value.replace("%", "");
		value = value.replace("px", "");
		return value;
	};
	_.getBGSize = function() {
		var imageSrc = this.getStyle("backgroundImage");
		imageSrc = imageSrc.replace("url(", "");
		imageSrc = imageSrc.replace(")", "");
		imageSrc = imageSrc.replace('"', "");
		imageSrc = imageSrc.replace('"', "");

		var image = new Image();
		image.src = imageSrc;
		var width = image.width, height = image.height;
		image = null;
		return {
			width : width,
			height : height
		};
	};
	_.topPosition = function(value) {
		if (value == undefined) {
			return this.getPos().top;
		} else {
			this.img.style.top = value + "px";
		}
	};
	_.getStyle = function(cssprop) {
		if (this.img.currentStyle)//IE
			return this.img.currentStyle[cssprop] ? this.img.currentStyle[cssprop].replace("px", "") : "";
		else if (document.defaultView && document.defaultView.getComputedStyle)//Firefox
			return document.defaultView.getComputedStyle(this.img, "")[cssprop].replace("px", "");
		else//try and get inline style
			return this.img.style[cssprop].replace("px", "");
	};
})();
