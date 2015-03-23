$(function(){

  $('#tweet').keypress(function(e){
    if(e.keyCode == 13){
      e.preventDefault();
      submitTweet();
    }
  });

  $('#tweet').keyup(function(e){
    var charsLeft = 140 - $('#tweet').val().length;
    $('.characters-left').text(charsLeft);
  });

  $('#submit-tweet').click(submitTweet);
});


var submitTweet = function(){
  var tweet = $('#tweet').val();
  socket.emit('tweet-created', {
    text      : tweet,
    user      : { screen_name : 'joelongstreet' },
    hash_tag  : 'hashtag'
  });
};
