// bolt scaling
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
var svg = document.getElementById("cover").getElementsByTagName('svg')[0];
var clipPath = svg.getElementsByTagName('clipPath')[0];

var orig = [
  [[45, 0], [100, 0], [55, 100], [0, 100]],
  [[65, 60], [120, 60], [75, 160], [20, 160]],
  [[65, 120], [20, 300], [120, 120]]
]

var arr = [
  [[], [], [], []],
  [[], [], [], []],
  [[], [], []]
];

function newPoints () {
  for (let i = 0; i < 3; i++) {
    var pointCount = orig[i].length;
      for (let a = 0; a < pointCount; a++) {
        for (let x = 0; x < 2; x++) {
          var newPoint = scale * (orig[i][a][x]);
          arr[i][a].push(newPoint);
        }
      }
  }
}

function drawSVG () {
  for (let i = 0; i < 3; i++) {
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    clipPath.appendChild(polygon);
    var pointCount = arr[i].length;
    for (let a = 0; a < pointCount; a++) {
      var point = svg.createSVGPoint();
      point.x = arr[i][a][0];
      point.y = arr[i][a][1];
      polygon.points.appendItem(point);
    }
  }
}

var scale = vh/300;
newPoints();
drawSVG();

window.addEventListener('resize', () => {
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  scale = vh/300;
  arr = [
    [[], [], [], []],
    [[], [], [], []],
    [[], [], []]
  ];
  clipPath.innerHTML = '';
  newPoints();
  drawSVG();
})
