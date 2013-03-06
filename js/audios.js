function Audios()
{
    var soundBuffer;
    try
    {
        this.context = new webkitAudioContext();
    }
    catch(e)
    {
        alert('Web Audio API is not supported in this browser');
    }
    
    this.loadSound = function (url)
    {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        
        // Decode asynchronously
        request.onload = function()
        {
            context.decodeAudioData(request.response, function(buffer)
            {
              soundBuffer = buffer;
            }, onError);
        }
        request.send();
    }
    
    function onError()
    {
        alert('error');
    }
    
    this.playSound = function ()
    {
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = soundBuffer;                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.noteOn(0);                         // play the source now
    }
}