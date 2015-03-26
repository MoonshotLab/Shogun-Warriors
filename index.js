var express = require('express');
var http = require('http');
var path = require('path');
var utils = require('./lib/utils');
var db = require('./lib/db');
var printer = require('./lib/printer');
var twitter = require('./lib/twitter');
var config = require('./config')();
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var server = http.Server(app);
server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});


// watch posters get created
app.get('/', utils.getShapes, function(req ,res, next){
  res.render('listener', { shapes : res.shapes });
});

// simulate twitter message creation
app.get('/tweeter', function(req ,res){
  res.render('tweeter');
});


// listen for tweets from the fake client
// listen for a done drawing event to trigger a print
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('tweet-created', function(tweet){
    utils.preparseTweet(tweet, function(tweet){
      io.sockets.emit('new-tweet', tweet);
    });
  });

  // if(config.PRINT) socket.on('done-drawing', printer.print);
});


// listen to the twitter stream and add tweets to the queue
// send tweets to the client and remove them once used
//
var tweetQueue = [];

var emitTweet = function(){
  if(tweetQueue.length){
    io.sockets.emit('new-tweet', tweetQueue[0]);
    tweetQueue.shift();
  } else{
    db.getRandomTweet().then(function(tweet){
      io.sockets.emit('new-tweet', tweet);
    });
  }
};

setInterval(emitTweet, 10000);

twitter.stream.on('tweet', function(tweet){
  utils.preparseTweet(tweet, function(parsedTweet){
    parsedTweet.hash_tag = config.HASH_TAG;
    db.saveTweet(parsedTweet);
    tweetQueue.push(parsedTweet);
  });
});
