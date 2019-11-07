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
  // for(let i =  0; i < tweets.length; i++) {
  //   let singleTweet = tweets[i];
  //   const tweet = createTweetElement(singleTweet);
  //   $('#tweets-container').append(tweet);
  // }
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
  let time = Math.floor((Date.now() - tweet.created_at) / 86400000);
  const markup = `
  <article class="post-tweet">
    <header>
      <img id="image" src="${tweet.user.avatars}">
      <a id="name">${tweet.user.name}</a>
      <a class="userID">${tweet.user.handle}</a>
    </header>
      <div id="inner-tweet">
        <p>${escape(tweet.content.text)}</p>     
      </div>
    <footer>
      <a id="date">${time} days ago</a>
      <img id="heart" src="/images/heart.png">
      <img id="arrows" src="/images/exchange.png">
      <img id="flag" src="/images/flag.png">
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
  //renderTweets(data);

  $( "#post-tweets" ).on( "submit", function( event ) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $( this ).serialize(),
      //dataType: 'JSON',
      success: () => {
        let tweetSize = ($(this).serialize()).length - 5;
        if (tweetSize > 140) {
          alert("The tweet is just too long!! Make it shorter please.");
        } else {
          loadTweets();
        }
        //remove all tweets from render
        // get all tweets
        // renderTweets(data);
      },
      error: function(){
        //your code here
        alert("The tweet is empty, please type something to post it.");
      }
    });
  });

  const loadTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (data) {
      renderTweets(data);
    });
  };
});
