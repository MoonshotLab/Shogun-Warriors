var utils = require('./utils');
var Q = require('q');
var config = require('../config')();
var MongoClient = require('mongodb').MongoClient;

var tweets = null;


MongoClient.connect(config.DB_CONNECT, function(err, db){
  client = db;
  if(err) console.log('error connecting to db...', err);
  else console.log('connected to database');

  tweets = db.collection('tweets');
});



// save the original tweet
// tweet - { }
exports.saveTweet = function(tweet){
  var deferred = Q.defer();

  tweets.insert(tweet, function(err, res){
    if(err) deferred.reject(err);
    else deferred.resolve(res);
  });

  return deferred.promise;
};



// go get a tweet
// id - the twitter id string
exports.getTweetByIdStr = function(id){
  var deferred = Q.defer();

  tweets.findOne(
    { id_str : id },
    function(err, result){
      if(err) deferred.reject(results);
      else deferred.resolve(result);
    }
  );

  return deferred.promise;
};



exports.getRandomTweet = function(){
  var deferred = Q.defer();

  tweets.count(function(err, count){
    if(err) deferred.reject(err);

    var random = Math.floor(Math.random()*count);
    tweets.find().limit(-1).skip(random).next(function(err, document){
      if(err) deferred.reject(err);
      else deferred.resolve(document);
    });
  });

  return deferred.promise;
};
