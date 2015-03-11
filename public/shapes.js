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


shapes.show = function(){
  var $shape = $('.shape');
  $shape.css({ 'background-image' : 'url(' + shapes.getOne() + ')' });
  $shape.removeClass('bounceOut');
  $shape.addClass('bounceIn');
};
