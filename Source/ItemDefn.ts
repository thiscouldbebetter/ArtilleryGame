
class ItemDefn2
{
	name: string;
	projectileBuild: (color: Color, pos:Coords, vel: Coords)=>Projectile;

	constructor
	(
		name: string,
		projectileBuild: (color: Color, pos:Coords, vel: Coords) => Projectile
	)
	{
		this.name = name;
		this.projectileBuild = projectileBuild;
	}

	static _instances: ItemDefn2_Instances;
	static Instances(): ItemDefn2_Instances
	{
		if (ItemDefn2._instances == null)
		{
			ItemDefn2._instances = new ItemDefn2_Instances();
		}
		return ItemDefn2._instances;
	}
}

class ItemDefn2_Instances
{
	Shell: ItemDefn2;
	ShellLarge: ItemDefn2;
	Slug: ItemDefn2;

	_All: ItemDefn2[];
	_AllByName: Map<string, ItemDefn2>;

	constructor()
	{
		this.Shell = new ItemDefn2
		(
			"Shell",
			(color: Color, pos: Coords, vel: Coords) =>
				new Projectile(color, pos, vel, 20)
		);
		this.ShellLarge = new ItemDefn2
		(
			"ShellLarge",
			(color: Color, pos: Coords, vel: Coords) =>
				new Projectile(color, pos, vel, 50)
		);
		this.Slug = new ItemDefn2
		(
			"Slug",
			(color: Color, pos: Coords, vel: Coords) =>
				new Projectile(color, pos, vel, 2)
		);

		this._All =
		[
			this.Shell,
			this.ShellLarge,
			this.Slug
		];
		this._AllByName = ArrayHelper.addLookupsByName(this._All);
	}
}
