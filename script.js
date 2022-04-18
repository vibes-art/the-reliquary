var TH = "";
for (var i = 0; i < 8; i++) { TH += H.substr(2, 6); }
H = "0x" + TH;

var HB = false;
var PC = 64;
var MT = 50;

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
var rm = null;

var wW = 0;
var wH = 0;
var cS = 1;
var canvas = null;
var ctx = null;

var L2 = V > 1;
var BC2 = [{x:0.5,y:0.5},{x:0.75,y:0}];
var BC3 = [{x:0.65,y:0.15},{x:0.5,y:0.5},{x:0.75,y:0.75}];
var BC4 = [{x:0.5,y:0},{x:0,y:0.5},{x:0.5,y:1},{x:1,y:0.5}];
var BC5 = [{x:0.5,y:0.5},{x:0.5,y:0},{x:0,y:0.5},{x:0.5,y:1},{x:1,y:0.5}];
var BC6 = [{x:0.5,y:0.5},{x:0.5,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:0}];
var BC = [,,BC2,BC3,BC4,BC5,BC6];
var gvy = null;
var pxS = C / 1000;
var TS = TAU / 127.5;
var DLO = 0.5 + 0.5 * F / 1000;
var DMD = 1000 + 19000 * F / 1000;
var DHI = 8 + 24 * F / 1000;
var RFOP = F >= 800 ? (0.5 + 0.5 * (F - 800) / 199) : 0;
var wST = 0;
var wS = [];
var wSE = 0;
var eL = [];
var cPC = P.length;
var cP = [];
var pI = 0;
var plC = BC[cPC];
var iFR = true;
var dt = 0;
var pvT = 0;
var iPs = false;
var iPt = false;
var iEs = false;
var iBx = false;
var bxS = null;
var pB = 9;
var pP = new Array(PC);

for (var x = 0; x < PC; x++) {
  pP[x] = new Array(PC);
  for (var y = 0; y < PC; y++) {
    pP[x][y] = 0;
  }
}

if (L && L.length === PC) {
  for (var y = 0; y < PC; y++) {
    for (var x = 0; x < PC; x++) {
      var row = "" + L[y];
      pP[x][y] = +row.charAt(x);
    }
  }
}

var sp = 0;
if (E=="Zen") { sp = 256; }
if (E=="Tranquil") { sp = 64; }
if (E=="Normal") { sp = 16; }
if (E=="Fast") { sp = 4; }
if (E=="Swift") { sp = 2; }
if (E=="Hyper") { sp = 0.5; }

var sM = SD;
var sV = -1;
var sSS = 1/3;
if (Y=="Pajamas") { sM = SS; sSS = 1/99;}
if (Y=="Silk") { sM = SS; sSS=1/3; }
if (Y=="Sketch") { sM = SRS; }

function SD (a, b) { return a.distance - b.distance; };

function SS () {
  var value = sV;
  sV += sSS;
  if (sV >= 2) { sV -= 3; }
  return value;
};

function SRS () {
  var value = sV;
  sV += 1 / (rm() * PC);
  if (sV >= 2) { sV -= 3; }
  return value;
};

var flipX = (D == "Mirrored" || D == "MirroredUpsideDown") ? true : false;
var flipY = (D == "UpsideDown" || D == "MirroredUpsideDown") ? true : false;

var gv=3;
if (G=="Lunar") {gv=0.5;}
if (G=="Atmospheric") {gv=1;}
if (G=="Low") {gv=2;}
if (G=="High") {gv=6;}
if (G=="Massive") {gv=9;}
if (G=="Stellar") {gv=12;}
if (G=="Galactic") {gv=24;}

