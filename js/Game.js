const FPS = 30;			// Used later, in the game loop
var canvas = null;		// This references an HTML element
var ctx = null;			// From what I've done so far, it looks like this is used for drawing
window.onload = init;	// Function to call when the window loads

// Game variables
var audioManager;
var currentInputs;
var previousInputs;
var mousePoint;

var launchBool;
var boundingLines = [];
var topArrow;
var bottomArrow;
var leftArrow;
var rightArrow;

var firstLevel;

var musicPlayed = false;
var levels = [];
var levelIndex = 0;

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
    
    topArrow = new Entity("lib/UpArrow.jpg", 0, 0, 32, 32);
    topArrow.isBeingDrawn = false;
    bottomArrow = new Entity("lib/DownArrow.jpg", 0, 0, 32, 32);
    bottomArrow.isBeingDrawn = false;
    leftArrow = new Entity("lib/LeftArrow.jpg", 0, 0, 32, 32);
    leftArrow.isBeingDrawn = false;
    rightArrow = new Entity("lib/RightArrow.jpg", 0, 0, 32, 32);
    rightArrow.isBeingDrawn = false;
    
    firstLevel = new Level();
    
    levels.push(firstLevel);
    
    boundingLines.push(new Line(new Point(0, 0), new Point(0, 900)));
    boundingLines.push(new Line(new Point(900, 0), new Point(900, 900)));
    boundingLines.push(new Line(new Point(900, 900), new Point(0, 900)));
    boundingLines.push(new Line(new Point(0,0), new Point(900, 0)));
    
    //lineList.push(testLine);
    
    launchBool = false;
    
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
    
    mousePoint = new Point(currentInputs.mouseX, currentInputs.mouseY);
    
    if(currentInputs.mouseDown)
    {
        console.warn(mousePoint);
    }
    
    if(levels[levelIndex].golfBall.collisionCircle.IntersectsPoint(mousePoint))
    {
        if(currentInputs.mouseDown && previousInputs.mouseDown === false)
        {
            levels[levelIndex].golfBall.Clicked(mousePoint);
            launchBool = true;
        }
    }
    
    if(levels[levelIndex].golfBall.isClicked)
    {
        levels[levelIndex].golfBall.Dragged(mousePoint);
        if(currentInputs.mouseDown === false && previousInputs.mouseDown)
        {
            levels[levelIndex].golfBall.Release(mousePoint);
            levels[levelIndex].golfBall.Launch();
            audioManager.Play('flick');
            launchBool = false;
        }
    }
    
    if(!(levels[levelIndex].golfBall.isClicked))
    {
        if(currentInputs.upPressed || currentInputs.wPressed)
        {
            levels[levelIndex].moveDown();
        }
        if(currentInputs.downPressed || currentInputs.sDown)
        {   
            levels[levelIndex].moveUp();
        }
        if(currentInputs.leftPressed || currentInputs.aPressed)
        {
            levels[levelIndex].moveRight();
        }
        if(currentInputs.rightPressed || currentInputs.dPressed)
        {
            levels[levelIndex].moveLeft();
        }
    }
    
    //Looking for intersection and the reflection vector
    
    var interSectionPoint;
    var numberOfLoops = 0;
    do
    {
        numberOfLoops++;
        if(numberOfLoops > 8)
        {
            break;
        }
        levels[levelIndex].golfBall.hadCollided = false;
        for(var l in levels[levelIndex].lineArray)
        {
            interSectionPoint = levels[levelIndex].lineArray[l].FindIntersectionPoint(levels[levelIndex].golfBall.trajectoryLine);
            if(levels[levelIndex].lineArray[l].IsPointOnLine(interSectionPoint) && levels[levelIndex].golfBall.trajectoryLine.IsPointOnLine(interSectionPoint))
            {
                levels[levelIndex].golfBall.x = interSectionPoint.x - levels[levelIndex].golfBall.radius;
                levels[levelIndex].golfBall.y = interSectionPoint.y - levels[levelIndex].golfBall.radius;
                var reflectVector = levels[levelIndex].lineArray[l].Reflect(new Point(levels[levelIndex].golfBall.dx, levels[levelIndex].golfBall.dy));
                levels[levelIndex].golfBall.dx = reflectVector.x;
                levels[levelIndex].golfBall.dy = reflectVector.y;
                audioManager.Play('bi');
                levels[levelIndex].golfBall.hadCollided = true;
                levels[levelIndex].golfBall.UpdateTrajectory();
            }
        } // END
    }
    while(levels[levelIndex].golfBall.hadCollided === true)    
    // Arrow Pointing Stuff
    if(levels[levelIndex].golfBall.centerPoint.x < -16 || levels[levelIndex].golfBall.centerPoint.x > 916 || levels[levelIndex].golfBall.centerPoint.y < -16 || levels[levelIndex].golfBall.centerPoint.y > 916)
    {
        var arrowPoint = new Point(0,0);
        var centerToBall = new Line(levels[levelIndex].golfBall.centerPoint, new Point(450, 450));
        for(var l in boundingLines)
        {
            arrowPoint = boundingLines[l].FindIntersectionPoint(centerToBall);
            if(boundingLines[l].IsPointOnLine(arrowPoint) && centerToBall.IsPointOnLine(arrowPoint))
            {
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
        levels[levelIndex].golfBall.x = mousePoint.x - 16;
        levels[levelIndex].golfBall.y = mousePoint.y - 16;
        levels[levelIndex].golfBall.dx = 0;
        levels[levelIndex].golfBall.dy = 0;
        levels[levelIndex].golfBall.hadCollided = false;
    }
    //if(currentInputs.spacePressed) // This can be used to center yourself on the ball but it breaks more than it helps
    //{
    //    firstLevel.CenterOn(golfBall);
    //}
    

    levels[levelIndex].golfBall.Update();
    levels[levelIndex].golfBall.UpdateTrajectory();
    
    levels[levelIndex].golfBall.ApplyFriction();
    
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
    
    levels[levelIndex].Draw();
    
    levels[levelIndex].golfBall.trajectoryLine.Draw();
    
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
        ctx.moveTo(levels[levelIndex].golfBall.x + levels[levelIndex].golfBall.radius, levels[levelIndex].golfBall.y + levels[levelIndex].golfBall.radius);
        ctx.lineTo(mousePoint.x, mousePoint.y);
        ctx.stroke();
    }
    
}