// H = "0xce18ad38b5442204e66b525d38e65fbc239bef56f885440b37f7ab507284fefd";
USE_RANDOM_HASH = true;

var PIXEL_ART = null;
var UPGRADED = false;

if (USE_RANDOM_HASH) {
  H = "";
}

function getRandomHash () {
  var hash = "";
  var hashChars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
  for (var i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * hashChars.length);
    hash += hashChars[index];
  }

  var finalHash = "";
  for (var i = 0; i < 8; i++) {
    finalHash += hash;
  }

  finalHash = "0x" + finalHash;
  return finalHash;
};

/** cut the above out **/

var PIXEL_COUNT = 64; // non-zero forces specific output size
var MAX_TICK = 50;
var MAX_MINING_ATTEMPTS = 10000000;
var MINE_FOR_HASH = {
  enabled: true && USE_RANDOM_HASH,
  // elementID: "Earth",
  // essenceID: "Dwarven",
  // paletteID: "Coal",
  // styleID: "Sketch",
  // speedID: "Zen",
  // gravityID: "Atmospheric",
  // displayID: "UpsideDown",
  // colorPointCount: 2
};

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
var random = null;

function shuffleArray (a) {
  var length = a.length;
  var copy = a.slice();

  while (length) {
    var index = floor(random() * length--);
    var temp = copy[length];
    copy[length] = copy[index];
    copy[index] = temp;
  }

  return copy;
};

function chooseByWeight (data) {
  var choice = null;
  var weightTotal = 0;
  var length = data.length;

  for (var i = 0; i < length; i++) {
    var item = data[i];
    weightTotal += item.weight || 0;
  }

  var roll = random();
  var weightSum = 0;
  for (var i = 0; i < length; i++) {
    var item = data[i];
    weightSum += item.weight;
    choice = item;

    var chance = weightSum / weightTotal;
    if (roll <= chance) {
      break;
    }
  }

  return choice;
};

function chooseByID (data, id) {
  var choice = null;
  var length = data.length;

  for (var i = 0; i < length; i++) {
    var item = data[i];
    choice = item;

    if (item.id === id) {
      break;
    }
  }

  return choice;
};

var COLOR_CHANNELS = ["r", "g", "b"];

var SPEEDS = [
  {
    id: "Zen",
    weight: 0.07,
    speed: 256
  },
  {
    id: "Tranquil",
    weight: 0.19,
    speed: 64
  },
  {
    id: "Normal",
    weight: 0.50,
    speed: 16
  },
  {
    id: "Fast",
    weight: 0.13,
    speed: 4
  },
  {
    id: "Swift",
    weight: 0.07,
    speed: 2
  },
  {
    id: "Hyper",
    weight: 0.04,
    speed: 0.5
  }
];

var STYLES = [
  {
    id: "Smooth",
    weight: 0.76,
    colorPointCounts: [2, 3, 4],
    sortMethod: SORT_DISTANCE
  },
  {
    id: "Silk",
    weight: 0.18,
    colorPointCounts: [5],
    sortMethod: SORT_STEP,
    sortStepSize: 1 / 3
  },
  {
    id: "Pajamas",
    weight: 0.04,
    colorPointCounts: [5],
    sortMethod: SORT_STEP,
    sortStepSize: 1 / 99
  },
  {
    id: "Sketch",
    weight: 0.02,
    colorPointCounts: [4],
    sortMethod: SORT_RANDOM_STEP
  }
];

var DISPLAYS = [
  {
    id: "Normal",
    weight: 0.25
  },
  {
    id: "Mirrored",
    weight: 0.25,
    flipX: true
  },
  {
    id: "UpsideDown",
    weight: 0.25,
    flipY: true
  },
  {
    id: "MirroredUpsideDown",
    weight: 0.25,
    flipX: true,
    flipY: true
  }
];

var BASE_COORDS_2 = [
  { x: 0.5, y: 0.5 },
  { x: 0.75, y: 0 }
];

var BASE_COORDS_3 = [
  { x: 0.65, y: 0.15 },
  { x: 0.50, y: 0.50 },
  { x: 0.75, y: 0.75 }
];

var BASE_COORDS_4 = [
  { x: 0.5, y: 0.0 },
  { x: 0.0, y: 0.5 },
  { x: 0.5, y: 1.0 },
  { x: 1.0, y: 0.5 }
];

var BASE_COORDS_5 = [
  { x: 0.5, y: 0.5 },
  { x: 0.5, y: 0.0 },
  { x: 0.0, y: 0.5 },
  { x: 0.5, y: 1.0 },
  { x: 1.0, y: 0.5 }
];

var BASE_COORDS_6 = [
  { x: 0.5, y: 0.5 },
  { x: 0.5, y: 0.0 },
  { x: 1.0, y: 0.0 },
  { x: 1.0, y: 1.0 },
  { x: 0.0, y: 1.0 },
  { x: 0.0, y: 0.0 }
];

var BASE_COORDS = [
  [],
  [],
  BASE_COORDS_2,
  BASE_COORDS_3,
  BASE_COORDS_4,
  BASE_COORDS_5,
  BASE_COORDS_6
];

var COLOR_POINT_RARITIES = [
  [],
  [1],
  [0.7, 0.3],
  [0.4, 0.35, 0.25],
  [0.4, 0.3, 0.2, 0.1],
  [0.4, 0.3, 0.18, 0.08, 0.04],
  [0.36, 0.24, 0.16, 0.12, 0.08, 0.04]
];

var COLOR_GRAVITIES = [
  {
    id: "Lunar",
    value: 0.5,
    weight: 0.05
  },
  {
    id: "Atmospheric",
    value: 1,
    weight: 0.1
  },
  {
    id: "Low",
    value: 2,
    weight: 0.19
  },
  {
    id: "Normal",
    value: 3,
    weight: 0.39
  },
  {
    id: "High",
    value: 6,
    weight: 0.19
  },
  {
    id: "Massive",
    value: 9,
    weight: 0.05
  },
  {
    id: "Stellar",
    value: 12,
    weight: 0.025
  },
  {
    id: "Galactic",
    value: 24,
    weight: 0.005
  }
];

var WIND_PALETTES = [
  {
    id: "Berry",
    weight: 0.6,
    colors: [
      { r: 82, g: 214, b: 234 },
      { r: 203, g: 75, b: 203 },
      { r: 234, g: 196, b: 145 },
      { r: 203, g: 203, b: 75 },
      { r: 234, g: 82, b: 214 },
      { r: 227, g: 105, b: 48 }
    ]
  },
  {
    id: "Thunder",
    weight: 0.3,
    colors: [
      { r: 14, g: 28, b: 50 },
      { r: 144, g: 104, b: 194 },
      { r: 7, g: 44, b: 77 },
      { r: 97, g: 83, b: 154 },
      { r: 247, g: 230, b: 212 },
      { r: 184, g: 219, b: 233 }
    ]
  },
  {
    id: "Aero",
    weight: 0.1,
    colors: [
      { r: 0, g: 18, b: 1 },
      { r: 12, g: 65, b: 15 },
      { r: 31, g: 119, b: 29 },
      { r: 167, g: 255, b: 114 }
    ]
  }
];

var EARTH_PALETTES = [
  {
    id: "Coal",
    weight: 0.6,
    colors: [
      { r: 55, g: 35, b: 35 },
      { r: 24, g: 17, b: 17 },
      { r: 67, g: 64, b: 63 },
      { r: 44, g: 44, b: 44 }
    ]
  },
  {
    id: "Silver",
    weight: 0.3,
    colors: [
      { r: 244, g: 244, b: 244 },
      { r: 233, g: 233, b: 233 },
      { r: 154, g: 154, b: 154 },
      { r: 103, g: 103, b: 103 },
      { r: 59, g: 59, b: 59 },
      { r: 24, g: 24, b: 24 }
    ]
  },
  {
    id: "Gold",
    weight: 0.1,
    colors: [
      { r: 249, g: 215, b: 79 },
      { r: 185, g: 112, b: 34 },
      { r: 195, g: 104, b: 20 },
      { r: 72, g: 28, b: 5 },
      { r: 39, g: 6, b: 1 }
    ]
  }
];

var WATER_PALETTES = [
  {
    id: "Frozen",
    weight: 0.6,
    colors: [
      { r: 198, g: 228, b: 254 },
      { r: 62, g: 151, b: 240 },
      { r: 12, g: 156, b: 221 },
      { r: 5, g: 74, b: 140 },
      { r: 0, g: 26, b: 51 },
      { r: 19, g: 126, b: 212 }
    ]
  },
  {
    id: "Dawn",
    weight: 0.3,
    colors: [
      { r: 5, g: 27, b: 107 },
      { r: 9, g: 82, b: 149 },
      { r: 82, g: 135, b: 196 },
      { r: 255, g: 171, b: 83 }
    ]
  },
  {
    id: "Opalescent",
    weight: 0.1,
    colors: [
      { r: 243, g: 234, b: 185 },
      { r: 243, g: 220, b: 190 },
      { r: 239, g: 198, b: 202 },
      { r: 212, g: 188, b: 217 },
      { r: 125, g: 198, b: 231 },
      { r: 243, g: 234, b: 185 },
      { r: 243, g: 220, b: 190 },
      { r: 239, g: 198, b: 202 },
      { r: 212, g: 188, b: 217 },
      { r: 125, g: 198, b: 231 }
    ]
  }
];

