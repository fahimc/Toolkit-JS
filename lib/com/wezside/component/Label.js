var Label = function() {
}; (function() {
	/*
	 * local variables
	 */
	var _ = Class.extend(Label, UIElement);
	/*
	 * public functions
	 */
	
	
	_.text=function(value)
	{
		if(value!=undefined)
		{
			this.display.innerHTML = value;
		}else{
			return this.display.innerHTML ;
		}
	}
})();
