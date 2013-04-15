/* IModel */
var IModel = {
	set : function(name, value) {
	},
	get : function(name) {

	},
	remove : function(name) {

	}
};
/* Model */
var Model = function(data) {
	this.set = function(name, value) {
		this[name] = value;
	}
	this.get = function(name) {
		if (this[name] != undefined) {
			return this[name];
		}
		return null;
	}
	this.remove = function(name) {
		if (this[name])
			delete this[name];
	}
	this.init = function(data) {
		if (data) {
			for (var n in data) {
				this.set(n, data[n]);
			}
		}
	};
	if(data)this.init(data);
};
Class.implement(Model, IModel);
/* ViewModel */
var ViewModel = function(data) {
	this.TYPE_ID = "ViewModel_TYPE_ID";
	this.type = this.TYPE_ID;
	this.set = function(name, value) {
		Class._super(this, "set", name, value);
		if (document.getElementById(name) && this.type == this.TYPE_ID) {
			document.getElementById(name).innerHTML = value;
		}
	};
	Class._super(this,"init",data);
};
Class.extend(ViewModel, Model);

