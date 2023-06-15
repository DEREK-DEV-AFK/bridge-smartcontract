const hre = require("hardhat");

const addressOfToken = "0x008cfb562462a5bd61620F6Ef20A823Ac3db2a60"; // update this with deploy contract

async function main() {
    const [admin, other] = await hre.ethers.getSigners();
  
    const tokenETH = await hre.ethers.getContractAt("TokenETH",addressOfToken);

    const BridgeETH = await hre.ethers.getContractFactory("BridgeETH");
    const bridgeETH = await BridgeETH.deploy(tokenETH.address);
  
    await bridgeETH.deployed();
  
    console.log("bridgeETH deployed to:", bridgeETH.address);


    const balanceOfOther = await tokenETH.balanceOf(other.address);
    console.log(`balance of other : ${(balanceOfOther).toString()}`);

    await tokenETH.updateAdmin(bridgeETH.address);
    console.log("update the admin to bridge contract");

  }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});