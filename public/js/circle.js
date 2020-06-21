var circles = document.getElementsByClassName('circle');

// rotate animation 
var startDeg = 0;
var hover = false;

for (let a = 0; a < circles.length; a++) {
  circles[a].onmouseover = () => {
    hover = true;
  }
}


for (let a = 0; a < circles.length; a++) {
  var items = circles[a].getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) {
    var deg = 360/(items.length);
    items[i].style.transform = 'rotate(' + deg*i + 'deg) translate(125px)';
    var icon = items[i].getElementsByTagName('i')[0];
    icon.style.transform = 'rotate(' + -i*deg + 'deg)';
  }
}









