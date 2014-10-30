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
	var entry1 = document.createElement('li');
	var thumbnail1 = document.createElement('img');
	thumbnail1.src= array.items[0].snippet.thumbnails.default.url;
	var title1= document.createTextNode(array.items[0].snippet.title);
	entry1.appendChild(thumbnail);
	entry1.appendChild(title);
	entry1.appendChild(array.items[0].id.videoId);
	entry1.className = "theseVids";
	entry1.id = '1';
	list.appendChild(entry1);
	
	var entry2 = document.createElement('li');
	var thumbnail2 = document.createElement('img');
	thumbnail2.src= array.items[1].snippet.thumbnails.default.url;
	var title2= document.createTextNode(array.items[1].snippet.title);
	entry2.appendChild(thumbnail);
	entry2.appendChild(title);
		entry2.appendChild(array.items[1].id.videoId);
	entry2.className = "theseVids";
	entry2.id = '2';
	list.appendChild(entry2);
	
	var entry3 = document.createElement('li');
	var thumbnail3 = document.createElement('img');
	thumbnail3.src= array.items[2].snippet.thumbnails.default.url;
	var title3= document.createTextNode(array.items[2].snippet.title);
	entry3.appendChild(thumbnail);
	entry3.appendChild(title);
		entry3.appendChild(array.items[2].id.videoId);
	entry3.className = "theseVids";
	entry3.id = '3';
	list.appendChild(entry3);
	
	var entry4 = document.createElement('li');
	var thumbnail4 = document.createElement('img');
	thumbnail4.src= array.items[3].snippet.thumbnails.default.url;
	var title4= document.createTextNode(array.items[3].snippet.title);
	entry4.appendChild(thumbnail);
	entry4.appendChild(title);
		entry4.appendChild(array.items[3].id.videoId);
	entry4.className = "theseVids";
	entry4.id = '4';
	list.appendChild(entry4);
	
	var entry5 = document.createElement('li');
	var thumbnail5 = document.createElement('img');
	thumbnail5.src= array.items[4].snippet.thumbnails.default.url;
	var title5= document.createTextNode(array.items[4].snippet.title);
	entry5.appendChild(thumbnail);
	entry5.appendChild(title);
		entry5.appendChild(array.items[4].id.videoId);
	entry5.className = "theseVids";
	entry5.id = '5';
	list.appendChild(entry5);
	
	afterListCreated();
}

function afterListCreated() {
document.getElementById('1').addEventListener('click', function(){
	//Juan's func(document.getElementById('1').lastChild)
	console.log('clicked');
	playVid(document.getElementById('1').lastChild);
});
document.getElementById('2').addEventListener('click', function(){
	//Juan's func(document.getElementById('2').lastChild)
	console.log('clicked');
	playVid(document.getElementById('2').lastChild);
});
document.getElementById('3').addEventListener('click', function(){
	//Juan's func(document.getElementById('3').lastChild)
	console.log('clicked');
	playVid(document.getElementById('3').lastChild);
});
document.getElementById('4').addEventListener('click', function(){
	//Juan's func(document.getElementById('4').lastChild)
	console.log('clicked');
	playVid(document.getElementById('4').lastChild);
});
document.getElementById('5').addEventListener('click', function(){
	//Juan's func(document.getElementById('5').lastChild)
	console.log('clicked');
	playVid(document.getElementById('5').lastChild);
});
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