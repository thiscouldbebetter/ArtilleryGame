 
class Actor2
{
	color: Color;
	pos: Coords;
	activity: Activity2;
	items: Item2[];

	itemSelectedIndex: number;
	wins: number;
	ticksSinceKilled: number;
	ticksToDie: 30;
	collider: Sphere;
	powerCurrent: number;
	powerMin: number;
	powerMax: number;
	powerPerTick: number;
	azimuthInTurnsMin: number;
	azimuthInTurnsMax: number;
	turnsPerTick: number;
	firePolar: Polar;
	muzzlePos: Coords;
	loc: Disposition;

	constructor
	(
		color: Color, pos: Coords, activity: Activity2, items: Item2[]
	)
	{
		this.color = color;
		this.loc = Disposition.fromPos(pos);
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
			this.collider.radius * 2,
			0
		);
		this.muzzlePos = pos.clone().add
		(
			this.firePolar.toCoords( Coords.create() )
		);

		this.reset();
	}

	firePolarAbsolute(): Polar
	{
		var forward = this.loc.orientation.forward;
		var forwardInTurns = Polar.create().fromCoords(forward).azimuthInTurns;
		var returnValue = this.firePolar.clone().addToAzimuthInTurns(forwardInTurns);
		return returnValue;
	}

	itemSelected(): Item2
	{
		return this.items[this.itemSelectedIndex];
	}

	reset(): void
	{
		this.firePolar.azimuthInTurns = 
			(this.azimuthInTurnsMin + this.azimuthInTurnsMax) / 2, 
		this.powerCurrent = (this.powerMin + this.powerMax) / 2;
 
		this.ticksSinceKilled = null;
		this.loc.pos.y = 0;
		this.loc.vel.clear();
	}
 
	updateForTimerTick(world: World2): void
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
				var surfaceSlopeAsPolar = new Polar(surfaceSlopeInTurns, 1, 0);
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
	}
 
	// drawable
 
	drawToDisplay(display: Display2D): void
	{
		var pos = this.loc.pos;

		display.drawLine(pos, this.muzzlePos, this.color, 1);

		var ori = this.loc.orientation;
		var forward = ori.forward;
		var forwardAsPolar = Polar.create().fromCoords(forward);
		var forwardAsTurns = forwardAsPolar.azimuthInTurns;
		var angleStart = NumberHelper.wrapToRangeMax(forwardAsTurns + .5, 1);
		var angleStop = NumberHelper.wrapToRangeMax(angleStart + .5, 1);
		display.drawWedge
		(
			pos, this.collider.radius, angleStart, angleStop, this.color,
			null // colorBorder
		);

		var world = Globals.Instance().world;
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
				this.color,
				null, null, null, null // ?
			);
		}
	}
}
