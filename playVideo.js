var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
	event.target.playVideo();
}
