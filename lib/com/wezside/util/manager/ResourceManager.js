var ResourceManager = {
	assetJson : [],
	assets : null,
	copyUrl : null,
	copy : null,
	currentIndex : 0,
	currentAsset : null,
	images : [],
	totalAssets : 0,
	addAssets : function(value) {
		/*
		 * store assets objects into an array
		 */
		this.assetJson.push(value);
	},
	addCopy : function(value) {
		/*
		 * store assets objects into an array
		 */
		if(typeof(value) == "string")
		{
			this.copyUrl=value;
		}else{
			this.copy = value;
		}
	},
	mergeObjects : function() {
		this.assets = {};
		for(var a = 0; a < this.assetJson.length; a++) {
			for(prop in this.assetJson[a]) {
				this.assets[prop] = this.assetJson[a][prop];
			}
		}
		this.assetJson = null;
	},
	init : function() {
		/*
		 * get all assets and dispatch a complete
		 */
		this.mergeObjects();
		this.loadAsset();
	},
	loadAsset : function() {
		if(this.assets) {
			var index = 0;
			for(var prop in this.assets) {
				if(index == this.currentIndex) {
					this.currentAsset = this.assets[prop];
					this.currentAsset.name = prop;
				}
				index++;
			}
			this.totalAssets = index;

			var par = this;
			if(this.currentAsset != null) {
				this.currentIndex++;
				var img = new Image();
				this.images[this.currentAsset.name] = img;
				Utensil.addListener(img, "load", function() {
					par.onAssetComplete()
				});
				img.src = this.currentAsset.path;
			}
		}
	},
	onAssetComplete : function(event) {

		this.currentAsset = null;
		if(this.currentIndex >= this.totalAssets) {
			this.currentIndex = 0;
			if(this.copyUrl)
			{
				Utensil.URLLoader.load(this.copyUrl,this.onCopyLoaded);
			}else{
			Event.dispatch(this, Event.COMPLETE);				
			}
		} else {
			this.loadAsset();
		}
	},
	onCopyLoaded:function(t,x)
	{

		ResourceManager.copy = eval("(" + t + ')');
		Event.dispatch(ResourceManager, Event.COMPLETE);
	},
	getAssetByName : function(value) {
		for(var prop in this.assets) {
			if(prop == value) {
				var asset = this.assets[prop];
				var img = this.images[asset.name];
				var div= document.createElement("div");
				div.style.background ="url("+img.src+") no-repeat";
				if(asset.x)div.style.backgroundPositionX = "-"+asset.x+"px";
				if(asset.y)div.style.backgroundPositionY = "-"+asset.y+"px";
				if(asset.width)
				{
					div.style.width = asset.width+"px";
				}else{
					div.style.width =img.width+"px";
				}
				if(asset.height)
				{
					div.style.height= asset.height+"px";
				}else{
					div.style.height =img.height+"px";
				}
				return div;
			}
		}
		return null;
	},
	getCopyByID:function(value)
	{
		if(this.copy[value])return this.copy[value];
	}
};
