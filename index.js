var express = require('express');
var http = require('http');
var path = require('path');
var twitter = require('./lib/twitter');
var validator = require('./lib/validator');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var server = http.Server(app);
server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});



app.get('/', function(req ,res){
  res.render('tweeter');
});

// simulate twitter message creation
app.get('/tweeter', function(req ,res){
  res.render('tweeter');
});

// watch posters get created
app.get('/listener', function(req ,res){
  res.render('listener');
});



var preparse = function(tweet, next){
  validator.definePOS(tweet.text)
    .then(validator.clean)
    .then(function(purified){
      tweet.pure = purified;
      next(tweet);
    }
  );
};

var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('tweet-created', function(tweet){
    preparse(tweet, function(tweet){
      io.sockets.emit('new-tweet', tweet);
    });
  });
});

var timer = null;
twitter.stream.on('tweet', function(tweet){
  if(!timer){
    timer = setTimeout(function(){ timer = null; }, 7000);
    preparse(tweet, function(tweet){
      io.sockets.emit('new-tweet', tweet);
    });
  }
});
