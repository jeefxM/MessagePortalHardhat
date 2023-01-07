require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("chai");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: "https://bitter-neat-brook.ethereum-sepolia.discover.quiknode.pro/0b9b67becb992fcb53d80dd5cfe5c8b6dd07fdb8",
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: process.env.ALCHEMY_HTTPS_KEY_POLYGON,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.ALCHEMY_HTTPS_KEY_GOERLI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