var ess = { l: [] };
if (N=="Heavenly") {
  ess = {
    c: { r: { o: 64 }, g: { o: 64 }, b: { o: 32 } },
    l: [
      { st: { x: 0.006 }, n: { s: 0.006, d: 128, c: 0.024, xp: 0.5 }, op: 0.4 },
      { st: { x: -0.007 }, n: { s: 0.007, d: 128, c: 0.022, xp: 0.5 }, op: 0.6 },
      { st: { y: 0.008 }, n: { s: 0.008, d: 128, c: 0.020, xp: 0.5 }, op: 0.8 },
      { st: { y: -0.009 }, n: { s: 0.009, d: 128, c: 0.018, xp: 0.5 }, op: 1 }
    ]
  };
}
if (N=="Fae") {
  ess = {
    l: [
      { c: { a: { o: 16, e: -96 } }, st: { x: 0.002, y: -0.017 }, op: 0.75, sc: 1 },
      { c: { a: { o: -16, e: 96 } }, st: { x: -0.001, y: -0.015 }, op: 0.9, sc: 1 },
      { c: { a: { o: 52, e: 8 } }, st: { x: -0.01, y: -0.03 }, op: 0.9, n: { s: 0.02, d: 64, c: 0.015, xp: 2 } }
    ]
  };
}
if (N=="Prismatic") {
  ess = {
    l: [
      { c: { r: { o: -64, e: 128 }, g: { o: -64, e: 128 }, b: { o: -32, e: 64 } }, op: 0.75, n: { s: 0.001, d: 1024, c: 0.001, xp: 1 } },
      { c: { r: { o: -64, e: 255 }, g: { o: -64, e: 255 }, b: { o: -32, e: 128 } }, op: 0.25, n: { s: 0.001, d: 1024, c: 0.001, xp: 1 } }
    ]
  };
}
if (N=="Radiant") {
  ess = {
    c: { r: { o: 60, e: 80 }, g: { o: 60, e: 80 }, b: { o: 40, e: 60 } },
    l: [
      { op: 1, n: { s: 0.0003, d: 40, c: 0.0014, xp: 1 } }
    ]
  };
}
if (N=="Photonic") {
  ess = {
    c: { a: { o: -64, e: 140 } },
    l: [
      { op: 1, n: { s: 0.01, d: 9999, c: 0.001, xp: 3 } },
      { op: 1, n: { s: 0.009, d: 9999, c: 0.001, xp: 3 } },
      { op: 1, n: { s: 0.008, d: 9999, c: 0.001, xp: 3 } },
      { op: 1, n: { s: 0.007, d: 9999, c: 0.001, xp: 3 } },
      { op: 1, n: { s: 0.006, d: 9999, c: 0.001, xp: 3 } },
      { op: 1, n: { s: 0.005, d: 9999, c: 0.001, xp: 3 } }
    ]
  };
}
if (N=="Forest") {
  ess = {
    c: { r: { o: -16, e: 96 }, g: { o: -16, e: 96 }, b: { o: 16, e: -96 } },
    l: [
      { st: { x: 0.002, y: -0.014 }, op: 0.4, sc: 1 },
      { st: { x: -0.001, y: -0.012 }, op: 0.4, sc: 1 },
      { c: { r: { o: 96, e: 8 }, g: { o: 128, e: 8 }, b: { o: 32, e: 8 } }, st: { y: -0.05 }, op: 0.3, n: { s: 0.02, d: 1024, c: 0.006, xp: 1 } }
    ]
  };
}
if (N=="Life") {
  ess = {
    st: { x: -0.006 },
    c: { r: { o: -6, e: 12 }, g: { o: -48, e: 128 }, b: { o: -6, e: 12 } },
    l: [
      { op: 0.1, n: { s: 0.06, d: 32, c: 0.03, xp: 1 } },
      { op: 0.3, n: { s: 0.03, d: 32, c: 0.05, xp: 2 } },
      { op: 0.5, n: { s: 0.02, d: 32, c: 0.07, xp: 3 } }
    ]
  };
}
if (N=="Swamp") {
  ess = {
    l: [
      { c: { r: { o: -192 }, b: { o: 32, e: 128 } }, st: { x: 0.005, y: 0.005 }, op: 0.8, sc: 1 },
      { c: { r: { o: -128, e: -64 }, g: { o: -64, e: 128 }, b: { o: -64, e: -64 } }, op: 1, n: { s: 0, d: 256, c: 0.04, xp: 2 } }
    ]
  };
}
if (N=="Wildblood") {
  ess = {
    c: { r: { o: 128, e: 128 }, g: { o: -64, e: 32 }, b: { o: -64, e: 32 } },
    l: [
      { op: 0.3, n: { s: 0.002, d: 64, c: 0.075, xp: 1 } },
      { op: 0.3, n: { s: 0.003, d: 64, c: 0.015, xp: 2 } },
      { op: 0.3, n: { s: 0.004, d: 64, c: 0.0023, xp: 3 } }
    ]
  };
}
if (N=="Soul") {
  ess = {
    n: { s: 0.25, d: 128, c: 0.01, xp: 3 },
    l: [
      { c: { r: { o: 200 }, g: { o: -100 }, b: { o: -100 } }, st: { x: -0.005, y: -0.015 }, op: 1/3 },
      { c: { r: { o: -100 }, g: { o: 200 }, b: { o: -100 } }, st: { x: 0.005, y: -0.015 }, op: 1/3 },
      { c: { r: { o: -100 }, g: { o: -100 }, b: { o: 200 } }, st: { x: 0, y: -0.03 }, op: 1/3 }
    ]
  };
}
if (N=="Magic") {
  ess = {
    n: { s: 0.05, d: 128, c: 0.015, xp: 0.5 },
    l: [
      { c: { r: { o: 200 }, b: { o: -200 } }, st: { x: -0.02 }, op: 1/3 },
      { c: { r: { o: -200 }, g: { o: 200 } }, st: { y: -0.02 }, op: 1/3 },
      { c: { g: { o: -200 }, b: { o: 200 } }, st: { x: 0.02 }, op: 1/3 }
    ]
  };
}
if (N=="Astral") {
  ess = {
    c: { r: { o: -64, e: 96 }, g: { o: -64, e: 64 }, b: { o: -64, e: 96 } },
    l: [
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } },
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } },
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } },
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } },
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } },
      { op: 0.33, n: { s: 0.003, d: 512, c: 0.003, xp: 1 } }
    ]
  };
}
if (N=="Forbidden") {
  ess = {
    c: { r: { o: -64, e: 32 }, g: { o: -64, e: 32 }, b: { o: 128, e: 128 } },
    l: [
      { op: 0.3, n: { s: 0.001, d: 64, c: 0.1, xp: 1 } },
      { op: 0.3, n: { s: 0.002, d: 64, c: 0.02, xp: 2 } },
      { op: 0.3, n: { s: 0.003, d: 64, c: 0.003, xp: 3 } }
    ]
  };
}
if (N=="Runic") {
  ess = {
    st: { x: -0.005, y: 0.025 },
    c: { r: { o: -56, e: 200 }, g: { o: -256 }, b: { o: 200, e: 56 } },
    n: { noBlend: true, s: 0.05, d: 19, c: 0.019, xp: 2 },
    l: [{ op: 0.9 }]
  };
}
if (N=="Unknown") {
  ess = {
    l: [
      { c: { a: { o: 256 } }, st: { delay: 2, x: 0.003 }, n: { s: 0.25, d: 256, c: 0.01, xp: 1 }, op: 1 },
      { c: { a: { o: -256 } }, st: { delay: 1, y: -0.006 }, n: { s: 0.5, d: 256, c: 0.01, xp: 1 }, op: 1 }
    ]
  };
}
if (N=="Tidal") {
  ess = {
    c: { r: { o: 48 }, g: { o: 48 }, b: { o: 64 } },
    l: [
      { st: { x: -0.02, y: -0.015 }, op: 0.25, n: { s: 0.025, d: 44, c: 0.032, xp: 2 } },
      { st: { x: -0.02, y: 0.015 }, op: 0.25, n: { s: 0.025, d: 44, c: 0.032, xp: 2 } },
      { st: { x: -0.04, y: -0.03 }, op: 0.5, n: { s: 0.0125, d: 44, c: 0.016, xp: 1 } },
      { st: { x: -0.04, y: 0.03 }, op: 0.5, n: { s: 0.0125, d: 44, c: 0.016, xp: 1 } }
    ]
  };
}
if (N=="Arctic") {
  ess = {
    c: { r: { o: -32, e: 64 }, g: { o: -32, e: 64 }, b: { o: 64, e: 196 } },
    l: [
      { op: 1, n: { s: 0.000002, d: 48, c: 0.0025, xp: 1 } },
      { op: 0.2, n: { s: 0.000001, d: 512, c: 0.0025, xp: 1 } }
    ]
  };
}
if (N=="Storm") {
  ess = {
    l: [
      { c: { b: { e: 255 } }, st: { x: 0.04, y: 0.04 }, op: 1, sc: 1 },
      { c: { b: { o: -64, e: 128 } }, st: { x: 0.03, y: 0.03 }, op: 1, sc: 0 },
      { c: { r: { o: 64, e: 8 }, g: { o: 64, e: 8 }, b: { o: 96, e: 8 } }, st: { x: 0.05, y: 0.05 }, op: 0.5, n: { s: 0.01, d: 64, c: 0.008, xp: 2 } }
    ]
  };
}
if (N=="Illuvial") {
  ess = {
    c: { r: { o: 48 }, g: { o: 48 }, b: { o: 64 } },
    l: [
      { st: { x: 0.02, y: 0.025 }, op: 0.2, n: { s: 0.03, d: 44, c: 0.096, xp: 2 } },
      { st: { x: 0.03, y: 0.025 }, op: 0.2, n: { s: 0.03, d: 44, c: 0.096, xp: 2 } },
      { st: { x: 0.04, y: 0.05 }, op: 0.5, n: { s: 0.015, d: 44, c: 0.048, xp: 1 } },
      { st: { x: 0.06, y: 0.05 }, op: 0.5, n: { s: 0.015, d: 44, c: 0.048, xp: 1 } }
    ]
  };
}
if (N=="Undine") {
  ess = {
    l: [
      { c: { r: { e: 64 }, g: { e: 64 }, b: { o: 32, e: 64 } }, op: 0.5, n: { s: 0.01, d: 4444, c: 0.001, xp: 1 } },
      { c: { r: { o: -16, e: -333 }, g: { o: -16, e: -333 }, b: { o: -16, e: -222 } }, op: 1, n: { s: 0.008, d: 222, c: 0.0001, xp: 3 } }
    ]
  };
}
if (N=="Mineral") {
  ess = {
    l: [
      { c: { a: { o: -16, e: 48 } }, op: 1 },
      { c: { a: { o: -8, e: 24 } }, op: 1 }
    ]
  };
}
if (N=="Craggy") {
  ess = {
    c: { r: { o: -25, e: -45 }, g: { o: -35, e: -55 }, b: { o: -45, e: -65 } },
    n: { s: 0, d: 240, c: 0.064, xp: 0.75 },
    l: [{ op: 1 }]
  };
}
if (N=="Dwarven") {
  ess = {
    c: { r: { o: -75, e: -25 }, g: { o: -85, e: -35 }, b: { o: -95, e: -45 } },
    n: { s: 0, d: 128, c: 0.016, xp: 1 },
    l: [{ op: 1 }]
  };
}
if (N=="Gnomic") {
  ess = {
    c: { r: { o: -25, e: -45 }, g: { o: -35, e: -55 }, b: { o: -45, e: -65 } },
    n: { s: 0, d: 240, c: 0.0064, xp: 0.8 },
    l: [{ op: 1 }]
  };
}
if (N=="Crystal") {
  ess = {
    c: { a: { o: -32, e: 128 } },
    l: [{ op: 1 }, { op: 1 }]
  };
}
if (N=="Sylphic") {
  ess = {
    l: [
      { c: { a: { o: -48, e: 96 } }, st: { x: 0.06 }, op: 1 },
      { c: { a: { o: -16, e: 64 } }, st: { x: 0.03 }, op: 1 }
    ]
  };
}
if (N=="Visceral") {
  ess = {
    c: { r: { o: -48 }, g: { o: 128 }, b: { o: -48 } },
    l: [
      { st: { x: 0.09 }, op: 0.1, n: { s: 0.14, d: 128, c: 0.02, xp: 1 } },
      { st: { x: 0.12 }, op: 0.1, n: { s: 0.16, d: 256, c: 0.004, xp: 2 } },
      { st: { x: 0.15 }, op: 0.1, n: { s: 0.18, d: 512, c: 0.0006, xp: 3 } }
    ]
  };
}
if (N=="Frosted") {
  ess = {
    l: [
      { c: { a: { o: 128 } }, st: { x: -0.06, y: 0.01 }, op: 0.33 },
      { c: { r: { o: 128 }, g: { o: 128 }, b: { o: 255 } }, st: { x: -0.04, y: 0.007 }, op: 0.33 },
      { c: { a: { o: 128, e: 8 } }, st: { x: -0.07, y: 0.015 }, op: 0.33, n: { s: 0.01, d: 64, c: 0.008, xp: 2 } },
      { c: { a: { o: 128, e: 8 } }, st: { x: -0.08, y: 0.016 }, op: 0.33, n: { s: 0.008, d: 64, c: 0.008, xp: 2 } }
    ]
  };
}
if (N=="Electric") {
  ess = {
    st: { x: 0.002, y: -0.01 },
    c: { r: { o: -256 }, g: { o: 200, e: 56 }, b: { o: -56, e: 200 } },
    n: { noBlend: true, s: 0.05, d: 19, c: 0.019, xp: 2 },
    l: [{ op: 0.9 }]
  };
}
if (N=="Magnetic") {
  ess = {
    l: [
      { c: { a: { o: -255 } }, st: { x: -0.001, y: -0.001 }, op: 0.5, n: { s: 0.0024, d: 2, c: 4, xp: 6 } },
      { c: { a: { o: 255 } }, st: { x: 0.001, y: 0.001 }, op: 0.5, n: { s: 0.0018, d: 2, c: 4, xp: 6 } }
    ]
  };
}
if (N=="Infernal") {
  ess = {
    l: [
      { c: { r: { e: 255 } }, st: { x: 0.006, y: -0.03 }, op: 1, sc: 1 },
      { c: { r: { o: -64, e: 128 } }, st: { x: 0.003, y: -0.015 }, op: 1, sc: 0 }
    ]
  };
}
if (N=="Molten") {
  ess = {
    st: { x: 0.001, y: 0.001 },
    c: { r: { o: 200, e: 56 }, g: { o: -128, e: 256 }, b: { o: -256 } },
    n: { noBlend: true, s: 0, d: 20, c: 0.024, xp: 1 },
    l: [{ op: 0.9 }]
  };
}
if (N=="Ashen") {
  ess = {
    l: [
      { c: { r: { o: 256, e: 256 }, g: { o: 128, e: 128 } }, op: 1, n: { s: 0.004, d: 64, c: 0.03, xp: 4 } },
      { c: { r: { o: -512, e: 256 }, g: { o: -512 }, b: { o: -512 } }, op: 1, n: { s: 0.004, d: 256, c: 0.02, xp: 1 } }
    ]
  };
}
if (N=="Draconic") {
  ess = {
    st: { x: -0.005, y: 0.025 },
    c: { r: { o: 200, e: 56 }, g: { o: -56, e: 200 }, b: { o: -256 } },
    n: { noBlend: true, s: 0.05, d: 19, c: 0.019, xp: 2 },
    l: [{ op: 0.9 }]
  };
}
if (N=="Celestial") {
  ess = {
    st: { x: 0.004, y: 0.002 },
    c: { a: { o: 224, e: 64 } },
    n: { s: 0.02, d: 50, c: 0.032, xp: 2 },
    l: [{ op: 1 }]
  };
}
if (N=="Night") {
  ess = {
    c: { r: { o: 64 }, g: { o: -128 }, b: { o: 64 } },
    l: [
      { st: { x: -0.03 }, op: 0.4, n: { s: 0.03, d: 256, c: 0.01, xp: 1 } },
      { st: { y: -0.02 }, op: 0.5, n: { s: 0.02, d: 256, c: 0.01, xp: 1 } },
      { st: { x: -0.015 }, op: 0.6, n: { s: 0.015, d: 256, c: 0.01, xp: 1 } }
    ]
  };
}
if (N=="Forgotten") {
  ess = {
    st: { x: 0.006, y: 0.006 },
    c: { a: { o: -512 } },
    n: { s: 0.06, d: 256, c: 0.01, xp: 1 },
    l: [{ op: 1 }]
  };
}
if (N=="Abyssal") {
  ess = {
    c: { r: { o: 32, e: -512 }, g: { e: -512 }, b: { o: 96, e: -512 } },
    l: [
      { st: { x: -0.03 }, op: 0.8, n: { s: 0.03, d: 32, c: 0.005, xp: 1 } },
      { st: { y: -0.02 }, op: 0.6, n: { s: 0.02, d: 32, c: 0.005, xp: 1 } },
      { st: { x: 0.015 }, op: 0.4, n: { s: 0.015, d: 32, c: 0.005, xp: 1 } },
      { st: { y: 0.0125 }, op: 0.2, n: { s: 0.0125, d: 32, c: 0.005, xp: 1 } }
    ]
  };
}
if (N=="Evil") {
  ess = {
    c: { r: { o: 96, e: -512 }, g: { e: -512 }, b: { o: 32, e: -512 } },
    l: [
      { st: { x: 0.010 }, op: 0.2, n: { s: 0.010, d: 60, c: 0.04, xp: 1 } },
      { st: { y: 0.011 }, op: 0.4, n: { s: 0.011, d: 70, c: 0.03, xp: 1 } },
      { st: { x: -0.012 }, op: 0.6, n: { s: 0.012, d: 80, c: 0.02, xp: 1 } },
      { st: { y: -0.013 }, op: 0.8, n: { s: 0.013, d: 90, c: 0.01, xp: 1 } }
    ]
  };
}
if (N=="Lost") {
  ess = {
    c: { a: { e: -512 } },
    l: [
      { st: { x: -0.03 }, op: 0.5, n: { s: 0.03, d: 200, c: 0.03, xp: 1 } },
      { st: { y: -0.02 }, op: 0.5, n: { s: 0.02, d: 200, c: 0.03, xp: 1 } },
      { st: { x: 0.015 }, op: 0.5, n: { s: 0.015, d: 200, c: 0.03, xp: 1 } },
      { st: { y: 0.0125 }, op: 0.5, n: { s: 0.0125, d: 200, c: 0.03, xp: 1 } }
    ]
  };
}

