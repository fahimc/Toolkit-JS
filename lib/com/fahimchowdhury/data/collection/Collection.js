var Collection = function(arr) {
	this._collection = arr ? arr : [];
	this.reverse = function() {
		this._collection = this._collection.reverse();
	};
	this.iterator = function() {
		return new ArrayIterator(this._collection);
	}
	this.find = function(prop, value) {
		var it = this.iterator();
		var item;

		// Returns the first item
		if (prop == "" && !value && it.hasNext()) {
			item = it.next();
		}
		if (item) {
			it.purge();
			it = null;
			return item;
		}

		while (it.hasNext()) {
			item = it.next();
			if (item.hasOwnProperty(prop) && item[prop] == value)
				return item;

			if ((prop || value ) && (item == prop || item == value ))
				return item;
		}
		it.purge();
		it = null;
		return null;
	};
	this.addItem = function(value) {
		this._collection.push(value);
	};
	this.addItemAt = function(value, index) {
		this._collection.splice(index, 0, value);
	};
	this.getItemAt = function(index) {
		return this._collection[index];
	};
	this.removeItem = function(prop, value) {
		var removeIndex = -1;
		var it = this.iterator();
		while (it.hasNext()) {
			var item = it.next();
			if (item.hasOwnProperty(prop) && item[prop] == value) {
				removeIndex = it.index() - 1;
				break;
			}
		}
		it.purge();
		it = null;
		return this._collection.splice(removeIndex, 1);
	};
	this.removeItemAt = function(index) {
		this._collection.splice(index, 1);
	}

	this.length = function() {
		return this._collection ? this._collection.length : 0;
	};

};