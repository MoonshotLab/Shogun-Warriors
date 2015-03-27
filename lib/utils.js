var path = require('path');
var Q = require('q');
var fs = require('fs');
var config = require('../config')();
var url2png = require('url2png')(config.URL2PNG_KEY, config.URL2PNG_PRIVATE_KEY);
var pos = require('./pos');
var validator = require('./validator');
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
  pos.define(tweet.text)
    .then(validator.clean)
    .then(function(purified){
      tweet.pure = purified;
      next(tweet);
    }
  );
};



exports.createScreenshot = function(tweet){
  var deferred = Q.defer();

  var opts = {
    viewport    : '1600x900',
    protocol    : 'http'
  };

  var url       = config.URL + '/tweet/' + tweet.id_str;
  var filePath  = path.join(__dirname, '../screenshots/' + tweet.id_str + '.png');
  var stream    = fs.createWriteStream(filePath);

  console.log('taking screenshot from url', url);

  stream.on('finish', function(){
    console.log('created screen shot at local path', filePath);
    deferred.resolve({
      localFilePath : filePath,
      tweet         : tweet
    });
  });
  stream.on('error', deferred.reject);

  url2png.readURL(url, opts).pipe(stream);

  return deferred.promise;
};
