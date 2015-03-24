var script = [
  'tell application "Google Chrome Canary" to activate',
  'tell application "System Events" to tell process "Google Chrome Canary"',
  '   delay 1',
  '   keystroke "p" using command down',
  '   delay 3',
  '   keystroke return',
  'end tell'
].join('\n');


var applescript = require('applescript');
var Q = require('q');

exports.print = function(){
  var deferred = Q.defer();

  applescript.execString(script, function(err, res) {
    if(err) deferred.reject(err);
    else deferred.resolve(res);
  });

  return deferred.promise;
};
