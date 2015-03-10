var Q = require('q');
var profanity = require('profanity-util');
var WordPOS = require('wordpos');
var wordpos = new WordPOS();

var conjunctions = [
  ' for ',
  ' and ',
  ' nor ',
  ' but ',
  ' or ',
  ' yet ',
  ' so '
];


// define parts of speech and wrap in span tags
exports.definePOS = function(original){
  var deferred = Q.defer();
  var text = original;

  wordpos.getPOS(text, function(pos){

    // get verbs, nouns, adjectives, and adverbs
    for(var key in pos){
      pos[key].forEach(function(word){
        var spanClass = key;
        if(key != 'rest') spanClass = key.substring(0, key.length - 1);
        var spanTag = '<span class="' + spanClass + '">' + word + '</span>';

        var re = new RegExp(word, 'g');
        text = text.replace(re, spanTag);
      });
    }

    // get conjunctions
    conjunctions.forEach(function(conjunction){
      var re = new RegExp(conjunction,'g');
      var spanTag = '<span class="conjunction">' + conjunction + '</span>';
      text = text.replace(re, spanTag);
    });

    deferred.resolve(text);
  });

  return deferred.promise;
};


exports.clean = function(dirty){
  var deferred = Q.defer();

  setTimeout(function(){
    var purified = profanity.purify(dirty);
    var pure = purified[0];
    deferred.resolve(pure);
  });

  return deferred.promise;
};
