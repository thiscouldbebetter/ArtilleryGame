function main()
{
	var displaySize = new Coords(400, 300);
 
	var display = new Display2D([displaySize]);
 
	var world = World.random(new Coords(0, .05), displaySize);
 
	Globals.Instance.initialize
	(
		10, // ticksPerSecond
		display,
		world
	);
}
