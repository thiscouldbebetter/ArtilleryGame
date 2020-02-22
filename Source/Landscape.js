 
function Landscape(size, horizonPoints)
{
	this.size = size;
	this.horizonPoints = horizonPoints;

	this.color = "Green"; 

	this.edges = [];
	var horizonPointPrev = horizonPoints[0];
	for (var i = 1; i < horizonPoints.length; i++)
	{
		var horizonPoint = horizonPoints[i];
		var edge = new Edge([horizonPointPrev, horizonPoint]);
		this.edges.push(edge);
		horizonPointPrev = horizonPoint;
	}
}

{
	Landscape.random = function(size, numberOfPoints)
	{
		var points = [];
		for (var i = 0; i < numberOfPoints + 1; i++)
		{
			var point = new Coords(i * size.x / numberOfPoints, 0);
			points.push(point);
		}
 
		var returnValue = new Landscape(size, points).randomize();
 
		return returnValue;
	};
 
	// instance methods
 
	Landscape.prototype.altitudeAtX = function(xToCheck)
	{
		var returnValue;
 
		for (var i = 0; i < this.edges.length; i++)
		{
			var edge = this.edges[i];
			var horizonPointPrev = edge.vertices[0];
			var horizonPoint = edge.vertices[1];

			if (horizonPoint.x > xToCheck)
			{
				var horizonChange = horizonPoint.clone().subtract
				(
					horizonPointPrev
				);

				var t = 
					(xToCheck - horizonPointPrev.x)
					/ (horizonChange.x);
 
				var altitude = 
					horizonPointPrev.y 
					+ (t * horizonChange.y);
 
				returnValue = altitude;
				break;
			}
 
			horizonPointPrev = horizonPoint;
		}
 
		return returnValue;
	};

	Landscape.prototype.collidesWithEdge = function(edgeOther)
	{
		var returnValue = false;
		var collisionHelper = CollisionHelper.Instance;
		for (var i = 0; i < this.edges.length; i++)
		{
			var edgeThis = this.edges[i];
			var doEdgesCollide = collisionHelper.doEdgesCollide
			(
				edgeThis, edgeOther
			);
			if (doEdgesCollide == true)
			{
				returnValue = true;
				break;
			}
		}
		return returnValue
	};

	Landscape.prototype.randomize = function()
	{
		var altitudeMid = this.size.y / 2;
		var altitudeRange = this.size.y / 2;
		var altitudeRangeHalf = altitudeRange / 2;
		var altitudeMin = altitudeMid - altitudeRangeHalf;
		var altitudeMax = altitudeMin + altitudeRange;
 
		this.edges[0].vertices[0].y = 
			altitudeMin + Math.random() * altitudeRange;
		for (var i = 0; i < this.edges.length; i++)
		{
			var edge = this.edges[i];
			var point = edge.vertices[1];
			point.y = altitudeMin + Math.random() * altitudeRange;
		}
		this._vertices = null;
 
		return this;
	};
 
	// drawable

	Landscape.prototype.drawToDisplay = function(display)
	{
		if (this._vertices == null)
		{
			this._vertices = this.horizonPoints.clone();
			this._vertices.push(this.size.clone());
			this._vertices.push(new Coords(0, this.size.y));
		}
		display.drawPolygon(this._vertices, this.color);
	};
}
