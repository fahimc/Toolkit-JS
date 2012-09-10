var VideoPlayer = function() {
	this.videoId = "videoplayer";
	this.skin = "video-js vjs-default-skin";
	this.preload = "";
	this._controls="";
	this.data="{}";
	this.build = function() {
		Class._super(this, "build");
		var s =this.display.style;
		var d = document.createElement("video");
		this.display  =  d;
		this.display.style = s;
		
		this.display.setAttribute("id",this.videoId); 
		this.display.setAttribute("class",this.skin); 
		this.display.setAttribute("preload",this.preload); 
		this.display.setAttribute("data-setup",this.data); 
		this.display.setAttribute(this._controls); 
		
	}
	this.controls = function(value)
	{
		if(value==false)
		{
			this._controls="";
		}else{
			this._controls="controls";
		}
	}
	this.arrange=function()
	{
		Class._super(this, "arrange");
		
	}
};

Class.extend(VideoPlayer, UIElement);
