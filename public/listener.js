$(function(){

  socket.on('new-tweet', function(tweet){
    $('.poster').css({
      'background' : backgrounds.getOne()
    });
    $('.tweet').html(tweet.parsed);
  });

});