var NATURE_PALETTES = [
  {
    id: "Jungle",
    weight: 0.6,
    colors: [
      { r: 50, g: 90, b: 26 },
      { r: 19, g: 46, b: 5 },
      { r: 36, g: 64, b: 51 },
      { r: 1, g: 8, b: 1 },
      { r: 255, g: 148, b: 0 },
      { r: 255, g: 252, b: 103 },
      { r: 255, g: 142, b: 198 },
      { r: 255, g: 148, b: 0 },
      { r: 1, g: 8, b: 1 },
      { r: 36, g: 64, b: 51 }
    ]
  },
  {
    id: "Camouflage",
    weight: 0.3,
    colors: [
      { r: 157, g: 154, b: 97 },
      { r: 95, g: 75, b: 48 },
      { r: 33, g: 33, b: 33 },
      { r: 70, g: 90, b: 64 },
      { r: 80, g: 103, b: 72 },
      { r: 76, g: 55, b: 30 }
    ]
  },
  {
    id: "Bioluminescence",
    weight: 0.1,
    colors: [
      { r: 37, g: 37, b: 37 },
      { r: 64, g: 0, b: 11 },
      { r: 99, g: 0, b: 145 },
      { r: 110, g: 240, b: 168 },
      { r: 139, g: 30, b: 216 },
      { r: 24, g: 105, b: 200 }
    ]
  }
];

var LIGHT_PALETTES = [
  {
    id: "Pastel",
    weight: 0.6,
    colors: [
      { r: 255, g: 195, b: 160 },
      { r: 255, g: 175, b: 189 },
      { r: 253, g: 219, b: 145 },
      { r: 209, g: 253, b: 255 },
      { r: 132, g: 250, b: 176 },
      { r: 143, g: 211, b: 244 },
      { r: 251, g: 194, b: 235 },
      { r: 161, g: 140, b: 209 }
    ]
  },
  {
    id: "Infrared",
    weight: 0.3,
    colors: [
      { r: 253, g: 243, b: 122 },
      { r: 255, g: 172, b: 0 },
      { r: 242, g: 93, b: 1 },
      { r: 206, g: 12, b: 135 },
      { r: 126, g: 1, b: 159 },
      { r: 5, g: 0, b: 103 },
      { r: 206, g: 12, b: 135 },
      { r: 242, g: 93, b: 1 }
    ]
  },
  {
    id: "Ultraviolet",
    weight: 0.1,
    colors: [
      { r: 216, g: 172, b: 255 },
      { r: 77, g: 0, b: 188 },
      { r: 255, g: 247, b: 255 },
      { r: 244, g: 130, b: 254 },
      { r: 178, g: 0, b: 254 },
      { r: 23, g: 0, b: 82 }
    ]
  }
];

var SHADOW_PALETTES = [
  {
    id: "Darkness",
    weight: 0.6,
    colors: [
      { r: 44, g: 6, b: 68 },
      { r: 24, g: 0, b: 79 },
      { r: 18, g: 1, b: 75 },
      { r: 10, g: 10, b: 10 }
    ]
  },
  {
    id: "Void",
    weight: 0.3,
    colors: [
      { r: 24, g: 0, b: 79 },
      { r: 64, g: 0, b: 111 },
      { r: 99, g: 0, b: 145 },
      { r: 199, g: 38, b: 133 },
      { r: 10, g: 10, b: 10 }
    ]
  },
  {
    id: "Undead",
    weight: 0.1,
    colors: [
      { r: 54, g: 31, b: 57 },
      { r: 0, g: 197, b: 163 },
      { r: 114, g: 159, b: 175 },
      { r: 115, g: 106, b: 147 },
      { r: 160, g: 193, b: 184 }
    ]
  }
];

var ARCANE_PALETTES = [
  {
    id: "Frostfire",
    weight: 0.6,
    colors: [
      { r: 255, g: 237, b: 218 },
      { r: 61, g: 178, b: 255 },
      { r: 255, g: 184, b: 48 },
      { r: 255, g: 36, b: 66 }
    ]
  },
  {
    id: "Cosmic",
    weight: 0.3,
    colors: [
      { r: 18, g: 10, b: 56 },
      { r: 165, g: 82, b: 130 },
      { r: 65, g: 36, b: 103 },
      { r: 255, g: 225, b: 215 },
      { r: 51, g: 37, b: 108 },
      { r: 192, g: 114, b: 128 }
    ]
  },
  {
    id: "Colorless",
    weight: 0.1,
    colors: [
      { r: 25, g: 25, b: 25 },
      { r: 230, g: 230, b: 230 }
    ]
  }
];

var FIRE_PALETTES = [
  {
    id: "Heat",
    weight: 0.6,
    colors: [
      { r: 9, g: 2, b: 1 },
      { r: 185, g: 68, b: 6 },
      { r: 242, g: 189, b: 66 },
      { r: 105, g: 20, b: 0 }
    ]
  },
  {
    id: "Ember",
    weight: 0.3,
    colors: [
      { r: 18, g: 2, b: 2 },
      { r: 121, g: 0, b: 2 },
      { r: 107, g: 0, b: 5 },
      { r: 255, g: 129, b: 33 }
    ]
  },
  {
    id: "Corrupted",
    weight: 0.1,
    colors: [
      { r: 3, g: 3, b: 15 },
      { r: 55, g: 0, b: 130 },
      { r: 100, g: 0, b: 178 },
      { r: 218, g: 73, b: 192 }
    ]
  }
];

var LIGHT_ESSENCES = [
  {
    id: "Heavenly",
    weight: 0.25,
    color: {
      r: { offset: 64 },
      g: { offset: 64 },
      b: { offset: 32 }
    },
    layers: [
      { step: { x: 0.006 }, noise: { speed: 0.006, depth: 128, scale: 0.024, exponent: 0.5 }, opacity: 0.4 },
      { step: { x: -0.007 }, noise: { speed: 0.007, depth: 128, scale: 0.022, exponent: 0.5 }, opacity: 0.6 },
      { step: { y: 0.008 }, noise: { speed: 0.008, depth: 128, scale: 0.020, exponent: 0.5 }, opacity: 0.8 },
      { step: { y: -0.009 }, noise: { speed: 0.009, depth: 128, scale: 0.018, exponent: 0.5 }, opacity: 1 }
    ]
  },
  {
    id: "Fae",
    weight: 0.25,
    layers: [
      {
        color: { a: { offset: 16, range: -96 } },
        step: { x: 0.002, y: -0.017 },
        opacity: 0.75,
        static: 1
      },
      {
        color: { a: { offset: -16, range: 96 } },
        step: { x: -0.001, y: -0.015 },
        opacity: 0.9,
        static: 1
      },
      {
        color: { a: { offset: 52, range: 8 } },
        step: { x: -0.01, y: -0.03 },
        opacity: 0.9,
        noise: { speed: 0.02, depth: 64, scale: 0.015, exponent: 2 }
      }
    ]
  },
  {
    id: "Prismatic",
    weight: 0.15,
    layers: [
      {
        color: {
          r: { offset: -64, range: 128 },
          g: { offset: -64, range: 128 },
          b: { offset: -32, range: 64 }
        },
        step: {}, opacity: 0.75, noise: { speed: 0.001, depth: 1024, scale: 0.001, exponent: 1 }
      },
      {
        color: {
          r: { offset: -64, range: 255 },
          g: { offset: -64, range: 255 },
          b: { offset: -32, range: 128 }
        },
        step: {}, opacity: 0.25, noise: { speed: 0.001, depth: 1024, scale: 0.001, exponent: 1 }
      }
    ]
  },
  {
    id: "Radiant",
    weight: 0.15,
    color: {
      r: { offset: 60, range: 80 },
      g: { offset: 60, range: 80 },
      b: { offset: 40, range: 60 }
    },
    layers: [
      { step: {}, opacity: 1, noise: { speed: 0.0003, depth: 40, scale: 0.0014, exponent: 1 } }
    ]
  },
  {
    id: "Photonic",
    weight: 0.1,
    color: { a: { offset: -64, range: 140 } },
    layers: [
      { step: {}, opacity: 1, noise: { speed: 0.01, depth: 9999, scale: 0.001, exponent: 3 } },
      { step: {}, opacity: 1, noise: { speed: 0.009, depth: 9999, scale: 0.001, exponent: 3 } },
      { step: {}, opacity: 1, noise: { speed: 0.008, depth: 9999, scale: 0.001, exponent: 3 } },
      { step: {}, opacity: 1, noise: { speed: 0.007, depth: 9999, scale: 0.001, exponent: 3 } },
      { step: {}, opacity: 1, noise: { speed: 0.006, depth: 9999, scale: 0.001, exponent: 3 } },
      { step: {}, opacity: 1, noise: { speed: 0.005, depth: 9999, scale: 0.001, exponent: 3 } }
    ]
  }
];

