var Slider = function() {
	
};
(function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Slider, UIElement);
	_.EVENT_SLIDER_CHANGE="EVENT_SLIDER_CHANGE";
	_.track=null;
	_.trackColor="#999";
	_.trackBorderColor="#333";
	_.thumbBorderColor="#333";
	_.thumbColor="#e4e4e4";
	_.fontSize="11px";
	_.thumb=null;
	_.legend=null;
	_.thumbWidthPercent=0.1;
	_._showValue=true;
	_._showLegend=true;
	_.valueHolder = null;
	/*
	 * public functions
	 */
	_.build = function() {
		/*
		 * build code
		 */
		Class._super(this, "build");
		this.buildTrack();
		this.buildThumb();
		this.showValue(this._showValue);
		this.showLegend(this._showLegend);
		Utensil.addListener(this.thumb.display,"mousedown",this.createHandler(this,"onMouseDown"));
	};
	_.onMouseDown=function()
	{
		Utensil.addListener(document,"mouseup",this.createHandler(this,"onMouseUp"));
		Utensil.addListener(document,"mousemove",this.createHandler(this,"onMouseMove"));
	};
	_.onMouseMove=function()
	{
		this.setThumbPos(Utensil.mouseX(this.track.display,event));
		this.updateValue();
	};
	_.setThumbPos=function(x)
	{
		if(x<0)x=0;
		if(x>this.width()-this.thumb.width()-2)x=this.width()-this.thumb.width()-2;
		this.thumb.x(x);
		delete x;
	};
	_.updateValue=function()
	{
		var w = this.width()-this.thumb.width();
		var val = (this.thumb.x()/w)* 100;
		val  = val.toFixed(0) ;
		if(this.valueHolder)this.valueHolder.text(val);
		Event.dispatch(this,this.EVENT_SLIDER_CHANGE,null,val);
	};
	_.onMouseUp=function()
	{
		Utensil.removeListener(document,"mouseup",this.handlers.onMouseUp);
		Utensil.removeListener(document,"mousemove",this.handlers.onMouseMove);
		
		this.removeHandler(this,"onMouseUp");
		this.removeHandler(this,"onMouseMove");
	};
	_.showValue=function(value)
	{
		if(value==undefined)return this._showValue;
		if(value==true)
		{
			this.buildValueHolder();
		}
	};
	_.showLegend=function(value)
	{
		if(value==undefined)return this._showLegend;
		if(value==true)
		{
			this.buildLegend();
		}
	};
	_.legendText = function(value)
	{
		if(this.legend)
		{
			this.legend.text(value);
		}
	};
	_.buildLegend=function()
	{
		if(this.legend)return;
		this.legend = new Label();
		this.legend.width(50);
		this.legend.height(this.fontSize.replace("px",""));
		this.legend.build();
		this.legend.setStyle();
		this.addChild(this.legend);
		this.legend.text("");
		this.legend.arrange();
		
	};
	_.buildValueHolder=function()
	{
		if(this.valueHolder)return;
		this.valueHolder = new Label();
		this.valueHolder.width(50);
		this.valueHolder.height(this.fontSize.replace("px",""));
		this.valueHolder.build();
		this.valueHolder.setStyle();
		this.addChild(this.valueHolder);
		this.valueHolder.text(0);
		this.valueHolder.arrange();
		
	};
	_.buildTrack=function()
	{
		this.track = new Sprite();
		this.track.build();
		this.track.lineStyle(1,this.trackBorderColor);
		this.track.drawRect(0,0,this.width()?this.width():100,this.height()?this.height():20,this.trackColor);
		this.track.setStyle();
		this.addChild(this.track);
		this.track.arrange();
	};
	_.buildThumb=function()
	{
		this.thumb = new Sprite();
		this.thumb.build();
		this.thumb.lineStyle(1,this.thumbBorderColor);
		this.thumb.drawRect(0,0,this.thumbWidthPercent * (this.width()?this.width():100),this.height()-2?this.height()-2:18,this.thumbColor);
		this.thumb.setStyle();
		this.track.addChild(this.thumb);
		this.thumb.arrange();
	};
	_.setStyle=function()
	{
		Class._super(this, "setStyle");
		this.track.display.style.backgroundColor = this.trackColor;
		this.thumb.display.style.backgroundColor = this.thumbColor;
		if(this.valueHolder)this.valueHolder.display.style.fontSize = this.fontSize;
		if(this.legend)this.legend.display.style.fontSize = this.fontSize;
	};
	_.arrange=function()
	{
		Class._super(this, "arrange");
		this.thumb.height(this.height()-2);
		this.thumb.width(this.width() * this.thumbWidthPercent);
		if(this.legend)
		{
			this.track.x(this.legend.width());
			this.track.y((this.legend.height()-this.track.height())*0.5);
		}
		this.track.height(this.height());
		this.track.width(this.width());
		if(this.valueHolder)
		{
			this.valueHolder.height(this.fontSize.replace("px",""));
			this.valueHolder.x(this.track.x()+this.track.width()+10);
			this.valueHolder.y((this.track.height()-this.valueHolder.height())*0.5);
		}
	}
	
})();