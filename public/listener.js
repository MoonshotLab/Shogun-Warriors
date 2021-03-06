var $tweet;
var $poster;
var animationClass = 'flipInX';


var createTweet = function(tweet, preventAnimate){
  $('.screen-name').html('@' + tweet.user.screen_name);
  $('.hash-tag').html('#' + tweet.hash_tag);

  if(preventAnimate){
    $tweet.addClass('hide');
    updateText(tweet, true);
    shapes.show(true);
  } else{
    $tweet.addClass('animate');
    shapes.hide();
    setTimeout(function(){ $tweet.addClass('hide');}, 1);
    setTimeout(backgrounds.toggle,                    600);
    setTimeout(function(){ updateText(tweet); },      1000);
    setTimeout(shapes.show,                           1800);
  }
};


$(function(){
  // set the font size based on the body size
  var bodyWidth = $('body').width();
  $('body').css({ 'font-size' : bodyWidth/5.6 });

  backgrounds.toggle();
  $tweet = $('.tweet');
  $poster = $('.poster');

  if(pageTweet.user) createTweet(pageTweet, true);
  else socket.on('new-tweet', createTweet);
});


var updateText = function(tweet, preventAnimate){

  // unfade the text
  $tweet.removeClass('hide');

  // dont show the hash tag
  $tweet.html(tweet.pure.replace('#' + tweet.hash_tag, ''));

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
  if(tweetLength < 30){
    $tweet.css({ 'font-size' : '100%' });
    $poster.addClass('align-center');
  } else if(tweetLength < 50){
    $tweet.css({ 'font-size' : '80%' });
    $poster.addClass('align-center');
  } else if(tweetLength < 70) {
    $tweet.css({ 'font-size' : '60%' });
    $poster.addClass('align-right');
  } else if(tweetLength < 90) {
    $tweet.css({ 'font-size' : '50%' });
    $poster.addClass('align-right');
  } else if(tweetLength < 105) {
    $tweet.css({ 'font-size' : '50%' });
    $poster.addClass('align-justify');
  } else {
    $tweet.css({ 'font-size' : '40%' });
    $poster.addClass('align-justify');
  }

  // loop over each element
  var spans = $tweet.find('span');
  if(spans.length) spans = shuffleArray(spans);
  spans.each(function(i){
    scheduleReveal($(this), i, preventAnimate);
  });
};



// just wait a little bit before showing the word
var scheduleReveal = function($el, i, preventAnimate){
  if(!preventAnimate){
    $el.addClass('animated');
    $el.addClass('hide');
    setTimeout(function(){
      $el.removeClass('hide');
      $el.addClass(animationClass);
    }, (i+1)*50);
  }
};



var shuffleArray = function(a) {
  var i = a.length, t, j;
  a = a.slice();
  while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
  return a;
};
