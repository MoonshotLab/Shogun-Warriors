$(function(){

  $('#tweet').keyup(function(e){
    var charsLeft = 140 - $('#tweet').val().length;
    $('.characters-left').text(charsLeft);

    if(e.keyCode == 13) submitTweet();
  });

  $('#submit-tweet').click(submitTweet);
});


var submitTweet = function(){
  var tweet = $('#tweet').val();
  socket.emit('tweet-created', { text : tweet });
};