var NATURE_ESSENCES = [
  {
    id: "Forest",
    weight: 0.25,
    color: {
      r: { offset: -16, range: 96 },
      g: { offset: -16, range: 96 },
      b: { offset: 16, range: -96 }
    },
    layers: [
      { step: { x: 0.002, y: -0.014 }, opacity: 0.4, static: 1 },
      { step: { x: -0.001, y: -0.012 }, opacity: 0.4, static: 1 },
      {
        color: {
          r: { offset: 96, range: 8 },
          g: { offset: 128, range: 8 },
          b: { offset: 32, range: 8 }
        },
        step: { y: -0.05 },
        opacity: 0.3,
        noise: { speed: 0.02, depth: 1024, scale: 0.006, exponent: 1 }
      }
    ]
  },
  {
    id: "Life",
    weight: 0.25,
    step: { x: -0.006 },
    color: {
      r: { offset: -6, range: 12 },
      g: { offset: -48, range: 128 },
      b: { offset: -6, range: 12 }
    },
    layers: [
      { opacity: 0.1, noise: { speed: 0.06, depth: 32, scale: 0.03, exponent: 1 } },
      { opacity: 0.3, noise: { speed: 0.03, depth: 32, scale: 0.05, exponent: 2 } },
      { opacity: 0.5, noise: { speed: 0.02, depth: 32, scale: 0.07, exponent: 3 } }
    ]
  },
  {
    id: "Swamp",
    weight: 0.15,
    layers: [
      {
        color: {
          r: { offset: -192 },
          b: { offset: 32, range: 128 }
        },
        step: { x: 0.005, y: 0.005 },
        opacity: 0.8,
        static: 1
      },
      {
        color: {
          r: { offset: -128, range: -64 },
          g: { offset: -64, range: 128 },
          b: { offset: -64, range: -64 }
        },
        step: {}, opacity: 1, noise: { speed: 0, depth: 256, scale: 0.04, exponent: 2 }
      }
    ]
  },
  {
    id: "Wildblood",
    weight: 0.15,
    color: {
      r: { offset: 128, range: 128 },
      g: { offset: -64, range: 32 },
      b: { offset: -64, range: 32 }
    },
    layers: [
      { step: {}, opacity: 0.3, noise: { speed: 0.002, depth: 64, scale: 0.075, exponent: 1 } },
      { step: {}, opacity: 0.3, noise: { speed: 0.003, depth: 64, scale: 0.015, exponent: 2 } },
      { step: {}, opacity: 0.3, noise: { speed: 0.004, depth: 64, scale: 0.0023, exponent: 3 } }
    ]
  },
  {
    id: "Soul",
    weight: 0.1,
    noise: { speed: 0.25, depth: 128, scale: 0.01, exponent: 3 },
    layers: [
      {
        color: {
          r: { offset: 200 },
          g: { offset: -100 },
          b: { offset: -100 }
        },
        step: { x: -0.005, y: -0.015 },
        opacity: 1/3
      },
      {
        color: {
          r: { offset: -100 },
          g: { offset: 200 },
          b: { offset: -100 },
        },
        step: { x: 0.005, y: -0.015 },
        opacity: 1/3
      },
      {
        color: {
          r: { offset: -100 },
          g: { offset: -100 },
          b: { offset: 200 }
        },
        step: { x: 0, y: -0.03 },
        opacity: 1/3
      }
    ]
  }
];

var ARCANE_ESSENCES = [
  {
    id: "Magic",
    weight: 0.25,
    noise: { speed: 0.05, depth: 128, scale: 0.015, exponent: 0.5 },
    layers: [
      {
        color: { r: { offset: 200 }, b: { offset: -200 } },
        step: { x: -0.02 },
        opacity: 1/3
      },
      {
        color: { r: { offset: -200 }, g: { offset: 200 } },
        step: { y: -0.02 },
        opacity: 1/3
      },
      {
        color: { g: { offset: -200 }, b: { offset: 200 } },
        step: { x: 0.02 },
        opacity: 1/3
      }
    ]
  },
  {
    id: "Astral",
    weight: 0.25,
    color: {
      r: { offset: -64, range: 96 },
      g: { offset: -64, range: 64 },
      b: { offset: -64, range: 96 }
    },
    layers: [
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } },
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } },
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } },
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } },
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } },
      { step: {}, opacity: 0.33, noise: { speed: 0.003, depth: 512, scale: 0.003, exponent: 1 } }
    ]
  },
  {
    id: "Forbidden",
    weight: 0.15,
    color: {
      r: { offset: -64, range: 32 },
      g: { offset: -64, range: 32 },
      b: { offset: 128, range: 128 }
    },
    layers: [
      { step: {}, opacity: 0.3, noise: { speed: 0.001, depth: 64, scale: 0.1, exponent: 1 } },
      { step: {}, opacity: 0.3, noise: { speed: 0.002, depth: 64, scale: 0.02, exponent: 2 } },
      { step: {}, opacity: 0.3, noise: { speed: 0.003, depth: 64, scale: 0.003, exponent: 3 } }
    ]
  },
  {
    id: "Runic",
    weight: 0.15,
    step: { x: -0.005, y: 0.025 },
    color: {
      r: { offset: -56, range: 200 },
      g: { offset: -256 },
      b: { offset: 200, range: 56 }
    },
    noise: { noBlend: true, speed: 0.05, depth: 19, scale: 0.019, exponent: 2 },
    layers: [
      { opacity: 0.9 }
    ]
  },
  {
    id: "Unknown",
    weight: 0.1,
    layers: [
      {
        color: {
          r: { offset: 256 },
          g: { offset: 256 },
          b: { offset: 256 }
        },
        step: { delay: 2, x: 0.003 },
        noise: { speed: 0.25, depth: 256, scale: 0.01, exponent: 1 },
        opacity: 1
      },
      {
        color: {
          r: { offset: -256 },
          g: { offset: -256 },
          b: { offset: -256 }
        },
        step: { delay: 1, y: -0.006 },
        noise: { speed: 0.5, depth: 256, scale: 0.01, exponent: 1 },
        opacity: 1
      }
    ]
  }
];

var WATER_ESSENCES = [
  {
    id: "Tidal",
    weight: 0.25,
    color: {
      r: { offset: 48 },
      g: { offset: 48 },
      b: { offset: 64 }
    },
    layers: [
      { step: { x: -0.02, y: -0.015 }, opacity: 0.25, noise: { speed: 0.025, depth: 44, scale: 0.032, exponent: 2 } },
      { step: { x: -0.02, y: 0.015 }, opacity: 0.25, noise: { speed: 0.025, depth: 44, scale: 0.032, exponent: 2 } },
      { step: { x: -0.04, y: -0.03 }, opacity: 0.5, noise: { speed: 0.0125, depth: 44, scale: 0.016, exponent: 1 } },
      { step: { x: -0.04, y: 0.03 }, opacity: 0.5, noise: { speed: 0.0125, depth: 44, scale: 0.016, exponent: 1 } }
    ]
  },
  {
    id: "Arctic",
    weight: 0.25,
    color: {
      r: { offset: -32, range: 64 },
      g: { offset: -32, range: 64 },
      b: { offset: 64, range: 196 }
    },
    layers: [
      { step: {}, opacity: 1, noise: { speed: 0.000002, depth: 48, scale: 0.0025, exponent: 1 } },
      { step: {}, opacity: 0.2, noise: { speed: 0.000001, depth: 512, scale: 0.0025, exponent: 1 } }
    ]
  },
  {
    id: "Storm",
    weight: 0.15,
    layers: [
      {
        color: { b: { range: 255 } },
        step: { x: 0.04, y: 0.04 },
        opacity: 1,
        static: 1
      },
      {
        color: { b: { offset: -64, range: 128 } },
        step: { x: 0.03, y: 0.03 },
        opacity: 1,
        static: 0
      },
      {
        color: { r: { offset: 64, range: 8 }, g: { offset: 64, range: 8 }, b: { offset: 96, range: 8 } },
        step: { x: 0.05, y: 0.05 },
        opacity: 0.5,
        noise: { speed: 0.01, depth: 64, scale: 0.008, exponent: 2 }
      }
    ]
  },
  {
    id: "Illuvial",
    weight: 0.15,
    color: {
      r: { offset: 48 },
      g: { offset: 48 },
      b: { offset: 64 }
    },
    layers: [
      { step: { x: 0.02, y: 0.025 }, opacity: 0.2, noise: { speed: 0.03, depth: 44, scale: 0.096, exponent: 2 } },
      { step: { x: 0.03, y: 0.025 }, opacity: 0.2, noise: { speed: 0.03, depth: 44, scale: 0.096, exponent: 2 } },
      { step: { x: 0.04, y: 0.05 }, opacity: 0.5, noise: { speed: 0.015, depth: 44, scale: 0.048, exponent: 1 } },
      { step: { x: 0.06, y: 0.05 }, opacity: 0.5, noise: { speed: 0.015, depth: 44, scale: 0.048, exponent: 1 } }
    ]
  },
  {
    id: "Undine",
    weight: 0.1,
    layers: [
      {
        color: {
          r: { range: 64 },
          g: { range: 64 },
          b: { offset: 32, range: 64 }
        },
        step: {}, opacity: 0.5, noise: { speed: 0.01, depth: 4444, scale: 0.001, exponent: 1 }
      },
      {
        color: {
          r: { offset: -16, range: -333 },
          g: { offset: -16, range: -333 },
          b: { offset: -16, range: -222 }
        },
        step: {}, opacity: 1, noise: { speed: 0.008, depth: 222, scale: 0.0001, exponent: 3 }
      }
    ]
  }
];

