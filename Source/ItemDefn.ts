
class ItemDefn
{
	constructor(name, projectileBuild)
	{
		this.name = name;
		this.projectileBuild = projectileBuild;
	}

	static Instances()
	{
		if (ItemDefn._instances == null)
		{
			ItemDefn._instances = new ItemDefn_Instances();
		}
		return ItemDefn._instances;
	}
}

class ItemDefn_Instances
{
	constructor()
	{
		this.Shell = new ItemDefn
		(
			"Shell", (color, pos, vel) => new Projectile(color, pos, vel, 20)
		);
		this.ShellLarge = new ItemDefn
		(
			"ShellLarge", (color, pos, vel) => new Projectile(color, pos, vel, 50)
		);
		this.Slug = new ItemDefn
		(
			"Slug", (color, pos, vel) => new Projectile(color, pos, vel, 2)
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