window.onload = function () { init(); };

function gAD () {
  return {
    id: 0,
    value: 0,
    minValue: 0,
    maxValue: 1,
    target: 1,
    duration: 1,
    elapsed: 0,
    direction: 1,
    easing: lin,
    ease1: lin,
    ease2: lin,
    callback: null
  };
};

var animations = [];
function animate (data) {
  var initial = data.value;
  var target = data.target;
  var duration = data.duration;
  var easing = data.easing;
  var callback = data.callback;

  var delta = target - initial;
  data.elapsed = 0;

  var anim = function (i) {
    data.elapsed += dt;

    var pct = max(0, min(1, easing(data.elapsed / duration)));
    data.value = initial + pct * delta;

    if (data.elapsed >= duration) {
      animations.splice(i, 1);
      callback && callback();
    }
  };

  animations.push(anim);
};

function lin (n) { return n; };
function eSin (n) { return -(cos(PI * n) - 1) / 2; };

function rAL (data) {
  data.direction = -data.direction;
  data.callback = function () { rAL (data); };

  if (data.direction < 0) {
    data.easing = data.ease1;
    data.target = data.minValue;
  } else {
    data.easing = data.ease2;
    data.target = data.maxValue;
  }

  animate(data);
};

function init () {
  sRO();
  sS();
  iD();
  cEl();
  rC();
  lFI();
  sR();

  rAL(gvy);

  window.requestAnimationFrame(oAF);
};

