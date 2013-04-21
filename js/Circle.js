 // Simple Rectangle used for the source and collision rectangle
function Circle(xIn, yIn, radiusIN)
{
    this.x = xIn;
    this.y = yIn;
    this.radius = radiusIN;
    
    this.IntersectsCircle = function(otherCircle)
    {
        var distance = Math.sqrt(((otherCircle.x - this.x) * ((otherCircle.x - this.x)) + (otherCircle.y - this.y) * (otherCircle.y - this.y)));
        if(distance <= (this.radius + otherCircle.radius))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    this.IntersectsRect = function(rectangle)
    {
        var distance;
        for(var i = rectangle.x; i < rectangle.x + rectangle.width; i++)
        {
            for(var j = rectangle.y; j < rectangle.y + rectangle.height; j++)
            {
                distance = Math.sqrt(((this.x - i) * (this.x - i)) + ((this.y - j) * (this.y - j)));
                if(distance <= this.radius)
                {
                    return true;
                }
            }
        }
        return false;
    }
    this.IntersectsPoint = function(point)
    {
        var distance = Math.sqrt(((point.x - this.x) * ((point.x - this.x)) + (point.y - this.y) * (point.y - this.y)));   
        if(distance <= (this.radius))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

/*      suppose to be better collision but the circle goes into the corner of the rect to far :(
{
        var distanceX = Math.abs(this.x - rectangle.x);
        var distanceY = Math.abs(this.y - rectangle.y);
    
        if (distanceX > (rectangle.width/2 + this.radius))
        {
            return false;
        }
        
        if (distanceY > (rectangle.height/2 + this.radius)) 
        {
            return false;
        }
    
        if (distanceX <= (rectangle.width/2))
        {
            return true;
        } 
        if (distanceY <= (rectangle.height/2)) 
        {
            return true; 
        }
    
        var cornerDistance_sq = ((distanceX - rectangle.width/2) * (distanceX - rectangle.width/2)) + ((distanceY - rectangle.height/2) * (distanceY - rectangle.height/2));
    
        return (cornerDistance_sq <= ((this.radius) * (this.radius)));
    }
*/