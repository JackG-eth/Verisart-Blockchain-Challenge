import { useState, useEffect, useRef } from "react";
import Container from "../components/General/Container/Container";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import ABIContract from "../public/mint.json";
import { BigNumber, Contract, ethers } from "ethers";
import { useWeb3Context } from "../context/";

import { toast } from "react-toastify";

const Mint = () => {
	const { address, web3Provider } = useWeb3Context();

	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [year, setYear] = useState(2022);
	const [imageURL, setImageUrl] = useState("");
	const [imageIPFS, setImageIPFS] = useState("");
	const [nftPath, setNFTPath] = useState("");
	const [approved, setApproved] = useState(false);

	const mintContractAddress = "0x02fF80b4A2c4534Ec612cF196d13Cd89dFc51f36";

	const mint = async () => {
		try {
			const signer = web3Provider?.getSigner();
			let contract = await new ethers.Contract(
				mintContractAddress,
				ABIContract.mintABI,
				signer
			);
			// Change this to the contract that is doing the swapping/burning
			console.log(nftPath);
			console.log(address);
			const mint = await contract.mint(address, nftPath);
			const txResult = await mint.wait();
			if (txResult.status !== 1) {
				throw new Error("Failed approve");
			}
			toast("Minted..");
			setApproved(txResult.status === 1);
		} catch (error) {
			console.log(error);
			toast("Either not approved or not connected!");
			setApproved(false);
		}
	};

	const metaData = {
		title: title,
		artist: artist,
		year: year,
		imagePath: imageIPFS,
	};

	const auth =
		"Basic " +
		Buffer.from(process.env.INFURA_ID + ":" + process.env.SECRET_KEY).toString(
			"base64"
		);

	async function ipfsClient() {
		const ipfs = await create({
			host: "ipfs.infura.io",
			port: 5001,
			protocol: "https",
			apiPath: "/api/v0",
			headers: {
				authorization: auth,
			},
		});
		return ipfs;
	}

	async function uploadImage() {
		// save image
		let ipfs = await ipfsClient();
		const image = await ipfs.add(imageURL);
		setImageIPFS("https://ipfs.io/ipfs/" + image.path);
		setImageUrl("");
		//check ipfs set correclty for image
		// pass data to mint.
		// work out what image path is, set it here then create a new object to parse as a json into new infura call
		// on success set upload to false and mint to true.
		// add modal for minting
	}

	async function saveFile() {
		console.log(imageIPFS);
		let ipfs = await ipfsClient();
		const file = JSON.stringify(metaData);
		console.log(file);
		let result = await ipfs.add(file);
		setNFTPath("https://ipfs.io/ipfs/" + result.path);
		setImageIPFS("");
	}

	useEffect(() => {}, []);
	return (
		<div className="flex h-screen w-screen">
			<Container>
				<div className="cols-2 grid h-screen w-screen">
					<div className="p flex w-2/4 items-start">
						<div className="mr-40">
							<div className="mr-10 flex flex-col space-y-3">
								<div className="justify-left flex">
									<h1 className="text-mycelium-lightgreen md:text-7xl lg:leading-tight">
										Upload Artwork
									</h1>
								</div>
								<div className="justify-left flex items-center space-x-3 pb-2 text-white"></div>
							</div>
							<div className="justify-left flex text-white">
								<h2 className="">Title </h2>
							</div>
							<div className="flex flex-col justify-between space-y-4 py-2 md:max-w-2xl">
								<div className="flex text-xl text-white">
									<div className="border-grey md:text-md flex w-3/4  truncate rounded-xl border py-2 px-6 pl-4 text-white lg:text-lg">
										<input
											className="w-full bg-transparent"
											required
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex items-center justify-center"></div>
							</div>
							<div className="justify-left flex text-white">
								<h2 className="">Artist </h2>
							</div>
							<div className="flex flex-col justify-between space-y-4 py-2 md:max-w-2xl">
								<div className="flex text-xl text-white">
									<div className="border-grey md:text-md flex w-3/4   truncate rounded-xl border py-2 px-6 pl-4 text-white lg:text-lg">
										<input
											className="w-full bg-transparent"
											required
											value={artist}
											onChange={(e) => setArtist(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="justify-left flex text-white">
								<h2 className="">Year of Production </h2>
							</div>
							<div className="flex flex-col justify-between space-y-4 py-2 md:max-w-2xl">
								<div className="flex text-xl text-white">
									<div className="border-grey md:text-md flex w-3/4  truncate rounded-xl border py-2 px-6 pl-4 text-white lg:text-lg">
										<input
											className="w-full bg-transparent"
											required
											type="number"
											value={year}
											onChange={(e) => setYear(parseInt(e.target.value))}
										/>
									</div>
								</div>
							</div>
							<div>
								<input
									className="pt-4"
									type="file"
									required
									onChange={(event) => {
										// @ts-ignore: Object is possibly 'null'.
										setImageUrl(event.target.files[0]);
										setImageIPFS("");
									}}
								/>
							</div>

							<div className="pt-4">
								{imageURL ? (
									<>
										<button
											className=" pt-4flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-white text-white transition-colors duration-300 hover:bg-white hover:text-black"
											onClick={() => {
												if (
													metaData.artist === "" ||
													metaData.title === "" ||
													metaData.year === 0
												) {
													toast.error("Please Fill in all fields");
												} else {
													uploadImage();
												}
											}}
										>
											Upload
										</button>
									</>
								) : null}
							</div>
							<div>
								{imageIPFS ? (
									<>
										<button
											className=" pt-4flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-white text-white transition-colors duration-300 hover:bg-white hover:text-black"
											onClick={() => {
												if (
													metaData.artist === "" ||
													metaData.title === "" ||
													metaData.year === 0
												) {
													toast.error("Please Fill in all fields");
												} else {
													saveFile();
												}
											}}
										>
											Upload File
										</button>
									</>
								) : null}
							</div>
							<div>
								{nftPath ? (
									<>
										<button
											className=" pt-4flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-white text-white transition-colors duration-300 hover:bg-white hover:text-black"
											onClick={() => {
												if (nftPath === "") {
													toast.error(
														"Something wen't wrong with the upload process, please try again."
													);
												}
												console.log(metaData);
												console.log(nftPath);
												mint();
											}}
										>
											Mint
										</button>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Mint;
