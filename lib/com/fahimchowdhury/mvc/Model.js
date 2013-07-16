var IModel = {
	set : function(name, value) {
	},
	get : function(name) {

	},
	remove : function(name) {

	}
};
var Model = function(data) {
	this.set = function(name, value) {
		this[name] = value;
	};
	this.get = function(name) {
		if (this[name]!=undefined) {
			return this[name];
		}
		return null;
	};
	this.remove = function(name) {
		if (this[name])
			delete this[name];
	};
	if(data)
	{
		for(var n in data)
		{
			this.set(n,data[n]);
		}
	};
};
Class.implement(Model, IModel); 