var Q = require('q');
var profanity = require('profanity-util');


exports.clean = function(tweet){
  var deferred = Q.defer();
  var dirty = tweet;

  if(typeof(tweet) == 'object') dirty = tweet.text;

  setTimeout(function(){
    var purified = profanity.purify(dirty);
    var pure = purified[0];
    deferred.resolve(pure);
  });

  return deferred.promise;
};
