function Input(canvas)
{
    
    function GetMousePos(canvas, evt)
    {
        var rect = canvas.getBoundingClientRect();
        return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
    }
    
    var mousePos = new Point(0,0);
    var leftClickDown = false;
    var upDown = false;
    var leftDown = false;
    var rightDown = false;
    var downDown = false;
    var wDown = false;
    var aDown = false;
    var sDown = false;
    var dDown = false;
    var spaceDown = false;
    var qDown = false;
    var debug = false;
    
    
    canvas.addEventListener('mousemove', function(evt)
    {
        mousePos = GetMousePos(canvas, evt);
    }, false);
    
    canvas.addEventListener('mousedown', function(evt)
    {
        leftClickDown = true;
    }, false);
    
    canvas.addEventListener('mouseup', function(evt)
    {
        leftClickDown = false;
    }, false);
    
    window.addEventListener('keydown', function(evt)
    {
        if(evt.keyCode === 38)
        {
            upDown = true;
        }
        if(evt.keyCode === 37)
        {
            leftDown = true;
        }
        if(evt.keyCode === 39)
        {
            rightDown = true;
        }
        if(evt.keyCode === 40)
        {
            downDown = true;
        }
        if(evt.keyCode === 87)
        {
            wDown = true;
        }
        if(evt.keyCode === 65)
        {
            aDown = true;
        }
        if(evt.keyCode === 68)
        {
            dDown = true;
        }
        if(evt.keyCode === 83)
        {
            sDown = true;
        }
        if(evt.keyCode === 32)
        {
            spaceDown = true;
        }
        if(evt.keyCode === 81)
        {
            qDown = true;
        }
        if(evt.keyCode === 17) // Debug key as ctrl
        {
            debug = true;
        }
    }, false);
    
    window.addEventListener('keyup', function(evt)
    {
        if(evt.keyCode === 38)
        {
            upDown = false;
        }
        if(evt.keyCode === 37)
        {
            leftDown = false;
        }
        if(evt.keyCode === 39)
        {
            rightDown = false;
        }
        if(evt.keyCode === 40)
        {
            downDown = false;
        }
        if(evt.keyCode === 87)
        {
            wDown = false;
        }
        if(evt.keyCode === 65)
        {
            aDown = false;
        }
        if(evt.keyCode === 68)
        {
            dDown = false;
        }
        if(evt.keyCode === 83)
        {
            sDown = false;
        }
        if(evt.keyCode === 32)
        {
            spaceDown = false;
        }
        if(evt.keyCode === 81)
        {
            qDown = false;
        }
        if(evt.keyCode === 17) // Debug key as ctrl
        {
            debug = false;
        }
    }, false);
    
    this.Update = function()
    {
        this.mouseX = mousePos.x;
        this.mouseY = mousePos.y;
        this.mouseDown = leftClickDown;
        
        this.upPressed = upDown;
        this.leftPressed = leftDown;
        this.rightPressed = rightDown;
        this.downPressed = downDown;
        this.wPressed = wDown;
        this.aPressed = aDown;
        this.dPressed = dDown;
        this.sDown = sDown;
        this.spacePressed = spaceDown;
        this.qPressed = qDown;
        this.debugOn = debug;
    }
}