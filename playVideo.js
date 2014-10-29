var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
	event.target.playVideo();
}
