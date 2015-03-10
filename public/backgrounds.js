var backgrounds = {};


backgrounds.list = [
  ['#c41800'],
  ['#002ac4'],
  ['#00c412'],
  ['#c400b4'],
  ['#c47800'],
  ['#00c4ab'],
  ['#c41800', '#002ac4'],
  ['#002ac4', '#c41800'],
  ['#00c412', '#c400b4'],
  ['#c400b4', '#00c412'],
  ['#c47800', '#00c4ab'],
  ['#00c4ab', '#c47800']
];


backgrounds.getOne = function(){
  var rando = Math.floor(Math.random()*backgrounds.list.length);
  var colors = backgrounds.list[rando];

  var backgroundString = '';
  if(colors.length > 1){
    backgroundString = 'linear-gradient(';

    colors.forEach(function(color, i){
      backgroundString += color;
      if(i != colors.length - 1) backgroundString += ', ';
    });

    backgroundString += ')';
  } else backgroundString = colors[0];

  return backgroundString;
};


backgrounds.toggle = function(){
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
