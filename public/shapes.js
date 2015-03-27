var shapes = {};


shapes.getOne = function(){
  var rando = Math.floor(Math.random()*shapes.list.length);
  var shapePath = '/img/' + shapes.list[rando];

  return shapePath;
};



shapes.hide = function(){
  var $shape = $('.shape');
  $shape.addClass('bounceOut');
};


shapes.show = function(preventAnimate){
  var $shape = $('.shape');
  $shape.css({ 'background-image' : 'url(' + shapes.getOne() + ')' });
  if(!preventAnimate){
    $shape.removeClass('bounceOut');
    $shape.addClass('bounceIn');
  }
};
