/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  tweets.forEach((value) => {
    $('#tweets-container').prepend(createTweetElement(value));
  });
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
  let time = Math.floor((Date.now() - tweet.created_at) / 86400000);
  const markup = `
  <article class="post-tweet">
    <header id="tweet-header">
      <div id="tweet-top-left-corner">
        <img id="image" src="${tweet.user.avatars}">
        <a id="name">${tweet.user.name}</a>
      </div>
      <a class="userID">${tweet.user.handle}</a>
    </header>
      <div id="inner-tweet">
        <p id="tweet-phrase">${escape(tweet.content.text)}</p>     
      </div>
    <footer id="tweet-footer">
      <a id="date">${time} days ago</a>
      <div id="tweet-icons">
        <img id="heart" src="/images/heart.png">
        <img id="arrows" src="/images/exchange.png">
        <img id="flag" src="/images/flag.png">
      </div>
    </footer>
  </article>
  `;
  return $tweet.append(markup);
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


$(document).ready(function(){
  // get tweets from server
  
  $( "#post-tweets" ).on( "submit", function( event ) {
    event.preventDefault();

    if ($('textarea').val().length > 140) {
      $("#tweet-warning-long").slideDown();
      setTimeout(function(){$("#tweet-warning-long").slideUp()}, 5000);
      
    } else if ($('textarea').val().length <= 0 || $('textarea').val().length === null){ 
      $("#tweet-warning-short").slideDown();
      setTimeout(function(){$("#tweet-warning-short").slideUp()}, 5000);
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $( this ).serialize(),
        success: () => {
          loadTweets();
          $('#myText').val('');
          $('.counter').text(140);

        },
        error: function(){
        //your code here
        }
      });
    }
  });

  const loadTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();
});
