var express = require('express');
var path = require('path');
var utils = require('./lib/utils');
var db = require('./lib/db');
var routes = require('./lib/routes');
var twitter = require('./lib/twitter');
var s3 = require('./lib/S3');
var config = require('./config')();
var port = config.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var server = require('http').Server(app);
server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});



app.get('/', utils.getShapes, routes.home);
app.get('/tweet/:id', utils.getShapes, routes.tweet);
app.get('/tweeter', routes.tweeter);



// listen for tweets from the fake client
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('create-tweet', function(tweet){
    utils.preparseTweet(tweet, sendTweetToClients);
  });
});



// send tweets to the any clients that are listening
var sendTweetToClients = function(tweet){
  io.sockets.emit('new-tweet', tweet);
};



// showcase a tweet every so often
var tweetQueue = [];

setInterval(function(){
  if(tweetQueue.length){
    sendTweetToClients(tweetQueue[0]);
    tweetQueue.shift();
  } else db.getRandomTweet().then(sendTweetToClients);
}, 20000);



// listen to the twitter stream and add tweets to the queue
// send tweets to the client and remove them once used
twitter.stream.on('tweet', function(tweet){
  console.log('new tweet:', tweet.text);

  // this is a hack to prevent the auto tweet replies from being picked up
  // and treated like a new tweet. It would create and endless loop
  // of tweets and creenshot creations
  if(tweet.text.indexOf('Thanks for visiting us') == -1){
    utils.preparseTweet(tweet, function(parsedTweet){
      parsedTweet.hash_tag = config.HASH_TAG;
      tweetQueue.push(parsedTweet);

      if(config.REPLY_TO_TWEETS){
        db.saveTweet(parsedTweet)
          .then(utils.createScreenshot)
          .then(s3.rememberScreenshot)
          .then(twitter.respondToUser)
          .fail(function(err){ console.log(err); });
      } else {
        db.saveTweet(parsedTweet)
          .fail(function(err){ console.log(err); });
      }
    });
  }
});
