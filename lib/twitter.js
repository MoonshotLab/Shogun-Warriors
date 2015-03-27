var config = require('../config')();
var twit = require('twit');

var twitter = new twit({
  consumer_key        : config.TWITTER_CONSUMER_KEY,
  consumer_secret     : config.TWITTER_CONSUMER_SECRET,
  access_token        : config.TWITTER_ACCESS_TOKEN,
  access_token_secret : config.TWITTER_ACCESS_TOKEN_SECRET
});


exports.respondToUser = function(opts){
  var response = [
    '@',
    opts.tweet.user.screen_name,
    'cool',
    '-',
    opts.remotePath
  ].join(' ');

  twitter.post('statuses/update', { status : response }, function(err, data, res){
    if(err) console.log(err);
  });
};


exports.stream = twitter.stream('statuses/filter', { track : config.HASH_TAG });