var EARTH_ESSENCES = [
  {
    id: "Mineral",
    weight: 0.25,
    step: {},
    layers: [
      { color: { a: { offset: -16, range: 48 } }, opacity: 1 },
      { color: { a: { offset: -8, range: 24 } }, opacity: 1 }
    ]
  },
  {
    id: "Craggy",
    weight: 0.25,
    step: {},
    color: {
      r: { offset: -25, range: -45 },
      g: { offset: -35, range: -55 },
      b: { offset: -45, range: -65 }
    },
    noise: { speed: 0, depth: 240, scale: 0.064, exponent: 0.75 },
    layers: [
      { opacity: 1 }
    ]
  },
  {
    id: "Dwarven",
    weight: 0.15,
    step: {},
    color: {
      r: { offset: -75, range: -25 },
      g: { offset: -85, range: -35 },
      b: { offset: -95, range: -45 }
    },
    noise: { speed: 0, depth: 128, scale: 0.016, exponent: 1 },
    layers: [
      { opacity: 1 }
    ]
  },
  {
    id: "Gnomic",
    weight: 0.15,
    step: {},
    color: {
      r: { offset: -25, range: -45 },
      g: { offset: -35, range: -55 },
      b: { offset: -45, range: -65 }
    },
    noise: { speed: 0, depth: 240, scale: 0.0064, exponent: 0.8 },
    layers: [
      { opacity: 1 }
    ]
  },
  {
    id: "Crystal",
    weight: 0.1,
    step: {},
    color: { a: { offset: -32, range: 128 } },
    layers: [
      { opacity: 1 },
      { opacity: 1 }
    ]
  }
];

var WIND_ESSENCES = [
  {
    id: "Sylphic",
    weight: 0.25,
    layers: [
      {
        color: { a: { offset: -48, range: 96 } },
        step: { x: 0.06 },
        opacity: 1
      },
      {
        color: { a: { offset: -16, range: 64 } },
        step: { x: 0.03 },
        opacity: 1
      }
    ]
  },
  {
    id: "Visceral",
    weight: 0.25,
    color: {
      r: { offset: -48 },
      g: { offset: 128 },
      b: { offset: -48 }
    },
    layers: [
      { step: { x: 0.09 }, opacity: 0.1, noise: { speed: 0.14, depth: 128, scale: 0.02, exponent: 1 } },
      { step: { x: 0.12 }, opacity: 0.1, noise: { speed: 0.16, depth: 256, scale: 0.004, exponent: 2 } },
      { step: { x: 0.15 }, opacity: 0.1, noise: { speed: 0.18, depth: 512, scale: 0.0006, exponent: 3 } }
    ]
  },
  {
    id: "Frosted",
    weight: 0.15,
    layers: [
      {
        color: { a: { offset: 128 } },
        step: { x: -0.06, y: 0.01 },
        opacity: 0.33
      },
      {
        color: { r: { offset: 128 }, g: { offset: 128 }, b: { offset: 255 } },
        step: { x: -0.04, y: 0.007 },
        opacity: 0.33
      },
      {
        color: { a: { offset: 128, range: 8 } },
        step: { x: -0.07, y: 0.015 },
        opacity: 0.33,
        noise: { speed: 0.01, depth: 64, scale: 0.008, exponent: 2 }
      },
      {
        color: { a: { offset: 128, range: 8 } },
        step: { x: -0.08, y: 0.016 },
        opacity: 0.33,
        noise: { speed: 0.008, depth: 64, scale: 0.008, exponent: 2 }
      }
    ]
  },
  {
    id: "Electric",
    weight: 0.15,
    step: { x: 0.002, y: -0.01 },
    color: {
      r: { offset: -256 },
      g: { offset: 200, range: 56 },
      b: { offset: -56, range: 200 }
    },
    noise: { noBlend: true, speed: 0.05, depth: 19, scale: 0.019, exponent: 2 },
    layers: [
      { opacity: 0.9 }
    ]
  },
  {
    id: "Magnetic",
    weight: 0.1,
    layers: [
      {
        color: { a: { offset: -255 } },
        step: { x: -0.001, y: -0.001 },
        opacity: 0.5,
        noise: { speed: 0.0024, depth: 2, scale: 4, exponent: 6 }
      },
      {
        color: { a: { offset: 255 } },
        step: { x: 0.001, y: 0.001 },
        opacity: 0.5,
        noise: { speed: 0.0018, depth: 2, scale: 4, exponent: 6 }
      }
    ]
  }
];

var FIRE_ESSENCES = [
  {
    id: "Infernal",
    weight: 0.25,
    layers: [
      {
        color: { r: { range: 255 } },
        step: { x: 0.006, y: -0.03 },
        opacity: 1,
        static: 1
      },
      {
        color: { r: { offset: -64, range: 128 } },
        step: { x: 0.003, y: -0.015 },
        opacity: 1,
        static: 0
      }
    ]
  },
  {
    id: "Molten",
    weight: 0.25,
    step: { x: 0.001, y: 0.001 },
    color: {
      r: { offset: 200, range: 56 },
      g: { offset: -128, range: 256 },
      b: { offset: -256 }
    },
    noise: { noBlend: true, speed: 0, depth: 20, scale: 0.024, exponent: 1 },
    layers: [
      { opacity: 0.9 }
    ]
  },
  {
    id: "Ashen",
    weight: 0.15,
    step: {},
    layers: [
      {
        color: {
          r: { offset: 256, range: 256 },
          g: { offset: 128, range: 128 }
        },
        opacity: 1,
        noise: { speed: 0.004, depth: 64, scale: 0.03, exponent: 4 }
      },
      {
        color: {
          r: { offset: -512, range: 256 },
          g: { offset: -512 },
          b: { offset: -512 }
        },
        opacity: 1,
        noise: { speed: 0.004, depth: 256, scale: 0.02, exponent: 1 }
      }
    ]
  },
  {
    id: "Draconic",
    weight: 0.15,
    step: { x: -0.005, y: 0.025 },
    color: {
      r: { offset: 200, range: 56 },
      g: { offset: -56, range: 200 },
      b: { offset: -256 }
    },
    noise: { noBlend: true, speed: 0.05, depth: 19, scale: 0.019, exponent: 2 },
    layers: [
      { opacity: 0.9 }
    ]
  },
  {
    id: "Celestial",
    weight: 0.1,
    step: { x: 0.004, y: 0.002 },
    color: { a: { offset: 224, range: 64 } },
    noise: { speed: 0.02, depth: 50, scale: 0.032, exponent: 2 },
    layers: [
      { opacity: 1 }
    ]
  }
];

