 
function Polar(azimuthInTurns, radius)
{
	this.azimuthInTurns = azimuthInTurns;
	this.radius = radius;
}

{
	Polar.RadiansPerTurn = Math.PI * 2;
	Polar.DegreesPerTurn = 360;
 
	Polar.prototype.toCoords = function(coords)
	{
		var azimuthInRadians = this.azimuthInTurns * Polar.RadiansPerTurn; 
		coords.x = Math.cos(azimuthInRadians) * this.radius;
		coords.y = Math.sin(azimuthInRadians) * this.radius;
		return coords;
	}
 
	Polar.prototype.trimAzimuthToRangeMinMax = function(min, max)
	{
		if (this.azimuthInTurns < min)
		{
			this.azimuthInTurns = min;
		}
		else if (this.azimuthInTurns > max)
		{
			this.azimuthInTurns = max;
		}
		return this;
	}
}
