
class CollisionHelper
{
	constructor()
	{
		this.displacement = new Coords();
	}

	static Instance()
	{
		if (CollisionHelper._instance == null)
		{
			CollisionHelper._instance = new CollisionHelper();
		}
		return CollisionHelper._instance;
	}
 
	doCirclesCollide(circle0, circle1)
	{
		var distanceBetweenCenters = this.displacement.overwriteWith
		(
			circle1.center
		).subtract
		(
			circle0.center
		).magnitude();
 
		var sumOfRadii = circle0.radius + circle1.radius;
 
		var returnValue = (distanceBetweenCenters < sumOfRadii);
 
		return returnValue;
	}

	doEdgesCollide(edge0, edge1)
	{
		var returnValue = null;
 
		if (this.edgeProjected == null)
		{
			this.edgeProjected = new Edge([new Coords(), new Coords()]);
		}
		var edgeProjected = this.edgeProjected;
		edgeProjected.overwriteWith(edge1).projectOntoOther(edge0);
		var edgeProjectedStart = edgeProjected.vertices[0];
		var edgeProjectedDirection = edgeProjected.direction;
 
		var distanceAlongEdgeProjectedToXAxis = 
			0 - edgeProjectedStart.y
			/ edgeProjectedDirection.y
 
		if 
		(
			distanceAlongEdgeProjectedToXAxis > 0 
			&& distanceAlongEdgeProjectedToXAxis < edgeProjected.length
		)
		{
			var distanceAlongEdge0ToIntersection =
				edgeProjectedStart.x 
				+ (edgeProjectedDirection.x * distanceAlongEdgeProjectedToXAxis);
 
			if 
			(
				distanceAlongEdge0ToIntersection > 0
				&& distanceAlongEdge0ToIntersection < edge0.length
			)
			{
				returnValue = true;
			}
		}
 
		return returnValue;
	}
}
