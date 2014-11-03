// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    type: 'video',
    q: q,
    part: 'snippet' 
  });

  request.execute(function(response) {
    if ('error' in response) {
      var vidbar = document.getElementById("vidbar");
      var entry = document.createElement("div");
      var text = document.createTextNode("Error: invalid search. Please search another topic.");
      entry.className = "error";
      entry.appendChild(text);
      vidbar.appendChild(entry);
    }
    else {
      var str = JSON.stringify(response.result);
      localStorage.setItem('str', str);
      var array= JSON.parse(str);
      createList(array);
      }
    });
}

function createList(array) {
	console.log(array);
	var container= document.getElementById("vidbar");
	if ($("#vidbar:has(*)").length) {
		clearList();
		}
  if (array.items.length == 0) {
      var vidbar = document.getElementById("vidbar");
      var entry = document.createElement("div");
      var text = document.createTextNode("Error: invalid search. Please search another topic.");
      entry.className = "error";
      entry.appendChild(text);
      vidbar.appendChild(entry);
  }
  else {
	 for (i=0;i<array.pageInfo.resultsPerPage;i++){
		  var entry = document.createElement('div');
     var entry2 = document.createElement('div');
		  var thumbnail = document.createElement('img');
		  thumbnail.src= array.items[i].snippet.thumbnails.default.url;
		  var title= document.createTextNode(array.items[i].snippet.title);
      entry2.className = "thumbs";
		  entry2.appendChild(thumbnail);
      entry.appendChild(entry2);
		  entry.appendChild(title);
		  entry.className = "theseVids";
		  var ID= array.items[i].id.videoId;
		  entry.id= ID;
		  entry.onclick = clicked;
		  container.appendChild(entry);
    }
  }
}

function clicked() {
	selectVid(this.id);
}

function selectVid(ID) {
	playVideo(ID);
	console.log('clciked');
}

function playVideo(ID) {
	var source;
	var source= 'http://www.youtube.com/embed/' + ID; 
	var videoPlay = document.getElementById('player');
	videoPlay.src= source;
}
function clearList() {
	var entry = document.getElementById("vidbar");
	while ( entry.firstChild ) entry.removeChild( entry.firstChild );
}
