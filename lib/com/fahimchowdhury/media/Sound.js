var Sound = function() {
};
(function() {
	var _ = Sound.prototype;

	_.display = null;
	_.bgSrc = null;
	_.load = function() {
		for (var a = 0; a < arguments.length; a++) {

			if (this.audioSupported()) {
				this.buildHTML5Audio(arguments[a]);
			} else {
				this.buildBGSound(arguments[a]);
			}
		}
	}
	_.audioSupported = function() {
		var a = document.createElement('audio');
		return !!(a.canPlayType);
	}
	_.buildHTML5Audio = function(url) {
		if (!this.display) {
			this.display = document.createElement('audio');
			document.body.appendChild(this.display);
		}
		var type = url.split(".")[1];
		if (this.display.canPlayType('audio/' + type)) {
			var source = document.createElement('source');
			source.type = 'audio/' + type;
			source.src = url;
			this.display.appendChild(source);
		}
	}
	_.buildBGSound = function(url) {
		if (!this.display) {
			this.display = document.createElement('bgsound');
			this.display.setAttribute("loop", 1);
			document.body.appendChild(this.display);
		}
		var type = url.split(".")[1];
		if (type.toLowerCase() == "wav") {
			this.bgSrc = url;
		}
	}
	_.play = function() {
		if (this.audioSupported()) {
			this.display.play();
		} else if (this.bgSrc) {
			this.display.src = this.bgSrc;
			this.display.volume = 0;
		}
	}
	_.stop = function() {
		if (this.audioSupported()) {
			this.display.currentTime = 0;
			this.pause();
		} else if (this.bgSrc) {
			this.display.volume = -10000;
		}
	}
	_.pause = function() {
		if (this.audioSupported()) {
			this.display.pause();
		} else {
			this.stop();
		}
	}
	_.volume = function(value) {
		// TODO fix this for ie
		if (value != undefined) {
			if (this.audioSupported()) {

				this.display.volume = value;
			} else {

				var calc = value * -10000;

				if (calc > 0)
					calc = 0;
				if (calc < -10000)
					calc = -10000;
				this.display.volume = calc;

			}
		}
		if (this.audioSupported()) {
			return this.display.volume;
		} else {

			return (this.display.volume / -10000 != 0 ? this.display.volume / -10000 : 1);

		}

	}
})();
