function Level()
{
    this.lineArray = [];
    
    this.moveSpeed = 3;
    
    //lineArray.push(new Line(new Point(10, 50), new Point(50, 400)));
    
    this.moveLeft = function()
    {
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.x -= this.moveSpeed;
               this.lineArray[l].point2.x -= this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveRight = function()
    {
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.x += this.moveSpeed;
               this.lineArray[l].point2.x += this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveDown = function()
    {
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.y += this.moveSpeed;
               this.lineArray[l].point2.y += this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveUp = function()
    {
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.y -= this.moveSpeed;
               this.lineArray[l].point2.y -= this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.ZoomOut = function()
    {
        for(l in this.lineArray)
        {
            this.lineArray[l].point1.x *= 0.99;
        }
    }
    
    this.ZoomIn = function()
    {
        
    }
    this.CenterOn = function(centerOn)
    {
        if(centerOn.x > 450) // Move the x to roughly the right spot
        {
            while(centerOn.x > 450)
            {
                this.moveLeft();
                centerOn.x -= this.moveSpeed;
            }
        }
        else if(centerOn.x < 450)
        {
            while(centerOn.x < 450)
            {
                this.moveRight();
                centerOn.x += this.moveSpeed;
            }
        }
        
        if(centerOn.y > 450) // Move the y to roughly the right spot
        {
            while(centerOn.y > 450)
            {
                this.moveUp();
                centerOn.y -= this.moveSpeed;
            }
        }
        else if(centerOn.y < 450)
        {
            while(centerOn.y < 450)
            {
                this.moveDown();
                centerOn.y += this.moveSpeed;
            }
        }
    }
    
    this.Draw = function()
    {
        for(l in this.lineArray)
        {
               this.lineArray[l].Draw();
        }
    }
}