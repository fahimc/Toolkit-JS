var QuantumButton = {
	currentObserverId : null,
	display : null,
	observers : [],
	registerObserver : function(id) {
		if (!this.observers[id])
			this.observers[id] = {
				text : "",
				state : "visible",
				className : "",
				x : 0,
				y : 0
			};
	},
	updateData : function(key, val) {
		
		if (this.observers[this.currentObserverId] && this.observers[this.currentObserverId][key]!=undefined)
		{
			this.observers[this.currentObserverId][key] = val;
			this.updateButton();
		}
	},
	create : function() {
		if (!this.display) {
			this.display = document.createElement("div");
			this.display.style.position = "absolute";
		}
		this.addChildToObserver();
	},
	addChildToObserver : function() {
		if (document.getElementById(this.currentObserverId)) {
			document.getElementById(this.currentObserverId).appendChild(this.display);
		}
	},
	removeChildFromObserver : function(id) {
		if(!this.currentObserverId)return;
		if (document.getElementById(id)) {
			document.getElementById(id).removeChild(this.display);
		}
	},
	updateButton : function() {
		
		this.display.innerHTML ="<p>" +this.observers[this.currentObserverId].text+"</p>";
		this.display.style.left = this.observers[this.currentObserverId].x + "px";
		this.display.style.top = this.observers[this.currentObserverId].y + "px";
		this.display.className = this.observers[this.currentObserverId].className;
		if (this.observers[this.currentObserverId].state == "hidden") {
			this.display.style.display = "none";
		} else {
			this.display.style.display = "block";
		}
	},
	onQuantumChange : function(id) {
		this.removeChildFromObserver(this.currentObserverId);
		this.currentObserverId = id;
		this.updateButton();
		this.addChildToObserver();
	}
}
