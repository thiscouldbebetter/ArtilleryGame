
function Edge(vertices)
{
	this.vertices = vertices;

	this.displacement = new Coords();
	this.direction = new Coords();
	this.right = new Coords();
	this.recalculateDerivedValues();
}

{
	Edge.prototype.clone = function()
	{
		return new Edge(this.vertices.clone());
	}

	Edge.prototype.overwriteWith = function(other)
	{
		this.vertices[0].overwriteWith(other.vertices[0]);
		this.vertices[1].overwriteWith(other.vertices[1]);
		this.recalculateDerivedValues();
		return this;
	}

	Edge.prototype.projectOnto = function(other)
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertexThis = this.vertices[i];
 
			vertexThis.subtract
			(
				other.vertices[0]
			).overwriteWithXY
			(
				vertexThis.dotProduct(other.direction),
				vertexThis.dotProduct(other.right)
			);
		}
 
		this.recalculateDerivedValues();
 
		return this;
	}

	Edge.prototype.recalculateDerivedValues = function()
	{
		this.displacement.overwriteWith
		(
			this.vertices[1]
		).subtract(this.vertices[0]);
		this.length = this.displacement.magnitude();
		this.direction.overwriteWith(this.displacement).divideScalar(this.length);
		this.right.overwriteWith(this.direction).right();
	}
}
