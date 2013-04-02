function AudioManager(music, sounds)
{
    this.context = new webkitAudioContext();
    this.Music={};
    this.Sounds={};
    
    var bufferLoader;
    
    bufferLoader = new BufferLoader(
        this.context,
        music,
        finishedLoading
    );
    bufferLoader.load();
    
    
    function finishedLoading(bufferList)
    {
        alert('Sound Loaded');
        var source1 = this.context.createBufferSource();
        source1.buffer = bufferList[0];
        source1.connect(this.context.destination);
        source1.noteOn(0);
    }
    
    this.PlayLoop = function(song)
    {
        
    }
}



// var context;
// var bufferLoader;
// 
// function audioInit()
// {
//     context = new webkitAudioContext();
//     
//     bufferLoader = new BufferLoader(
//         context,
//         [
//             'lib/audio/sound.wav',
//         ],
//         finishedLoading
//     );
//     bufferLoader.load();
// }
// 
// function finishedLoading(bufferList)
// {
//     alert('Sound Loaded');
//     var source1 = context.createBufferSource();
//     source1.buffer = bufferList[0];
//     source1.connect(context.destination);
//     source1.noteOn(0);
// }