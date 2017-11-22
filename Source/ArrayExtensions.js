 
// extensions

function ArrayExtensions()
{
	// extension class
}

{
	Array.prototype.clone = function()
	{
		var returnValues = [];

		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var elementCloned = element.clone();
			returnValues.push(elementCloned);
		}

		return returnValues;
	}
}