function sRO () {
  HB = !!document.body;
  var body = HB ? document.body : document.all[1];
  wW = max(body.clientWidth, window.innerWidth);
  wH = max(body.clientHeight, window.innerHeight);

  var isLandscape = wW > wH;
  var windowSize = isLandscape ? wH : wW;
  cS = windowSize / PC;

  sV = -1;
  pI = 0;
  cP.length = 0;
};

function cEl () {
  var body = HB ? document.body : document.all[1];
  canvas = HB
    ? document.createElement("canvas")
    : document.getElementById("canvas");

  ctx = canvas.getContext("2d");
  HB && body.appendChild(canvas);

  var size = floor(cS * PC);
  var styleSheet = document.createElement("style");
  styleSheet.innerText = `canvas { width: ${size}px; height: ${size}px; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; image-rendering: pixelated; image-rendering: crisp-edges; }`;
  body.appendChild(styleSheet);
};

function rC () {
  if (HB) {
    var x = floor((wW - cS * PC) / 2);
    var y = floor((wH - cS * PC) / 2);
    canvas.style.position = "absolute";
    canvas.style.left = x + "px";
    canvas.style.top = y + "px";
  }

  canvas.width = PC;
  canvas.height = PC;
};

function gC (value, dimension) {
  var size = PC * cS;
  var canvasValue = floor((dimension - cS * PC) / 2);
  var coordinate = floor(PC * (value - canvasValue) / size);
  return coordinate;
};

