$(function(){

  socket.on('new-tweet', function(tweet){
    $('.tweet').addClass('animate');
    setTimeout(function(){
      $('.tweet').addClass('hide');
    }, 1);

    setTimeout(function(){
      $('.tweet').removeClass('hide');
      $('.poster').css({ 'background' : backgrounds.getOne() });

      $('.tweet').html(tweet.parsed);
      $('.tweet').find('span').each(function(i){
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
  }, i*100);
};
