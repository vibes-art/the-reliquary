var fs = require('fs');
var { Image, createImageData, createCanvas } = require('canvas');
const { expect } = require("chai");
const { ethers } = require("hardhat");

var abiCoder = ethers.utils.defaultAbiCoder;

var owner;
var other1;
var other2;
var signers;
var trUtils;
var trKeys;
var trColors;
var trRolls;
var trScript;
var base64;
var trMeta;
var trMeta2;
var arMain;
var gArt;
var gColorData;
var gVibes;
var oVibes;

var TOTAL_SUPPLY = 1111;
var CURIO_SUPPLY = 64;
var RELIC_SUPPLY = TOTAL_SUPPLY - CURIO_SUPPLY;
var RUNIC_SEAL = "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3";
var NEW_COLORS = [
  "0",
  "16777215",
  "00000001",
  "10000000",
  "16777215",
  "0"
];
var GLYPH = [
  "0",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "0123456789012345678901234567890123456789012345678901234567890123",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  "0"
];

describe("TheReliquary", function () {

  beforeEach(async function () {
    signers = await ethers.getSigners();
    [owner, other1, other2] = signers;

    const Art = await ethers.getContractFactory("contracts/Vibes.sol:Art");
    gArt = await Art.deploy();

    const ColorData = await ethers.getContractFactory("contracts/Vibes.sol:ColorData");
    gColorData = await ColorData.deploy();

    const Vibes = await ethers.getContractFactory("contracts/Vibes.sol:Vibes", {
      libraries: {
        Art: gArt.address,
        ColorData: gColorData.address
      }
    });
    gVibes = await Vibes.deploy();

    const OpenVibes = await ethers.getContractFactory("OpenVibes");
    oVibes = await OpenVibes.deploy();

    const TRUtils = await ethers.getContractFactory("TRUtils");
    trUtils = await TRUtils.deploy();

    const TRKeys = await ethers.getContractFactory("TRKeys");
    trKeys = await TRKeys.deploy();

    const TRGrailNature = await ethers.getContractFactory("TRGrailNature");
    trGrailNature = await TRGrailNature.deploy();

    const TRGrailLight = await ethers.getContractFactory("TRGrailLight");
    trGrailLight = await TRGrailLight.deploy();

    const TRGrailWater = await ethers.getContractFactory("TRGrailWater");
    trGrailWater = await TRGrailWater.deploy();

    const TRGrailEarth = await ethers.getContractFactory("TRGrailEarth");
    trGrailEarth = await TRGrailEarth.deploy();

    const TRGrailWind = await ethers.getContractFactory("TRGrailWind");
    trGrailWind = await TRGrailWind.deploy();

    const TRGrailArcane = await ethers.getContractFactory("TRGrailArcane");
    trGrailArcane = await TRGrailArcane.deploy();

    const TRGrailShadow = await ethers.getContractFactory("TRGrailShadow");
    trGrailShadow = await TRGrailShadow.deploy();

    const TRGrailFire = await ethers.getContractFactory("TRGrailFire");
    trGrailFire = await TRGrailFire.deploy();

    const TRColors = await ethers.getContractFactory("TRColors", {
      libraries: {
        TRUtils: trUtils.address
      }
    });
    trColors = await TRColors.deploy();

    const TRRolls = await ethers.getContractFactory("TRRolls", {
      libraries: {
        TRColors: trColors.address,
        TRUtils: trUtils.address
      }
    });
    trRolls = await TRRolls.deploy();
    await trRolls.deployed();
    await trRolls.setGrailContract(1, trGrailNature.address);
    await trRolls.setGrailContract(2, trGrailLight.address);
    await trRolls.setGrailContract(3, trGrailWater.address);
    await trRolls.setGrailContract(4, trGrailEarth.address);
    await trRolls.setGrailContract(5, trGrailWind.address);
    await trRolls.setGrailContract(6, trGrailArcane.address);
    await trRolls.setGrailContract(7, trGrailShadow.address);
    await trRolls.setGrailContract(8, trGrailFire.address);

    const TRScript = await ethers.getContractFactory("TRScript");
    trScript = await TRScript.deploy();

    const Base64 = await ethers.getContractFactory("Base64");
    base64 = await Base64.deploy();

    const TRMeta = await ethers.getContractFactory("TRMeta", {
      libraries: {
        TRScript: trScript.address,
        TRUtils: trUtils.address
      }
    });
    trMeta = await TRMeta.deploy();
    await trMeta.deployed();
    await trMeta.setRollsContract(trRolls.address);

    const TheReliquary = await ethers.getContractFactory("TheReliquary", {
      libraries: {
        TRUtils: trUtils.address
      }
    });

    arMain = await TheReliquary.deploy();
    await arMain.deployed();
  });

  async function saveScript(tokenId) {
    let tokenScript = await arMain.tokenScript(tokenId);
    await fs.writeFile(`./output/${tokenId}.html`, tokenScript, function (err) {
      if (err) {
        console.log(tokenId, err);
      }
    });

    await savePNG(tokenId, tokenScript);
  };

  async function savePNG(tokenId, tokenScript) {
    var renderSize = 64;
    var fullSize = 10 * renderSize;
    var cnv = null;
    var cnv2 = createCanvas(fullSize, fullSize)
    var rAF = null;
    var window = {
      innerWidth: renderSize,
      innerHeight: renderSize,
      addEventListener: function () {},
      removeEventListener: function () {},
      requestAnimationFrame: function (cb) {
        rAF = cb;
      }
    };

    var document = {
      body: {
        clientWidth: renderSize,
        clientHeight: renderSize,
        appendChild: function () {}
      },
      createElement: function (name) {
        if (name === "canvas") {
          var retCanvas = createCanvas(renderSize, renderSize);
          retCanvas.style = {};
          cnv = retCanvas;
          var ctx = cnv.getContext('2d');
          ctx.antialias = 'none';
          return retCanvas;
        } else {
          return {
            style: {},
            addEventListener: function () {}
          };
        }
      },
      addEventListener: function () {}
    };

    tokenScript = tokenScript.replace('<!doctype html><html><head><script>', '');
    tokenScript = tokenScript.replace('</script></head><body></body></html>', '');
    tokenScript = tokenScript.replace(
      'c.innerText=`canvas { width: ${b}px; height: ${b}px; image-rendering: -moz-crisp-edges; image-rendering: -webkit-crisp-edges; image-rendering: pixelated; image-rendering: crisp-edges; }`,',
      'c.width=b,c.height=b,'
    );

    eval(tokenScript);
    window.onload();
    rAF(Date.now());
    rAF(Date.now() + 50);
    rAF(Date.now() + 100);
    rAF(Date.now() + 150);
    rAF(Date.now() + 200);
    rAF(Date.now() + 250);
    rAF(Date.now() + 300);
    rAF(Date.now() + 350);
    rAF(Date.now() + 400);
    rAF(Date.now() + 450);
    rAF(Date.now() + 500);

    await new Promise((resolve, reject) => {
      var ctx = cnv.getContext('2d');
      ctx.antialias = 'none';
      var imgData = ctx.getImageData(0, 0, renderSize, renderSize);
      var data = imgData.data;

      var ctx2 = cnv2.getContext('2d');
      ctx2.antialias = 'none';
      var imgData2 = createImageData(fullSize, fullSize);
      var data2 = imgData2.data;

      for (var i = 0; i < data2.length; i += 4) {
        var j = Math.floor(i / 4);
        var y = Math.floor(j / fullSize);
        var x = Math.floor(j - (y * fullSize));
        var x0 = Math.floor(x / 10);
        var y0 = Math.floor(y / 10);
        var col = x0 * 4;
        var row = y0 * renderSize * 4;
        var index = row + col;

        data2[i + 0] = data[index + 0];
        data2[i + 1] = data[index + 1];
        data2[i + 2] = data[index + 2];
        data2[i + 3] = 255;
      }
      ctx2.putImageData(imgData2, 0, 0);

      saveImage(tokenId, cnv2, resolve);
    });
    console.log(`      saved image ${tokenId} ...`);
  };

  function saveImage (tokenId, imgCanvas, cb) {
    var out = fs.createWriteStream(`./output/${tokenId}.png`);
    var stream = imgCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      cb();
    });
  };

  async function saveJSON(tokenId) {
    var tokenURI = await arMain.tokenURI(tokenId);
    // console.log("        tokenURI:", tokenURI);

    var buf = Buffer.from(tokenURI.split(",")[1], 'base64');
    var json = buf.toString();
    var jsonObj = JSON.parse(json);
    // for (var prop in jsonObj) {
    //   console.log(prop + ": ", jsonObj[prop]);
    // }

    await fs.writeFile(`./output/${tokenId}.json`, json, function (err) {
      if (err) {
        console.log(tokenId, err);
      }
    });
  };

  async function logToken(tokenId) {
    console.log("");
    console.log(`      token #${tokenId}`);
    console.log("        mana:", await arMain.getMana(tokenId));
    console.log("        element:", await arMain.getElement(tokenId));
    var colorCount = await arMain.getColorCount(tokenId);
    console.log("        colors:", +colorCount);
    for (var i = 0; i < +colorCount; i++) {
      console.log(`          color ${(i+1)}:`, await arMain.getColorByIndex(tokenId, i));
    }
    console.log("        hash:", await arMain.getRuneHash(tokenId));
    // console.log("        tokenScript:", await arMain.tokenScript(tokenId));
    await trMeta.setAnimationURL('');
    await saveJSON(tokenId);
    await saveScript(tokenId);
    console.log("");
  };

  // one signer moves thru the divinity quest
  async function divinityQuest(signer, revert, logGas) {
    if (revert === "OutOfCurios()") {
      await expect(arMain.connect(signer).whisperRunicSeal(RUNIC_SEAL))
        .to.be.revertedWith(revert);
      return;
    }

    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(0);
    await arMain.connect(signer).whisperRunicSeal(RUNIC_SEAL);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(1);

    blockNumber = await ethers.provider.getBlockNumber();
    block = await ethers.provider.getBlock(blockNumber);
    element = await arMain.detectElementals(block.hash);
    weakness = await arMain.detectElementalWeakness(element);
    await arMain.connect(signer).challengeElementalGuardians(weakness);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(2);

    var walletDemon = await arMain.detectDemons(signer.address);
    var walletWeakness = await arMain.detectElementalWeakness(walletDemon);
    await arMain.connect(signer).challengeInnerDemon(walletDemon, walletWeakness);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(3);

    if (revert) {
      await expect(arMain.connect(signer).mintDivineCurio({ value: ethers.utils.parseEther("0.08") }))
        .to.be.revertedWith(revert);
    } else {
      if (logGas) {
        await arMain.connect(signer).mintDivineCurio({ value: ethers.utils.parseEther("0.08") })
          .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
          .then(rt => console.log("      curio gas:", +rt.gasUsed));
      } else {
        await arMain.connect(signer).mintDivineCurio({ value: ethers.utils.parseEther("0.08") });
      }

      expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(4);
    }
  };

  // one signer moves almost thru the divinity quest
  async function divinityQuestPartial(signer) {
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(0);
    await arMain.connect(signer).whisperRunicSeal(RUNIC_SEAL);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(1);

    blockNumber = await ethers.provider.getBlockNumber();
    block = await ethers.provider.getBlock(blockNumber);
    element = await arMain.detectElementals(block.hash);
    weakness = await arMain.detectElementalWeakness(element);
    await arMain.connect(signer).challengeElementalGuardians(weakness);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(2);

    var walletDemon = await arMain.detectDemons(signer.address);
    var walletWeakness = await arMain.detectElementalWeakness(walletDemon);
    await arMain.connect(signer).challengeInnerDemon(walletDemon, walletWeakness);
    expect((await arMain.adventurers(signer.address)).currentChamber).to.equal(3);
  };

  var secretsRevealed = 0;
  async function studyOwnedTokens(signer) {
    var tokenCount = await arMain.connect(signer).balanceOf(signer.address);
    for (var i = 100; i < tokenCount; i++) {
      if (secretsRevealed < 128) {
        await arMain.connect(signer).seekDivineKnowledge(i);
      } else {
        await expect(arMain.connect(signer).seekDivineKnowledge(i))
          .to.be.revertedWith("NoSecretsLeftToReveal()");
        break;
      }
      secretsRevealed++;
    }
  };

  it("the runic seal is sacred", async function () {
    // other people cannot inscribe
    await expect(arMain.connect(other1).inscribeRunicSeal("abc"))
      .to.be.revertedWith("Ownable: caller is not the owner");

    // other people cannot whisper before owner inscribes
    await expect(arMain.connect(other1).whisperRunicSeal(""))
      .to.be.revertedWith("ReliquaryNotDiscovered()");

    // other people cannot challenge before owner inscribes
    await expect(arMain.connect(other1).challengeElementalGuardians("Fire"))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // the runic seal cannot be empty
    await expect(arMain.inscribeRunicSeal(""))
      .to.be.revertedWith("MissingInscription()");

    // only the owner can inscribe
    await arMain.inscribeRunicSeal("abc");

    // owner can only inscribe once
    await expect(arMain.inscribeRunicSeal("def"))
      .to.be.revertedWith("ReliquaryAlreadySealed()");

    // other people can fail the whisper
    await expect(arMain.connect(other1).whisperRunicSeal("abcd"))
      .to.be.revertedWith("IncorrectWhispers()");

    // other people can pass the whisper
    await arMain.connect(other1).whisperRunicSeal("abc");
    expect((await arMain.adventurers(other1.address)).currentChamber).to.equal(1);

    // other people cannot whisper again after moving forward
    await expect(arMain.connect(other1).whisperRunicSeal("abc"))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");
  });

  it("the divinity quest is sacred", async function () {
    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      inscribe gas:", +rt.gasUsed));

    // other whispers
    await arMain.connect(other1).whisperRunicSeal(RUNIC_SEAL)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      whisper gas:", +rt.gasUsed));

    // PROCEED TO RELIQUARY_CHAMBER_GUARDIANS_HALL

    // can't challenge imner demon yet
    await expect(arMain.connect(other1).challengeInnerDemon("Fire", "Water"))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // can't make up an element
    await expect(arMain.connect(other1).challengeElementalGuardians("blah"))
      .to.be.revertedWith("IncorrectElementalWeakness()");

    // the wrong element doesn't work
    var blockNumber = await ethers.provider.getBlockNumber();
    var block = await ethers.provider.getBlock(blockNumber);
    var element = await arMain.detectElementals(block.hash);
    var weakness = await arMain.detectElementalWeakness(element);
    // console.log("      elemental fail:", element, weakness, "   ", blockNumber, block.hash);
    if (weakness === 'Fire') {
      await expect(arMain.connect(other1).challengeElementalGuardians("Water"))
        .to.be.revertedWith("IncorrectElementalWeakness()");
    } else {
      await expect(arMain.connect(other1).challengeElementalGuardians("Fire"))
        .to.be.revertedWith("IncorrectElementalWeakness()");
    }

    // the right element does work
    blockNumber = await ethers.provider.getBlockNumber();
    block = await ethers.provider.getBlock(blockNumber);
    element = await arMain.detectElementals(block.hash);
    weakness = await arMain.detectElementalWeakness(element);
    // console.log("      elemental pass:", element, weakness, "   ", blockNumber, block.hash);
    await arMain.connect(other1).challengeElementalGuardians(weakness)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      elem gas:", +rt.gasUsed));
    expect((await arMain.adventurers(other1.address)).currentChamber).to.equal(2);

    // PROCEED TO RELIQUARY_CHAMBER_INNER_SANCTUM

    // must identify the wallet demon
    var walletDemon = await arMain.detectDemons(other1.address);
    var walletWeakness = await arMain.detectElementalWeakness(walletDemon);
    // console.log("      inner demon:   ", walletDemon, walletWeakness, "   ", other1.address);

    // can't challenge again
    await expect(arMain.connect(other1).challengeElementalGuardians(weakness))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // can't mint divine curio yet
    await expect(arMain.connect(other1).mintDivineCurio())
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // can't make up a demon element
    await expect(arMain.connect(other1).challengeInnerDemon("blah", walletWeakness))
      .to.be.revertedWith("IncorrectInnerDemonElement()");

    // can't make up an attack element
    await expect(arMain.connect(other1).challengeInnerDemon(walletDemon, ""))
      .to.be.revertedWith("IncorrectElementalWeakness()");

    if (walletDemon === 'Fire') {
      await expect(arMain.connect(other1).challengeInnerDemon("Water", "Fire"))
        .to.be.revertedWith("IncorrectInnerDemonElement()");
    } else {
      await expect(arMain.connect(other1).challengeInnerDemon("Fire", "Water"))
        .to.be.revertedWith("IncorrectInnerDemonElement()");
    }

    // must identify the wallet demon's weakness
    await expect(arMain.connect(other1).challengeInnerDemon(walletDemon, walletDemon))
      .to.be.revertedWith("IncorrectElementalWeakness()");

    // pass the inner demon
    await arMain.connect(other1).challengeInnerDemon(walletDemon, walletWeakness)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      demon gas:", +rt.gasUsed));
    expect((await arMain.adventurers(other1.address)).currentChamber).to.equal(3);

    // PROCEED TO RELIQUARY_CHAMBER_DIVINITYS_END

    // can't challenge again
    await expect(arMain.connect(other1).challengeInnerDemon(walletDemon, walletWeakness))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // tithe must be correct
    await expect(arMain.connect(other1).mintDivineCurio({ value: ethers.utils.parseEther("0.07") }))
      .to.be.revertedWith("NotEnoughAether()");

    // mint a divine curio
    expect((await arMain.relics(1))[2]).to.equal(false);
    await arMain.connect(other1).mintDivineCurio({ value: ethers.utils.parseEther("0.08") });
    expect((await arMain.adventurers(other1.address)).currentChamber).to.equal(4);
    expect(await arMain.totalSupply()).to.equal(1);
    expect(await arMain.balanceOf(other1.address)).to.equal(1);
    expect((await arMain.relics(1))[2]).to.equal(true);
    expect(await arMain.getMana(1)).to.equal(50);

    // test mana generation
    await new Promise(async (resolve, reject) => {
      var mana = await arMain.getMana(1);
      expect(mana).to.equal(50);
      console.log("      mana start:", mana);
      await arMain.provider.send("evm_increaseTime", [31536000]);
      await arMain.provider.send("evm_mine");
      mana = await arMain.getMana(1);
      expect(mana).to.equal(150);
      console.log("      mana 1 yr later:", mana);
      resolve();
    });

    // PROCEED TO RELIQUARY_CHAMBER_CHAMPIONS_VAULT

    // can't mint again
    await expect(arMain.connect(other1).mintDivineCurio({ value: ethers.utils.parseEther("0.08") }))
      .to.be.revertedWith("DivinityQuestProgressionMismatch()");

    // can't steal someone elses knowledge
    await expect(arMain.connect(other2).seekDivineKnowledge(1))
      .to.be.revertedWith("NotEntrustedOrInYourPossession()");

    // find knowledge
    expect((await arMain.relics(1))[3]).to.equal(false);
    await arMain.connect(other1).seekDivineKnowledge(1)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      secret gas:", +rt.gasUsed));
    expect(await arMain.getMana(1)).to.equal(200);
    expect((await arMain.relics(1))[3]).to.equal(true);

    // once per token
    await expect(arMain.connect(other1).seekDivineKnowledge(1))
      .to.be.revertedWith("RelicAlreadyWellStudied()");

    // MISC

    // elemental weaknesses
    expect(await arMain.detectElementalWeakness("Nature")).to.equal("Fire");
    expect(await arMain.detectElementalWeakness("Fire")).to.equal("Water");
    expect(await arMain.detectElementalWeakness("Water")).to.equal("Wind");
    expect(await arMain.detectElementalWeakness("Wind")).to.equal("Earth");
    expect(await arMain.detectElementalWeakness("Earth")).to.equal("Nature");
    expect(await arMain.detectElementalWeakness("Shadow")).to.equal("Light");
    expect(await arMain.detectElementalWeakness("Light")).to.equal("Arcane");
    expect(await arMain.detectElementalWeakness("Arcane")).to.equal("Shadow");

    // can't steal mana
    await expect(arMain.connect(other2).consumeMana(1, 100))
      .to.be.revertedWith("NotEntrustedOrInYourPossession()");

    // not enough mana
    await expect(arMain.connect(other1).consumeMana(1, 225))
      .to.be.revertedWith("NotEnoughMana()");

    // not a token
    await expect(arMain.connect(other1).consumeMana(2, 0))
      .to.be.revertedWith("OwnerQueryForNonexistentToken()");

    // can't steal someone else's token
    await expect(arMain.connect(other2).transferFrom(other1.address, other2.address, 1))
      .to.be.revertedWith("TransferCallerNotOwnerNorApproved()");

    // valid transfer halves mana
    expect(await arMain.getMana(1)).to.equal(200);
    expect(await arMain.balanceOf(other1.address)).to.equal(1);
    expect(await arMain.balanceOf(other2.address)).to.equal(0);
    await arMain.connect(other1).transferFrom(other1.address, other2.address, 1)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      xfer gas:", +rt.gasUsed));
    expect(await arMain.balanceOf(other1.address)).to.equal(0);
    expect(await arMain.balanceOf(other2.address)).to.equal(1);
    expect(await arMain.getMana(1)).to.equal(100);

    // consume mana
    expect(await arMain.getMana(1)).to.equal(100);
    await arMain.connect(other2).consumeMana(1, 50)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      mana gas:", +rt.gasUsed));
    expect(await arMain.getMana(1)).to.equal(50);

    // we mint 1 successfully
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      mint gas:", +rt.gasUsed));

    // we mint 10 successfully
    await arMain.connect(other1).mint(10, { value: ethers.utils.parseEther("1.5") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      mint 10 gas:", +rt.gasUsed));

    await divinityQuest(other2, "", true);
  });

  it("public mint is fresh", async function () {
    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // we can't mint early
    await expect(arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") }))
      .to.be.revertedWith("ReliquaryNotDiscovered()");

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL);

    // we start at 0
    expect(await arMain.totalSupply()).to.equal(0);

    // we can't mint too many
    await expect(arMain.connect(other1).mint(11, { value: ethers.utils.parseEther("1.65") }))
      .to.be.revertedWith("UnableToCarrySoManyAtOnce()");

    // we can't mint for free
    await expect(arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0") }))
      .to.be.revertedWith("NotEnoughAether()");

    // we can't mint for cheap
    await expect(arMain.connect(other1).mint(2, { value: ethers.utils.parseEther("0.29") }))
      .to.be.revertedWith("NotEnoughAether()");

    // estimate gas to mint
    // var gas = await arMain.estimateGas.mint(1, { value: ethers.utils.parseEther("0.15") });
    // console.log("      estimated mint gas:", +gas);

    // we mint 1 successfully
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    expect(await arMain.totalSupply()).to.equal(1);

    // we mint 2 successfully
    await arMain.connect(other1).mint(2, { value: ethers.utils.parseEther("0.3") });
    expect(await arMain.totalSupply()).to.equal(3);

    // we mint 3 successfully
    await arMain.connect(other1).mint(3, { value: ethers.utils.parseEther("0.45") });
    expect(await arMain.totalSupply()).to.equal(6);

    // we mint 10 successfully
    await arMain.connect(other1).mint(10, { value: ethers.utils.parseEther("1.5") });
    expect(await arMain.totalSupply()).to.equal(16);

    // we mint 10 successfully
    await arMain.connect(other1).mint(10, { value: ethers.utils.parseEther("1.5") });
    expect(await arMain.totalSupply()).to.equal(26);

    // partially complete the quest for these users
    await divinityQuestPartial(signers[CURIO_SUPPLY + 1]);
    await divinityQuestPartial(signers[CURIO_SUPPLY + 2]);

    // we mint all curios
    for (var i = 0; i < CURIO_SUPPLY; i++) {
      await divinityQuest(signers[i], "", false);
    }
    expect(await arMain.totalSupply()).to.equal(26 + CURIO_SUPPLY);

    // the partially complete guy cannot mint
    await expect(arMain.connect(signers[CURIO_SUPPLY + 2])
      .mintDivineCurio({ value: ethers.utils.parseEther("0.08") }))
      .to.be.revertedWith("OutOfCurios()");

    // out of curios
    await divinityQuest(signers[CURIO_SUPPLY], "OutOfCurios()", false);

    // we mint the remaining supply in steps of 10
    var i = 26 + CURIO_SUPPLY;
    while (i <= TOTAL_SUPPLY - 10) {
      i += 10;
      await arMain.connect(other1).mint(10, { value: ethers.utils.parseEther("1.5") });
      expect(await arMain.totalSupply()).to.equal(i);
    }

    // mint the remaining supply
    while (i < TOTAL_SUPPLY) {
      i += 1;
      await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
      expect(await arMain.totalSupply()).to.equal(i);
    }

    // no grails revealed yet
    i = 1;
    while (i <= TOTAL_SUPPLY) {
      var grailId = await arMain.getGrailId(i);
      if (grailId > 0) {
        console.log("error early grail:", i, grailId);
      }
      expect(grailId).to.equal(0);
      i += 1;
    }

    await studyOwnedTokens(other1);

    // we can't mint after sold out
    await expect(arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") }))
      .to.be.revertedWith("OutOfRelics()");

    // the other partially complete guy cannot mint either
    await expect(arMain.connect(signers[CURIO_SUPPLY + 1])
      .mintDivineCurio({ value: ethers.utils.parseEther("0.08") }))
      .to.be.revertedWith("OutOfCurios()");

    // mint complete
    expect(await arMain.totalSupply()).to.equal(TOTAL_SUPPLY);

    // withdraw
    var balance = +(await arMain.provider.getBalance(arMain.address));
    var ownerBalance = +(await arMain.provider.getBalance(owner.address));
    console.log("      balance:", balance);
    console.log("      owner:", ownerBalance);
    await arMain.withdrawAether();
    balance = +(await arMain.provider.getBalance(arMain.address));
    ownerBalance = +(await arMain.provider.getBalance(owner.address));
    expect(balance).to.equal(0);
    console.log("      final balance:", balance);
    console.log("      final owner:", ownerBalance);

    // calculate unique hashes
    i = 1;
    var uniques = [];
    while (i <= TOTAL_SUPPLY) {
      var tokenHash = await arMain.getRuneHash(i);
      // console.log(i, tokenHash);
      // await saveJSON(i);
      // await saveScript(i);
      if (uniques.indexOf(tokenHash) === -1) {
        uniques.push(tokenHash);
      }

      // we should find 8 grails
      var grailId = await arMain.getGrailId(i);
      if (grailId > 0) {
        console.log("      grail:", i, +grailId);
        await saveJSON(i);
        await saveScript(i);
      }

      i += 1;
    }
    var u = uniques.length;
    var pct = Math.floor(100 * u / TOTAL_SUPPLY);
    console.log("      unique rune hashes:", u, `${pct}%`);
  });

  it("simple mint", async function () {
    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // we can't mint early
    await expect(arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") }))
      .to.be.revertedWith("ReliquaryNotDiscovered()");

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL);

    // we start at 0
    expect(await arMain.totalSupply()).to.equal(0);

    // mint works
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    expect(await arMain.totalSupply()).to.equal(1);
  });

  it("creativity can flourish", async function () {
    // enable vibes mint
    await gVibes.vibeCheck();
    await oVibes.vibeCheck();

    // mint vibes
    await gVibes.connect(other2).mintVibes(1, { value: ethers.utils.parseEther("0.07") })
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      vibes gas:", +rt.gasUsed));

    // mint batch vibes
    await gVibes.connect(other1).mintVibes(7, { value: ethers.utils.parseEther("0.49") })
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      vibes 7 gas:", +rt.gasUsed));

    // mint batch vibes again
    await gVibes.connect(other1).mintVibes(7, { value: ethers.utils.parseEther("0.49") });

    // mint open vibes
    await oVibes.connect(other1).mintVibes()
      .then(tx => oVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      open vibes gas:", +rt.gasUsed));

    await arMain.setGenesisAddress(gVibes.address);
    await arMain.setOpenAddress(oVibes.address);

    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL);

    // mint works
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    expect(await arMain.totalSupply()).to.equal(1);

    // mint works again
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    expect(await arMain.totalSupply()).to.equal(2);

    // other2 must approve the contract first
    await expect(arMain.connect(other2).transmuteElement(1, "Fire", 1))
      .to.be.revertedWith("ERC721: transfer caller is not owner nor approved");

    // other2 approves the contract to consume a vibe
    await gVibes.connect(other2).setApprovalForAll(arMain.address, true);

    // can't vandalise
    await expect(arMain.connect(other2).transmuteElement(1, "Fire", 1))
      .to.be.revertedWith("NotApprovedCreatorOrOwner()");

    // allow other2 to edit other1
    await arMain.connect(other1).authorizeCreator(1, other2.address);

    // can't lock up someone else's vibe
    await expect(arMain.connect(other1).transmuteElement(1, "Fire", 1))
      .to.be.revertedWith("ERC721: transfer of token that is not own");

    // can't use a fake element
    await expect(arMain.connect(other2).transmuteElement(1, "fake", 1))
      .to.be.revertedWith("InvalidElement()");

    // transmute works now
    expect(await gVibes.balanceOf(other2.address)).to.equal(1);
    expect(await gVibes.balanceOf(arMain.address)).to.equal(0);
    await arMain.connect(other2).transmuteElement(1, "Water", 1)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      transmute gas:", +rt.gasUsed));
    expect(await gVibes.balanceOf(other2.address)).to.equal(0);
    expect(await gVibes.balanceOf(arMain.address)).to.equal(1);

    // can't use the same vibe again
    await expect(arMain.connect(other2).transmuteElement(1, "Fire", 1))
      .to.be.revertedWith("ERC721: transfer of token that is not own");

    // can't upgrade with not enough mana
    await expect(arMain.connect(other1).upgradeRelic(1))
      .to.be.revertedWith("NotEnoughMana()");

    // other1 approves the contract to consume a single vibe
    await gVibes.connect(other1).approve(arMain.address, 2);

    // send a vibe to other2 to use for glyph
    var data = abiCoder.encode(["string"], [""]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, other2.address, 2, data);

    // createGlyph works now
    expect(await gVibes.balanceOf(other2.address)).to.equal(1);
    expect(await gVibes.balanceOf(arMain.address)).to.equal(1);
    await arMain.connect(other2).createGlyph(1, GLYPH, 2)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      glyph gas:", +rt.gasUsed));
    expect(await gVibes.balanceOf(other2.address)).to.equal(0);
    expect(await gVibes.balanceOf(arMain.address)).to.equal(2);

    // can't upgrade someone else's token
    await expect(arMain.connect(other2).upgradeRelic(1))
      .to.be.revertedWith("NotEntrustedOrInYourPossession()");

    // upgrade it
    expect(await arMain.getLevel(1)).to.equal(1);
    await arMain.connect(other1).upgradeRelic(1)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      upgrade gas:", +rt.gasUsed));
    expect(await arMain.getLevel(1)).to.equal(2);

    // can't upgrade again
    await expect(arMain.connect(other1).upgradeRelic(1))
      .to.be.revertedWith("RelicAlreadyAtMaxLevel()");

    // test mana generation
    await new Promise(async (resolve, reject) => {
      var mana = await arMain.getMana(1);
      expect(mana).to.equal(50);
      console.log("      lv2 mana start:", mana);
      await arMain.provider.send("evm_increaseTime", [31536000]);
      await arMain.provider.send("evm_mine");
      mana = await arMain.getMana(1);
      expect(mana).to.equal(200);
      console.log("      lv2 mana 1 yr later:", mana);
      resolve();
    });

    await logToken(1);

    // other1 approves the contract to consume a single vibe
    await oVibes.connect(other1).setApprovalForAll(arMain.address, true);

    // can't make up a vibe
    await expect(arMain.connect(other1).imagineColors(1, NEW_COLORS, 99999))
      .to.be.revertedWith("ERC721: operator query for nonexistent token");

    // imageColors works
    expect(await oVibes.balanceOf(other1.address)).to.equal(1);
    expect(await oVibes.balanceOf(arMain.address)).to.equal(0);
    await arMain.connect(other1).imagineColors(1, NEW_COLORS, 7778)
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      colors gas:", +rt.gasUsed));
    expect(await oVibes.balanceOf(other1.address)).to.equal(0);
    expect(await oVibes.balanceOf(arMain.address)).to.equal(1);

    // await logToken(1);
    // await logToken(2);

    var data = abiCoder.encode(
      ["uint256", "string", "uint256[]", "uint24[]"],
      [2, "Shadow", GLYPH, NEW_COLORS]
    );
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 3, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      ttt customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "Light", GLYPH, []]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 4, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      ttf customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "Water", [], NEW_COLORS]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 5, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      tft customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "Earth", [], []]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 6, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      tff customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "Earth", [], []]);
    await expect(gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 6, data))
      .to.be.revertedWith("ERC721: transfer caller is not owner nor approved");

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "", GLYPH, NEW_COLORS]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 7, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      ftt customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "", GLYPH, []]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 8, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      ftf customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "", [], NEW_COLORS]);
    await gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 9, data)
      .then(tx => gVibes.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      fft customize gas:", +rt.gasUsed));

    // await logToken(2);

    var data = abiCoder.encode(["uint256", "string", "uint256[]", "uint24[]"], [2, "", [], []]);
    await expect(gVibes.connect(other1)["safeTransferFrom(address,address,uint256,bytes)"](
      other1.address, arMain.address, 10, data))
      .to.be.revertedWith("reverted with an unrecognized custom error");

    expect(await gVibes.balanceOf(arMain.address)).to.equal(9);
  });

  it("vibes discounts work", async function () {
    // enable vibes mint
    await gVibes.vibeCheck();
    await oVibes.vibeCheck();

    // mint vibes
    await gVibes.connect(other2).mintVibes(1, { value: ethers.utils.parseEther("0.07") });

    // mint batch vibes
    await gVibes.connect(other1).mintVibes(7, { value: ethers.utils.parseEther("0.49") });

    // mint batch vibes
    await gVibes.connect(other1).mintVibes(7, { value: ethers.utils.parseEther("0.49") });

    // mint open vibes
    await oVibes.connect(other1).mintVibes();

    await arMain.setGenesisAddress(gVibes.address);
    await arMain.setOpenAddress(oVibes.address);

    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL);

    // can't send too little
    await expect(arMain.connect(other2).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.02") }))
      .to.be.revertedWith("NotEnoughAether()");

    var discount = await arMain.connect(other2).calculateVibesDiscount();
    console.log(`      1st discount amount: ${discount}`);

    // mint with discount works
    await arMain.connect(other2).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.03") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      1st discount 1 gas:", +rt.gasUsed));
    expect(await arMain.totalSupply()).to.equal(1);

    var discount = await arMain.connect(other2).calculateVibesDiscount();
    console.log(`      after discount amount: ${discount}`);

    // advised to use mint instead
    await expect(arMain.connect(other2).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.15") }))
      .to.be.revertedWith("NoAetherRemainingUseMintInstead()");

    var discount = await arMain.connect(other1).calculateVibesDiscount();
    console.log(`      1st 10 discount amount: ${discount}`);

    // mint with 1.73 discount
    await arMain.connect(other1).mintWithVibesDiscount(10, { value: ethers.utils.parseEther("0") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      1st discount 10 gas:", +rt.gasUsed));
    expect(await arMain.totalSupply()).to.equal(11);

    var discount = await arMain.connect(other1).calculateVibesDiscount();
    console.log(`      after 10 discount amount: ${discount}`);

    // mint with 0.23 discount left
    await arMain.connect(other1).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      2nd discount 1 gas:", +rt.gasUsed));
    expect(await arMain.totalSupply()).to.equal(12);

    // can't send too little
    await expect(arMain.connect(other1).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.06") }))
      .to.be.revertedWith("NotEnoughAether()");

    // mint with 0.08 discount left
    await arMain.connect(other1).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.07") })
      .then(tx => arMain.provider.getTransactionReceipt(tx.hash))
      .then(rt => console.log("      3rd discount 1 gas:", +rt.gasUsed));
    expect(await arMain.totalSupply()).to.equal(13);

    // advised to use mint instead
    await expect(arMain.connect(other1).mintWithVibesDiscount(1, { value: ethers.utils.parseEther("0.15") }))
      .to.be.revertedWith("NoAetherRemainingUseMintInstead()");
  });
/*
  it("metadata upgrades and opt-outs", async function () {
    // set metadata first
    await arMain.setMetadataAddress(trMeta.address);

    // owner inscribes
    await arMain.inscribeRunicSeal(RUNIC_SEAL);

    // mint works
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    // await logToken(1);

    const TRMeta2 = await ethers.getContractFactory("TRMetaV2", {
      libraries: {
        TRScript: trScript.address,
        TRUtils: trUtils.address
      }
    });
    trMeta2 = await TRMeta2.deploy();
    await trMeta2.deployed();
    await trMeta2.setRollsContract(trRolls.address);
    await arMain.setMetadataAddress(trMeta2.address);

    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    // await logToken(2);
    // await logToken(3);

    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    await arMain.connect(other1).mint(1, { value: ethers.utils.parseEther("0.15") });
    await arMain.connect(other1).setMetadataNumber(4, 1);
    await arMain.connect(other1).setMetadataNumber(5, 1);
    await arMain.connect(other1).clearMetadataNumber(5);
    // await logToken(4);
    // await logToken(5);
  });
*/
});
