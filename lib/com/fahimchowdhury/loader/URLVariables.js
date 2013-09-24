var URLVariables=function(){};
(function()
{
	var _ = URLVariables.prototype;
	
	//global variables
	_.data={};
	//methods
	_.set=function(key,value){
		this.data[key]=value; 
	};
	_.get=function(key)
	{
		return this.data[key];
	}; 
})();
