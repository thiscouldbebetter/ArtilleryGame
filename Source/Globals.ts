 
class Globals
{
	timerTicksPerSecond: number;
	display: Display2D;
	world: World2;
	inputHelper: InputHelper2;
	timer: any;

	static _instance: Globals;
	static Instance(): Globals
	{
		if (Globals._instance == null)
		{
			Globals._instance = new Globals();
		}
		return Globals._instance;
	}
 
	initialize
	(
		timerTicksPerSecond: number, display: Display2D, world: World2
	): void
	{
		this.timerTicksPerSecond = timerTicksPerSecond;

		this.display = display;
		this.display.initialize(null);
 
		this.world = world;
 
		this.inputHelper = new InputHelper2();

		var millisecondsPerTimerTick = Math.floor(1000 / this.timerTicksPerSecond);
		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this), 
			millisecondsPerTimerTick
		);
 
		this.inputHelper.initialize();
	}
 
	// events
 
	handleEventTimerTick(): void
	{
		this.world.drawToDisplay(this.display);
		this.world.updateForTimerTick();
	}
}
