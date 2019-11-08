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


///////////////////////////////////
// Renders the Tweets
///////////////////////////////////

const renderTweets = function(tweets) {
  $('#tweets-container').empty();  // empties the tweets container so it won't double post
  tweets.forEach((value) => {      // it runs the array and prepends the new tweet to the container
    $('#tweets-container').prepend(createTweetElement(value));
  });
}

////////////////////////////////////
// Tweet Creater
///////////////////////////////////

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let time = Math.floor((Date.now() - tweet.created_at) / 86400000); // calculates the date
  // the prototype for creating the tweet
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

//////////////////////////////
// Prevent malicious code
//////////////////////////////

const escape =  function(str) {  // the code provided by the lesson to prevent malicious code
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//////////////////////////////////
// POST and GET for server
//////////////////////////////////

$(document).ready(function(){
  $( "#post-tweets" ).on( "submit", function( event ) {    // get tweets from server
    event.preventDefault();   // stops the page from loading /tweets

    if ($('textarea').val().length > 140) {    // checks if the tweet is over 140 chars
      $("#tweet-warning-long").slideDown();    // warns the user that the tweet is too long
      setTimeout(function(){$("#tweet-warning-long").slideUp()}, 5000);
      
    } else if ($('textarea').val().length <= 0 || $('textarea').val().length === null) { 
      $("#tweet-warning-short").slideDown();    // checks if the tweet is empty or null and warns
      setTimeout(function(){$("#tweet-warning-short").slideUp()}, 5000); // the user
    } else {
      $.ajax({  // The tweet is posted into the /tweet page
        type: "POST",
        url: '/tweets',
        data: $( this ).serialize(),
        success: () => {
          loadTweets();
          $('#myText').val('');
          $('.counter').text(140);
        },
        error: function(){
        }
      });
    }
  });

  const loadTweets = function () {  // Gets the tweet from the /tweet age and sends it to renderTweets
    $.ajax('/tweets', {method: 'GET'})
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();  // loads the page with the tweets in the database
});
