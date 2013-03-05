var Vehicle = function()
{

}

Vehicle.prototype = {
wheels:0,
	}

var Car = function()
{

}

var _ = Class.extend(Car,Vehicle);

_.wheels = 4;


 var Bike = function()
{

}

var _ = Class.extend(Bike,Vehicle);

_.wheels =2;