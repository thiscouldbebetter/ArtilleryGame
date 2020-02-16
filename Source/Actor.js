 
function Actor(color, pos, activity)
{
	this.color = color;
	this.pos = pos;
	this.activity = activity;
 
	this.wins = 0;
	this.ticksSinceKilled = null;
	this.ticksToDie = 30;
 
	this.collider = new Sphere(this.pos, 8);
 
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
	this.muzzlePos = this.pos.clone().add
	(
		this.firePolar.toCoords( new Coords() )
	);
 
	this.vel = new Coords();
 
	this.reset();
}

{
	Actor.prototype.reset = function()
	{
		this.firePolar.azimuthInTurns = 
			(this.azimuthInTurnsMin + this.azimuthInTurnsMax) / 2, 
		this.powerCurrent = (this.powerMin + this.powerMax) / 2;
 
		this.ticksSinceKilled = null;
		this.pos.y = 0;
		this.vel.clear();
	};
 
	Actor.prototype.updateForTimerTick = function(world)
	{
		if (this.ticksSinceKilled == null)
		{
			if (this == world.actorCurrent() && world.projectiles.length == 0)
			{
				this.activity.perform(world, this);
			}
 
			this.firePolar.toCoords(this.muzzlePos);
			this.muzzlePos.add(this.pos);
 
			var surfaceAltitude = world.landscape.altitudeAtX
			(
				this.pos.x
			);
			var isBelowGround = (this.pos.y >= surfaceAltitude);
			if (isBelowGround == false)
			{
				this.vel.add(world.gravityPerTick);
				this.pos.add(this.vel);
			}
			else
			{
				this.vel.clear();
				this.pos.y = surfaceAltitude;
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
		display.drawCircle(this.pos, this.collider.radius, this.color);
		display.drawLine
		(
			this.pos,
			this.muzzlePos
		);
		 
		if (this == Globals.Instance.world.actorCurrent())
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
			var text = "Angle:" + fireAzimuthInDegrees + " Power:" + this.powerCurrent;
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
