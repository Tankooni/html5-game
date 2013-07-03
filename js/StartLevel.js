function StartLevel()
{
    this.lineArray = [];
    
    this.lineArray.push(new Line(new Point(0, 0), new Point(900, 0)));
    this.lineArray.push(new Line(new Point(900, 0), new Point(900, 900)));
    this.lineArray.push(new Line(new Point(900, 900), new Point(0, 900)));
    this.lineArray.push(new Line(new Point(0,0), new Point(900, 0)));
    
    this.lineArray.push(new Line(new Point(64,445), new Point(322, 440)));
    this.lineArray.push(new Line(new Point(322,440), new Point(538, 463)));
    this.lineArray.push(new Line(new Point(538,463), new Point(865, 464)));
    this.lineArray.push(new Line(new Point(865,464), new Point(866, 497)));
    this.lineArray.push(new Line(new Point(866,497), new Point(851, 546)));
    this.lineArray.push(new Line(new Point(851,546), new Point(862, 729)));
    this.lineArray.push(new Line(new Point(862,729), new Point(57, 732)));
    this.lineArray.push(new Line(new Point(57,732), new Point(64, 445)));
    
    //new Point(731, 579)
    this.moveSpeed = 3;
    this.scale = 1;
    
    var background = new Entity("lib/Galf Screen 1.jpg", 0, 0, 900, 900);
    var levelStarted = false;
    this.golfBall = null;
    var endCircle = new Circle(671, 598, 16);
    
    this.levelEnd = false;
    //lineArray.push(new Line(new Point(10, 50), new Point(50, 400)));
    
    this.Init = function()
    {
        console.error(this);
        this.golfBall = new Ball(197, 585);
        this.levelEnd = false;
    }
    
    this.moveLeft = function()
    {
        background.x -= this.moveSpeed;
        endCircle.x -= this.moveSpeed;
        this.golfBall.x -= this.moveSpeed;
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.x -= this.moveSpeed;
               this.lineArray[l].point2.x -= this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveRight = function()
    {
        background.x += this.moveSpeed;
        endCircle.x += this.moveSpeed;
        this.golfBall.x += this.moveSpeed;
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.x += this.moveSpeed;
               this.lineArray[l].point2.x += this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveDown = function()
    {
        background.y += this.moveSpeed;
        endCircle.y += this.moveSpeed;
        this.golfBall.y += this.moveSpeed;
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.y += this.moveSpeed;
               this.lineArray[l].point2.y += this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.moveUp = function()
    {
        background.y -= this.moveSpeed;
        endCircle.y -= this.moveSpeed;
        this.golfBall.y -= this.moveSpeed;
        for(l in this.lineArray)
        {
               this.lineArray[l].point1.y -= this.moveSpeed;
               this.lineArray[l].point2.y -= this.moveSpeed;
               this.lineArray[l].ReCalculate();
        }
    }
    
    this.ZoomOut = function()
    {
        this.scale -= 0.001; // TODO: Right now simply scales, need to translate it corrently, also background not shrinking
        for(l in this.lineArray)
        {
            this.lineArray[l].point1.x *= this.scale;
            this.lineArray[l].point1.y *= this.scale;
            this.lineArray[l].point2.x *= this.scale;
            this.lineArray[l].point2.y *= this.scale;
            this.lineArray[l].ReCalculate();
        }
        background.width *= this.scale;
        background.height *= this.scale;
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
    
    this.Update = function()
    {
        if(endCircle.IntersectsCircle(this.golfBall.collisionCircle))
        {
            if(this.golfBall.dx <= 10 && this.golfBall.dy <= 10)
                this.levelEnd = true;
        }
        this.golfBall.ApplyForce();
        this.golfBall.Update();
        this.golfBall.ApplyFriction();
        this.golfBall.UpdateTrajectory();
    }
    
    this.Draw = function(ctx)
    {
        background.Draw();
        ctx.fillStyle='000000';
        endCircle.Draw();
        this.golfBall.Draw();
        /*for(l in this.lineArray)
        {
               this.lineArray[l].Draw();
        }*/
    }
}