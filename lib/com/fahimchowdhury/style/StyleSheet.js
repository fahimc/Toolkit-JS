var StyleSheet = {
	props : {
		defaultFontSize : null,
		defaultStageWidth : 0,
		defaultStageHeight : 0
	},
	getFontSize : function(element) {
		var size = this.getStyle(element, 'font-size');
		if (size.indexOf('em') > -1) {
			var defFont = this.getStyle(document.body, 'font-size');
			if (defFont.indexOf('pt') > -1) {
				defFont = Math.round(parseInt(defFont) * 96 / 72);
			} else {
				defFont = parseInt(defFont);
			}
			size = Math.round(defFont * parseFloat(size));
		} else if (size.indexOf('pt') > -1) {
			size = Math.round(parseInt(size) * 96 / 72)
		}
		return parseInt(size);
	},
	getStyle : function(element, property) {
		var s = false;
		if (element.currentStyle) {
			var p = property.split('-');
			var str = new String('');
			for (i in p) {
				str += (i > 0) ? (p[i].substr(0, 1).toUpperCase() + p[i].substr(1)) : p[i];
			}
			s = element.currentStyle[str];
		} else if (window.getComputedStyle) {
			s = window.getComputedStyle(element, null).getPropertyValue(property);
		}
		return s;
	},
	autoSizeFont : function(value) {
		
		if(value)
		{
			Utensil.addListener(window, "resize", StyleSheet.resizeFont);	
			StyleSheet.resizeFont();		
		}else{
			Utensil.removeListener(window, "resize", StyleSheet.resizeFont);		
		}
	},
	resizeRatio:function(w,h)
	{
		var r = Utensil.stageWidth() /StyleSheet.props.defaultStageWidth;
		var hr = Utensil.stageHeight() / StyleSheet.props.defaultStageHeight;
		/*
		 * Calculate the ratio
		 */
		if (hr < r)
			r = hr;
		r = r.toFixed(2);
		if (r > 1)
			r = 1;
			
			return r;
	},
	resizeFont:function()
	{
		if(!StyleSheet.props.defaultFontSize)
		{
			StyleSheet.props.defaultFontSize = StyleSheet.getFontSize(Utensil.stage(), "font-size");
			StyleSheet.props.defaultStageWidth = Utensil.stageWidth();
			StyleSheet.props.defaultStageHeight = Utensil.stageHeight();
		}
		var  r= StyleSheet.resizeRatio();
		var fontSize = ((10 / StyleSheet.props.defaultFontSize) * 100) * r;
		fontSize = fontSize.toFixed(2);

		Utensil.stage().style.fontSize = Math.round(fontSize) + "%";
	}
};
