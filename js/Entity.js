// I'm trying to make this as much like C#/AS3 as possible.
// Javascript is stupid

// Think of this as our class definition and constructor in one

function Entity(imgFile, xIn, yIn)
{
	// Everything in this section can be compared to our init function (our constructor)
	
	// This is comparable to GraphicsDevice or SpriteBatch in XNA
	var ctx = document.getElementById('canvas').getContext('2d');
	
	// The image for the entity (not animated yet). This is a built in class.
	var img = new Image();
	img.src = imgFile;
	
	// X/Y position
	this.x = xIn;
	this.y = yIn;
	
	// Declare and define our update method. Yes, I do believe we have to do this
	// just to declare a simple method. Javascript is stupid.
	this.Update = function()
	{
		
	}
	
	// Declare and define the draw method
	this.Draw = Draw;
	function Draw()
	{
		ctx.drawImage(img, this.x, this.y);
	}
}