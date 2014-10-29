// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3').then(handleAPILoaded);
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
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
    $('#vidbar').html('<pre>' + str + '</pre>');
  });
}