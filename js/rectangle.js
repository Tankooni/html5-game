 // Simple Rectangle used for the source and collision rectangle
function Rectangle(xIn, yIn, widthIn, heightIn)
{
    this.x = xIn;
    this.y = yIn;
    this.width = widthIn;
    this.height = heightIn;
    
    this.IntersectsRect = function (otherRectangle) // Trying to get collision to work, works in flash but now here :(
    {
        //console.warn('Entered Intersects');
        // Each if statment checks to see if one of the corners of the other Rectangle is inside of this rectangle
        
        if(this.x <= otherRectangle.x && this.y <= otherRectangle.y)
        {
            if(this.x + this.width >= otherRectangle.x && this.y + this.height >= otherRectangle.y)
            {
                return true;
            }
        }
        
        if(this.x <= otherRectangle.x + otherRectangle.width && this.y <= otherRectangle.y)
        {
            if(this.x + this.width >= otherRectangle.x + otherRectangle.width && this.y + this.height >= otherRectangle.y)
            {
                return true;
            }
        }
        
        if(this.x <= otherRectangle.x && this.y <= otherRectangle.y + otherRectangle.height)
        {
            if(this.x + this.width >= otherRectangle.x && this.y + this.height >= otherRectangle.y + otherRectangle.height)
            {
                return true;
            }
        }
        
        if(this.x <= otherRectangle.x + otherRectangle.width && this.y <= otherRectangle.y + otherRectangle.height)
        {
            if(this.x + this.width >= otherRectangle.x + otherRectangle.width && this.y + this.height >= otherRectangle.y + otherRectangle.height)
            {
                return true;
            }
        }
        
        return false;
    }
    this.IntersectsCircle = function(circle)
    {
        for(var i = this.x; i < this.x + this.width; i++)
        {
            
        }
        return false;
    }
}