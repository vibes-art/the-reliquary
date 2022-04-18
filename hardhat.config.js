require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  etherscan: {
    apiKey: "" // your etherscan API key here
  },
  networks: {
    mainnet: {
      url: ``, // your provider here
      accounts: [``] // your private keys here
    },
    rinkeby: {
      url: ``,  // your provider here
      accounts: [``] // your private keys here
    },
    hardhat: {
      accounts: [
        {
          privateKey: "0x01289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x02289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x03289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x04289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x05289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x06289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x07289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x08289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x09289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x10289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x11289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x12289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x13289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x14289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x15289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x16289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x17289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x18289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x19289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x20289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x21289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x22289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x23289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x24289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x25289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x26289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x27289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x28289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x29289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x30289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x31289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x32289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x33289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x34289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x35289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x36289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x37289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x38289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x39289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x40289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x41289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x42289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x43289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x44289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x45289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x46289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x47289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x48289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x49289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x50289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x51289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x52289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x53289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x54289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x55289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x57289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x58289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x59289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x60289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x61289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x62289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x63289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x64289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x65289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x66289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        },
        {
          privateKey: "0x67289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
          balance: "11111150000000000000000"
        }
      ]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 4000000
  }
};
