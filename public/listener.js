var $tweet;
var animationClass = 'flipInX';
// var animationClass = 'flipInY';
// var animationClass = 'bounceIn';
// var animationClass = 'bounceInUp';
// var animationClass = 'fadeInUpBig';
// var animationClass = 'zoomInUp';


$(function(){
  toggleBackground();
  $tweet = $('.tweet');

  socket.on('new-tweet', function(tweet){
    $tweet.addClass('animate');

    setTimeout(function(){ $tweet.addClass('hide');}, 1);
    setTimeout(toggleBackground,                      700);
    setTimeout(function(){ updateText(tweet); },      1500);
  });
});



var updateText = function(tweet){

  // ensure every word is surrounded in a span
  var text   = '';
  var splits = tweet.parsed.split(' ');
  splits.forEach(function(split){
    var subStr = '';
    if(split.indexOf('span') == -1){
      subStr += '<span class="other">';
      subStr += split;
      subStr += '</span> ';
    } else subStr = (split + ' ');

    text += subStr;
  });

  // unfade the text and use the new tweet
  $tweet.removeClass('hide');
  $tweet.html(text);

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



var toggleBackground = function(){
  var $a = $('.background-a');
  var $b = $('.background-b');
  if($a.hasClass('hide')){
    $a.css({ 'background' : backgrounds.getOne() });
    $b.addClass('hide');
    $a.removeClass('hide');
  } else {
    $b.css({ 'background' : backgrounds.getOne() });
    $a.addClass('hide');
    $b.removeClass('hide');
  }
};



var shuffleArray = function(a) {
  var i = a.length, t, j;
  a = a.slice();
  while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
  return a;
};
