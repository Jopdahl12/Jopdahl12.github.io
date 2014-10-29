function handleAPILoaded() {
	console.log('in handle API loaded');
	var searchButton = document.getElementById("search-button");
	searchButton.disabled = false;
}

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
    console.log(str);
}

