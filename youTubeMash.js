function handleClientLoad() {
  gapi.client.setApiKey('AIzaSyBn12Ilgr8e714Ed4y2qTpcX8GmRyqtWb4');
  console.log('apikeyset');
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({
	client_id: '595419487211-ntpujumuihlk5rh87hlc0datut3q4b5a.apps.googleusercontent.com',
	scope: 'https://www.googleapis.com/youtube/v3/videos',
	immediate: true}, handleAuthResult);
  console.log('handling auth result');
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  console.log('got auth button');
  if (authResult && !authResult.error) {
  console.log('inif statement');
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({
  	client_id:'595419487211-ntpujumuihlk5rh87hlc0datut3q4b5a.apps.googleusercontent.com',
  	scope: 'https://www.googleapis.com/youtube/v3/videos',
  	immediate: false}, handleAuthResult);
  return false;
}

function makeApiCall() {
    gapi.client.load('youtube', 'v3').then(search());
}

function search() {
  console.log('made it to search');
    var q = document.getElementById("searchbox").value;
    var request = gapi.client.youtube.search.list({
        type: 'video', 
        q: q,
        part: 'snippet',
        videoEmbeddable: 'true'
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
	console.log(response);
        var str = JSON.stringify(response.result);
    
    createList(str);
}

function createList(str) {
	var array= JSON.parse(str);
	console.log(array);
	var list= document.getElementById("videos");
	for (i=0; i < array.length ; i++) {
		var entry = document.createElement('li');
		var thumbnail = array[i].snippet.thumbnails.default;
		var title= document.createTextNode(array[i].snippet.title);
		entry.appendChild(thumbnail);
		entry.appendChild(title);
		entry.setClassName= "theseVids";
		entry.onclick=playVideo(array[i].id.videoId);
		list.appendChild(entry);
	}
}

function playVideo(ID) {
	var source;
	var source= 'www.youtube.com/watch?v=' + ID; 
	var videoPlay = document.getElementById('vid');
	videoPlay.src= source;
}

