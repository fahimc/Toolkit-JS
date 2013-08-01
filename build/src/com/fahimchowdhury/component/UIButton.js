var UIButton = function() {
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(UIButton, UIElement);
	/*
	 * public functions
	 */
	_.sprite = null;
	_.sliceRect ={};
	_.topLeft =null;
	_.topMid =null;
	_.topRight =null;
	_.midLeft =null;
	_.midMid =null;
	_.midRight =null;
	_.bottomLeft =null;
	_.bottomMid =null;
	_.bottomRight =null;
	_.scale9Grid=function(x,y,w,h,iw,ih)
	{
		this.sliceRect.x = x;
		this.sliceRect.y = y;
		this.sliceRect.width = w;
		this.sliceRect.height = h;
		this.sliceRect.imgWidth = iw;
		this.sliceRect.imgHeight = ih;
	};
	_.attach=function(imgSrc)
	{
		this.sprite = new Image();
		this.sprite.src=imgSrc;
	};
	_.build =function()
	{
		Class._super(this, "build");		
		
		var rw = this.sliceRect.imgWidth  -(this.sliceRect.x + this.sliceRect.width);
		console.log(rw);
		var mw = this.width()  -(this.sliceRect.x + rw);
		this.topLeft = this.createSlice(0,0,this.sliceRect.x,this.sliceRect.y);
		this.addUIChild(this.topLeft);
		
		this.topMid = this.createSlice(this.sliceRect.x,0,mw,this.sliceRect.height,true);
		this.addUIChild(this.topMid);
		
		this.topRight = this.createSlice(this.sliceRect.x +mw,0,rw,this.sliceRect.y);
		this.addUIChild(this.topRight);
		
		this.midLeft = this.createSlice(0,this.sliceRect.y,this.sliceRect.x,this.sliceRect.height);
		this.addUIChild(this.midLeft);
		
		this.midMid = this.createSlice(this.sliceRect.x,this.sliceRect.y,mw,this.sliceRect.height);
		this.addUIChild(this.midMid);
		
		this.midRight = this.createSlice(this.sliceRect.x +mw,this.sliceRect.y,rw,this.sliceRect.height);
		this.addUIChild(this.midRight);	
		
		this.bottomLeft = this.createSlice(0,this.sliceRect.y+this.sliceRect.height,this.sliceRect.x,this.height()-this.sliceRect.height);
		this.addUIChild(this.bottomLeft);
		
		this.bottomMid = this.createSlice(this.sliceRect.x,this.sliceRect.y+this.sliceRect.height,mw,this.height()-this.sliceRect.height);
		this.addUIChild(this.bottomMid);
		
		this.bottomRight = this.createSlice(this.sliceRect.x +mw,this.sliceRect.y+this.sliceRect.height,rw,this.height()-this.sliceRect.height);
		this.addUIChild(this.bottomRight);
		
	}
	_.createSlice=function(x,y,w,hh,mid)
	{
		var h = document.createElement('div');
		h.style.position ="absolute";
		h.style.overflow ="hidden";
		h.style.width =w+"px";
		h.style.height =hh+"px";
		
		var img  = new Image();
		img.src = this.sprite.src;
		img.style.position ="absolute";
		img.style.left = "-"+x+"px";
		img.style.top = "-"+y+"px";
		if(mid)
		{
			img.style.width = (x+w)+"px"; 
		}
		h.appendChild(img);
		
		h.style.top =y+"px";
		h.style.left =x+"px";
		
		return h;
	}
})();
