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
    localStorage.setItem('str', str);
    var array= JSON.parse(str);
    createList(array);
    });
}

function createList(array) {
	console.log(array);
	var list= document.getElementById("videos");
	if ($("#videos").has("li").length != 0) {
		clearList();
		}
	for (i=0;i<5;i++){
		var entry = document.createElement('li');
		var thumbnail = document.createElement('img');
		thumbnail.src= array.items[i].snippet.thumbnails.default.url;
		var title= document.createTextNode(array.items[i].snippet.title);
		entry.appendChild(thumbnail);
		entry.appendChild(title);
		entry.className = "theseVids";
		var ID= array.items[i].id.videoId;
		entry.id= ID;
		entry.onclick = clicked;
		list.appendChild(entry);
}
}

function clicked() {
	selectVid(this.id);
}

function selectVid(ID) {
	playVideo(ID);
	displayVideoAnalytics(ID);
	console.log('clciked');
}

function playVideo(ID) {
	var source;
	var source= 'http://www.youtube.com/embed/' + ID; 
	var videoPlay = document.getElementById('player');
	videoPlay.src= source;
}
function clearList() {
	var entry = document.getElementById("videos");
	while ( entry.firstChild ) entry.removeChild( entry.firstChild );
}

// FIRST NEED to get the views of what region they are coming from 
