
class CollisionHelper2
{
	displacement: Coords;

	edgeProjected: Edge;

	constructor()
	{
		this.displacement = Coords.create();
	}

	static _instance: CollisionHelper2;
	static Instance(): CollisionHelper2
	{
		if (CollisionHelper2._instance == null)
		{
			CollisionHelper2._instance = new CollisionHelper2();
		}
		return CollisionHelper2._instance;
	}
 
	doCirclesCollide(circle0: Sphere, circle1: Sphere): boolean
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

	doEdgesCollide(edge0: Edge, edge1: Edge): boolean
	{
		var returnValue = null;
 
		if (this.edgeProjected == null)
		{
			this.edgeProjected = new Edge([Coords.create(), Coords.create()]);
		}
		var edgeProjected = this.edgeProjected;
		edgeProjected.overwriteWith(edge1).projectOntoOther(edge0);
		var edgeProjectedStart = edgeProjected.vertices[0];
		var edgeProjectedDirection = edgeProjected.direction();
 
		var distanceAlongEdgeProjectedToXAxis = 
			0 - edgeProjectedStart.y
			/ edgeProjectedDirection.y
 
		if 
		(
			distanceAlongEdgeProjectedToXAxis > 0 
			&& distanceAlongEdgeProjectedToXAxis < edgeProjected.length()
		)
		{
			var distanceAlongEdge0ToIntersection =
				edgeProjectedStart.x 
				+ (edgeProjectedDirection.x * distanceAlongEdgeProjectedToXAxis);
 
			if 
			(
				distanceAlongEdge0ToIntersection > 0
				&& distanceAlongEdge0ToIntersection < edge0.length()
			)
			{
				returnValue = true;
			}
		}
 
		return returnValue;
	}
}
