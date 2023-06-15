const Web3 = require('web3');
const hre = require("hardhat");


require('dotenv').config()

const BridgeEth = require('../artifacts/contracts/bridgeEth.sol/BridgeETH.json');
const BridgePoly = require('../artifacts/contracts/bridgePoly.sol/BridgePOLY.json');

const bridgeEthAddress = '0x67fbaB75Eeb889566Fb9f9b7B3e1ee39C00ea588';
const bridgePolyAddress = '0xfeCdb719E38802A03Dd6d84265f9eCaEDD9bB720';

const bridgeABI = [
    "function mint(address to, uint amount, uint otherChainNonce)",
    "event Transfer(address from, address to, uint amount, uint date, uint nonce, Step indexed step)"
]

const tokenABI = [
    "function balanceOf(address account) external view returns (uint256)"
]

async function main() {

    const providerEth = new hre.ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMYKEY_SEPOLIA}`);
    const providerPoly = new hre.ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYKEY_MUMBAI}`);

    filter = {
        address: bridgeEthAddress,
        topics: [
            hre.ethers.utils.id("event Transfer(address,address,uint,uint,uint,enum)"),
            null,
            null,
            null,
            null,
            null,

        ]
    }

    


    // providerEth.on()

    const bridgeEthContract = await hre.ethers.getContractAt(bridgeABI,bridgeEthAddress);

    console.log('starting event listner...');

    bridgeEthContract.on("Transfer",(from, to, amount, date, nounce, type) => {
        console.log(`event emitted sepolia`);
        console.log(`from : ${from}, to : ${to}, amount : ${amount}, date : ${date}, nounce : ${nounce}, type : ${type}`);
    })


    const bridgePolyContract = await hre.ethers.getContractAt(bridgeABI,bridgePolyAddress);

    bridgePolyContract.on("Transfer",(from, to, amount, date, nounce, type) => {
        console.log(`event emitted polygon`);
        console.log(`from : ${from}, to : ${to}, amount : ${amount}, date : ${date}, nounce : ${nounce}, type : ${type}`);
    })

    ////////////////////////////////////////////////////////

    const contractETH = new ethers.Contract(bridgeEthAddress, bridgeABI, providerEth);

    contractETH.on("Transfer",(from, to, amount))




    // hre.ethers.provider.on()


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});




const web3Eth = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMYKEY_SEPOLIA}`);
const web3Poly = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYKEY_MUMBAI}`);

const { address: admin } = web3Eth.eth.accounts.wallet.add(process.env.ADMIN_PRIVATE_KEY);
