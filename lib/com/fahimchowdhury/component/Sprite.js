var Sprite = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Sprite, UIElement);
	/*
	 * public functions
	 */
	_.isGradient = false;
	_.lineStyle=function(thickness,color)
	{
		var t=thickness!=undefined?thickness:1;
		var c=color!=undefined?color:"#000";
		this.display.style.border="solid "+t+"px "+c;
		delete t;
		delete c;
	};
	_.beginGradientFill=function(type,colors,alpha)
	{
		this.isGradient=true;
		this.display.style.background = colors[0];
		this.display.style.background = '-webkit-gradient(linear, left top, left bottom, from('+colors[0]+'), to('+colors[1]+'))';
		this.display.style.background = '-moz-linear-gradient(top,  '+colors[0]+',  '+colors[0]+')';
		this.display.style['filter'] = "progid:DXImageTransform.Microsoft.gradient(startColorstr='"+colors[0]+"', endColorstr='"+colors[1]+"',GradientType=0);";
	};
	_.drawRect=function(x,y,w,h,c,z)
	{
		this.x(x);
		this.y(y);
		this.width(w);
		this.height(h);
		this.setColor(c);
	};
	_.drawRoundRect= function(x,y,w,h,rad,c)
	{
		
		this.x(x);
		this.y(y);
		this.width(w);
		this.height(h);
		this.setColor(c);
		this.setCorners(rad);
		
	};
	_.drawCircle= function(x,y,rad,c)
	{
		
		this.x(x);
		this.y(y);
		this.width(rad*2);
		this.height(rad*2);
		this.setColor(c);
		this.setCorners(rad);
		
	};
	_.setColor=function(c)
	{
		if(c && !this.isGradient)this.display.style.backgroundColor = c;
	};
	_.setCorners=function(rad)
	{
		this.display.style.behavior= 'url(lib/com/wezside/component/border-radius.htc)';
		this.display.style.webkitBorderRadius = rad+"px";
		this.display.style.MozBorderRadius = rad+"px";
		this.display.style['-moz-border-radius']=rad+"px";
		this.display.style.borderRadius =rad+"px";
		this.display.style['border-radius']=rad+'px '+rad+'px '+rad+'px '+rad+'px'; 
	};
})();
