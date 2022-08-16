import { useState, useEffect, useRef } from "react";
import { NftExcludeFilters, Alchemy, Network } from "alchemy-sdk";
import { useWeb3Context } from "../context";
import Container from "../components/General/Container/Container";
import { copyFileSync } from "fs";

//Unfortunately alchemy's SDK does not support the getNftsForContract for rinkeby,functionality works on mainnet.
const Collection = () => {
	const [permList, setPerm] = useState([{}]);

	const list: any = [];
	let perm: any = [];

	const config = {
		apiKey: process.env.ALCHEMY_KEY,
		network: Network.ETH_RINKEBY,
	};
	const alchemy = new Alchemy(config);
	const { address } = useWeb3Context();

	async function getList() {
		perm = await nfts();
		setPerm(perm);
	}

	const nfts = async () => {
		const contractAddress = "0x4dE3d62375fAe6CfDBdAFD15aDAB2dd98cBce084";

		// Flag to omit metadata
		const omitMetadata = false;

		// Get all NFTs
		const { nfts } = await alchemy.nft.getNftsForContract(contractAddress, {
			omitMetadata: omitMetadata,
		});

		for (let nft of nfts) {
			const metaData = {
				id: nft.tokenId,
				title: nft.rawMetadata?.title,
				artist: nft.rawMetadata?.artist,
				year: nft.rawMetadata?.year,
				imagePath: nft.rawMetadata?.imagePath,
			};
			list.push(metaData);
		}

		return list;
	};

	useEffect(() => {
		if (address != null) {
			getList();
		}
		console.log(address, "- Has changed");
	}, [address]); // <-- here put the parameter to listen

	return (
		<div>
			<div>
				<h1 className=" pt-24 text-center md:text-7xl lg:leading-tight">
					Verisart Collection
				</h1>
			</div>
			<div className="flex items-center justify-center text-center">
				<div className="grid grid-cols-3 p-12">
					{permList ? (
						<>
							{permList.map((nft: any) => {
								return (
									<div key={nft.id} className="pt-4 ">
										<Container>
											<div className=" rounded-lg border-2 border-white p-1">
												<img
													className="h-48 w-48 rounded-lg object-scale-down p-4"
													src={nft.imagePath}
												></img>
												<h2>Title: {nft.title}</h2>
												<h2>Artist {nft.artist}</h2>
												<h2>Year {nft.year}</h2>
											</div>
										</Container>
									</div>
								);
							})}
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Collection;
