 
function InputHelper()
{
	this.keyPressed = null;
	this.keysToPreventDefaultsFor = [ "Tab" ];
}

{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}
 
	// events 
 
	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		this.keyPressed = event.key;
		if (this.keysToPreventDefaultsFor.indexOf(this.keyPressed) >= 0)
		{
			event.preventDefault();
		}
	}
}
