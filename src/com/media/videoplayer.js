var VideoPlayer = function() {
	this.videoId = "videoplayer";
	this.skin = "video-js vjs-default-skin";
	VideoPlayer.EVENT_ADDED_TO_STAGE = "ADDED_TO_STAGE";
	this.preload = "";
	this._controls = "";
	this.data = "{}";
	this.player = null;
	this.sourceArray = [];
	this.build = function() {

		var d = document.createElement("video");

		this.display = d;

		d.setAttribute("id", this.videoId);
		d.setAttribute("class", this.skin);
		d.setAttribute("preload", this.preload);
		d.setAttribute("data-setup", this.data);
		if(this._controls != "")
			d.setAttribute(this._controls);

		if(this.sourceArray.length > 0) {
			this.setSource();
		}

		var par = this;
		this.ieAddToStageHandler = function(e) {
			par.addedToStageHandler(event)
		};
		Utensil.addListener(d, "propertychange", this.ieAddToStageHandler);
		Utensil.addListener(d, "DOMNodeInserted", this.ieAddToStageHandler);

		//this.player = _V_(this.videoId);

		//this.player.src(this.sourceArray);

		//_V_(this.videoId).ready(this.onReady);

	}
	this.setStyle = function() {

	}
	this.addSource = function(value) {
		var dotAr = value.split(".");
		var type = "video/" + dotAr[dotAr.length - 1];

		var s = document.createElement("source");
		s.setAttribute("type", type);
		s.setAttribute("src", value);
		this.sourceArray.push(s);

	}
	this.setSource = function() {
		for(var a = 0; a < this.sourceArray.length; a++) {
			this.display.appendChild(this.sourceArray[a]);
		}
	}
	this.addedToStageHandler = function(event) {

		Utensil.removeListener(this.display, "propertychange", this.ieAddToStageHandler);
		Utensil.removeListener(this.display, "DOMNodeInserted", this.ieAddToStageHandler);
		this.player = _V_(this.videoId);
		this.player.src("http://preview.ogilvyeurope.com/Tech/landrover/resource/video/90.mp4");

		var par = this;
		this.onReadyHandler = function(e) {
			par.onReady(event)
		};
		this.player.ready(this.onReadyHandler);
	}
	this.controls = function(value) {
		if(value == false) {
			this._controls = "";
		} else {
			this._controls = "controls";
		}
	}
	this.width = function(value) {
		Class._super(this, "width");
		this.player.width(value);
	}
	this.height = function(value) {
		Class._super(this, "height");
		this.player.height(value);
	}
	this.arrange = function() {

	}
	this.onReady = function() {

		Event.dispatch(this, VideoPlayer.EVENT_ADDED_TO_STAGE);
	}
	this.play = function() {
		this.player.play();
	}
	this.pause = function() {
		this.player.pause();
	}
	this.currentTime = function(value) {
		if(value) {
			this.player.currentTime(value);
		} else {
			return this.player.currentTime();
		}

	}
	this.volume = function(value) {
		if(value) {
			this.player.volume(value);
		} else {
			return this.player.volume();
		}

	}
	this.duration = function() {
		this.player.duration();
	}
	this.buffered = function() {
		this.player.buffered();
	}
	this.requestFullScreen = function() {
		this.player.requestFullScreen();
	}
	this.cancelFullScreen = function() {
		this.player.cancelFullScreen();
	}
};

Class.extend(VideoPlayer, DisplayObject);