function iVC (value) {
  return value >= 0 && value < PC;
};

function gX (event) {
  return gC(event.x, wW);
};

function gY (event) {
  return gC(event.y, wH);
};

function pFE (event) {
  if (iPt) {
    var x = gX(event);
    var y = gY(event);
    if (iVC(x) && iVC(y)) {
      var value = iEs ? 0 : pB;
      if (iBx && bxS) {
        var bx = gX(bxS);
        var by = gY(bxS);
        if (iVC(bx) && iVC(by)) {
          var x1 = x < bx ? x : bx;
          var y1 = y < by ? y : by;
          var x2 = x < bx ? bx : x;
          var y2 = y < by ? by : y;
          for (var xx = x1; xx <= x2; xx++) {
            for (var yy = y1; yy <= y2; yy++) {
              pP[xx][yy] = value;
            }
          }
          return;
        }
      }
      pP[x][y] = value;
    }
  }
};

function lFI () {
  document.addEventListener("keydown", (event) => {
    var key = event.key;

    if (key === "Shift") {
      iEs = true;
    }

    if (key === " ") {
      iBx = true;
    }
  }, false);

  document.addEventListener("keyup", (event) => {
    var key = event.key;
    var keyNum = +key;
    var isCtrlDown = event.ctrlKey;

    if (!isNaN(keyNum)) {
      if (isCtrlDown) {
        for (var i = 0; i < PC; i++) {
          for (var j = 0; j < PC; j++) {
            pP[i][j] = keyNum;
          }
        }
      } else if (key !== " ") {
        pB = keyNum;
      }
    }

    switch (key) {
      case "p":
      case "P":
        iPs = !iPs;
        break;

      case "l":
      case "L":
        lPP();
        break;

      case "Shift":
        iEs = false;
        break;

      case " ":
        iBx = false;
        bxS = null;
        break;
    }
  }, false);

  window.addEventListener("mousedown", (event) => {
    iPt = true;

    if (iBx && bxS === null) {
      bxS = event;
    }
  });

  window.addEventListener("mousemove", (event) => pFE(event));

  window.addEventListener("mouseup", (event) => {
    pFE(event);
    iPt = false;
    bxS = null;
  });
};

function lPP () {
  var data = [];
  for (var j = 0; j < PC; j++) {
    for (var i = 0; i < PC; i++) {
      data.push(pP[i][j]);
    }

    if (j < PC - 1) {
      data.push(",");
    }
  }

  var output = "[" + data.join("") + "]";
  console.log(output);
  cGD(output);
};

function cGD (glyphData) {
  var body = HB ? document.body : document.all[1];
  var clipboard = document.createElement("input");
  clipboard.className = "clipboard";
  body.appendChild(clipboard);
  clipboard.value = glyphData;
  clipboard.select();
  document.execCommand("copy");
  body.removeChild(clipboard);
};

function oAF (timestamp) {
  dt = timestamp - pvT;
  if (dt > MT) {
    dt = MT;
  } else if (dt < 0) {
    dt = 0;
  }

  if (iPs) {
    dt = 0;
  }

  sV = -1;
  pI = 0;
  cP.length = 0;
  wSE += dt;

  sS();
  sR();

  var animCount = animations.length;
  for (var i = animCount - 1; i >= 0; i--) {
    animations[i](i);
  }

  pvT = timestamp;
  window.requestAnimationFrame(oAF);
};

function sS () {
  s = 0;
  t = 0;

  var S = Uint32Array.from([0,1,s=t=2,3].map(function (i) {
    return parseInt(H.substr(i*11+2,11),16);
  }));

  rm = function () {
    return t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32;
  };
};

function iD () {
  if (gvy === null) {
    gvy = gAD();
    gvy.value = gv;
    gvy.minValue = gv / 2;
    gvy.maxValue = 2 * gv;
    gvy.duration = 1750 * (sp + 2);
    gvy.ease1 = eSin;
    gvy.ease2 = eSin;
  }
};

