
class Item2
{
	defnName: string;
	quantity: number;
 
	constructor(defnName: string, quantity: number)
	{
		this.defnName = defnName;
		this.quantity = quantity;
	}

	defn(world: World2): ItemDefn2
	{
		return world.itemDefnsByName.get(this.defnName);
	}

	projectileBuild
	(
		world: World2, color: Color, pos: Coords, vel: Coords
	): Projectile
	{
		var defn = this.defn(world);
		var returnValue = defn.projectileBuild(color, pos, vel);
		return returnValue;
	}

	toString(): string
	{
		return this.defnName + " (" + (this.quantity || "-") + ")";
	}
}
