 
function Actor(color, pos, activity, items)
{
	this.color = color;
	this.loc = new Location(pos);
	this.activity = activity;
 
	this.items = items;
	this.itemSelectedIndex = 0;

	this.wins = 0;
	this.ticksSinceKilled = null;
	this.ticksToDie = 30;
 
	this.collider = new Sphere(this.loc.pos, 8);
 
	this.powerMin = 1;
	this.powerMax = 6;
	this.powerPerTick = .1;
 
	this.azimuthInTurnsMin = .5;
	this.azimuthInTurnsMax = 1;
	this.turnsPerTick = 1.0 / Polar.DegreesPerTurn;
	this.firePolar = new Polar
	(
		(this.azimuthInTurnsMin + this.azimuthInTurnsMax) / 2, 
		this.collider.radius * 2
	);
	this.muzzlePos = pos.clone().add
	(
		this.firePolar.toCoords( new Coords() )
	);
  
	this.reset();
}

{
	Actor.prototype.firePolarAbsolute = function()
	{
		var forward = this.loc.orientation.forward;
		var forwardInTurns = new Polar().fromCoords(forward).azimuthInTurns;
		var returnValue = this.firePolar.clone().addToAzimuthInTurns(forwardInTurns);
		return returnValue;
	};

	Actor.prototype.itemSelected = function()
	{
		return this.items[this.itemSelectedIndex];
	};

	Actor.prototype.reset = function()
	{
		this.firePolar.azimuthInTurns = 
			(this.azimuthInTurnsMin + this.azimuthInTurnsMax) / 2, 
		this.powerCurrent = (this.powerMin + this.powerMax) / 2;
 
		this.ticksSinceKilled = null;
		this.loc.pos.y = 0;
		this.loc.vel.clear();
	};
 
	Actor.prototype.updateForTimerTick = function(world)
	{
		if (this.ticksSinceKilled == null)
		{
			var pos = this.loc.pos;
			var vel = this.loc.vel;

			if (this == world.actorCurrent() && world.projectiles.length == 0)
			{
				this.activity.perform(world, this);
			}
 
			this.firePolarAbsolute().toCoords(this.muzzlePos);
			this.muzzlePos.add(pos);
 
			var landscape = world.landscape;
			var surfaceAltitude = landscape.altitudeAtX
			(
				pos.x
			);
			var isBelowGround = (pos.y >= surfaceAltitude);
			if (isBelowGround == false)
			{
				vel.add(world.gravityPerTick);
				pos.add(vel);
			}
			else
			{
				vel.clear();
				pos.y = surfaceAltitude;

				var surfaceSlopeInTurns = landscape.slopeAtX(pos.x);
				var surfaceSlopeAsPolar = new Polar(surfaceSlopeInTurns, 1);
				var forward = this.loc.orientation.forward;
				surfaceSlopeAsPolar.toCoords(forward);
			}
		}
		else if (this.ticksSinceKilled < this.ticksToDie)
		{
			 this.ticksSinceKilled++;
		}
		else
		{
			world.reset();
		}
	};
 
	// drawable
 
	Actor.prototype.drawToDisplay = function(display)
	{
		var pos = this.loc.pos;

		display.drawLine(pos, this.muzzlePos);

		var ori = this.loc.orientation;
		var forward = ori.forward;
		var forwardAsPolar = new Polar().fromCoords(forward);
		var forwardAsTurns = forwardAsPolar.azimuthInTurns;
		var angleStart = (forwardAsTurns + .5).wrapToRangeMax(1);
		var angleStop = (angleStart + .5).wrapToRangeMax(1);
		display.drawWedge
		(
			pos, this.collider.radius, angleStart, angleStop, this.color
		);

		var world = Globals.Instance.world;
		if (this == world.actorCurrent())
		{
			var fireAzimuthInTurnsRecentered = Math.abs
			( 
				0.75 - this.firePolar.azimuthInTurns
			);
			var fireAzimuthInDegrees = Math.round
			(
				fireAzimuthInTurnsRecentered 
				* Polar.DegreesPerTurn
			);
			var windVelocity = world.windVelocity;
			var windDirection = (windVelocity < 0 ? "<<" : ">>");
			var windSpeed = Math.abs(windVelocity);
			var text =
				"Weapon:" + this.itemSelected().toString()
				+ " Angle:" + fireAzimuthInDegrees
				+ " Power:" + this.powerCurrent
				+ " Wind: " + windDirection + " " + windSpeed;

			display.drawText
			(
				text,
				this.collider.radius,
				Coords.Instances().Zeroes,
				this.color
			);
		}
	};
}
