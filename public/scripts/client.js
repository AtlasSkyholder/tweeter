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
  for(let i = 0; i < tweets.length; i++) {
    let singleTweet = tweets[i];
    const tweet = createTweetElement(singleTweet);
    console.log(tweet);
    $('#tweets-container').append(tweet); 
  }
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
      <a id="userID">${tweet.user.handle}</a>
    </header>
      <div id="inner-tweet">
        <p>${tweet.content.text}</p>     
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


$(document).ready(function(){
  renderTweets(data);
});