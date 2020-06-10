 
function Projectile(color, pos, vel)
{
	this.color = color;
	this.pos = pos;
	this.vel = vel;
 
	this.collider = new Sphere(this.pos, 2);
 
	this.ticksSinceExplosion = null;
	this.ticksToExplode = 30;
	this.radiusExplodingMax = 20;
}

{
	Projectile.prototype.radiusCurrent = function()
	{
		var radiusCurrent = 
			this.radiusExplodingMax 
			* this.ticksSinceExplosion 
			/ this.ticksToExplode;

		return radiusCurrent;
	}
 
	Projectile.prototype.updateForTimerTick = function(world)
	{
		if (this.ticksSinceExplosion == null)
		{
			this.vel.add
			(
				world.gravityPerTick
			).add
			(
				new Coords(.001, 0).multiplyScalar(world.windVelocity)
			);
			this.pos.add(this.vel);
			if (this.pos.y > world.size.y)
			{
				world.projectiles.length = 0;
			}
			else
			{
				var surfaceAltitude = world.landscape.altitudeAtX(this.pos.x);
				var isBeneathHorizon = (this.pos.y >= surfaceAltitude);
				if (isBeneathHorizon == true)
				{
					this.ticksSinceExplosion = 0;
					this.pos.y = surfaceAltitude;
				}
			}
		}
		else if (this.ticksSinceExplosion < this.ticksToExplode)
		{
			this.ticksSinceExplosion++;
		}
		else
		{  
			var collisionHelper = CollisionHelper.Instance;
			var actors = world.actors;
			for (var i = 0; i < actors.length; i++)
			{
				var actor = actors[i];

				this.collider.radius = this.radiusCurrent();
				var isActorWithinExplosionRadius = collisionHelper.doCirclesCollide
				(
					this.collider, actor.collider
				);

				if (isActorWithinExplosionRadius == true)
				{
					var edgeFromExplosionToActor = new Edge
					([
						this.pos.clone().addDimensions(0, -1, 0), // hack 
						actor.loc.pos.clone().addDimensions(0, -1, 0)
					]);
					var isExplosionBlockedByGround = world.landscape.collidesWithEdge
					(
						edgeFromExplosionToActor
					);

					if (isExplosionBlockedByGround == false)
					{
						var actorOther = actors[1 - i];
						actorOther.ticksSinceKilled = 0;
						actorOther.wins++;
					}
				}
			}
			world.projectiles.length = 0;
		}
	}

	// drawable

	Projectile.prototype.drawToDisplay = function(display)
	{
		if (this.ticksSinceExplosion == null)
		{
			display.drawCircle
			(
				this.pos, this.collider.radius, this.color
			);
			display.drawLine
			(
				this.pos, 
				this.pos.clone().subtract(this.vel), 
				this.color
			);
		}
		else
		{
			display.drawCircle(this.pos, this.radiusCurrent(), this.color);
		}
	}
}