function sCl () {
  var hexes = P.slice();

  wS.length = 0;
  wST = 0;

  for (var i = 0; i < cPC; i++) {
    var pt = gCP();
    var hex = hexes[i];
    var bigint = parseInt(hex, 16);
    pt.r = (bigint >> 16) & 255;
    pt.g = (bigint >> 8) & 255;
    pt.b = bigint & 255;
    pPt(pt);
    pt.weight = pow(gvy.value, 5 - i);
    wS.push(pt.weight);
    wST += pt.weight;
    cP.push(pt);
  }

  var minWeight = wS[cPC - 1];
  var duration = 2000 * sp;
  wST -= cPC * minWeight;

  for (var i = 0; i < cPC; i++) {
    var pt = cP[i];
    var elapsed = wSE + 0.5 * duration * i / (cPC - 1);
    var pct = cos(TAU * (elapsed % duration) / duration);
    pt.weight = minWeight + pct * wST;
  }

  if (cPC === 2) {
    var pt1 = cP[0];
    var pt2 = cP[1];
    while (true) {
      var dy = pt2.y - pt1.y;
      var dx = pt2.x - pt1.x;
      var slope = dy / (dx || 1);
      if (slope >= -1.2 && slope <= -0.8) {
        pI = 0;
        pPt(pt1);
        pPt(pt2);
      } else {
        break;
      }
    }
  }
};

var imgData = null;
var uD = new Array(4 * PC * PC);

function sR () {
  if (iFR) {
    imgData = ctx.getImageData(0, 0, PC, PC);
    cID(imgData.data);
    cE();
  }

  var data = imgData.data;
  sCl();

  if (L2) {
    cID(uD);
    aE(uD);
  }

  dCPG(data);

  if (RFOP > 0) {
    aP(data, RFOP);
  }

  if (L2) {
    aUD(data);
  } else {
    aE(data);
  }

  aP(data, 1);
  ctx.putImageData(imgData, 0, 0);

  iFR = false;
};

function cID (data) {
  var dataLength = data.length;
  for (var i = 0; i < dataLength; i++) {
    data[i] = (i + 1) % 4 === 0 ? 255 : 0;
  }
};

function cE () {
  var l = ess.l;
  var shSC = ess.st || {};
  var shNC = ess.n;
  var shC = ess.c;
  var cCD = { o: 0, e: 0 };

  for (var i = 0; i < l.length; i++) {
    var lC = l[i];
    var stC = lC.st || shSC;
    var nC = lC.n || shNC;
    var cC = lC.c || shC;
    var op = lC.op;
    var a = cC.a || cCD;
    var r = cC.r || a;
    var g = cC.g || a;
    var b = cC.b || a;
    var rO = r.o || 0;
    var rR = r.e || 0;
    var gO = g.o || 0;
    var gR = g.e || 0;
    var bO = b.o || 0;
    var bR = b.e || 0;

    var layer = {
      oX: 0,
      oY: 0,
      nOf: 0,
      data: null,
      nObj: null,
      nDp: null,
      config: lC,
      nC: nC,
      stC: stC
    };

    var dataLength = 4 * PC * PC;
    if (nC) {
      dataLength = PC * PC;
      if (stC) {
        if (stC.x > 0) {
          layer.oX = 100000000;
        }
        if (stC.y > 0) {
          layer.oY = 100000000;
        }
      }

      var d = nC.d;
      layer.nObj = cN(nC.c, nC.xp);
      layer.nDp = [];
      for (var n = 0; n < d; n++) {
        var fade;
        if (n < 0.5 * d) {
          fade = 2 * n / d;
        } else {
          var m = n - 0.5 * d;
          fade = 1 - 2 * m / d;
        }

        layer.nDp.push({
          r: rO + rm() * rR,
          g: gO + rm() * gR,
          b: bO + rm() * bR,
          a: op * fade
        });
      }
    }

    layer.data = new Array(dataLength);

    if (nC) {
      for (var j = 0; j < dataLength; j++) {
        var y = floor(j / PC);
        var x = j - (y * PC);
        layer.data[j] = layer.nObj.get(x, y);
      }
    } else {
      for (var j = 0; j < dataLength; j += 4) {
        layer.data[j + 0] = rm() * (rO + rm() * rR);
        layer.data[j + 1] = rm() * (gO + rm() * gR);
        layer.data[j + 2] = rm() * (bO + rm() * bR);
      }
    }

    eL.push(layer);
  }
};

