const FPS = 30;			// Used later, in the game loop
var canvas = null;		// This references an HTML element
var ctx = null;			// From what I've done so far, it looks like this is used for drawing
window.onload = init;	// Function to call when the window loads

// Game variables
var audioManager;
var currentInputs;
var previousInputs;
var mousePoint;

var golfBall;

var testLine;
var testLine2;
var lineList = [];
var launchBool;
var boundingLines = [];
var topArrow;
var bottomArrow;
var leftArrow;
var rightArrow;

var firstLevel;

var testAudio = new Audio('lib/audio/bosh.wav');
var musicPlayed = false;

// This is called when the page loads
function init()
{
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.warn('Game Start');
    
	canvas = document.getElementById('canvas'); // Get the HTML element with the ID of 'canvas'
	ctx = canvas.getContext('2d'); // This is necessary, but I don't know exactly what it does
    audioManager = new AudioManager(['lib/audio/bosh.wav','lib/audio/bi.wav','lib/audio/flick.wav','lib/audio/GalfSang.wav'], ['bosh','bi','flick','galf']);
    currentInputs = new Input(canvas);
    previousInputs = new Input(canvas);
    
    topArrow = new Entity("lib/UpArrow.jpg", 0, 0);
    topArrow.isBeingDrawn = false;
    bottomArrow = new Entity("lib/DownArrow.jpg", 0, 0);
    bottomArrow.isBeingDrawn = false;
    leftArrow = new Entity("lib/LeftArrow.jpg", 0, 0);
    leftArrow.isBeingDrawn = false;
    rightArrow = new Entity("lib/RightArrow.jpg", 0, 0);
    rightArrow.isBeingDrawn = false;
    
    firstLevel = new Level();
    
    firstLevel.lineArray.push(new Line(new Point(0, 0), new Point(900, 0)));
    firstLevel.lineArray.push(new Line(new Point(900, 0), new Point(900, 900)));
    firstLevel.lineArray.push(new Line(new Point(900, 900), new Point(0, 900)));
    firstLevel.lineArray.push(new Line(new Point(0,0), new Point(900, 0)));
    
    boundingLines.push(new Line(new Point(0, 0), new Point(0, 900)));
    boundingLines.push(new Line(new Point(900, 0), new Point(900, 900)));
    boundingLines.push(new Line(new Point(900, 900), new Point(0, 900)));
    boundingLines.push(new Line(new Point(0,0), new Point(900, 0)));
    
    //lineList.push(testLine);
    
    launchBool = false;
    
    golfBall = new Ball(508, 801); 
    
	setInterval(gameLoop, 1000 / FPS);
    
   // document.getElementById('header') = "";
}

// Our main program loop
function gameLoop()
{
    //audio.playSound();
	// Keep update and draw separate
    if(audioManager.GetIsReady())
    {
        if(!musicPlayed)
        {
            audioManager.PlayLoop('galf');
            musicPlayed = true;
        }
        Update();
        Draw();
    }
}

