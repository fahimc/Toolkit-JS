var IModel = {
	set : function(name, value) {
	},
	get : function(name) {

	},
	remove : function(name) {

	}
};
var Model = function() {
	this.set = function(name, value) {
		this[name] = value;
	}
	this.get = function(name) {
		if (this[name]) {
			return this[name];
		}
		return null;
	}
	this.remove = function(name) {
		if (this[name])
			delete this[name];
	}
};
Class.implement(Model, IModel); 