var shapes = {};


shapes.list = [
  '1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i',
  'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];


shapes.getOne = function(){
  var rando = Math.floor(Math.random()*shapes.list.length);
  var shape = shapes.list[rando];

  return shape;
};



shapes.hide = function(){
  var $shape = $('.shape');
  $shape.addClass('bounceOut');
};


shapes.show = function(){
  var $shape = $('.shape');
  $shape.text(shapes.getOne());
  $shape.removeClass('bounceOut');
  $shape.addClass('bounceIn');
};
