 
function World(gravityPerTick, size, landscape, actors)
{
	this.gravityPerTick = gravityPerTick;
	this.size = size;
	this.landscape = landscape;
	this.actors = actors;
 
	this.actorIndexCurrent = 0;
	this.projectiles = [];
}
{
	World.random = function(gravityPerTick, size)
	{
		var landscape = Landscape.random(size, 10);
 
		var actors = 
		[
			new Actor
			(
				"Blue", 
				new Coords(size.x / 6, 0),
				Activity.Instances.UserInputAccept
			), 
			new Actor
			(
				"Red", 
				new Coords(5 * size.x / 6, 0),
				Activity.Instances.UserInputAccept
			), 
		];
 
		var returnValue = new World
		(
			gravityPerTick,
			size,
			landscape,
			actors
		);
 
		return returnValue;
	}
 
	// instance methods
 
	World.prototype.actorCurrent = function()
	{
		return this.actors[this.actorIndexCurrent];
	}
 
	World.prototype.actorCurrentAdvance = function()
	{
		this.actorIndexCurrent = this.actors.length - 1 - this.actorIndexCurrent;
	}
 
	World.prototype.reset = function()
	{
		this.landscape.randomize();
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.reset();
		}   
	}
 
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
	}
 
	// drawable
 
	World.prototype.drawToDisplay = function(display)
	{
		display.clear();
		this.landscape.drawToDisplay(display);
 
		for (var i = 0; i < this.actors.length; i++)
		{
			var actor = this.actors[i];
			actor.drawToDisplay(display);
			display.drawText("" + actor.wins, actor.radius, actor.pos, actor.color);
		}
 
		for (var i = 0; i < this.projectiles.length; i++)
		{
			var projectile = this.projectiles[i];
			projectile.drawToDisplay(display);
		}
	}
}