var SHADOW_ESSENCES = [
  {
    id: "Night",
    weight: 0.25,
    color: {
      r: { offset: 64 },
      g: { offset: -128 },
      b: { offset: 64 }
    },
    layers: [
      { step: { x: -0.03 }, opacity: 0.4, noise: { speed: 0.03, depth: 256, scale: 0.01, exponent: 1 } },
      { step: { y: -0.02 }, opacity: 0.5, noise: { speed: 0.02, depth: 256, scale: 0.01, exponent: 1 } },
      { step: { x: -0.015 }, opacity: 0.6, noise: { speed: 0.015, depth: 256, scale: 0.01, exponent: 1 } }
    ]
  },
  {
    id: "Forgotten",
    weight: 0.25,
    step: { x: 0.006, y: 0.006 },
    color: { a: { offset: -512 } },
    noise: { speed: 0.06, depth: 256, scale: 0.01, exponent: 1 },
    layers: [
      { opacity: 1 }
    ]
  },
  {
    id: "Abyssal",
    weight: 0.15,
    color: {
      r: { offset: 32, range: -512 },
      g: { range: -512 },
      b: { offset: 96, range: -512 }
    },
    layers: [
      { step: { x: -0.03 }, opacity: 0.8, noise: { speed: 0.03, depth: 32, scale: 0.005, exponent: 1 } },
      { step: { y: -0.02 }, opacity: 0.6, noise: { speed: 0.02, depth: 32, scale: 0.005, exponent: 1 } },
      { step: { x: 0.015 }, opacity: 0.4, noise: { speed: 0.015, depth: 32, scale: 0.005, exponent: 1 } },
      { step: { y: 0.0125 }, opacity: 0.2, noise: { speed: 0.0125, depth: 32, scale: 0.005, exponent: 1 } }
    ]
  },
  {
    id: "Evil",
    weight: 0.15,
    color: {
      r: { offset: 96, range: -512 },
      g: { range: -512 },
      b: { offset: 32, range: -512 }
    },
    layers: [
      { step: { x: 0.010 }, opacity: 0.2, noise: { speed: 0.010, depth: 60, scale: 0.04, exponent: 1 } },
      { step: { y: 0.011 }, opacity: 0.4, noise: { speed: 0.011, depth: 70, scale: 0.03, exponent: 1 } },
      { step: { x: -0.012 }, opacity: 0.6, noise: { speed: 0.012, depth: 80, scale: 0.02, exponent: 1 } },
      { step: { y: -0.013 }, opacity: 0.8, noise: { speed: 0.013, depth: 90, scale: 0.01, exponent: 1 } }
    ]
  },
  {
    id: "Lost",
    weight: 0.1,
    color: { a: { range: -512 } },
    layers: [
      { step: { x: -0.03 }, opacity: 0.5, noise: { speed: 0.03, depth: 200, scale: 0.03, exponent: 1 } },
      { step: { y: -0.02 }, opacity: 0.5, noise: { speed: 0.02, depth: 200, scale: 0.03, exponent: 1 } },
      { step: { x: 0.015 }, opacity: 0.5, noise: { speed: 0.015, depth: 200, scale: 0.03, exponent: 1 } },
      { step: { y: 0.0125 }, opacity: 0.5, noise: { speed: 0.0125, depth: 200, scale: 0.03, exponent: 1 } }
    ]
  }
];

var ELEMENTS = [
  { id: "Light", weight: 0.125, palettes: LIGHT_PALETTES, essences: LIGHT_ESSENCES },
  { id: "Nature", weight: 0.125, palettes: NATURE_PALETTES, essences: NATURE_ESSENCES },
  { id: "Arcane", weight: 0.125, palettes: ARCANE_PALETTES, essences: ARCANE_ESSENCES },
  { id: "Water", weight: 0.125, palettes: WATER_PALETTES, essences: WATER_ESSENCES },
  { id: "Earth", weight: 0.125, palettes: EARTH_PALETTES, essences: EARTH_ESSENCES },
  { id: "Wind", weight: 0.125, palettes: WIND_PALETTES, essences: WIND_ESSENCES },
  { id: "Fire", weight: 0.125, palettes: FIRE_PALETTES, essences: FIRE_ESSENCES },
  { id: "Shadow", weight: 0.125, palettes: SHADOW_PALETTES, essences: SHADOW_ESSENCES }
];

var windowWidth = 0;
var windowHeight = 0;
var canvasScale = 1;
var canvas = null;
var ctx = null;
var styleSheet = null;

var styleID = "";
var displayID = "";
var elementID = "";
var paletteID = "";
var gravityID = "";
var essenceID = "";
var speedID = "";
var speed = 0;
var gravity = null;
var runeflux = 0;
var corruption = 0;
var pixelStick = 0;
var weightShiftTotal = 0;
var weightShift = [];
var weightShiftElapsed = 0;
var essenceLayers = [];
var colorPointCounts = [2, 3, 4, 5, 6];
var colorPointCount = 4;
var colorPoints = [];
var sortMethod = SORT_DISTANCE;
var sortValue = -1;
var sortStepSize = 1;
var placementIndex = 0;
var placementCoords = BASE_COORDS[colorPointCount];
var lastRandomColor = { r: 0, g: 0, b: 0 };
var isFirstRandomColor = true;
var flipX = false;
var flipY = false;
var isFirstRender = true;
var dt = 0;
var prevTimestamp = 0;

var isPaused = false;
var isPainting = false;
var isErasing = false;
var isBoxing = false;
var boxStart = null;
var paintBrush = 9;
var paintedPixels = new Array(PIXEL_COUNT);
for (var x = 0; x < PIXEL_COUNT; x++) {
  paintedPixels[x] = new Array(PIXEL_COUNT);
  for (var y = 0; y < PIXEL_COUNT; y++) {
    paintedPixels[x][y] = 0;
  }
}

if (PIXEL_ART && PIXEL_ART.length === PIXEL_COUNT) {
  for (var y = 0; y < PIXEL_COUNT; y++) {
    for (var x = 0; x < PIXEL_COUNT; x++) {
      var row = "" + PIXEL_ART[y];
      paintedPixels[x][y] = +row.charAt(x);
    }
  }
}

function SORT_DISTANCE (a, b) { return a.distance - b.distance; };

function SORT_STEP () {
  var value = sortValue;
  sortValue += sortStepSize;
  if (sortValue >= 2) { sortValue -= 3; }
  return value;
};

function SORT_RANDOM_STEP () {
  var value = sortValue;
  sortValue += 1 / (random() * PIXEL_COUNT);
  if (sortValue >= 2) { sortValue -= 3; }
  return value;
};