function Update()
{
    currentInputs.Update();
    
    if(currentInputs.mouseDown)
    {
        console.warn("Mouse X:" + currentInputs.mouseX);
        console.warn("Mouse Y:" + currentInputs.mouseY);
        
    }
    
    mousePoint = new Point(currentInputs.mouseX, currentInputs.mouseY);
    
    if(golfBall.collisionCircle.IntersectsPoint(mousePoint))
    {
        if(currentInputs.mouseDown && previousInputs.mouseDown === false)
        {
            golfBall.Clicked(mousePoint);
            launchBool = true;
        }
    }
    
    if(golfBall.isClicked)
    {
        golfBall.Dragged(mousePoint);
        if(currentInputs.mouseDown === false && previousInputs.mouseDown)
        {
            golfBall.Release(mousePoint);
            golfBall.Launch();
            audioManager.Play('flick');
            launchBool = false;
        }
    }
    
    if(!(golfBall.isClicked))
    {
        if(currentInputs.upPressed || currentInputs.wPressed)
        {
            firstLevel.moveDown();
            golfBall.y += firstLevel.moveSpeed;
        }
        if(currentInputs.downPressed || currentInputs.sDown)
        {   
            firstLevel.moveUp();
            golfBall.y -= firstLevel.moveSpeed;
        }
        if(currentInputs.leftPressed || currentInputs.aPressed)
        {
            firstLevel.moveRight();
            golfBall.x += firstLevel.moveSpeed;
        }
        if(currentInputs.rightPressed || currentInputs.dPressed)
        {
            firstLevel.moveLeft();
            golfBall.x -= firstLevel.moveSpeed;
        }
        if(currentInputs.spacePressed)
        {
            firstLevel.ZoomOut();
            golfBall.ballSprite.width *= firstLevel.scale;
            golfBall.ballSprite.height *= firstLevel.scale;
            golfBall.x *= firstLevel.scale;
            golfBall.y *= firstLevel.scale;
        }
    }
    
    //Looking for intersection and the reflection vector
    
    var interSectionPoint;
    var numberOfLoops = 0;
    do
    {
        numberOfLoops++;
        console.warn(numberOfLoops);
        if(numberOfLoops > 8)
        {
            break;
        }
        golfBall.hadCollided = false;
        for(var l in firstLevel.lineArray)
        {
            interSectionPoint = firstLevel.lineArray[l].FindIntersectionPoint(golfBall.trajectoryLine);
            if(firstLevel.lineArray[l].IsPointOnLine(interSectionPoint) && golfBall.trajectoryLine.IsPointOnLine(interSectionPoint))
            {
                golfBall.x = interSectionPoint.x - golfBall.radius;
                golfBall.y = interSectionPoint.y - golfBall.radius;
                var reflectVector = firstLevel.lineArray[l].Reflect(new Point(golfBall.dx, golfBall.dy));
                golfBall.dx = reflectVector.x;
                golfBall.dy = reflectVector.y;
                audioManager.Play('bi');
                golfBall.hadCollided = true;
                golfBall.UpdateTrajectory();
                console.warn(l);
            }
        } // END
    }
    while(golfBall.hadCollided === true)    
    // Arrow Pointing Stuff
    if(golfBall.centerPoint.x < -16 || golfBall.centerPoint.x > 916 || golfBall.centerPoint.y < -16 || golfBall.centerPoint.y > 916)
    {
        var arrowPoint = new Point(0,0);
        var centerToBall = new Line(golfBall.centerPoint, new Point(450, 450));
        for(var l in boundingLines)
        {
            arrowPoint = boundingLines[l].FindIntersectionPoint(centerToBall);
            if(boundingLines[l].IsPointOnLine(arrowPoint) && centerToBall.IsPointOnLine(arrowPoint))
            {
                //console.warn("Arrowpoint: " + arrowPoint.x + ", " + arrowPoint.y)
                if(arrowPoint.y === 0)
                {
                    topArrow.x = arrowPoint.x - 16;
                    topArrow.y = arrowPoint.y;
                    topArrow.isBeingDrawn = true;
                }
                else if(arrowPoint.y === 900)
                {
                    bottomArrow.x = arrowPoint.x - 16;
                    bottomArrow.y = arrowPoint.y - 32;
                    bottomArrow.isBeingDrawn = true;
                }
                else if(arrowPoint.x === 0)
                {
                    leftArrow.x = arrowPoint.x;
                    leftArrow.y = arrowPoint.y - 16;
                    leftArrow.isBeingDrawn = true;
                }
                else if(arrowPoint.x === 900)
                {
                    rightArrow.x = arrowPoint.x - 32;
                    rightArrow.y = arrowPoint.y - 16;
                    rightArrow.isBeingDrawn = true;
                }
            }
        } 
    }
    else
    {
        topArrow.isBeingDrawn = false;
        bottomArrow.isBeingDrawn = false;
        leftArrow.isBeingDrawn = false;
        rightArrow.isBeingDrawn = false;
    } // END OF ARROW JUNK
    
    //console.warn(golfBall.hadCollided);
    
    if(currentInputs.debugOn) //Simply stops the ball and moves it to the cursor
    {
        golfBall.x = mousePoint.x - 16;
        golfBall.y = mousePoint.y - 16;
        golfBall.dx = 0;
        golfBall.dy = 0;
        golfBall.hadCollided = false;
    }
    //if(currentInputs.spacePressed) // This can be used to center yourself on the ball but it breaks more than it helps
    //{
    //    firstLevel.CenterOn(golfBall);
    //}
    

        golfBall.Update();
    golfBall.UpdateTrajectory();
    
    golfBall.ApplyFriction();
    
    previousInputs.Update();
    
    //music.Play();
}

function Draw()
{
	// Clear the screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='#6495ED';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //ctx.
    
    firstLevel.Draw();
    
    golfBall.Draw();
    golfBall.trajectoryLine.Draw();
    
    
    if(topArrow.isBeingDrawn)
    {
        topArrow.Draw();
    }
    if(bottomArrow.isBeingDrawn)
    {
        bottomArrow.Draw();
    }
    if(leftArrow.isBeingDrawn)
    {
        leftArrow.Draw();
    }
    if(rightArrow.isBeingDrawn)
    {
        rightArrow.Draw();
    }
    
    if(launchBool)
    {
        ctx.beginPath();
        ctx.moveTo(golfBall.x + golfBall.radius, golfBall.y + golfBall.radius);
        ctx.lineTo(mousePoint.x, mousePoint.y);
        ctx.stroke();
    }
    
}