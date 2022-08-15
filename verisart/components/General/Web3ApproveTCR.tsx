import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context";
import { BigNumber, Contract, ethers } from "ethers";
import ABIContract from "../../public/abis.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TCRApproved({
	setHasSwapped,
	setApproved,
	approved,
	tcrToSwap,
}) {
	const { address, web3Provider } = useWeb3Context();

	const tokenAddress = "0x9C4A4204B79dd291D6b6571C5BE8BbcD0622F050"; // mainnet
	const rinkebyAddress = "0x98034D35a9B01855a5a28be8f131A78E937dc8f8";
	const migrateRinkebyAddress = "0x80030cF4ac6bFef809064Eb527D0b1a7A16E3837";
	const arbAddress = "0xA72159FC390f0E3C6D415e658264c7c4051E9b87";

	const approveTransfer = async () => {
		try {
			const signer = web3Provider.getSigner();
			let contract = await new ethers.Contract(
				rinkebyAddress,
				ABIContract.approveABI,
				signer
			);
			// Change this to the contract that is doing the swapping/burning
			const approved = await contract.approve(migrateRinkebyAddress, 1e9);
			if (!approved) {
				throw new Error("Failed approve");
			}
			const txResult = await approved.wait();
			if (txResult.status !== 1) {
				throw new Error("Failed approve");
			}
			toast("Approved..");
			setApproved(txResult.status === 1);
		} catch (error) {
			toast("Either not approved or not connected!");
			setApproved(false);
		}
	};

	/*
        Use the allowance method to check if the spender 
        is approved to transfer tokens on behalf of the owner. 
    */
	const checkAllowance = async () => {
		try {
			const signer = web3Provider.getSigner();
			let contract = await new ethers.Contract(
				rinkebyAddress,
				ABIContract.allowanceABI,
				signer
			);
			const allowance = await contract.allowance(address, rinkebyAddress);
			const currentAllowance = parseFloat(allowance.toString());
			if (currentAllowance > 0) {
				return true;
			} else {
				throw new Error("Failed approve");
			}
		} catch (error) {
			setApproved(false);
		}
	};

	//Add logic to show mex balance after? / make new file containign abis.
	const swapTCRToMEX = async () => {
		try {
			const signer = web3Provider.getSigner();
			let contract = await new ethers.Contract(
				migrateRinkebyAddress, //contract adddress
				ABIContract.migrateABI,
				signer
			);
			const migrated = await contract.migrate(parseInt(tcrToSwap));
			const txResult = await migrated.wait();
			setHasSwapped(txResult.status === 1);
		} catch (error) {
			console.log(error);
			toast("Migration Failed");
		}
	};

	useEffect(() => {
		if (address != null) {
			if (checkAllowance()) {
				setApproved(true);
			}
		} else {
			setApproved(false);
		}
		console.log(address, "- Has changed");
	}, [address]); // <-- here put the parameter to listen

	return (
		<div>
			{!approved && (
				<button
					className="flex w-full flex-col items-center justify-between rounded-xl border border-mycelium-lightgreen py-2 px-6 text-center text-white transition-colors duration-300 hover:bg-mycelium-lightgreen"
					onClick={approveTransfer}
				>
					Approve
				</button>
			)}
			{approved && (
				<button
					className="flex w-full flex-col items-center justify-between rounded-xl border border-mycelium-lightgreen py-2 px-6 text-center text-white transition-colors duration-300 hover:bg-mycelium-lightgreen"
					onClick={swapTCRToMEX}
				>
					Swap
				</button>
			)}
		</div>
	);
}
