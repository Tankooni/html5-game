function Ball(xIn, yIn)
{
    this.x = xIn;
    this.y = yIn;
    this.radius = 16;
    
    this.collisionCircle = new Circle(this.x + this.radius, this.y + this.radius, this.radius);

    this.mouseClickX = 0;
    this.mouseClickY = 0;
    
    this.distance = 0;
    this.maxDistance = 250;
    
    this.isClicked = false;
    this.hadCollided = false;
    
    this.numberOfClicks = 0;
    
    this.mouseReleaseX = 0;
    this.mouseReleaseY = 0;
    
    this.ballSprite = new Entity("lib/Untitled.jpg", this.x, this.y, 32, 32);
   
    this.dx = 0;
    this.dy = 0;
    
    this.friction = 0.80;
    
    this.centerPoint = new Point(xIn + this.radius, yIn + this.radius);
    
    this.trajectoryLine = new Line(this.centerPoint, new Point(this.centerPoint.x + this.dx, this.centerPoint.y + this.dy))
    
    this.Update = function Update()
    {
        this.x += this.dx;
        this.y += this.dy;
        
        this.collisionCircle.x = this.x + this.radius;
        this.collisionCircle.y = this.y + this.radius;
        
        this.ballSprite.x = this.x;
        this.ballSprite.y = this.y;
        
        this.centerPoint = new Point(this.collisionCircle.x, this.collisionCircle.y);
        this.UpdateTrajectory();
    }
    this.UpdateTrajectory = function()
    {
        this.trajectoryLine = new Line(this.centerPoint, new Point(this.centerPoint.x + this.dx, this.centerPoint.y + this.dy));
    }
    this.ApplyFriction = function ()
    {
        this.dx *= this.friction;
        this.dy *= this.friction;
    }
    
    this.Clicked = function ()
    {
        this.isClicked = true;
        this.mouseClickX = this.x + this.radius;
        this.mouseClickY = this.y + this.radius;
    }
    
    this.Dragged = function(mousePos)
    {
         this.distance = Math.abs(((this.x + this.radius) - mousePos.x) + ((this.y + this.radius) - mousePos.y))
    }
    
    this.Release = function (mousePos)
    {
        this.mouseReleaseX = mousePos.x;
        this.mouseReleaseY = mousePos.y;
        this.isClicked = false;
        this.numberOfClicks++;
    }
    
    this.Launch = function Launch()
    {
        this.dx = (this.mouseClickX - this.mouseReleaseX) / 2;
        this.dy = (this.mouseClickY - this.mouseReleaseY) / 2;
        this.trajectoryLine = new Line(this.centerPoint, new Point(this.centerPoint.x + this.dx, this.centerPoint.y + this.dy))
    }
    
    this.Draw = function Draw()
    {
        this.ballSprite.Draw();
    }
}