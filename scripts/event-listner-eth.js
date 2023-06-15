const hre = require("hardhat");
require('dotenv').config()

const bridgeEthAddress = '0x67fbaB75Eeb889566Fb9f9b7B3e1ee39C00ea588';

const bridgeABI = [
    "function mint(address to, uint amount, uint otherChainNonce)",
    "event Transfer(address from, address to, uint amount, uint date, uint nonce, Step indexed step)"
]

async function main() {

    const providerEth = new hre.ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMYKEY_SEPOLIA}`);

    const contractETH = new hre.ethers.Contract(bridgeEthAddress, bridgeABI, providerEth);

    console.log('started listner for sepolia');

    contractETH.on("Transfer",(from, to, amount, date, nounce, type) => {
        console.log(`event emitted Sepolia`);
        console.log(`from : ${from}, to : ${to}, amount : ${amount}, date : ${date}, nounce : ${nounce}, type : ${type}`);
    })

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});