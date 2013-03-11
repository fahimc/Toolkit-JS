var IIterator = {
	reset : function() {
	},
	next : function() {
	},
	hasNext : function() {
	},
	index : function() {
	},
	purge : function() {
	},
	length : function() {
	}
}
var ArrayIterator =function(collection){
	this._index = 0;
	this._collection=collection;
	this.reset =function()
	{
		this._index = 0;
	};
	this.next =function()
	{
		return this._collection[this._index++];
	};
	this.hasNext =function()
	{
		return this._index < this._collection.length;
	};
	this.length =function()
	{
		return this._collection.length;
	};
	this.index =function()
	{
		return this._index;
	};
	this.purge =function()
	{
		delete this._collection;
	};
	
	
};
Class.implement(ArrayIterator,IIterator);
