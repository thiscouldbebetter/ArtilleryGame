
class Item
{
	constructor(defnName, quantity)
	{
		this.defnName = defnName;
		this.quantity = quantity;
	}

	defn(world)
	{
		return world.itemDefnsByName.get(this.defnName);
	}

	projectileBuild(world, color, pos, vel)
	{
		var defn = this.defn(world);
		var returnValue = defn.projectileBuild(color, pos, vel);
		return returnValue;
	}

	toString()
	{
		return this.defnName + " (" + (this.quantity || "-") + ")";
	}
}
