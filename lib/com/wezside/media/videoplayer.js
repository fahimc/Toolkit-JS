var VideoPlayer = function() {
	this.videoId = "videoplayer";
	this.skin = "video-js vjs-default-skin";
	VideoPlayer.EVENT_ADDED_TO_STAGE = "ADDED_TO_STAGE";
	this.preload = "";
	this._controls = "";
	this.data = "{}";
	this.player = null;
	this.sourceArray = [];
	this.src = "", this.currentHeight = 0;
	this.build = function() {

		var params = {};
		params.bgcolor = "#ffffff";
		_V_.options.flash.params = params;
		if (Utensil.Browser.getInternetExplorerVersion() == 9) {
			_V_.options.techOrder = ["flash", "html5", "links"];
		}
		VideoJS.options.flash.swf = "resource/swf/VideoJS.swf";
		var d = document.createElement("video");

		this.display = d;

		d.setAttribute("id", this.videoId);
		d.setAttribute("class", this.skin);
		d.setAttribute("preload", this.preload);
		d.setAttribute("data-setup", this.data);
		if (this._controls != "")
			d.setAttribute(this._controls);

		if (this.sourceArray.length > 0) {
			this.setSource();
		}

		var par = this;
		this.ieAddToStageHandler = function(e) {
			par.addedToStageHandler(event)
		};

		this.stageTimer = setInterval(function() {
			par.checkStage()
		}, 100);

	}
	this.checkStage = function() {

		if (document.getElementById(this.videoId)) {

			clearInterval(this.stageTimer);
			this.addedToStageHandler();
		}
	}
	this.setStyle = function() {

	}
	this.addSource = function(value) {
		var dotAr = value.split(".");
		var type = "video/" + dotAr[dotAr.length - 1];
		if (dotAr[dotAr.length - 1].toLowerCase() == "mp4")
			this.src = value;
		var s = document.createElement("source");
		s.setAttribute("type", type);
		s.setAttribute("src", value);
		this.sourceArray.push(s);

	}
	this.setSource = function() {
		for (var a = 0; a < this.sourceArray.length; a++) {
			this.display.appendChild(this.sourceArray[a]);
		}
	}
	this.addedToStageHandler = function(event) {

		this.player = _V_(this.videoId);
		this.player.src(this.src);

		var par = this;
		this.onReadyHandler = function(e) {
			par.onReady(event);
		};
		if (Utensil.Browser.isIE) {
			this.onReadyHandler();
			this.player.play();
			var par=this;
			this.player.addEvent("loadeddata",function(){ par.loaded()});
		} else {
			this.player.ready(this.onReadyHandler);
		}
	}
	this.loaded=function()
	{
		this.player.pause();
		
	}
	this.controls = function(value) {
		if (value == false) {
			this._controls = "";
		} else {
			this._controls = "controls";
		}
	}
	this.width = function(value) {
		Class._super(this, "width");
		if (this.player) {
			if (value) {
				this.player.width(value);
				if(document.getElementById(this.videoId))
				{
					document.getElementById(this.videoId).style.width=value+"px";
				}
			} else {
				return this.player.width();
			}
		}
	}
	this.height = function(value) {
		Class._super(this, "height");
		if (this.player) {
			if (value) {
				this.player.height(value);
				this.currentHeight = value;
				if(document.getElementById(this.videoId))
				{
					document.getElementById(this.videoId).style.height=value+"px";
				}
			} else {
				return this.currentHeight > this.player.height() ? this.currentHeight : this.player.height();
			}
		}
	}

	this.arrange = function() {

	}
	this.onReady = function() {
		
		this.setStyle();
		Event.dispatch(this, VideoPlayer.EVENT_ADDED_TO_STAGE);
	}
	this.play = function() {
		this.player.play();
	}
	this.pause = function() {
		this.player.pause();
	}
	this.currentTime = function(value) {
		if (value) {
			this.player.currentTime(value);
		} else {
			return this.player.currentTime();
		}

	}
	this.volume = function(value) {
		if (value) {
			this.player.volume(value);
		} else {
			return this.player.volume();
		}

	}
	this.visible = function(value) {

		if (document.getElementById(this.videoId) && value == false) {
			document.getElementById(this.videoId).style.visibility = "hidden";
		} else if (document.getElementById(this.videoId) && value == true) {
			document.getElementById(this.videoId).style.visibility = "visible";
		} else if (document.getElementById(this.videoId)) {
			return document.getElementById(this.videoId).style.visibility == "hidden" ? false : true;
		}

	}
	this.duration = function() {
		return this.player.duration();
	}
	this.buffered = function() {
		return this.player.buffered();
	}
	this.bufferedPercent = function() {
		return this.player.bufferedPercent();
	}
	this.requestFullScreen = function() {
		this.player.requestFullScreen();
	}
	this.cancelFullScreen = function() {
		this.player.cancelFullScreen();
	}
};

Class.extend(VideoPlayer, DisplayObject);
