$(function(){

  socket.on('new-tweet', function(tweet){
    console.log(tweet);
    $('.gradient-background').css({
      'background' : backgrounds.getOne()
    });
  });

});