function aE (data) {
  var dataLength = data.length;
  var essenceCount = eL.length;
  for (var i = 0; i < essenceCount; i++) {
    var layer = eL[i];
    var lD = layer.data;
    var lN = layer.nObj;
    var lC = layer.config;
    var stC = layer.stC;
    var dx = stC.x || 0;
    var dy = stC.y || 0;

    layer.oX -= dt * dx;
    layer.oY -= dt * dy;

    if (lN) {
      var nC = layer.nC;
      var nDp = layer.nDp;
      var d = nC.d || 2;
      var dn = nC.s || 0;
      layer.nOf += dt * dn;

      var lON = layer.nOf;
      if (lON < 0) {
        lON = d + lON % d;
      } else if (lON >= d) {
        lON %= d;
      }

      for (var j = 0; j < dataLength; j += 4) {
        var k = floor(j / 4);
        var y = floor(k / PC);
        var x = floor(k - (y * PC)) + layer.oX;
        y += layer.oY;
        var nV = lN.get(x, y);
        var nIR = d * nV + lON;
        var nIH = ceil(nIR);
        var nIL = floor(nIR);
        var nFH = nDp[nIH % d];
        var nFL = nDp[nIL % d];
        var pctLo = nC.noBlend ? 1 : 1 - (nIR - nIL);
        var pctHi = nC.noBlend ? 0 : 1 - pctLo;
        var opLo = nFL.a;
        var opHi = nFH.a;
        data[j    ] += pctLo * nFL.r * opLo + pctHi * nFH.r * opHi;
        data[j + 1] += pctLo * nFL.g * opLo + pctHi * nFH.g * opHi;
        data[j + 2] += pctLo * nFL.b * opLo + pctHi * nFH.b * opHi;
      }
    } else {
      var lOX = layer.oX;
      var lOY = layer.oY;
      var op = lC.op || 1;
      var sc = lC.sc || 0;
      var base = 1 - sc;

      var floorX = floor(lOX);
      var floorY = floor(lOY);
      var ceilX = ceil(lOX);
      var ceilY = ceil(lOY);

      var floorIndexX = 4 * floorX;
      var floorIndexY = 4 * PC * floorY;
      var ceilIndexX = 4 * ceilX;
      var ceilIndexY = 4 * PC * ceilY;

      var percentFloorX = 1 - (lOX - floorX);
      var percentFloorY = 1 - (lOY - floorY);
      var percentCeilX = 1 - percentFloorX;
      var percentCeilY = 1 - percentFloorY;

      var p1 = percentFloorX * percentFloorY;
      var p2 = percentFloorX * percentCeilY;
      var p3 = percentCeilX * percentFloorY;
      var p4 = percentCeilX * percentCeilY;

      var oI1 = floorIndexX + floorIndexY;
      if (oI1 < 0) {
        oI1 = dataLength + oI1 % dataLength;
      } else if (oI1 >= dataLength) {
        oI1 %= dataLength;
      }

      var oI2 = floorIndexX + ceilIndexY;
      if (oI2 < 0) {
        oI2 = dataLength + oI2 % dataLength;
      } else if (oI2 >= dataLength) {
        oI2 %= dataLength;
      }

      var oI3 = ceilIndexX + floorIndexY;
      if (oI3 < 0) {
        oI3 = dataLength + oI3 % dataLength;
      } else if (oI3 >= dataLength) {
        oI3 %= dataLength;
      }

      var oI4 = ceilIndexX + ceilIndexY;
      if (oI4 < 0) {
        oI4 = dataLength + oI4 % dataLength;
      } else if (oI4 >= dataLength) {
        oI4 %= dataLength;
      }

      for (var j = 0; j < dataLength; j += 4) {
        var i1 = (j + oI1) % dataLength;
        var i2 = (j + oI2) % dataLength;
        var i3 = (j + oI3) % dataLength;
        var i4 = (j + oI4) % dataLength;
        var o1 = (base + sc * rm()) * op;
        var o2 = (base + sc * rm()) * op;
        var o3 = (base + sc * rm()) * op;
        data[j    ] += o1 * (p1 * lD[i1    ] + p2 * lD[i2    ] + p3 * lD[i3    ] + p4 * lD[i4    ]);
        data[j + 1] += o2 * (p1 * lD[i1 + 1] + p2 * lD[i2 + 1] + p3 * lD[i3 + 1] + p4 * lD[i4 + 1]);
        data[j + 2] += o3 * (p1 * lD[i1 + 2] + p2 * lD[i2 + 2] + p3 * lD[i3 + 2] + p4 * lD[i4 + 2]);
      }
    }
  }
};

function aUD (data) {
  var dataLength = data.length;
  var opacity = 1 - pxS;
  for (var i = 0; i < dataLength; i += 4) {
    var i0 = i, i1 = i + 1, i2 = i + 2;
    data[i0] += opacity * uD[i0];
    data[i1] += opacity * uD[i1];
    data[i2] += opacity * uD[i2];
  }
};

function aP (data, op) {
  var dataLength = data.length;
  for (var k = 0; k < dataLength; k += 4) {
    var l = floor(k / 4);
    var y = floor(l / PC);
    var x = floor(l - (y * PC));
    var pix = +pP[x][y];
    if (!pix) { continue; }

    var k0 = k, k1 = k + 1, k2 = k + 2;
    var r = data[k0];
    var g = data[k1];
    var b = data[k2];
    var ir = 255 - r;
    var ig = 255 - g;
    var ib = 255 - b;
    var ip = op * pix / 9;
    var p = 1 - ip;

    data[k0] = p * r + ip * ir;
    data[k1] = p * g + ip * ig;
    data[k2] = p * b + ip * ib;
  }
};

function dCPG (data) {
  var x = 0;
  var y = 0;
  while (x < PC) {
    y = 0;
    while (y < PC) {
      sGCFP(data, cP, x, y);
      y++;
    }
    x++;
  }
};

function gCP () {
  return {
    x: 0,
    y: 0,
    r: 0,
    g: 0,
    b: 0,
    weight: 1,
    distance: 0
  };
};

function pPt (pt) {
  var coords = plC[pI++];
  if (pI >= plC.length) {
    pI = 0;
  }

  var oX = -0.125 + 0.25 * rm();
  var oY = -0.125 + 0.25 * rm();
  pt.x = (coords.x + oX) * PC;
  pt.y = (coords.y + oY) * PC;
};

function sGCFP (data, pts, x, y) {
  sFCCP(pts, x, y);

  var newPts = [];
  var length = pts.length;
  for (var i = 0; i < length; i += 2) {
    if (i === length - 1) {
      newPts.push(pts[i]);
    } else {
      newPts.push(sC(pts[i], pts[i + 1]));
    }
  }

  if (newPts.length === 1) {
    if (flipX) { x = PC - x - 1; }
    if (flipY) { y = PC - y - 1; }

    var col = x * 4;
    var row = y * PC * 4;
    var index = row + col;
    var c = newPts[0];
    var i0 = index;
    var i1 = index + 1;
    var i2 = index + 2;

    if (L2) {
      var pxStick = pxS;
      if (+pP[x][y] > 0) { pxStick = 0; }
      var pxStickInv = 1 - pxStick;
      data[i0] = pxStickInv * c.r + pxStick * data[i0];
      data[i1] = pxStickInv * c.g + pxStick * data[i1];
      data[i2] = pxStickInv * c.b + pxStick * data[i2];
    } else {
      data[i0] = c.r;
      data[i1] = c.g;
      data[i2] = c.b;
    }
  } else {
    sGCFP(data, newPts, x, y);
  }
};

