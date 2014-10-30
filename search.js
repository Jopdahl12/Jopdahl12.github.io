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
    createList(str)});
}
function createList(str) {
	var array= JSON.parse(str);
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
		entry.id = array.items[i].id.videoId;
		entry.onclick = selectVid;
		list.appendChild(entry);
}
}

function selectVid(ID) {
	//Juan
	console.log('clciked');
	//playVideo(ID);
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