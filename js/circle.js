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
}