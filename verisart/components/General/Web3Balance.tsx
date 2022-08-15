import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/";
import { Contract, ethers } from "ethers";
import ABIContract from "../../public/abis.json";

export function TCRBalance({ setBalance, maxTCRAmount }) {
	const { address, web3Provider } = useWeb3Context();

	let signer;
	let signerAddress;

	const tokenAddress = "0x9C4A4204B79dd291D6b6571C5BE8BbcD0622F050"; // mainnet
	const rinkebyAddress = "0x98034D35a9B01855a5a28be8f131A78E937dc8f8";
	const arbAddress = "0xA72159FC390f0E3C6D415e658264c7c4051E9b87";

	async function getBalance() {
		try {
			signer = web3Provider.getSigner();
			signerAddress = await signer.getAddress();
			const contract = new Contract(
				rinkebyAddress,
				ABIContract.balanceABI,
				web3Provider
			);
			const balance = await contract.balanceOf(signerAddress);
			const maxTCRAmount = Number(ethers.utils.formatEther(balance)).toFixed(2);
			setBalance(maxTCRAmount);
		} catch (error) {
			setBalance(0);
		}
	}

	useEffect(() => {
		if (address != null) {
			getBalance();
		} else {
			setBalance(0);
		}
		console.log(address, "- Has changed");
	}, [address]);

	return <div>{maxTCRAmount} TCR</div>;
}
