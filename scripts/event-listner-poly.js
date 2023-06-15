const hre = require("hardhat");
require('dotenv').config()

const bridgePolyAddress = '0xfeCdb719E38802A03Dd6d84265f9eCaEDD9bB720';

const bridgeABI = [
    "function mint(address to, uint amount, uint otherChainNonce)",
    "event Transfer(address from, address to, uint amount, uint date, uint nonce, Step indexed step)"
]

async function main() {

    const providerPoly = new hre.ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYKEY_MUMBAI}`);

    const contractPOLY = new hre.ethers.Contract(bridgePolyAddress, bridgeABI, providerPoly);

    contractPOLY.on("Transfer",(from, to, amount, date, nounce, type) => {
        console.log(`event emitted mumbai`);
        console.log(`from : ${from}, to : ${to}, amount : ${amount}, date : ${date}, nounce : ${nounce}, type : ${type}`);
    })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


