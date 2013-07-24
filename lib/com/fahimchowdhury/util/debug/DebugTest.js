var DebugTest = function(){};
(function() {
	var _ =DebugTest.prototype;
	
	_.init=function()
	{
		Debug.start("debugTest_init");
		//var test = test1;
		for(var a=0;a<100000000;a++)
		{
			var rand = Math.random();
		}
		Debug.stop("debugTest_init");
	};
	
})();