function getAnimData () {
  return {
    id: 0,
    value: 0,
    minValue: 0,
    maxValue: 1,
    target: 1,
    duration: 1,
    elapsed: 0,
    direction: 1,
    easing: linear,
    ease1: linear,
    ease2: linear,
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

function linear (n) { return n; };
function easeInOutSine (n) { return -(cos(PI * n) - 1) / 2; };

function runAnimLoop (data) {
  data.direction = -data.direction;
  data.callback = function () { runAnimLoop (data); };

  if (data.direction < 0) {
    data.easing = data.ease1;
    data.target = data.minValue;
  } else {
    data.easing = data.ease2;
    data.target = data.maxValue;
  }

  animate(data);
};

function initialize () {
  setRenderOptions();
  setSeed();
  rollRarity();

  if (MINE_FOR_HASH.enabled) {
    mineForHashMatch();
  }

  console.log(`Hash: ${H}`);

  createElements();
  resizeCanvas();
  listenForInput();
  startRender();

  runAnimLoop(gravity);

  window.requestAnimationFrame(onAnimationFrame);
};

function setRenderOptions () {
  var body = document.body;
  windowWidth = max(body.clientWidth, window.innerWidth);
  windowHeight = max(body.clientHeight, window.innerHeight);

  var isLandscape = windowWidth > windowHeight;
  var windowSize = isLandscape ? windowHeight : windowWidth;
  canvasScale = windowSize / PIXEL_COUNT;

  sortValue = -1;
  placementIndex = 0;
  lastRandomColor = { r: 0, g: 0, b: 0 };
  isFirstRandomColor = true;
  colorPoints.length = 0;
};

function setResizeHandler () {
  window.addEventListener('resize', function () {
    setRenderOptions();
    resizeCanvas();
  }, true);
};

function createElements () {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  setResizeHandler();
};

function resizeCanvas () {
  var x = floor((windowWidth - canvasScale * PIXEL_COUNT) / 2);
  var y = floor((windowHeight - canvasScale * PIXEL_COUNT) / 2);
  canvas.style.position = "absolute";
  canvas.style.left = x + "px";
  canvas.style.top = y + "px";
  canvas.width = PIXEL_COUNT;
  canvas.height = PIXEL_COUNT;

  if (!styleSheet) {
    styleSheet = document.createElement("style");
    document.body.appendChild(styleSheet);
  }

  var size = floor(canvasScale * PIXEL_COUNT);
  styleSheet.innerText = `canvas {
    width: ${size}px;
    height: ${size}px;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }`;
};

function getCoordinate (value, dimension) {
  var size = PIXEL_COUNT * canvasScale;
  var canvasValue = floor((dimension - canvasScale * PIXEL_COUNT) / 2);
  var coordinate = floor(PIXEL_COUNT * (value - canvasValue) / size);
  return coordinate;
};

function isValidCoordinate (value) {
  return value >= 0 && value < PIXEL_COUNT;
};

function getXFromEvent (event) {
  return getCoordinate(event.x, windowWidth);
};

function getYFromEvent (event) {
  return getCoordinate(event.y, windowHeight);
};

function paintFromEvent (event) {
  if (isPainting) {
    var x = getXFromEvent(event);
    var y = getYFromEvent(event);
    if (isValidCoordinate(x) && isValidCoordinate(y)) {
      var value = isErasing ? 0 : paintBrush;
      if (isBoxing && boxStart) {
        var bx = getXFromEvent(boxStart);
        var by = getYFromEvent(boxStart);
        if (isValidCoordinate(bx) && isValidCoordinate(by)) {
          var x1 = x < bx ? x : bx;
          var y1 = y < by ? y : by;
          var x2 = x < bx ? bx : x;
          var y2 = y < by ? by : y;
          for (var xx = x1; xx <= x2; xx++) {
            for (var yy = y1; yy <= y2; yy++) {
              paintedPixels[xx][yy] = value;
            }
          }
          return;
        }
      }
      paintedPixels[x][y] = value;
    }
  }
};

function listenForInput () {
  document.addEventListener("keydown", (event) => {
    var key = event.key;

    if (key === "Shift") {
      isErasing = true;
    }

    if (key === " ") {
      isBoxing = true;
    }
  }, false);

  document.addEventListener("keyup", (event) => {
    var key = event.key;
    var keyNum = +key;
    var isCtrlDown = event.ctrlKey;

    if (!isNaN(keyNum)) {
      if (isCtrlDown) {
        for (var i = 0; i < PIXEL_COUNT; i++) {
          for (var j = 0; j < PIXEL_COUNT; j++) {
            paintedPixels[i][j] = keyNum;
          }
        }
      } else if (key !== " ") {
        paintBrush = keyNum;
      }
    }

    switch (key) {
      case "p":
      case "P":
        isPaused = !isPaused;
        break;

      case "l":
      case "L":
        logPaintedPixels();
        break;

      case "Shift":
        isErasing = false;
        break;

      case " ":
        isBoxing = false;
        boxStart = null;
        break;
    }
  }, false);

  window.addEventListener("mousedown", (event) => {
    isPainting = true;

    if (isBoxing && boxStart === null) {
      boxStart = event;
    }
  });

  window.addEventListener("mousemove", (event) => paintFromEvent(event));

  window.addEventListener("mouseup", (event) => {
    paintFromEvent(event);
    isPainting = false;
    boxStart = null;
  });
};

function logPaintedPixels () {
  var data = [];
  for (var j = 0; j < PIXEL_COUNT; j++) {
    for (var i = 0; i < PIXEL_COUNT; i++) {
      data.push(paintedPixels[i][j]);
    }

    if (j < PIXEL_COUNT - 1) {
      data.push(",");
    }
  }

  var output = "[" + data.join("") + "]";
  console.log(output);
  copyGlyphData(output);
};

function copyGlyphData (glyphData) {
  var clipboard = document.createElement("input");
  clipboard.className = "clipboard";
  document.body.appendChild(clipboard);
  clipboard.value = glyphData;
  clipboard.select();
  document.execCommand("copy");
  document.body.removeChild(clipboard);
};

function onAnimationFrame (timestamp) {
  dt = timestamp - prevTimestamp;
  if (dt > MAX_TICK) {
    dt = MAX_TICK;
  } else if (dt < 0) {
    dt = 0;
  }

  if (isPaused) {
    dt = 0;
  }

  sortValue = -1;
  placementIndex = 0;
  lastRandomColor = { r: 0, g: 0, b: 0 };
  isFirstRandomColor = true;
  colorPoints.length = 0;
  weightShiftElapsed += dt;

  setSeed();
  rollRarity();
  startRender();

  var animCount = animations.length;
  for (var i = animCount - 1; i >= 0; i--) {
    animations[i](i);
  }

  prevTimestamp = timestamp;
  window.requestAnimationFrame(onAnimationFrame);
};

function mineForHashMatch () {
  console.log(`Mining for hash ...`);

  var attempts = 1;
  while (!isHashFound() && attempts < MAX_MINING_ATTEMPTS) {
    H = "";
    setSeed();
    rollRarity();
    attempts++;
  }

  if (attempts >= MAX_MINING_ATTEMPTS) {
    console.warn(`Exceeded limit! Try Again? Attempts: `, attempts);
  } else {
    console.log(`Success! Attempts: `, attempts);
  }
};

function isHashFound () {
  var isFound = true;
  var target = MINE_FOR_HASH;

  if (target.styleID !== undefined) {
    isFound = isFound && styleID === target.styleID;
  }

  if (target.elementID !== undefined) {
    isFound = isFound && elementID === target.elementID;
  }

  if (target.paletteID !== undefined) {
    isFound = isFound && paletteID === target.paletteID;
  }

  if (target.gravityID !== undefined) {
    isFound = isFound && gravityID === target.gravityID;
  }

  if (target.displayID !== undefined) {
    isFound = isFound && displayID === target.displayID;
  }

  if (target.colorPointCount !== undefined) {
    isFound = isFound && colorPointCount === target.colorPointCount;
  }

  if (target.speedID !== undefined) {
    isFound = isFound && speedID === target.speedID;
  }

  if (target.essenceID !== undefined) {
    isFound = isFound && essenceID === target.essenceID;
  }

  return isFound;
};

function setSeed () {
  if (!H && USE_RANDOM_HASH) {
    H = getRandomHash();
  }

  s = 0;
  t = 0;

  var S = Uint32Array.from([0,1,s=t=2,3].map(function (i) {
    return parseInt(H.substr(i*11+2,11),16);
  }));

  random = function () {
    return t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32;
  };
};

function rollRarity () {
  var speedData = chooseByWeight(SPEEDS);
  speedID = speedData.id;
  speed = speedData.speed;

  var elementData = chooseByWeight(ELEMENTS);
  elementID = elementData.id;

  var paletteData = chooseByWeight(elementData.palettes);
  paletteID = paletteData.id;

  var essenceData = chooseByWeight(elementData.essences);
  essenceID = essenceData.id;

  runeflux = floor(1000 * random());
  corruption = floor(1000 * random());
  pixelStick = corruption / 1000;
  DISTURBANCE_LO = 0.5 + 0.5 * runeflux / 1000;
  DISTURBANCE_MD = 1000 + 19000 * runeflux / 1000;
  DISTURBANCE_HI = 8 + 24 * runeflux / 1000;

  var gravityData = chooseByWeight(COLOR_GRAVITIES);
  gravityID = gravityData.id;

  if (gravity === null) {
    gravity = getAnimData();
    gravity.value = gravityData.value;
    gravity.minValue = gravityData.value / 2;
    gravity.maxValue = 2 * gravityData.value;
    gravity.duration = 1750 * (speed + 2);
    gravity.ease1 = easeInOutSine;
    gravity.ease2 = easeInOutSine;
  }

  var displayData = chooseByWeight(DISPLAYS);
  displayID = displayData.id;
  flipX = displayData.flipX || false;
  flipY = displayData.flipY || false;

  var styleData = chooseByWeight(STYLES);
  styleID = styleData.id;
  colorPointCounts = styleData.colorPointCounts || colorPointCounts;
  sortMethod = styleData.sortMethod || sortMethod;
  sortStepSize = styleData.sortStepSize || sortStepSize;

  var totalRarity = 0;
  var colorRoll = random();
  var colorRarities = COLOR_POINT_RARITIES[colorPointCounts.length];
  for (var i = 0; i < colorRarities.length; i++) {
    totalRarity += colorRarities[i];
    colorPointCount = colorPointCounts[i];
    if (colorRoll <= totalRarity) {
      break;
    }
  }

  placementCoords = BASE_COORDS[colorPointCount];
};

var imgData = null;
var upgradeDistortion = new Array(4 * PIXEL_COUNT * PIXEL_COUNT);

function startRender () {
  if (isFirstRender) {
    imgData = ctx.getImageData(0, 0, PIXEL_COUNT, PIXEL_COUNT);
    clearImageData(imgData.data);
    createEssence();
  }

  var data = imgData.data;
  var startTime = Date.now();
  setupColors();

  if (UPGRADED) {
    clearImageData(upgradeDistortion);
    applyEssence(upgradeDistortion);
  }

  drawColorPointsGradient(data);
  applyPaintBefore(data);

  if (UPGRADED) {
    applyUpgradeDistortion(data);
  } else {
    applyEssence(data);
  }

  applyPaintAfter(data);
  ctx.putImageData(imgData, 0, 0);

  var renderTime = Date.now() - startTime;
  if (renderTime >= 30) {
    // console.log("Render Time: ", renderTime);
  }

  isFirstRender = false;
};

function clearImageData (data) {
  var dataLength = data.length;
  for (var i = 0; i < dataLength; i++) {
    data[i] = (i + 1) % 4 === 0 ? 255 : 0;
  }
};

function setupColors () {
  var elementData = chooseByID(ELEMENTS, elementID);
  var paletteData = chooseByID(elementData.palettes, paletteID);
  var colors = paletteData.colors.slice();
  colors = shuffleArray(colors);

  weightShift.length = 0;
  weightShiftTotal = 0;
  for (var i = 0; i < colorPointCount; i++) {
    var pt = getColorPoint();
    placePoint(pt);
    pt.weight = pow(gravity.value, 5 - i);
    weightShift.push(pt.weight);
    weightShiftTotal += pt.weight;

    var index = i;
    while (index >= colors.length) {
      index -= colors.length;
    }

    if (index >= 0) {
      var color = colors[index];
      var offsetR = -5 + 10 * random();
      var offsetG = -5 + 10 * random();
      var offsetB = -5 + 10 * random();
      pt.r = max(0, min(255, color.r + offsetR));
      pt.g = max(0, min(255, color.g + offsetG));
      pt.b = max(0, min(255, color.b + offsetB));
    } else {
      setRandomColor(pt);
    }

    colorPoints.push(pt);
  }

  var minWeight = weightShift[colorPointCount - 1];
  var duration = 2000 * speed;
  weightShiftTotal -= colorPointCount * minWeight;

  for (var i = 0; i < colorPointCount; i++) {
    var pt = colorPoints[i];
    var elapsed = weightShiftElapsed + 0.5 * duration * i / (colorPointCount - 1);
    var pct = cos(TAU * (elapsed % duration) / duration);
    pt.weight = minWeight + pct * weightShiftTotal;
  }

  if (colorPointCount === 2) {
    var pt1 = colorPoints[0];
    var pt2 = colorPoints[1];
    while (true) {
      var dy = pt2.y - pt1.y;
      var dx = pt2.x - pt1.x;
      var slope = dy / (dx || 1);
      if (slope >= -1.2 && slope <= -0.8) {
        placementIndex = 0;
        placePoint(pt1);
        placePoint(pt2);
      } else {
        break;
      }
    }
  }

  if (isFirstRender) {
    console.log(`~~~`);
    console.log(`Element: ${elementID}`);
    console.log(`Palette: ${paletteID}`);
    console.log(`Colors: ${colorPointCount}`);
    console.log(`Speed: ${speedID}`);
    console.log(`Gravity: ${gravityID}`);
    console.log(`Style: ${styleID}`);
    console.log(`Essence: ${essenceID}`);
    console.log(`Display: ${displayID}`);
    console.log(`Runeflux: ${runeflux}`);
    console.log(`Corruption: ${corruption}`);
    console.log(`~~~`);
    console.log(`Points: `, colorPoints);
    console.log("Render Size: ", PIXEL_COUNT);
  }
};

function createEssence () {
  var elementData = chooseByID(ELEMENTS, elementID);
  var essenceData = chooseByID(elementData.essences, essenceID);
  var layers = essenceData.layers;
  var sharedStepConfig = essenceData.step;
  var sharedNoiseConfig = essenceData.noise;
  var sharedColor = essenceData.color;
  var colorChannelDefault = { offset: 0, range: 0 };

  for (var i = 0; i < layers.length; i++) {
    var layerConfig = layers[i];
    var stepConfig = layerConfig.step || sharedStepConfig;
    var noiseConfig = layerConfig.noise || sharedNoiseConfig;
    var colorConfig = layerConfig.color || sharedColor;
    var opacity = layerConfig.opacity;
    var a = colorConfig.a || colorChannelDefault;
    var r = colorConfig.r || a;
    var g = colorConfig.g || a;
    var b = colorConfig.b || a;
    var rOffset = r.offset || 0;
    var rRange = r.range || 0;
    var gOffset = g.offset || 0;
    var gRange = g.range || 0;
    var bOffset = b.offset || 0;
    var bRange = b.range || 0;

    var layer = {
      offsetX: 0,
      offsetY: 0,
      noiseOffset: 0,
      data: null,
      noise: null,
      noiseDepths: null,
      config: layerConfig,
      noiseConfig: noiseConfig,
      stepConfig: stepConfig
    };

    var dataLength = 4 * PIXEL_COUNT * PIXEL_COUNT;
    if (noiseConfig) {
      dataLength = PIXEL_COUNT * PIXEL_COUNT;
      if (stepConfig) {
        if (stepConfig.x > 0) {
          layer.offsetX = 100000000;
        }
        if (stepConfig.y > 0) {
          layer.offsetY = 100000000;
        }
      }

      var depth = noiseConfig.depth;
      layer.noise = createNoise(noiseConfig.scale, noiseConfig.exponent);
      layer.noiseDepths = [];
      for (var n = 0; n < depth; n++) {
        var fade;
        if (n < 0.5 * depth) {
          fade = 2 * n / depth;
        } else {
          var m = n - 0.5 * depth;
          fade = 1 - 2 * m / depth;
        }

        layer.noiseDepths.push({
          r: rOffset + random() * rRange,
          g: gOffset + random() * gRange,
          b: bOffset + random() * bRange,
          a: opacity * fade
        });
      }
    }

    layer.data = new Array(dataLength);

    if (noiseConfig) {
      for (var j = 0; j < dataLength; j++) {
        var y = floor(j / PIXEL_COUNT);
        var x = j - (y * PIXEL_COUNT);
        layer.data[j] = layer.noise.get(x, y);
      }
    } else {
      for (var j = 0; j < dataLength; j += 4) {
        layer.data[j + 0] = random() * (rOffset + random() * rRange);
        layer.data[j + 1] = random() * (gOffset + random() * gRange);
        layer.data[j + 2] = random() * (bOffset + random() * bRange);
      }
    }

    essenceLayers.push(layer);
  }
};

function applyEssence (data) {
  var dataLength = data.length;
  var essenceCount = essenceLayers.length;
  for (var i = 0; i < essenceCount; i++) {
    var layer = essenceLayers[i];
    var lD = layer.data;
    var layerNoise = layer.noise;
    var layerConfig = layer.config;
    var stepConfig = layer.stepConfig;
    var dx = stepConfig.x || 0;
    var dy = stepConfig.y || 0;

    layer.offsetX -= dt * dx;
    layer.offsetY -= dt * dy;

    if (layerNoise) {
      var noiseConfig = layer.noiseConfig;
      var noiseDepths = layer.noiseDepths;
      var depth = noiseConfig.depth || 2;
      var dn = noiseConfig.speed || 0;
      layer.noiseOffset += dt * dn;

      var layerOffsetNoise = layer.noiseOffset;
      if (layerOffsetNoise < 0) {
        layerOffsetNoise = depth + layerOffsetNoise % depth;
      } else if (layerOffsetNoise >= depth) {
        layerOffsetNoise %= depth;
      }

      for (var j = 0; j < dataLength; j += 4) {
        var k = floor(j / 4);
        var y = floor(k / PIXEL_COUNT);
        var x = floor(k - (y * PIXEL_COUNT)) + layer.offsetX;
        y += layer.offsetY;
        var noiseValue = layerNoise.get(x, y);
        var noiseIndexRaw = depth * noiseValue + layerOffsetNoise;
        var noiseIndexHi = ceil(noiseIndexRaw);
        var noiseIndexLo = floor(noiseIndexRaw);
        var noiseFinalHi = noiseDepths[noiseIndexHi % depth];
        var noiseFinalLo = noiseDepths[noiseIndexLo % depth];
        var pctLo = noiseConfig.noBlend ? 1 : 1 - (noiseIndexRaw - noiseIndexLo);
        var pctHi = noiseConfig.noBlend ? 0 : 1 - pctLo;
        var opLo = noiseFinalLo.a;
        var opHi = noiseFinalHi.a;
        data[j    ] += pctLo * noiseFinalLo.r * opLo + pctHi * noiseFinalHi.r * opHi;
        data[j + 1] += pctLo * noiseFinalLo.g * opLo + pctHi * noiseFinalHi.g * opHi;
        data[j + 2] += pctLo * noiseFinalLo.b * opLo + pctHi * noiseFinalHi.b * opHi;
      }
    } else {
      var lOX = layer.offsetX;
      var lOY = layer.offsetY;
      var opacity = layerConfig.opacity || 1;
      var static = layerConfig.static || 0;
      var base = 1 - static;

      var floorX = floor(lOX);
      var floorY = floor(lOY);
      var ceilX = ceil(lOX);
      var ceilY = ceil(lOY);

      var floorIndexX = 4 * floorX;
      var floorIndexY = 4 * PIXEL_COUNT * floorY;
      var ceilIndexX = 4 * ceilX;
      var ceilIndexY = 4 * PIXEL_COUNT * ceilY;

      var percentFloorX = 1 - (lOX - floorX);
      var percentFloorY = 1 - (lOY - floorY);
      var percentCeilX = 1 - percentFloorX;
      var percentCeilY = 1 - percentFloorY;

      var p1 = percentFloorX * percentFloorY;
      var p2 = percentFloorX * percentCeilY;
      var p3 = percentCeilX * percentFloorY;
      var p4 = percentCeilX * percentCeilY;

      var offsetIndex1 = floorIndexX + floorIndexY;
      if (offsetIndex1 < 0) {
        offsetIndex1 = dataLength + offsetIndex1 % dataLength;
      } else if (offsetIndex1 >= dataLength) {
        offsetIndex1 %= dataLength;
      }

      var offsetIndex2 = floorIndexX + ceilIndexY;
      if (offsetIndex2 < 0) {
        offsetIndex2 = dataLength + offsetIndex2 % dataLength;
      } else if (offsetIndex2 >= dataLength) {
        offsetIndex2 %= dataLength;
      }

      var offsetIndex3 = ceilIndexX + floorIndexY;
      if (offsetIndex3 < 0) {
        offsetIndex3 = dataLength + offsetIndex3 % dataLength;
      } else if (offsetIndex3 >= dataLength) {
        offsetIndex3 %= dataLength;
      }

      var offsetIndex4 = ceilIndexX + ceilIndexY;
      if (offsetIndex4 < 0) {
        offsetIndex4 = dataLength + offsetIndex4 % dataLength;
      } else if (offsetIndex4 >= dataLength) {
        offsetIndex4 %= dataLength;
      }

      for (var j = 0; j < dataLength; j += 4) {
        var i1 = (j + offsetIndex1) % dataLength;
        var i2 = (j + offsetIndex2) % dataLength;
        var i3 = (j + offsetIndex3) % dataLength;
        var i4 = (j + offsetIndex4) % dataLength;
        var o1 = (base + static * random()) * opacity;
        var o2 = (base + static * random()) * opacity;
        var o3 = (base + static * random()) * opacity;
        data[j    ] += o1 * (p1 * lD[i1    ] + p2 * lD[i2    ] + p3 * lD[i3    ] + p4 * lD[i4    ]);
        data[j + 1] += o2 * (p1 * lD[i1 + 1] + p2 * lD[i2 + 1] + p3 * lD[i3 + 1] + p4 * lD[i4 + 1]);
        data[j + 2] += o3 * (p1 * lD[i1 + 2] + p2 * lD[i2 + 2] + p3 * lD[i3 + 2] + p4 * lD[i4 + 2]);
      }
    }
  }
};

function applyUpgradeDistortion (data) {
  var dataLength = data.length;
  var opacity = 1 - pixelStick;
  for (var i = 0; i < dataLength; i += 4) {
    var i0 = i, i1 = i + 1, i2 = i + 2;
    data[i0] += opacity * upgradeDistortion[i0];
    data[i1] += opacity * upgradeDistortion[i1];
    data[i2] += opacity * upgradeDistortion[i2];
  }
};

function applyPaintBefore (data) {
  if (runeflux >= 800) {
    var opacity = 0.5 + 0.5 * (runeflux - 800) / 199;
    applyPaint(data, opacity);
  }
};

function applyPaintAfter (data) {
  applyPaint(data, 1);
};

function applyPaint (data, opacity) {
  var dataLength = data.length;
  for (var k = 0; k < dataLength; k += 4) {
    var l = floor(k / 4);
    var y = floor(l / PIXEL_COUNT);
    var x = floor(l - (y * PIXEL_COUNT));
    var pix = +paintedPixels[x][y];
    if (!pix) { continue; }

    var k0 = k, k1 = k + 1, k2 = k + 2;
    var r = data[k0];
    var g = data[k1];
    var b = data[k2];
    var ir = 255 - r;
    var ig = 255 - g;
    var ib = 255 - b;
    var ip = opacity * pix / 9;
    var p = 1 - ip;

    data[k0] = p * r + ip * ir;
    data[k1] = p * g + ip * ig;
    data[k2] = p * b + ip * ib;
  }
};

function drawColorPointsGradient (data) {
  var x = 0;
  var y = 0;
  while (x < PIXEL_COUNT) {
    y = 0;
    while (y < PIXEL_COUNT) {
      setQuadGradientColorForPoint(data, colorPoints, x, y);
      y++;
    }
    x++;
  }
};

function getColorPoint () {
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

function placePoint (pt) {
  var coords = placementCoords[placementIndex++];
  if (placementIndex >= placementCoords.length) {
    placementIndex = 0;
  }

  var offsetX = -0.125 + 0.25 * random();
  var offsetY = -0.125 + 0.25 * random();
  pt.x = (coords.x + offsetX) * PIXEL_COUNT;
  pt.y = (coords.y + offsetY) * PIXEL_COUNT;
};

function setRandomColor (pt) {
  if (isFirstRandomColor) {
    pt.r = 255 * random();
    pt.g = 255 * random();
    pt.b = 255 * random();
  } else {
    var delta = 60 + random() * 30;
    var channels = COLOR_CHANNELS.slice();
    while (channels.length) {
      var index = floor(random() * channels.length);
      var channel = channels.splice(index, 1)[0];
      var value = lastRandomColor[channel];

      if (value - delta < 0) {
        pt[channel] = value + delta;
      } else if (value + delta > 255) {
        pt[channel] = value - delta;
      } else {
        var directionRoll = random();
        if (directionRoll <= 0.5) {
          pt[channel] = value + delta;
        } else {
          pt[channel] = value - delta;
        }
      }

      delta /= 2;
    }
  }

  lastRandomColor.r = pt.r;
  lastRandomColor.g = pt.g;
  lastRandomColor.b = pt.b;
  isFirstRandomColor = false;
};

function setQuadGradientColorForPoint (data, pts, x, y) {
  sortForClosestColorPoints(pts, x, y);

  var newPts = [];
  var length = pts.length;
  for (var i = 0; i < length; i += 2) {
    if (i === length - 1) {
      newPts.push(pts[i]);
    } else {
      newPts.push(smashColors(pts[i], pts[i + 1]));
    }
  }

  if (newPts.length === 1) {
    if (flipX) { x = PIXEL_COUNT - x - 1; }
    if (flipY) { y = PIXEL_COUNT - y - 1; }

    var col = x * 4;
    var row = y * PIXEL_COUNT * 4;
    var index = row + col;
    var color = newPts[0];
    if (UPGRADED) {
      var pxStick = pixelStick;
      if (+paintedPixels[x][y] > 0) {
        pxStick = 0;
      }
      data[index + 0] = (1 - pxStick) * color.r + pxStick * data[index + 0];
      data[index + 1] = (1 - pxStick) * color.g + pxStick * data[index + 1];
      data[index + 2] = (1 - pxStick) * color.b + pxStick * data[index + 2];
    } else {
      data[index + 0] = color.r;
      data[index + 1] = color.g;
      data[index + 2] = color.b;
    }
  } else {
    setQuadGradientColorForPoint(data, newPts, x, y);
  }
};

var TAU_SPLIT = TAU / 127.5;
var DISTURBANCE_LO;// = 0.5 + 0.5 * runeflux / 1000;
var DISTURBANCE_MD;// = 1000 + 19000 * runeflux / 1000;
var DISTURBANCE_HI;// = 8 + 24 * runeflux / 1000;
function sortForClosestColorPoints (pts, x, y) {
  var length = pts.length;

  if (UPGRADED) {
    var testX = x;
    var testY = y;
    if (flipX) { testX = PIXEL_COUNT - x - 1; }
    if (flipY) { testY = PIXEL_COUNT - y - 1; }

    var col = testX * 4;
    var row = testY * PIXEL_COUNT * 4;
    var index = row + col;
    var rx = 3;
    var gx = 3;
    var bx = 3;
    var rp = upgradeDistortion[index    ] - 127.5;
    var gp = upgradeDistortion[index + 1] - 127.5;
    var bp = upgradeDistortion[index + 2] - 127.5;

    if (corruption < 150) {
      rp = abs(rp) * rp * DISTURBANCE_LO;
      gp = abs(gp) * gp * DISTURBANCE_LO;
      bp = abs(bp) * bp * DISTURBANCE_LO;
    } else if (corruption < 850) {
      rp = DISTURBANCE_MD * cos(TAU_SPLIT * rp);
      gp = DISTURBANCE_MD * cos(TAU_SPLIT * gp);
      bp = DISTURBANCE_MD * cos(TAU_SPLIT * bp);
    } else {
      rx = 1 + floor(abs((rp + 127.5) / DISTURBANCE_HI));
      gx = 1 + floor(abs((gp + 127.5) / DISTURBANCE_HI));
      bx = 1 + floor(abs((bp + 127.5) / DISTURBANCE_HI));
      rp = 0;
      gp = 0;
      bp = 0;
    }

    for (var i = 0; i < length; i++) {
      var pt = pts[i];
      var px = pt.x, py = pt.y;
      pt.distance = getDistanceExp(x, y, px, py, 3);
      pt.rd = getDistanceExp(x, y, px, py, rx) + rp;
      pt.gd = getDistanceExp(x, y, px, py, gx) + gp;
      pt.bd = getDistanceExp(x, y, px, py, bx) + bp;
    }
  } else {
    for (var i = 0; i < length; i++) {
      var pt = pts[i];
      pt.distance = getDistanceExp(x, y, pt.x, pt.y, 3);
    }
  }

  pts.sort(sortMethod);
};

function getDistanceExp (x1, y1, x2, y2, p) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return pow(dx, p) + pow(dy, p);
};

function smashColors (c1, c2) {
  var c3 = getColorPoint();

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

  if (UPGRADED) {
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

function createNoise (scale, exponent) {
  scale = scale || 1;
  exponent = exponent || 1;

  var perm = [];
  var dot = function (g, x, y) { return x * g[0] + y * g[1]; };
  var SQRT_3 = sqrt(3);
  var GRAD_3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];

  var p = [];
  for (var i = 0; i < 256; i++) {
    p[i] = (256 * random()) | 0;
  }

  for (var i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  var noiseObj = {};
  noiseObj.get = function (x, y) {
    x *= scale;
    y *= scale;

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

    var noise = (70 * (n0 + n1 + n2) + 1) / 2;
    if (exponent !== 1) {
      noise = pow(noise, exponent);
    }
    return noise;
  };

  return noiseObj;
};

initialize();
