const FPS = 30;    		// Used later, in the game loop
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

//var firstLevel = new Level();

// This is called when the page loads
function init()
{
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.warn('Game Start');
    
	canvas = document.getElementById('canvas'); // Get the HTML element with the ID of 'canvas'
	ctx = canvas.getContext('2d'); // This is necessary, but I don't know exactly what it does
    audioManager = new AudioManager(['lib/audio/bosh.wav','lib/audio/bi.wav','lib/audio/flick.wav'], ['bosh','bi','flick']);
    currentInputs = new Input(canvas);
    previousInputs = new Input(canvas);
    
    testLine = new Line(new Point(10, 50), new Point(50, 400));
    testLine2 = new Line2(new Point(10, 50), new Point(50, 400));
    
    //firstLevel.lineArray.push(testLine)
    
    //lineList.push(testLine);
    
    launchBool = false;
    
    golfBall = new Ball((canvas.width / 2) - 16, (canvas.height / 2) - 16);  
    
	setInterval(gameLoop, 1000 / FPS);
}

// Our main program loop
function gameLoop()
{
    //audio.playSound();
	// Keep update and draw separate
    if(audioManager.GetIsReady())
    {
        Update();
        Draw();
    }
}

function Update()
{
    currentInputs.Update();
    
    if(currentInputs.upPressed)
    {
        
        
    }
    else if(currentInputs.downPressed)
    {
        
        
    }
    else if(currentInputs.leftPressed)
    {
        
        
    }
    else if(currentInputs.rightPressed)
    {
        
    }
    
    mousePoint = new Point(currentInputs.mouseX, currentInputs.mouseY);
    
    if(golfBall.x < 0 )
    {
        golfBall.dx *= -1;
        golfBall.x = 0;
        audioManager.Play('bi');
        
    }
    else if( golfBall.x + (golfBall.radius * 2) > canvas.width)
    {
        golfBall.dx *= -1;
        golfBall.x = canvas.width - (golfBall.radius * 2);
        audioManager.Play('bi');
    }
    if(golfBall.y < 0 )
    {
        golfBall.dy *= -1;
        golfBall.y = 0;
        audioManager.Play('bi');
    }
    else if (golfBall.y + (golfBall.radius * 2) > canvas.height)
    {
        golfBall.dy *= -1;
        golfBall.y = canvas.height - golfBall.radius * 2;
        audioManager.Play('bi');
    }
    
    if(golfBall.collisionCircle.IntersectsPoint(mousePoint))
    {
        if(currentInputs.mouseDown && previousInputs.mouseDown === false)
        {
            golfBall.Clicked(mousePoint);
            launchBool = true;
        }
        
    }
    
    /*
    for(l in lineList)
    {   if(!(lineList[l].point1.y > golfBall.centerPoint.y + 16) && !(lineList[l].point2.y < golfBall.centerPoint.y - 16))
        {
            if(lineList[l].DistanceToPoint(golfBall.centerPoint) < golfBall.radius)
            {
                golfBall.dx *= -1;
                
                
            }
        }
    }
    */
    
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
    
    golfBall.Update();
    
    previousInputs.Update();
}

function Draw()
{
	// Clear the screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='#6495ED';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    golfBall.Draw();
    testLine2.Draw(ctx);
    //firstLevel.Draw();
    
    if(launchBool)
    {
        ctx.beginPath();
        ctx.moveTo(golfBall.x + golfBall.radius, golfBall.y + golfBall.radius);
        ctx.lineTo(mousePoint.x, mousePoint.y);
        ctx.stroke();
    }
    
}