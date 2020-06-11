 
function World(gravityPerTick, size, landscape, itemDefns, actors)
{
	this.gravityPerTick = gravityPerTick;
	this.size = size;
	this.landscape = landscape;
	this.itemDefns = itemDefns.addLookupsByName();
	this.actors = actors;

	this.skyColor = "Cyan";

	this.actorIndexCurrent = 0;
	this.projectiles = [];

	this.windVelocityRandomize();
}
{
	World.random = function(gravityPerTick, size)
	{
		var landscape = Landscape.random(size, 20);
 
		var itemDefns = ItemDefn.Instances()._All;

		var actors = 
		[
			new Actor
			(
				"Blue", 
				new Coords(size.x / 6, 0),
				Activity.Instances.UserInputAccept,
				[
					new Item("Slug", null),
					new Item("Shell", 3),
					new Item("ShellLarge", 1)
				]
			), 
			new Actor
			(
				"Red", 
				new Coords(5 * size.x / 6, 0),
				Activity.Instances.UserInputAccept,
				[
					new Item("Slug", null),
					new Item("Shell", 3),
					new Item("ShellLarge", 1)
				]
			), 
		];

		var returnValue = new World
		(
			gravityPerTick,
			size,
			landscape,
			itemDefns,
			actors
		);

		return returnValue;
	};

	// instance methods
 
	World.prototype.actorCurrent = function()
	{
		return this.actors[this.actorIndexCurrent];
	};
 
	World.prototype.actorCurrentAdvance = function()
	{
		this.actorIndexCurrent = this.actors.length - 1 - this.actorIndexCurrent;
		this.windVelocityRandomize();
	};
 
	World.prototype.reset = function()
	{
		this.landscape.randomize();
		this.windVelocityRandomize();
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.reset();
		}   
	};
 
	World.prototype.updateForTimerTick = function()
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
	};

	World.prototype.windVelocityRandomize = function()
	{
		this.windVelocity = Math.floor
		(
			10 * (Math.random() * 2 - 1)
		);
	};
 
	// drawable
 
	World.prototype.drawToDisplay = function(display)
	{
		display.clear();
		display.drawBackground(this.skyColor, "Gray");
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
	};
}
