  
class Activity2
{
	perform: (w: World2, a: Actor2) => void;

	constructor(perform: (w: World2, a: Actor2) => void)
	{
		this.perform = perform;
	}

	static _instances: Activity2_Instances;
	static Instances(): Activity2_Instances
	{
		if (Activity2._instances == null)
		{
			Activity2._instances = new Activity2_Instances();
		}
		return Activity2._instances;
	}
}
 
class Activity2_Instances
{
	DoNothing: Activity2;
	UserInputAccept: Activity2;

	constructor()
	{
		this.DoNothing = new Activity2
		(
			(world: World2, actor: Actor2) => {} // perform 
		);
		this.UserInputAccept = new Activity2
		(
			(world: World2, actor: Actor2) => // perform
			{
				var inputHelper = Globals.Instance().inputHelper;
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
					var firePolar = actor.firePolar
					firePolar.azimuthInTurns = NumberHelper.trimToRangeMinMax
					(
						firePolar.azimuthInTurns - actor.turnsPerTick,
						actor.azimuthInTurnsMin, actor.azimuthInTurnsMax
					);
				}
				else if (inputActive == "ArrowRight")
				{
					var firePolar = actor.firePolar
					firePolar.azimuthInTurns = NumberHelper.trimToRangeMinMax
					(
						firePolar.azimuthInTurns + actor.turnsPerTick,
						actor.azimuthInTurnsMin, actor.azimuthInTurnsMax
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
					var itemSelected = actor.itemSelected();
					if (itemSelected.quantity == null || itemSelected.quantity > 0)
					{
						if (itemSelected.quantity != null)
						{
							itemSelected.quantity--;
						}

						var projectile = itemSelected.projectileBuild
						(
							world,
							actor.color,
							actor.muzzlePos.clone(),
							// vel
							actor.firePolarAbsolute().toCoords
							(
								Coords.create()
							).normalize().multiplyScalar
							(
								actor.powerCurrent
							)
						);

						world.projectiles = [ projectile ];

						world.actorCurrentAdvance();
					}
				}   
				else if (inputActive == "Tab")
				{
					actor.itemSelectedIndex++;
					if (actor.itemSelectedIndex >= actor.items.length)
					{
						actor.itemSelectedIndex = 0;
					}
				}

				inputHelper.keyPressed = null;
			}
		);
	}
}
