var URLRequest=function(url){
	this.init(url);
};
(function()
{
	var _ = URLRequest.prototype;
	
	//global variables
	_.url="";
	_.data=null;
	_.callback=null;
	//methods
	_.init=function(url)
	{
		this.url=url;
	};
})();
