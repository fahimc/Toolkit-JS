var Class = {
	/* @method
	 * @desc call this super class. Provide the object and the function as String.
	 * @return Null
	 * */
	_super : function(obj, name,args) {
		obj.baseConstructor[name].apply(obj,Array.prototype.slice.call(arguments, 2));
	},
	/* @method
	 * @desc extends a Class
	 * @return Null
	 * */
	extend : function(newObject, toClone) {
		newObject.prototype = new toClone();
		newObject.prototype.baseConstructor = new toClone();
		return newObject.prototype;
	},
	implement : function(newObject, toClone) {
		for (var prop in toClone) {
			if(!newObject.prototype[prop])newObject.prototype[prop] = toClone[prop];
		}
	}
};