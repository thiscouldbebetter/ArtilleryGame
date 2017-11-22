 
function InputHelper()
{
	this.keyPressed = null;
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
	}
}
