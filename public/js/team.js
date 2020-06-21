var circle = document.getElementsByClassName('bio');

for (let a = 0; a < circle.length; a++) {
  var role = circle[a].getElementsByClassName('role');
  for (var i = 0; i < role.length; i++) {
    var rotate = 20*i - 95;
    role[i].style.transform = 'rotate(' + rotate + 'deg) translate(125px)';
    var icon = role[i].getElementsByTagName('i')[0];
    var back = -20*i + 95;
    icon.style.transform = 'rotate(' + back + 'deg)';
  }
}




