import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function main() {
	const MexNFT = await hre.ethers.getContractFactory("NFTMinter");
	const mexNFT = await MexNFT.deploy();
	await mexNFT.deployed();
	console.log("NFT Deployed ", mexNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
