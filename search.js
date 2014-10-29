// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    type: 'video',
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    createList(str)});
}
function createList(str) {
	var array= JSON.parse(str);
	console.log(array);
	var list= document.getElementById("videos");
	for (i=0; i < 5 ; i++) {
		var entry = document.createElement('li');
		var thumbnail = document.createElement('img');
		thumbnail.src= array.items[i].snippet.thumbnails.default.url;
		var title= document.createTextNode(array.items[i].snippet.title);
		entry.appendChild(thumbnail);
		entry.appendChild(title);
		entry.setClassName= "theseVids";
		entry.onclick=selectVideo(array.items[i].id.videoId);
		list.appendChild(entry);
	}
}

selectVideo(vidID) = function() {
	Juansfunction(vidID);
	playVideo(vidID);
}

playVideo(vidID) = function() {
	var source;
	var source= 'www.youtube.com/watch?v=' + vidID; 
	var videoPlay = document.getElementById('vid');
	videoPlay.src= source;
}