function Point(xIn, yIn)
{
    this.x = xIn;
    this.y = yIn;
}
function Line(point1In, point2In)
{
    var ctx = document.getElementById('canvas').getContext('2d');
    
    var smallDifference = 0.00001;
    
    this.A;
    this.B;
    this.C;
    var length = Math.sqrt((point1In.x - point2In.x) * (point1In.x - point2In.x) + (point1In.y - point2In.y) * (point1In.y - point2In.y));
    
    this.point1 = point1In;
    this.point2 = point2In;
    
    if(this.point1.y > this.point2.y)
    {
        var tempPoint = this.point1;
        this.point1 = this.point2;
        this.point2 = tempPoint;
    }
    
    if (Math.abs(this.point1.x - this.point2.x) < smallDifference)
	{
		this.A = 1;
		this.B = 0;
		this.C = this.point1.x;
	}
    else if (Math.abs(this.point1.y - this.point2.y) < smallDifference)
	{
		this.A = 0;
		this.B = 1;
		this.C = this.point2.y;
	}
    else
    {
        this.A = ((this.point1.y - this.point2.y) / (this.point1.x - this.point2.x)) * -1;
        this.B = 1; 
		this.C = (this.A * this.point1.x) + (this.B * this.point1.y);
    }
    
    this.CreateClosestParallelLine = function(pt, d)
	{
		var newA;
		var newB;
        var newC;
		var C1;
		var C2;
		
		var Pt1 = new Point(0,0);
		var Pt2 = new Point(0,0);
		var Pt3 = new Point(0,0);
		var Pt4 = new Point(0,0);
		
		// Case of y = constant
		if (Math.abs(this.A) < smallDifference)
		{
			newA = 0;
			newB = this.B;
			C1 = this.C + d;
			C2 = this.C - d;
			Pt1.x = Pt3.x = this.segPt1.x;	// Use same x values as
			Pt2.x = Pt4.x = this.segPt2.x;	// passed in line segment
			Pt1.y = Pt2.y = C1;		// Calculate y values for
			Pt3.y = Pt4.y = C2;		// both parallel line segments
		}
		// case of x = constant
		else if (Math.abs(this.B) < smallDifference)
		{
            newA = this.A;
            newB = 0;
            C1 = this.C + d;
            C2 = this.C - d;
            Pt1.y = Pt3.y = this.segPt1.y;// Select same y values as 
            Pt2.y = Pt4.y = this.segPt2.y;// passed in line segment
            Pt1.x = Pt2.x = C1;
            Pt3.x = Pt4.x = C2;		
		}
		// line is not vertical and not horizontal if get here
		else
		{
			
			newA = this.A;
			newB = this.B;
			newC = this.C;
			
			Pt1.x = Pt3.x = this.point1.x;		// Use same x values as
			Pt2.x = Pt4.x = this.point2.x;	
			C1 = this.C + (d * Math.sqrt((newA * newA) + (newB * newB)));
			C2 = this.C - (d * Math.sqrt((newA * newA) + (newB * newB)));
			Pt1.y = ((newA * -1) * Pt1.x) + C1;
			Pt2.y = ((newA * -1) * Pt2.x) + C1;
			Pt3.y = ((newA * -1) * Pt3.x) + C2;
			Pt4.y = ((newA * -1) * Pt4.x) + C2;
		}
		
		// The resultant two parallel line cases
		var lseg1 = new Line(Pt1, Pt2);
		var lseg2 = new Line(Pt3, Pt4);
			
		// return the line closest to Pt
		// 
		if (lseg1.DistanceToPoint(pt) < lseg2.DistanceToPoint(pt))
		{
			return lseg1;
		}
		else
		{
            console.warn(lseg2);
			return lseg2;
		}
	}
    
    var NormalizeVector = function(vector)
    {
		var returnVector = new Point();
		var magnitude = Math.sqrt((0 - vector.x) * (0 - vector.x) + (0 - vector.y) * (0 - vector.y));
		returnVector.x = vector.x / magnitude;
		returnVector.y = vector.y / magnitude;
		return returnVector;
	}
    
	var FindDotProduct = function(vectorAHead, vectorBHead)
	{
		return(vectorAHead.x * vectorBHead.x) + (vectorAHead.y * vectorBHead.y);
	}
    
    this.Reflect = function(vector)
    {
        var normalizedVector = NormalizeVector(vector);
		var B = new Point(this.point1.x - this.point2.x, this.point1.y - this.point2.y);
		var normal = new Point(this.point1.y - this.point2.y, (this.point1.x - this.point2.x) * -1);
		normal = NormalizeVector(normal);
		var dot = FindDotProduct(new Point(vector.x * -1, vector.y * -1), normal);
		var P = new Point(normal.x * dot, normal.y * dot);
		return new Point((P.x * 2) + vector.x, (P.y * 2) + vector.y);
    }
    
    this.ReCalculate = function()
    {
        if (Math.abs(this.point1.x - this.point2.x) < smallDifference)
        {
            this.A = 1;
            this.B = 0;
            this.C = this.point1.x;
        }
        else if (Math.abs(this.point1.y - this.point2.y) < smallDifference)
        {
            this.A = 0;
            this.B = 1;
            this.C = this.point2.y;
        }
        else
        {
            this.A = ((this.point1.y - this.point2.y) / (this.point1.x - this.point2.x)) * -1;
            this.B = 1; 
            this.C = (this.A * this.point1.x) + (this.B * this.point1.y);
        }
    }
    
    this.FindIntersectionPoint = function(otherLine)
    {	
        var interSectionPoint = new Point(0,0);
        
		if (Math.abs(this.A) < smallDifference)
		{
			interSectionPoint.y = this.point1.y;
			interSectionPoint.x = (otherLine.C - this.point1.y * otherLine.B) / otherLine.A;
		}
		else if (Math.abs(otherLine.A) < smallDifference)
		{
			interSectionPoint.y = otherLine.point1.y;
			interSectionPoint.x = (this.C - otherLine.point1.y * this.B) / this.A;
		}
		else if (Math.abs(otherLine.B) < smallDifference)
		{
			interSectionPoint.x = otherLine.point1.x;
			interSectionPoint.y = (this.C - this.A * interSectionPoint.x) / this.B;
		}
		else if (Math.abs(this.B) < smallDifference)
		{
			interSectionPoint.x = this.point1.x;
			interSectionPoint.y = (otherLine.C - otherLine.A * interSectionPoint.x) / otherLine.B;
		}
		else
		{
			interSectionPoint.x = (this.C - otherLine.C) / (this.A - otherLine.A);
			interSectionPoint.y = ((this.A * -1) * interSectionPoint.x + this.C);
		}
        
        return interSectionPoint;
    }
    
    this.IsPointOnLine = function(point)
    {
        if(this.point1.x >= this.point2.x)
        {
            if(point.x <= this.point1.x && point.x >= this.point2.x)
            {
                if(point.y >= this.point1.y && point.y <= this.point2.y)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        else if(this.point1.x <= this.point2.x)
        {
            if(point.x >= this.point1.x && point.x <= this.point2.x)
            {
                if(point.y >= this.point1.y && point.y <= this.point2.y)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    
    this.DistanceToPoint = function(point)
	{
		var d = 0;	
		d = Math.abs((this.A * point.x) + (this.B * point.y) - this.C) / Math.sqrt((this.A * this.A) + (this.B * this.B));
		return d;
	}
    
    this.Draw = function()
    {
        
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
    }
}