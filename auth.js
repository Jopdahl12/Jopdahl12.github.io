// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '595419487211-ntpujumuihlk5rh87hlc0datut3q4b5a.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/yt-analytics.readonly'
];

var ONE_MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

var channelId;

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
	console.log('google client ready');
  gapi.auth.init(checkAuth);
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
console.log('checking authorization');
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
console.log('handlingresult...');
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
  console.log('un-oh');
  	document.getElementById('login-link').style.display='inline';
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}
// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
	console.log('loading.....');
  gapi.client.load('youtube', 'v3').then(function () {
  gapi.client.load('youtubeAnalytics', 'v1').then(function(){
		handleAPILoaded();
  	});
  	});
}

function handleAPILoaded() {
	console.log('in handle API loaded');
	var searchButton = document.getElementById("search-button");
	searchButton.disabled = false;
}