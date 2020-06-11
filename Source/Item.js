
function Item(defnName, quantity)
{
	this.defnName = defnName;
	this.quantity = quantity;
}
{
	Item.prototype.defn = function(world)
	{
		return world.itemDefns[this.defnName];
	};

	Item.prototype.projectileBuild = function(world, color, pos, vel)
	{
		return this.defn(world).projectileBuild(color, pos, vel);
	};

	Item.prototype.toString = function()
	{
		return this.defnName + " (" + (this.quantity || "-") + ")";
	};
}
