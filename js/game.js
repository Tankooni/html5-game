const FPS = 30;			// Used later, in the game loop
var canvas = null;		// This references an HTML element
var ctx = null;			// From what I've done so far, it looks like this is used for drawing
window.onload = init;	// Function to call when the window loads

// Game variables
var player;
var enemy;
var cube;
var cube2;
var audio;

// Our list of entities
var entities = [];

// This is called when the page loads
function init()
{
    console.warn('Game Start');
    
	canvas = document.getElementById('canvas'); // Get the HTML element with the ID of 'canvas'
	ctx = canvas.getContext('2d'); // This is necessary, but I don't know exactly what it does
    
    audio = new Audios();
	//audio.loadSound('lib/audio/sound.wav');
	// Initialize our game variables. This is a constructor that I made in entity.js
	player = new Entity("lib/background.png", 100, 200);
	enemy = new Entity("lib/background.png", 0, 0);
    cube = new AnimatedEntity("lib/cubeSpriteSheet.png", 0, 250, 60, 60, 5, 6);
    cube2 = new AnimatedEntity("lib/cubeSpriteSheet.png", 300, 250, 60, 60, 5, 6);
    
	// Add them to our entity list
	entities.push(player);
	entities.push(enemy);
    //entities.push(cube);
    //entities.push(cube2);
	
	// This tells the "engine" (or whatever) to call the given
	// function (gameLoop) at the rate we give it (every 1000/FPS milliseconds)
	setInterval(gameLoop, 1000 / FPS);
    
    
}

// Our main program loop
function gameLoop()
{
    //audio.playSound();
	// Keep update and draw separate
	update();
	draw();
}

function update()
{
	// Update each entity
	for (e in entities)
	{
		entities[e].update();
	}
    if(!cube2.collisionRect.IntersectsRect(cube.collisionRect))
    {
        cube.update();
        cube2.update();
    }
        
    
}

function draw()
{
	// Clear the screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw each entity
	for (e in entities)
	{
		entities[e].draw();
	}
    
    cube.draw();
    cube2.draw();
}