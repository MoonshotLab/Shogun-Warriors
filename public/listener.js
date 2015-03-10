var $tweet;
var animationClass = 'flipInX';
// var animationClass = 'flipInY';
// var animationClass = 'bounceIn';
// var animationClass = 'bounceInUp';
// var animationClass = 'fadeInUpBig';
// var animationClass = 'zoomInUp';


$(function(){
  backgrounds.toggle();
  $tweet = $('.tweet');

  socket.on('new-tweet', function(tweet){
    $tweet.addClass('animate');
    shapes.hide();

    setTimeout(function(){ $tweet.addClass('hide');}, 1);
    setTimeout(backgrounds.toggle,                    600);
    setTimeout(function(){ updateText(tweet); },      1000);
    setTimeout(shapes.show,                           1800);
  });
});



var updateText = function(tweet){

  // ensure every word is surrounded in a span
  var text   = '';
  var splits = tweet.pure.split(' ');
  splits.forEach(function(split){
    var subStr = '';
    if(split.indexOf('span') == -1 && split.indexOf('class=') == -1){
      subStr += '<span class="other">';
      subStr += split;
      subStr += '</span> ';
    } else subStr = (split + ' ');

    text += subStr;
  });

  // unfade the text and use the new tweet
  $tweet.removeClass('hide');
  $tweet.html(text);

  // adjust text size dependent on tweet length
  var tweetLength = $tweet.text().length;
  if(tweetLength > 60)
    $tweet.css({ 'font-size' : '100px' });
  else if(tweetLength > 90)
    $tweet.css({ 'font-size' : '80px' });
  else
    $tweet.css({ 'font-size' : '150px' });

  // loop over each element
  var spans = shuffleArray($tweet.find('span'));
  spans.each(function(i){
    scheduleReveal($(this), i);
  });
};



// just wait a little bit before showing the word
var scheduleReveal = function($el, i){
  $el.addClass('animated');
  $el.addClass('hide');
  setTimeout(function(){
    $el.removeClass('hide');
    $el.addClass(animationClass);
  }, (i+1)*50);
};



var shuffleArray = function(a) {
  var i = a.length, t, j;
  a = a.slice();
  while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
  return a;
};