function sFCCP (pts, x, y) {
  var length = pts.length;

  if (L2) {
    var testX = x;
    var testY = y;
    if (flipX) { testX = PC - x - 1; }
    if (flipY) { testY = PC - y - 1; }

    var col = testX * 4;
    var row = testY * PC * 4;
    var index = row + col;
    var rx = 3;
    var gx = 3;
    var bx = 3;
    var rp = uD[index    ] - 127.5;
    var gp = uD[index + 1] - 127.5;
    var bp = uD[index + 2] - 127.5;

    if (C < 150) {
      rp = abs(rp) * rp * DLO;
      gp = abs(gp) * gp * DLO;
      bp = abs(bp) * bp * DLO;
    } else if (C < 850) {
      rp = DMD * cos(TS * rp);
      gp = DMD * cos(TS * gp);
      bp = DMD * cos(TS * bp);
    } else {
      rx = 1 + floor(abs((rp + 127.5) / DHI));
      gx = 1 + floor(abs((gp + 127.5) / DHI));
      bx = 1 + floor(abs((bp + 127.5) / DHI));
      rp = 0;
      gp = 0;
      bp = 0;
    }

    for (var i = 0; i < length; i++) {
      var pt = pts[i];
      var px = pt.x, py = pt.y;
      pt.distance = gDE(x, y, px, py, 3);
      pt.rd = gDE(x, y, px, py, rx) + rp;
      pt.gd = gDE(x, y, px, py, gx) + gp;
      pt.bd = gDE(x, y, px, py, bx) + bp;
    }
  } else {
    for (var i = 0; i < length; i++) {
      var pt = pts[i];
      pt.distance = gDE(x, y, pt.x, pt.y, 3);
    }
  }

  pts.sort(sM);
};

function gDE (x1, y1, x2, y2, p) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return pow(dx, p) + pow(dy, p);
};

function sC (c1, c2) {
  var c3 = gCP();

  var c1r = c1.r;
  var c1g = c1.g;
  var c1b = c1.b;
  var c2r = c2.r;
  var c2g = c2.g;
  var c2b = c2.b;
  var c1Weight = c1.weight;
  var c2Weight = c2.weight;

  var dr = c2r - c1r;
  var dg = c2g - c1g;
  var db = c2b - c1b;

  if (L2) {
    var c1RedDistance = c1.rd * c1Weight;
    var c2RedDistance = c2.rd * c2Weight;
    var redDistTotal = c1RedDistance + c2RedDistance;
    var redDistPct = c2RedDistance / redDistTotal;

    var c1GreenDistance = c1.gd * c1Weight;
    var c2GreenDistance = c2.gd * c2Weight;
    var greenDistTotal = c1GreenDistance + c2GreenDistance;
    var greenDistPct = c2GreenDistance / greenDistTotal;

    var c1BlueDistance = c1.bd * c1Weight;
    var c2BlueDistance = c2.bd * c2Weight;
    var blueDistTotal = c1BlueDistance + c2BlueDistance;
    var blueDistPct = c2BlueDistance / blueDistTotal;

    c3.x = (c1.x + c2.x) / 2;
    c3.y = (c1.y + c2.y) / 2;
    c3.r = redDistPct * dr + c1r;
    c3.g = greenDistPct * dg + c1g;
    c3.b = blueDistPct * db + c1b;
    c3.weight = (c1Weight + c2Weight) / 2;
  } else {
    var c1Distance = c1.distance * c1Weight;
    var c2Distance = c2.distance * c2Weight;
    var distTotal = c1Distance + c2Distance;
    var distPct = c2Distance / distTotal;

    c3.x = (c1.x + c2.x) / 2;
    c3.y = (c1.y + c2.y) / 2;
    c3.r = distPct * dr + c1r;
    c3.g = distPct * dg + c1g;
    c3.b = distPct * db + c1b;
    c3.weight = (c1Weight + c2Weight) / 2;
  }

  return c3;
};

function cN (sc, xp) {
  sc = sc || 1;
  xp = xp || 1;

  var perm = [];
  var dot = function (g, x, y) { return x * g[0] + y * g[1]; };
  var SQRT_3 = sqrt(3);
  var GRAD_3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];

  var p = [];
  for (var i = 0; i < 256; i++) {
    p[i] = (256 * rm()) | 0;
  }

  for (var i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  var nO = {};
  nO.get = function (x, y) {
    x *= sc;
    y *= sc;

    var n0, n1, n2;
    var F2 = (SQRT_3 - 1) / 2;
    var s = F2 * (x + y);
    var i = (x + s) | 0;
    var j = (y + s) | 0;
    var G2 = (3 - SQRT_3) / 6;
    var t = G2 * (i + j);
    var X0 = i - t;
    var Y0 = j - t;
    var x0 = x - X0;
    var y0 = y - Y0;

    var i1, j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    var x1 = x0 - i1 + G2;
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2;
    var y2 = y0 - 1 + 2 * G2;
    var ii = i & 255;
    var jj = j & 255;
    var gi0 = perm[ii + perm[jj]] % 12;
    var gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
    var gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
    var t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * dot(GRAD_3[gi0], x0, y0);
    }

    var t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * dot(GRAD_3[gi1], x1, y1);
    }

    var t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * dot(GRAD_3[gi2], x2, y2);
    }

    var nz = (70 * (n0 + n1 + n2) + 1) / 2;
    if (xp !== 1) {
      nz = pow(nz, xp);
    }
    return nz;
  };

  return nO;
};
