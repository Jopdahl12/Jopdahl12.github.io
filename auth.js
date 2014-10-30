(function() {
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
  	handleAPILoaded();
  gapi.client.load('youtubeAnalytics', 'v1').then(function(){
  		getUserChannel();
  	});
  	});
}

function handleAPILoaded() {
	console.log('in handle API loaded');
	var searchButton = document.getElementById("search-button");
	searchButton.disabled = false;
}





// Call the Data API to retrieve information about the currently
  // authenticated user's YouTube channel.
  function getUserChannel() {
    // Also see: https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
      // Setting the "mine" request parameter's value to "true" indicates that
      // you want to retrieve the currently authenticated user's channel.
      mine: true,
      part: 'id,contentDetails'
    });

    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
      } else {
        // We need the channel's channel ID to make calls to the Analytics API.
        // The channel ID value has the form "UCdLFeWKpkLhkguiMZUp8lWA".
        channelId = response.items[0].id;
        // Retrieve the playlist ID that uniquely identifies the playlist of
        // videos uploaded to the authenticated user's channel. This value has
        // the form "UUdLFeWKpkLhkguiMZUp8lWA".
        var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // Use the playlist ID to retrieve the list of uploaded videos.
        getPlaylistItems(uploadsListId);
      }
    });
  }

  // Call the Data API to retrieve the items in a particular playlist. In this
  // example, we are retrieving a playlist of the currently authenticated user's
  // uploaded videos. By default, the list returns the most recent videos first.
  function getPlaylistItems(listId) {
    // See https://developers.google.com/youtube/v3/docs/playlistitems/list
    var request = gapi.client.youtube.playlistItems.list({
      playlistId: listId,
      part: 'snippet'
    });

    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
      } else {
        if ('items' in response) {
          // The jQuery.map() function iterates through all of the items in
          // the response and creates a new array that only contains the
          // specific property we're looking for: videoId.
          var videoIds = $.map(response.items, function(item) {
            return item.snippet.resourceId.videoId;
          });

          // Now that we know the IDs of all the videos in the uploads list,
          // we can retrieve information about each video.
          getVideoMetadata(videoIds);
        } else {
          displayMessage('There are no videos in your channel.');
        }
      }
    });
  }

  // Given an array of video IDs, this function obtains metadata about each
  // video and then uses that metadata to display a list of videos.
  function getVideoMetadata(videoIds) {
    // https://developers.google.com/youtube/v3/docs/videos/list
    var request = gapi.client.youtube.videos.list({
      // The 'id' property's value is a comma-separated string of video IDs.
      id: videoIds.join(','),
      part: 'id,snippet,statistics'
    });

    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
      } else {
        // Get the jQuery wrapper for the #video-list element before starting
        // the loop.
        var videoList = $('#video-list');
        $.each(response.items, function() {
          // Exclude videos that do not have any views, since those videos
          // will not have any interesting viewcount Analytics data.
          if (this.statistics.viewCount == 0) {
            return;
          }

          var title = this.snippet.title;
          var videoId = this.id;

          // Create a new <li> element that contains an <a> element.
          // Set the <a> element's text content to the video's title, and
          // add a click handler that will display Analytics data when invoked.
          var liElement = $('<li>');
          var aElement = $('<a>');
          // Setting the href value to '#' ensures that the browser renders the
          // <a> element as a clickable link.
          aElement.attr('href', '#');
          aElement.text(title);
          aElement.click(function() {
            displayVideoAnalytics(videoId);
          });

          // Call the jQuery.append() method to add the new <a> element to
          // the <li> element, and the <li> element to the parent
          // list, which is identified by the 'videoList' variable.
          liElement.append(aElement);
          videoList.append(liElement);
        });

        if (videoList.children().length == 0) {
          // Display a message if the channel does not have any viewed videos.
          displayMessage('Your channel does not have any videos that have been viewed.');
        }
      }
    });
  }

  // This function requests YouTube Analytics data for a video and displays
  // the results in a chart.
  function displayVideoAnalytics(videoId) {
    if (channelId) {
      // To use a different date range, modify the ONE_MONTH_IN_MILLISECONDS
      // variable to a different millisecond delta as desired.
      var today = new Date();
      var lastMonth = new Date(today.getTime() - ONE_MONTH_IN_MILLISECONDS);

      var request = gapi.client.youtubeAnalytics.reports.query({
        // The start-date and end-date parameters must be YYYY-MM-DD strings.
        'start-date': formatDateString(lastMonth),
        'end-date': formatDateString(today),
        // At this time, you need to explicitly specify channel==channelId.
        // See https://developers.google.com/youtube/analytics/v1/#ids
        ids: 'channel==' + channelId,
        dimensions:province,
        sort: 'day',
        // See https://developers.google.com/youtube/analytics/v1/available_reports
        // for details about the different filters and metrics you can request
        // if the "dimensions" parameter value is "day".
        metrics=views
        filters=claimedStatue==claimed;country==US
        sort=province
      });

      request.execute(function(response) {
        // This function is called regardless of whether the request succeeds.
        // The response contains YouTube Analytics data or an error message.
        if ('error' in response) {
          displayMessage(response.error.message);
        } else {
          displayChart(videoId, response);
        }
      });
    } else {
      // The currently authenticated user's channel ID is not available.
      displayMessage('The YouTube channel ID for the current user is not available.');
    }
  }

  

  