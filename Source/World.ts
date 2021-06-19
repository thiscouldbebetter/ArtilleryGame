 
class World2
{
	gravityPerTick: Coords;
	size: Coords;
	landscape: Landscape;
	itemDefns: ItemDefn2[];
	actors: Actor2[];

	itemDefnsByName: Map<string, ItemDefn2>;
	skyColor: Color;
	actorIndexCurrent: number;
	projectiles: Projectile[];
	windVelocity: number;

	constructor
	(
		gravityPerTick: Coords,
		size: Coords,
		landscape: Landscape,
		itemDefns: ItemDefn2[],
		actors: Actor2[]
	)
	{
		this.gravityPerTick = gravityPerTick;
		this.size = size;
		this.landscape = landscape;
		this.itemDefns = itemDefns;
		this.itemDefnsByName = ArrayHelper.addLookupsByName(this.itemDefns);
		this.actors = actors;

		this.skyColor = Color.byName("Cyan");

		this.actorIndexCurrent = 0;
		this.projectiles = [];

		this.windVelocityRandomize();
	}

	static random(gravityPerTick: Coords, size: Coords): World2
	{
		var landscape = Landscape.random(size, 20);
 
		var itemDefns = ItemDefn2.Instances()._All;

		var actors = 
		[
			new Actor2
			(
				Color.byName("Blue"), 
				Coords.fromXY(size.x / 6, 0),
				Activity2.Instances().UserInputAccept,
				[
					new Item2("Slug", null),
					new Item2("Shell", 3),
					new Item2("ShellLarge", 1)
				]
			), 
			new Actor2
			(
				Color.byName("Red"), 
				Coords.fromXY(5 * size.x / 6, 0),
				Activity2.Instances().UserInputAccept,
				[
					new Item2("Slug", null),
					new Item2("Shell", 3),
					new Item2("ShellLarge", 1)
				]
			), 
		];

		var returnValue = new World2
		(
			gravityPerTick,
			size,
			landscape,
			itemDefns,
			actors
		);

		return returnValue;
	}

	// instance methods
 
	actorCurrent(): Actor2
	{
		return this.actors[this.actorIndexCurrent];
	}
 
	actorCurrentAdvance(): void
	{
		this.actorIndexCurrent = this.actors.length - 1 - this.actorIndexCurrent;
		this.windVelocityRandomize();
	}
 
	reset(): void
	{
		this.landscape.randomize();
		this.windVelocityRandomize();
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.reset();
		}   
	};
 
	updateForTimerTick(): void
	{
		for (var i = 0; i < this.projectiles.length; i++)
		{
			var projectile = this.projectiles[i];
			projectile.updateForTimerTick(this);
		}
 
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.updateForTimerTick(this);
		}
	}

	windVelocityRandomize(): void
	{
		this.windVelocity = Math.floor
		(
			10 * (Math.random() * 2 - 1)
		);
	}
 
	// drawable
 
	drawToDisplay(display: Display2D): void
	{
		display.clear();
		display.drawBackground(this.skyColor, Color.byName("Gray"));
		this.landscape.drawToDisplay(display);
 
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.drawToDisplay(display);
			//display.drawText("" + actor.wins, actor.radius, actor.loc.pos, actor.color);
		}
 
		for (var i = 0; i < this.projectiles.length; i++)
		{
			var projectile = this.projectiles[i];
			projectile.drawToDisplay(display);
		}
	}
}
