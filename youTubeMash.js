function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyBtYUMyKaWZZz_T909PIdaKKx-Xx2Lmgoc');
	search();
}

function search() {
  console.log('made it to search');
    var q = document.getElementById("searchbox").value;
    var request = gapi.client.youtube.search.list({
        type: 'video', 
        q: q,
        part: 'snippet'
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
