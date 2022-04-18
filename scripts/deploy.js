const { ethers } = require("hardhat");

var DELAY = 10000;

var trUtils;
var trKeys;
var trColors;
var trRolls;
var trScript;
var base64;
var trMeta;
var arMain;

function timeout (duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function main () {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  
// my deploy was interrupted, so i had to manually update the script on the fly ...


/*
  const TRUtils = await ethers.getContractFactory("TRUtils");
  trUtils = await TRUtils.deploy();
  await trUtils.deployed();
  console.log("  deployed trUtils:", trUtils.address);
  await timeout(DELAY);

  const TRKeys = await ethers.getContractFactory("TRKeys");
  trKeys = await TRKeys.deploy();
  await trKeys.deployed();
  console.log("  deployed trKeys:", trKeys.address);
  await timeout(DELAY);

  const TRGrailNature = await ethers.getContractFactory("TRGrailNature");
  trGrailNature = await TRGrailNature.deploy();
  await trGrailNature.deployed();
  console.log("  deployed trGrailNature:", trGrailNature.address);
  await timeout(DELAY);

  const TRGrailLight = await ethers.getContractFactory("TRGrailLight");
  trGrailLight = await TRGrailLight.deploy();
  await trGrailLight.deployed();
  console.log("  deployed trGrailLight:", trGrailLight.address);
  await timeout(DELAY);

  const TRGrailWater = await ethers.getContractFactory("TRGrailWater");
  trGrailWater = await TRGrailWater.deploy();
  await trGrailWater.deployed();
  console.log("  deployed trGrailWater:", trGrailWater.address);
  await timeout(DELAY);

  const TRGrailEarth = await ethers.getContractFactory("TRGrailEarth");
  trGrailEarth = await TRGrailEarth.deploy();
  await trGrailEarth.deployed();
  console.log("  deployed trGrailEarth:", trGrailEarth.address);
  await timeout(DELAY);

  const TRGrailWind = await ethers.getContractFactory("TRGrailWind");
  trGrailWind = await TRGrailWind.deploy();
  await trGrailWind.deployed();
  console.log("  deployed trGrailWind:", trGrailWind.address);
  await timeout(DELAY);

  const TRGrailArcane = await ethers.getContractFactory("TRGrailArcane");
  trGrailArcane = await TRGrailArcane.deploy();
  await trGrailArcane.deployed();
  console.log("  deployed trGrailArcane:", trGrailArcane.address);
  await timeout(DELAY);

  const TRGrailShadow = await ethers.getContractFactory("TRGrailShadow");
  trGrailShadow = await TRGrailShadow.deploy();
  await trGrailShadow.deployed();
  console.log("  deployed trGrailShadow:", trGrailShadow.address);
  await timeout(DELAY);

  const TRGrailFire = await ethers.getContractFactory("TRGrailFire");
  trGrailFire = await TRGrailFire.deploy();
  await trGrailFire.deployed();
  console.log("  deployed trGrailFire:", trGrailFire.address);
  await timeout(DELAY);

  const TRColors = await ethers.getContractFactory("TRColors", {
    libraries: {
      TRUtils: trUtils.address
    }
  });
  trColors = await TRColors.deploy();
  await trColors.deployed();
  console.log("  deployed trColors:", trColors.address);
  await timeout(DELAY);

  const TRRolls = await ethers.getContractFactory("TRRolls", {
    libraries: {
      TRColors: trColors.address,
      TRUtils: trUtils.address
    }
  });
  trRolls = await TRRolls.deploy();
  await trRolls.deployed();
  console.log("  deployed trRolls:", trRolls.address);
  await timeout(DELAY);

  let tx1 = await trRolls.setGrailContract(1, trGrailNature.address);
  tx1.wait();
  console.log("  set grail contract 1");
  await timeout(DELAY);
  let tx2 = await trRolls.setGrailContract(2, trGrailLight.address);
  tx2.wait();
  console.log("  set grail contract 2");
  await timeout(DELAY);
  let tx3 = await trRolls.setGrailContract(3, trGrailWater.address);
  tx3.wait();
  console.log("  set grail contract 3");
  await timeout(DELAY);
  let tx4 = await trRolls.setGrailContract(4, trGrailEarth.address);
  tx4.wait();
  console.log("  set grail contract 4");
  await timeout(DELAY);
  let tx5 = await trRolls.setGrailContract(5, trGrailWind.address);
  tx5.wait();
  console.log("  set grail contract 5");
  await timeout(DELAY);
*/
/*
  let tx6 = await trRolls.setGrailContract(6, "0x20489e2f47969e231e3B051901D0913Bc6faDe92");
  tx6.wait();
  console.log("  set grail contract 6");
  await timeout(DELAY);
  let tx7 = await trRolls.setGrailContract(7, "0xAfee42634aa51aC38921b8de3BFa3Bf873D243b2");
  tx7.wait();
  console.log("  set grail contract 7");
  await timeout(DELAY);
  let tx8 = await trRolls.setGrailContract(8, "0x79c1ECC0aDcAEF6667145E4867871FC907BbeFde");
  tx8.wait();
  console.log("  set grail contract 8");
  await timeout(DELAY);
*/
  const TRScript = await ethers.getContractFactory("TRScript");
  trScript = await TRScript.deploy();
  await trScript.deployed();
  console.log("  deployed trScript:", trScript.address);
  await timeout(DELAY);

  const Base64 = await ethers.getContractFactory("Base64");
  base64 = await Base64.deploy();
  await base64.deployed();
  console.log("  deployed base64:", base64.address);
  await timeout(DELAY);

  const TRMeta = await ethers.getContractFactory("TRMeta", {
    libraries: {
      TRScript: trScript.address,
      TRUtils: "0xFc29bbb9d6E92605291cCa1D5fC24870a50b0780"
    }
  });
  trMeta = await TRMeta.deploy();
  await trMeta.deployed();
  console.log("  deployed trMeta:", trMeta.address);
  await timeout(DELAY);

  let tx9 = await trMeta.setRollsContract("0x4d7c47d7890C9d65b2559a2F9B334F928D870186");
  tx9.wait();
  console.log("  set rolls contract");
  await timeout(DELAY);

  const TheReliquary = await ethers.getContractFactory("TheReliquary", {
    libraries: {
      TRUtils: "0xFc29bbb9d6E92605291cCa1D5fC24870a50b0780"
    }
  });

  arMain = await TheReliquary.deploy();
  await arMain.deployed();
  console.log("  deployed arMain:", arMain.address);
  await timeout(DELAY);

  let tx10 = await arMain.setMetadataAddress(trMeta.address);
  tx10.wait();
  console.log("  set metadata contract");
  await timeout(DELAY);

  console.log("Account balance:", (await deployer.getBalance()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
