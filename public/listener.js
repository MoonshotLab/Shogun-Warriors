var $tweet;
var $poster;
var animationClass = 'flipInX';
// var animationClass = 'flipInY';
// var animationClass = 'bounceIn';
// var animationClass = 'bounceInUp';
// var animationClass = 'fadeInUpBig';
// var animationClass = 'zoomInUp';


$(function(){
  backgrounds.toggle();
  $tweet = $('.tweet');
  $poster = $('.poster');

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

  // adjust text size, alignment, and breaks dependent on tweet length
  var tweetLength = $tweet.text().length;
  var wordCount = $tweet.children().length;

  $poster.removeClass('text-short text-mid text-long');
  if(tweetLength < 15)
    $poster.addClass('text-short');
  if(tweetLength > 105)
    $poster.addClass('text-long');

  $poster.removeClass('word-count-1 word-count-2 word-count-3 word-count-4');
  if(wordCount == 1)
    $poster.addClass('word-count-1');
  if(wordCount == 2)
    $poster.addClass('word-count-2');
  if(wordCount == 3)
    $poster.addClass('word-count-3');
  if(wordCount == 4)
    $poster.addClass('word-count-4');

  $poster.removeClass('align-center align-justify align-right align-left');
  if(tweetLength < 35){
    $tweet.css({ 'font-size' : '350px' });
    $poster.addClass('align-center');
  } else if(tweetLength < 70) {
    $tweet.css({ 'font-size' : '300px' });
    $poster.addClass('align-right');
  } else if(tweetLength < 105) {
    $tweet.css({ 'font-size' : '250px' });
    $poster.addClass('align-justify');
  } else {
    $tweet.css({ 'font-size' : '200px' });
    $poster.addClass('align-justify');
  }

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
