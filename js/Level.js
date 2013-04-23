function Level()
{
    this.lineArray = [];
    
    this.lineArray.push(new Line(new Point(0, 0), new Point(900, 0)));
    this.lineArray.push(new Line(new Point(900, 0), new Point(900, 900)));
    this.lineArray.push(new Line(new Point(900, 900), new Point(0, 900)));
    this.lineArray.push(new Line(new Point(0,0), new Point(900, 0)));
    this.lineArray.push(new Line(new Point(449, 846), new Point(451, 742)));
    this.lineArray.push(new Line(new Point(840, 826), new Point(449, 846)));
    this.lineArray.push(new Line(new Point(451, 742), new Point(570, 744)));
    this.lineArray.push(new Line(new Point(570, 744), new Point(731, 579)));
    this.lineArray.push(new Line(new Point(840, 826), new Point(875, 722)));
    this.lineArray.push(new Line(new Point(875, 722), new Point(867, 531)));
    this.lineArray.push(new Line(new Point(867, 531), new Point(876, 322)));
    this.lineArray.push(new Line(new Point(876, 322), new Point(690, 25)));
    this.lineArray.push(new Line(new Point(690, 25), new Point(82, 13)));
    this.lineArray.push(new Line(new Point(82, 13), new Point(9, 274)));
    this.lineArray.push(new Line(new Point(9, 274), new Point(27, 422)));
    this.lineArray.push(new Line(new Point(27, 422), new Point(28, 489)));
    this.lineArray.push(new Line(new Point(28, 489), new Point(18, 565)));
    this.lineArray.push(new Line(new Point(18, 565), new Point(42, 746)));
    this.lineArray.push(new Line(new Point(42, 746), new Point(43, 844)));
    this.lineArray.push(new Line(new Point(43, 844), new Point(97, 845)));
    this.lineArray.push(new Line(new Point(97, 845), new Point(149, 852)));
    this.lineArray.push(new Line(new Point(149, 852), new Point(429, 854)));
    this.lineArray.push(new Line(new Point(429, 854), new Point(430, 739)));
    this.lineArray.push(new Line(new Point(430, 739), new Point(144, 729)));
    this.lineArray.push(new Line(new Point(144, 729), new Point(150, 132)));
    this.lineArray.push(new Line(new Point(150, 132), new Point(611, 126)));
    this.lineArray.push(new Line(new Point(611, 126), new Point(740, 336)));
    this.lineArray.push(new Line(new Point(740, 336), new Point(731, 579)));
    
    //new Point(731, 579)
    this.moveSpeed = 3;
    this.scale = 1;
    
    var background = new Entity("lib/New Canvas.jpg", 0, 0, 900, 900);
    var levelStarted = false;
    this.golfBall = null;
    var endCircle = new Circle(368, 798, 16);
    
    this.levelDone = false;
    //lineArray.push(new Line(new Point(10, 50), new Point(50, 400)));
    
    this.Init = function()
    {
        console.error(this);
        this.golfBall = new Ball(508, 801);
    }
    
    this.moveLeft = function()
    {
        background.x -= this.moveSpeed;
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
                this.levelDone = true;
        }
    }
    
    this.Draw = function()
    {
        background.Draw();
        this.golfBall.Update();
        this.golfBall.Draw();
        endCircle.Draw();
        for(l in this.lineArray)
        {
               this.lineArray[l].Draw();
        }
    }
}