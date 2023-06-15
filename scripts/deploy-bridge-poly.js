const hre = require("hardhat");

const addressOfToken = "0x985e8c85e6d1A565527C062B6CDf7B89F7987AC1"; // update this with deploy contract

async function main() {
    const [admin, other] = await hre.ethers.getSigners();
  
    const tokenPOLY = await hre.ethers.getContractAt("TokenPOLY",addressOfToken);

    const BridgePOLY = await hre.ethers.getContractFactory("BridgePOLY");
    const bridgePOLY = await BridgePOLY.deploy(tokenPOLY.address);
  
    await bridgePOLY.deployed();
  
    console.log("bridgePOLY deployed to:", bridgePOLY.address);

    const balanceOfOther = await tokenPOLY.balanceOf(other.address);
    console.log(`balance of other : ${(balanceOfOther).toString()}`);

    await tokenPOLY.updateAdmin(bridgePOLY.address);
    console.log("update the admin to bridge contract");

  }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});