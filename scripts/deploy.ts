import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const [Deployer] = await hre.ethers.getSigners(); 

  console.log("ContractManagement deployed to:", Deployer.address);

  const ContractManagement = await ethers.getContractFactory("ContractManagement");
  const contractManagement = await ContractManagement.deploy();
  await contractManagement.waitForDeployment();
  console.log("ContractManagement deployed to:", (contractManagement as any).address);
  // Store the contract addresses for later use  // Store the contract addresses for later use
  const addresses = {
    ContractManagement: contractManagement,
  };

  // Store the contract addresses in a JSON file for easy access
  const fs = require("fs");
  fs.writeFileSync("deployedAddresses.json", JSON.stringify(addresses, null, 2));
  console.log("Contract addresses written to deployedAddresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
