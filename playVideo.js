var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'u1zgFlCw8Aw',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady() {
        console.log('ready');
    }

    function onPlayerStateChange() {
        console.log('player changed');
    }
);
