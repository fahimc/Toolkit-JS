var ResourceManager = {
	assetJson : [],
	assets : null,
	copyUrl : null,
	copy : null,
	currentIndex : 0,
	currentAsset : null,
	images : [],
	totalAssets : 0,
	preloadImages:true,
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
		if( typeof (value) == "string") {
			this.copyUrl = value;
		} else {
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
		this.currentIndex = 0;
		this.checkAssetJson(this.currentIndex);
	},
	checkAssetJson : function(index) {
		
		if(this.assetJson[index]) {
			this.currentIndex = index;
			if( typeof (this.assetJson[index]) == "string") {
				Utensil.URLLoader.load(this.assetJson[index], this.onAssetLoaded);
			} else {
				this.onAssetLoaded();
			}
		} else {
			this.assetsInitialised();
		}

	},
	assetsInitialised : function() {
		this.currentIndex = 0;
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
				
			if(this.currentAsset != null && this.currentAsset.path != null) {
				this.currentIndex++;
				var suffixAr = this.currentAsset.path.split(".");
				var suffix = suffixAr[suffixAr.length-1];
				var isImage = (suffix.toLowerCase().indexOf("jpg") >= 0 || suffix.toLowerCase().indexOf("jpeg") >= 0 || suffix.toLowerCase().indexOf("png") >= 0 || suffix.toLowerCase().indexOf("gif") >= 0);
				if(this.preloadImages==true && isImage) {
				
					var img = new Image();
					this.images[this.currentAsset.name] = img;
					Utensil.addListener(img, "load", function() {
						par.onAssetComplete();
					});
					img.src = this.currentAsset.path;
				}else{
					par.onAssetComplete();
				}
			}
		}
	},
	onAssetComplete : function(event) {

		this.currentAsset = null;
		if(this.currentIndex >= this.totalAssets) {
			this.currentIndex = 0;
			if(this.copyUrl) {
				Utensil.URLLoader.load(this.copyUrl, this.onCopyLoaded);
			} else {
				Event.dispatch(this, Event.COMPLETE);
			}
		} else {
			this.loadAsset();
		}
	},
	onAssetLoaded : function(t, x) {
		if(t)
			ResourceManager.assetJson[ResourceManager.currentIndex] = eval("(" + t + ')');
		ResourceManager.currentIndex++;
		ResourceManager.checkAssetJson(ResourceManager.currentIndex);
	},
	onCopyLoaded : function(t, x) {

		ResourceManager.copy = eval("(" + t + ')');
		Event.dispatch(ResourceManager, Event.COMPLETE);
	},
	getAssetByName : function(value) {
		for(var prop in this.assets) {
			if(prop == value) {
				var asset = this.assets[prop];
				var suffix = asset.path.split(".")[1];
				var isImage = (suffix.toLowerCase().indexOf("jpg") >= 0 || suffix.toLowerCase().indexOf("jpeg") >= 0 || suffix.toLowerCase().indexOf("png") >= 0 || suffix.toLowerCase().indexOf("gif") >= 0);
				if(this.preloadImages==true && isImage) {
				var img = this.images[asset.name];
				return img;
				}else{
					return asset;
				} 
			}
		}
		return null;
	},
	getCopyByID : function(value) {
		if(this.copy[value])
			return this.copy[value];
	}
};