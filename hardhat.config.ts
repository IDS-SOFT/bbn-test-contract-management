import * as dotenv from "dotenv";

import { HardhatUserConfig, task} from "hardhat/config";
//import "@openzeppelin/hardhat-upgrades";
//import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
//import "@typechain/hardhat";
//import "hardhat-gas-reporter";
//import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";


dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    
    bbn_testnet: {
      url: "https://bbnrpc.hyderabad.bharatblockchain.io",
      chainId: 2018,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
};

export default config;
