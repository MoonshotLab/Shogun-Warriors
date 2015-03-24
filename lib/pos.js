var Q = require('q');
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



var attachVerbs = function(opts){
  var deferred = Q.defer();

  wordpos.getVerbs(opts.text, function(verbs){
    opts.pos.verb = verbs;
    deferred.resolve(opts);
  });

  return deferred.promise;
};



var attachAdjectives = function(opts){
  var deferred = Q.defer();

  wordpos.getAdjectives(opts.text, function(adjectives){
    adjectives.forEach(function(adjective){
      if(opts.pos.verb.indexOf(adjective) == -1)
        opts.pos.adjective.push(adjective);
    });

    deferred.resolve(opts);
  });

  return deferred.promise;
};



var attachAdverbs = function(opts){
  var deferred = Q.defer();

  wordpos.getAdverbs(opts.text, function(adverbs){
    adverbs.forEach(function(adverb){
      if(opts.pos.verb.indexOf(adverb) == -1 &&
        opts.pos.adjective.indexOf(adverb) == -1){
        opts.pos.adverb.push(adverb);
      }
    });

    deferred.resolve(opts);
  });

  return deferred.promise;
};



var spanify = function(opts){
  var deferred = Q.defer();

  for(var key in opts.pos){
    opts.pos[key].forEach(function(word){
      // it likes to catch "I" and "M" as an adjective?
      if(word.length > 1){
        var spanTag = '<span class="' + key + '">' + word + '</span>';
        var re = new RegExp(word, 'g');
        opts.text = opts.text.replace(re, spanTag);
      }
    });
  }

  // surround conjunctions in a span tag
  conjunctions.forEach(function(conjunction){
    var re = new RegExp(conjunction, 'g');
    var spanTag = '<span class="conjunction">' + conjunction + '</span>';
    opts.text = opts.text.replace(re, spanTag);
  });

  setTimeout(function(){
    deferred.resolve(opts);
  });

  return deferred.promise;
};



// define parts of speech and wrap in span tags
exports.define = function(text){
  var deferred = Q.defer();

  // get verbs, adverbs and adjectives, ensure there are no terms which
  // fall into multiple categories
  attachVerbs({ pos : { verb : [], adjective : [], adverb : [] }, text : text })
    .then(attachAdjectives)
    .then(attachAdverbs)
    .then(spanify)
    .then(deferred.resolve)
    .fail(deferred.reject);

  return deferred.promise;
};
