var Q = require('q');
var path = require('path');
var knox = require('knox');

var s3Client = knox.createClient({
  key       : process.env.S3_KEY,
  secret    : process.env.S3_SECRET,
  bucket    : 'shogun-warriors',
});


exports.rememberScreenshot = function(opts){
  var deferred = Q.defer();
  var remotePath = '/' + opts.tweet.id_str + '.png';

  s3Client.putFile(opts.localFilePath, remotePath, function(err, res){
    if(err) deferred.reject(err);
    else{
      console.log('saving poster');
      opts.remotePath = res.req.url;
      deferred.resolve(opts);
    }
  });

  return deferred.promise;
};
