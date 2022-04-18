
var PIXEL_COUNT = 64;
var PIXEL_ART = null;

var PI = Math.PI;
var TAU = 2 * PI;
var abs = Math.abs;
var min = Math.min;
var max = Math.max;
var sin = Math.sin;
var cos = Math.cos;
var pow = Math.pow;
var sqrt = Math.sqrt;
var ceil = Math.ceil;
var floor = Math.floor;
var random = Math.random;

var windowWidth = 0;
var windowHeight = 0;
var canvasScale = 1;
var canvas = null;
var ctx = null;
var isFirstRender = true;

var paintedPixels = new Array(PIXEL_COUNT);
for (var i = 0; i < PIXEL_COUNT; i++) {
  paintedPixels[i] = new Array(PIXEL_COUNT);
  for (var j = 0; j < PIXEL_COUNT; j++) {
    paintedPixels[i][j] = PIXEL_ART ? PIXEL_ART.charAt(j + PIXEL_COUNT * i) : 0;
  }
}

window.onload = function () { initialize(); };

function initialize () {
  setRenderOptions();
  createElements();
  resizeCanvas();
  startRender();
};

function setRenderOptions () {
  HAS_BODY = !!document.body;
  var body = HAS_BODY ? document.body : document.all[1];
  windowWidth = max(body.clientWidth, window.innerWidth);
  windowHeight = max(body.clientHeight, window.innerHeight);

  var isLandscape = windowWidth > windowHeight;
  var windowSize = isLandscape ? windowHeight : windowWidth;
  canvasScale = windowSize / PIXEL_COUNT;
};

function createElements () {
  var body = HAS_BODY ? document.body : document.all[1];
  canvas = HAS_BODY
    ? document.createElement('canvas')
    : document.getElementById('canvas');

  ctx = canvas.getContext("2d");
  HAS_BODY && body.appendChild(canvas);

  var size = floor(canvasScale * PIXEL_COUNT);
  var styleSheet = document.createElement("style");
  styleSheet.innerText = `canvas {
    width: ${size}px;
    height: ${size}px;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }`;
  body.appendChild(styleSheet);
};

function resizeCanvas () {
  if (HAS_BODY) {
    var x = floor((windowWidth - canvasScale * PIXEL_COUNT) / 2);
    var y = floor((windowHeight - canvasScale * PIXEL_COUNT) / 2);
    canvas.style.position = "absolute";
    canvas.style.left = x + "px";
    canvas.style.top = y + "px";
  }

  canvas.width = PIXEL_COUNT;
  canvas.height = PIXEL_COUNT;
};

function startRender () {
  var img = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0, PIXEL_COUNT, PIXEL_COUNT);

    var imgData = ctx.getImageData(0, 0, PIXEL_COUNT, PIXEL_COUNT);
    var data = imgData.data;
    var dataLength = data.length;

    var sum = 0;
    var string = "[";
    for (var i = 0; i < dataLength; i++) {
      var next = i + 1;
      if (next % 4 === 0) {
        var opacity = 1;// data[i] / 255;
        var value = floor(9.99 * (opacity * sum / 3) / 255);
        string += value;
        sum = 0;
      } else {
        sum += data[i];
      }

      if (next % (4 * PIXEL_COUNT) === 0 && next < dataLength - 1) {
        string += ",";
      }
    }
    string += "]";

    console.log(string);
  };

  img.src = './relic.png';
};



