 
function Display(size)
{
	this.size = size;
 
	this.colorBack = "White";
	this.colorFore = "Gray";
}

{
	Display.prototype.initialize = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.size.x;
		canvas.height = this.size.y;
		this.graphics = canvas.getContext("2d");
 
		document.body.appendChild(canvas);
	}
 
	// drawing
 
	Display.prototype.clear = function()
	{
		this.graphics.fillStyle = this.colorBack;
		this.graphics.fillRect
		(
			0, 0, this.size.x, this.size.y
		);
 
		this.graphics.strokeStyle = this.colorFore;
		this.graphics.strokeRect
		(
			0, 0, this.size.x, this.size.y
		);
	}
 
	Display.prototype.drawCircle = function(center, radius, colorBorder)
	{
		this.graphics.strokeStyle = colorBorder;
 
		this.graphics.beginPath();
		this.graphics.arc(center.x, center.y, radius, 0, Polar.RadiansPerTurn);
		this.graphics.stroke();
	}
 
	Display.prototype.drawLine = function(fromPos, toPos, color)
	{
		this.graphics.strokeStyle = color;
		this.graphics.beginPath();
		this.graphics.moveTo(fromPos.x, fromPos.y);
		this.graphics.lineTo(toPos.x, toPos.y);
		this.graphics.stroke();
	}
 
	Display.prototype.drawRectangle = function(pos, size, colorBorder)
	{
		this.graphics.strokeStyle = colorBorder;
		this.graphics.strokeRect
		(
			pos.x, pos.y, size.x, size.y
		);
	}
 
	Display.prototype.drawText = function(text, height, pos, color)
	{
		this.graphics.strokeStyle = this.colorBack;
		this.graphics.strokeText(text, pos.x, pos.y + height);
 
		this.graphics.fillStyle = color;
		this.graphics.fillText(text, pos.x, pos.y + height);
	}
}
