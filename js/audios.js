//var audioContext;
//var soundBuffer = null;
//var soundIsReady = false;
//
//function audioInit()
//{
//    try
//    {
//        audioContext = new webkitAudioContext();
//    }
//    catch(e)
//    {
//        alert('Web Audio API is not supported in this browser');
//    }
//}
//    
//function loadSound(url)
//{
//    var request = new XMLHttpRequest();
//    request.open('GET', url, true);
//    request.responseType = 'arraybuffer';
//    
//    // Decode asynchronously
//    request.onload = function()
//    {
//        audioContext.decodeAudioData(request.response, function(buffer)
//        {
//          soundBuffer = buffer;
//        }, onError);
//        soundIsReady = true;
//        console.warn('Sound Loaded?');
//    
//    request.send();
//    console.warn(request.readyState);
//}
//    
//function onError()
//{
//    alert('error');
//}
//    
//function playSound()
//{
//    console.warn('playing sound');
//    var source = audioContext.createBufferSource(); // creates a sound source
//    source.buffer = soundBuffer;                    // tell the source which sound to play
//    source.connect(audioContext.destination);       // connect the source to the context's destination (the speakers)
//    source.noteOn(0);                         // play the source now
//}


//window.onload = init();

var context;
var bufferLoader;

function audioInit()
{
    context = new webkitAudioContext();
    
    bufferLoader = new BufferLoader(
        context,
        [
            'lib/audio/sound.wav',
        ],
        finishedLoading
    );
    bufferLoader.load();
    
}

function finishedLoading(bufferList)
{
    alert('Sound Loaded');
    var source1 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source1.connect(context.destination);
    source1.noteOn(0);
}