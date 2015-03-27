var db = require('./db');


// watch posters get created
exports.home = function(req, res, next){
  res.render('listener', { shapes : res.shapes, tweet : {} });
};

// get a single tweet and display it without animation.
// used for node webshot to capture posters
exports.tweet = function(req, res, next){
  db.getTweetByIdStr(req.params.id).then(function(tweet){
    res.render('listener', { shapes : res.shapes,  tweet : tweet });
  });
};

// simulate twitter message creation
exports.tweeter = function(){
  res.render('tweeter');
};
