const hre = require("hardhat");

async function main() {
    const [admin, other] = await hre.ethers.getSigners();
  
    const TokenETH = await hre.ethers.getContractFactory("TokenETH");
    const tokenETH = await TokenETH.deploy();
  
    await tokenETH.deployed();

    const amountToMint = hre.ethers.utils.parseEther("1000"); 
  
    console.log("tokenETH deployed to:", tokenETH.address);

    await tokenETH.mint(other.address, amountToMint);

    console.log(`Minted ${amountToMint/1e18} tokens to ${other.address}`);
  }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});