 
class InputHelper2
{
	keyPressed: string;
	keysToPreventDefaultsFor: string[];

	constructor()
	{
		this.keyPressed = null;
		this.keysToPreventDefaultsFor = [ "Tab" ];
	}

	initialize(): void
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}
 
	// events 
 
	handleEventKeyDown(event: any): void
	{
		this.keyPressed = event.key;
		if (this.keysToPreventDefaultsFor.indexOf(this.keyPressed) >= 0)
		{
			event.preventDefault();
		}
	}
}
