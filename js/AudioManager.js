function AudioManager(sounds, soundsName)
{
    var context = new webkitAudioContext();
    var Sounds = {};
    var buffers = {};
    this.currentMusic=null;
    var isReady = false;
    
    
    var bufferLoader;
    
    bufferLoader = new BufferLoader(
        context,
        sounds,
        finishedLoading
    );
    bufferLoader.load();
    
    
    function finishedLoading(bufferList)
    {
        //alert('Sound Loaded');
        for(var i = 0; i < bufferList.length; i++)
        {
            buffers[soundsName[i]] = bufferList[i];
        }
        isReady = true;
        console.warn(this);
        // var source1 = this.context.createBufferSource();
        // source1.buffer = bufferList[0];
        // source1.loop = true;
        // source1.connect(context.destination);
        //source1.noteOn(0);
    }
    
    this.PlayLoop = function(song)
    {
        if(this.currentMusic !== null)
        {
            this.currentMusic.noteOff(0);
        }
        Sounds[song] = context.createBufferSource();
        Sounds[song].buffer = buffers[song];
        Sounds[song].loop = true;
        Sounds[song].connect(context.destination);
        Sounds[song].noteOn(0);
        this.currentMusic = Sounds[song];
        
    }
    
    this.Play = function(sound)
    {
        Sounds[sound] = context.createBufferSource();
        Sounds[sound].buffer = buffers[sound];
        Sounds[sound].connect(context.destination);
        Sounds[sound].noteOn(0);
    }
    
    this.GetIsReady = function()
    {
        return isReady;
    }
}