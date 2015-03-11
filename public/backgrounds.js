var backgrounds = {};


backgrounds.list = [
  ['#E52125'],
  ['#F7931D'],
  ['#FFF100'],
  ['#9DCB3D'],
  ['#00ADEF'],
  ['#6DCCDD'],
  ['#EA1D8E'],
  ['#E52125', '#F7931D'],
  ['#F7931D', '#E52125'],
  ['#E52125', '#F7931D', '#FFF100'],
  ['#FFF100', '#F7931D', '#E52125'],
  ['#9DCB3D', '#00ADEF'],
  ['#00ADEF', '#9DCB3D'],
  ['#9DCB3D', '#00ADEF', '#6DCCDD'],
  ['#6DCCDD', '#00ADEF', '#9DCB3D'],
  ['#F7931D', '#EA1D8E'],
  ['#EA1D8E', '#F7931D'],
  ['#E52125', '#F7931D', '#EA1D8E'],
  ['#EA1D8E', '#F7931D', '#E52125']
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
