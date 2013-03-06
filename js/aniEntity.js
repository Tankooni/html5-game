
// Took Chris's Entity Class Object Function Thingy and added simple sprite sheet usage
function AnimatedEntity(imgFile, xIn, yIn, imageWidth, imageHeight, columnsIn, rowsIn)
{
    /*******************************************************/
    // Everything in this section can be compared to our init function (our constructor)
    
    var ctx = document.getElementById('canvas').getContext('2d');
	
    this.sourceRectangle = new Rectangle(0, 0, imageWidth, imageHeight);
    this.collisionRect = new Rectangle(xIn, yIn, imageWidth, imageHeight);
    
	var img = new Image();
	img.src = imgFile;
	
	this.x = xIn;
	this.y = yIn;
    
    //The row/column that the source rect is on, wasn't sure what to call them.
    this.spriteX = 0;
    this.spriteY = 0;
    
    //Stores the amount of columns and rows.
    //I subtract 1 to make it accurate.
    this.columns = columnsIn - 1;
    this.rows = rowsIn - 1;
    
    //Simple timer used to switch frames.
    this.timer = 0;
    
    //this.CollisionRect = collisionRect;
    
	this.update = update;
	function update()
	{
        this.timer++; //Increment timer.
        
        // Update collision rectangle
        this.collisionRect.x = this.x;
        this.collisionRect.y = this.y;
        
        // Purposely avoided using == since in js you use === and
        // that just makes me feel dirty.
        
        if(this.timer >= 2) 
        {
            this.spriteX++;
            this.timer = 0;
        }
        
        if(this.spriteX > this.columns)
        {
            this.spriteX = 0;
            this.spriteY++;
        }
        
        if(this.spriteY > this.rows)
        {
            this.spriteY = 0;
        }
        
        // Trying to test collision
        if(this.x < 150)
        {
            this.x += 1;
        }
        else if (this.x > 150)
        {
            this.x -= 1;
        }
        
		this.sourceRectangle.x = this.sourceRectangle.width * this.spriteX;
        this.sourceRectangle.y = this.sourceRectangle.height * this.spriteY;
	}
	
	this.draw = draw;
	function draw()
	{
        // The overloaded drawImage is kinda confusing since it has width and height twice, the first set
        // cuts the image and the last one sets the size you want the image to be... making them both the same gives
        // you a non-stretched image.
		ctx.drawImage(img, this.sourceRectangle.x, this.sourceRectangle.y, this.sourceRectangle.width, this.sourceRectangle.height, this.x, this.y, this.sourceRectangle.width, this.sourceRectangle.height);
	}
}