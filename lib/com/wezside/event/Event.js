var Event =
{
	COMPLETE:"EVENT_COMPLETE",
	PROGRESS:"EVENT_PROGRESS",
	/*
	 * event handlers
	 */
	addListener : function(obj,type, callback, scope) {
		var args = [];
		var numOfArgs = arguments.length;
		for(var i = 0; i < numOfArgs; i++) {
			args.push(arguments[i]);
		}
		args = args.length > 3 ? args.splice(3, args.length - 1) : [];
		if(!obj.listeners)obj.listeners={};
		if( typeof obj.listeners[type] != "undefined") {
			obj.listeners[type].push({
				scope : scope,
				callback : callback,
				args : args
			});
		} else {
			obj.listeners[type] = [{
				scope : scope,
				callback : callback,
				args : args
			}];
		}
	},
	removeListener : function(obj,type, callback, scope) {
		if( typeof obj.listeners[type] != "undefined") {
			var numOfCallbacks = obj.listeners[type].length;
			var newArray = [];
			for(var i = 0; i < numOfCallbacks; i++) {
				var listener = obj.listeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {

				} else {
					newArray.push(listener);
				}
			}
			obj.listeners[type] = newArray;
		}
	},
	dispatch : function(obj,type, target) {
		var numOfListeners = 0;
		var event = {
			type : type,
			target : target
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i = 0; i < numOfArgs; i++) {
			args.push(arguments[i]);
		};
		args = args.length > 2 ? args.splice(2, args.length - 1) : [];
		args = [event].concat(args);
		if( typeof obj.listeners[type] != "undefined") {
			var numOfCallbacks = obj.listeners[type].length;
			for(var i = 0; i < numOfCallbacks; i++) {
				var listener = obj.listeners[type][i];
				if(listener && listener.callback) {
					listener.args = args.concat(listener.args);
					listener.callback.apply(listener.scope, listener.args);
					numOfListeners += 1;
				}
			}
		}
	}
}
