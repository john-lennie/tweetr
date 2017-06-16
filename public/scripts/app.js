$(function() {

  $( ".toggle-form-button" ).click(function() {
    $( ".new-tweet" ).slideToggle( "fast", function() {
      $(".new-tweet form textarea").focus();
    });
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    let serializedData = $(this).serialize();
    var x = document.forms["tweetForm"]["text"].value;
    if (x == "") {
        alert("No text submitted to post.");
        return false;
    } else if (x.length > 140) {
        alert("Tweet can't be longer than 140 characters!");
        return false;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData,
      success: function (result) {
        $("#all-tweets").prepend(loadTweet());
      }
    });
    $("#compose-tweet").val('');
  });

  function loadTweet() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (result) {
         $("#all-tweets").prepend(createTweetElement(result[result.length - 1]));
      }
    });
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (result) {
         renderTweets(result);
      }
    });
  }

  loadTweets();

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // create html with info from object given
  function createTweetElement(tweet) {
    var tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars.small}" />
        <h2>${tweet.user.name}</h2>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <div class="date">${tweet.created_at}</div>
        <div class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>`;
    return tweet;
  }

  function renderTweets(tweets) {
    for (var i = 0; i < tweets.length; i++) {
      $("#all-tweets").prepend(createTweetElement(tweets[i]));
    }
  }

});
