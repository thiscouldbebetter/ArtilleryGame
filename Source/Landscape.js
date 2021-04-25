 
class Landscape
{
	constructor(size, horizonPoints)
	{
		this.size = size;
		this.horizonPoints = horizonPoints;

		this.color = Color.byName("GreenDark"); 

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

	static random(size, numberOfPoints)
	{
		var points = [];
		for (var i = 0; i < numberOfPoints + 1; i++)
		{
			var point = new Coords(i * size.x / numberOfPoints, 0);
			points.push(point);
		}
 
		var returnValue = new Landscape(size, points).randomize();
 
		return returnValue;
	}
 
	// instance methods
 
	altitudeAtX(xToCheck)
	{
		var edge = this.edgeAtX(xToCheck);
		var horizonPointPrev = edge.vertices[0];
		var horizonPoint = edge.vertices[1];

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

		return altitude;
	}

	collidesWithEdge(edgeOther)
	{
		var returnValue = false;
		var collisionHelper = CollisionHelper.Instance();
		for (var i = 0; i < this.edges.length; i++)
		{
			var edgeThis = this.edges[i];
			var doEdgesCollide = collisionHelper.doEdgesCollide
			(
				edgeThis, edgeOther
			);
			if (doEdgesCollide)
			{
				returnValue = true;
				break;
			}
		}
		return returnValue
	}

	edgeAtX(xToCheck)
	{
		var returnValue = this.edges[0];
 
		for (var i = 0; i < this.edges.length; i++)
		{
			var edge = this.edges[i];
			var horizonPoint = edge.vertices[1];

			if (horizonPoint.x > xToCheck)
			{
				returnValue = edge;
				break;
			}
 		}
 
 		if (returnValue == null)
 		{
			returnValue = this.edges[this.edges.length - 1];
 		}
 
		return returnValue;
	}

	randomize()
	{
		var altitudeMid = this.size.y / 2;
		var altitudeRange = this.size.y / 2;
		var altitudeRangeHalf = altitudeRange / 2;
		var altitudeMin = altitudeMid - altitudeRangeHalf;
		var altitudeMax = altitudeMin + altitudeRange;

		var altitudeChangeMaxPerPoint = 4 * this.size.x / this.edges.length;
 
		var pointPrev = this.edges[0].vertices[0];
		pointPrev.y = altitudeMin + Math.random() * altitudeRange;

		for (var i = 0; i < this.edges.length; i++)
		{
			var edge = this.edges[i];
			var point = edge.vertices[1];
			point.y = pointPrev.y + Math.random() * altitudeChangeMaxPerPoint;
			if (point.y < altitudeMin)
			{
				point.y = altitudeMin + (altitudeMin - point.y);
			}
			else if (point.y > altitudeMax)
			{
				point.y = altitudeMax - (point.y - altitudeMax);
			}
		}
		this._vertices = null;
 
		return this;
	}

	slopeAtX(xToCheck)
	{
		var edge = this.edgeAtX(xToCheck);
		var horizonPointPrev = edge.vertices[0];
		var horizonPoint = edge.vertices[1];

		var horizonChange = horizonPoint.clone().subtract
		(
			horizonPointPrev
		).normalize();

		var returnValue = new Polar().fromCoords(horizonChange).azimuthInTurns;
		return returnValue;
	}
 
	// drawable

	drawToDisplay(display)
	{
		if (this._vertices == null)
		{
			this._vertices = ArrayHelper.clone(this.horizonPoints);
			this._vertices.push(this.size.clone());
			this._vertices.push(Coords.fromXY(0, this.size.y));
		}
		display.drawPolygon(this._vertices, this.color);
	}
}
