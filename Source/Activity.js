 
// classes
 
function Activity(perform)
{
	this.perform = perform;
}

{
	Activity.Instances = new Activity_Instances()
	 
	function Activity_Instances()
	{
		this.DoNothing = new Activity(function perform() {});
		this.UserInputAccept = new Activity
		(
			function perform(world, actor)
			{
				var inputHelper = Globals.Instance.inputHelper;
				var inputActive = inputHelper.keyPressed;
				var powerFactor = 1000;
 
				if (inputActive == "ArrowDown")
				{
					actor.powerCurrent -= actor.powerPerTick;
					actor.powerCurrent = 
						Math.round(actor.powerCurrent * powerFactor) / powerFactor;
					if (actor.powerCurrent < actor.powerMin)
					{
						actor.powerCurrent = actor.powerMin;
					}
				}   
				else if (inputActive == "ArrowLeft")
				{
					actor.firePolar.azimuthInTurns -= actor.turnsPerTick;
					actor.firePolar.trimAzimuthToRangeMinMax
					(
						actor.azimuthInTurnsMin, 
						actor.azimuthInTurnsMax
					);
				}
				else if (inputActive == "ArrowRight")
				{
					actor.firePolar.azimuthInTurns += actor.turnsPerTick;
					actor.firePolar.trimAzimuthToRangeMinMax
					(
						actor.azimuthInTurnsMin, 
						actor.azimuthInTurnsMax
					);
				}
				else if (inputActive == "ArrowUp")
				{
					actor.powerCurrent += actor.powerPerTick;
					actor.powerCurrent = 
						Math.round(actor.powerCurrent * powerFactor) / powerFactor;
					if (actor.powerCurrent > actor.powerMax)
					{
						actor.powerCurrent = actor.powerMax;
					}
				}
				else if (inputActive == "Enter")
				{
					var projectile = new Projectile
					(
						actor.color,
						actor.muzzlePos.clone(),
						// vel
						actor.firePolar.toCoords
						(
							new Coords()
						).normalize().multiplyScalar
						(
							actor.powerCurrent
						)
					);
 
					world.projectiles = [ projectile ];
 
					world.actorIndexCurrent = 1 - world.actorIndexCurrent;
				}   
				inputHelper.keyPressed = false;
			}
		);
	}
}
