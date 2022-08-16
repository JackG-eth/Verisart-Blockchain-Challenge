const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("mexNFT Smart Contract Tests", function () {
	let mexNFT: any;

	this.beforeEach(async function () {
		// This is executed before each test
		// Deploying the smart contract
		const MexNFT = await ethers.getContractFactory("NFTMinter");
		mexNFT = await MexNFT.deploy();
		await mexNFT.deployed();
	});

	it("NFT is minted successfully", async function () {
		const account1 = await ethers.getSigners();

		expect(await mexNFT.balanceOf(account1.address)).to.equal(0);

		const tokenURI =
			"https://opensea-creatures-api.herokuapp.com/api/creature/1";
		const tx = await mexNFT.connect(account1).mint(account1.address, tokenURI);

		expect(await mexNFT.balanceOf(account1.address)).to.equal(1);
	});

	// it("tokenURI is set sucessfully", async function () {
	// 	const [account1, account2] = await ethers.getSigners();

	// 	const tokenURI_1 =
	// 		"https://opensea-creatures-api.herokuapp.com/api/creature/1";
	// 	const tokenURI_2 =
	// 		"https://opensea-creatures-api.herokuapp.com/api/creature/2";

	// 	const tx1 = await mexNFT.connect(account1).mint(tokenURI_1);
	// 	const tx2 = await mexNFT.connect(account2).mint(tokenURI_2);

	// 	expect(await mexNFT.tokenURI(0)).to.equal(tokenURI_1);
	// 	expect(await mexNFT.tokenURI(1)).to.equal(tokenURI_2);
	// });
});
