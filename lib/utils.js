var validator = require('./lib/validator');
var fs = require('fs');


// collect all available shape files and pass to client
// intended to be used as express middleware
exports.getShapes = function(req, res, next){
  fs.readdir('public/img/', function(err, files){
    var dsStore = files.indexOf('.DS_Store');
    files.splice(dsStore, 1);
    res.shapes = files;
    next();
  });
};



// define parts of speech and remove profanity
exports.preparseTweet = function(tweet, next){
  validator.definePOS(tweet.text)
    .then(validator.clean)
    .then(function(purified){
      tweet.pure = purified;
      next(tweet);
    }
  );
};
