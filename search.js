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
	clearList();
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
		entry.className = "theseVids";
		var ID = array.items[i].id.videoID;
		entry.onclick = selectVideo(ID);
		list.appendChild(entry);
	}
}

function selectVideo(vidID) {
	//Juansfunction(vidID);
	playVideo(vidID);
	console.log('onclickworked');
}

function playVideo(vidID) {
	var source;
	var source= 'www.youtube.com/watch?v=' + vidID; 
	var videoPlay = document.getElementById('vid');
	videoPlay.src= source;
}

function clearList() {
	for (i=0; i < 5; i++) {
		var entry = document.getElementById("videos");
		videos.removeChild();
		}
}