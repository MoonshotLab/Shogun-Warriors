$(function(){
  toggleBackground();
  var $tweet = $('.tweet')

  socket.on('new-tweet', function(tweet){
    $tweet.addClass('animate');
    setTimeout(function(){
      $tweet.addClass('hide');
    }, 1);

    setTimeout(toggleBackground, 700);

    setTimeout(function(){
      var text   = '';
      var splits = tweet.parsed.split(' ');

      splits.forEach(function(split){
        var sub = '';
        if(split.indexOf('span') == -1){
          sub += '<span class="other">';
          sub += split;
          sub += '</span> ';
        } else sub = (split + ' ');

        text += sub;
      });

      $tweet.removeClass('hide');
      $tweet.html(text);
      $tweet.find('span').each(function(i){
        scheduleReveal($(this), i);
      });
    }, 1500);

  });
});



var scheduleReveal = function($el, i){
  $el.addClass('animated');
  $el.addClass('hide');
  setTimeout(function(){
    $el.removeClass('hide');
    $el.addClass('flipInX');
  }, (i+1)*100);
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
