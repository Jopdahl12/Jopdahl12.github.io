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
	console.log('creating list');
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

