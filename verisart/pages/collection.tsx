import { useState, useEffect, useRef } from "react";
import { NftExcludeFilters, Alchemy, Network } from "alchemy-sdk";
import { useWeb3Context } from "../context/";
import { copyFileSync } from "fs";

const Collection = () => {
	const list:
		| [{}]
		| { id: string; title: any; artist: any; year: any; imagePath: any }[] = [];
	const [fetched, setNfts] = useState(false);
	let perm:
		| [{}]
		| { id: string; title: any; artist: any; year: any; imagePath: any }[] = [];

	const config = {
		apiKey: process.env.ALCHEMY_KEY,
		network: Network.ETH_RINKEBY,
	};
	const alchemy = new Alchemy(config);
	const { address } = useWeb3Context();

	async function getList() {
		perm = await nfts();
		setNfts(true);
		console.log(perm);
	}

	const nfts = async () => {
		const stringAdd: string = address ? address : "";
		if (address === "") {
			//throw error here
		}
		// Get all NFTs
		const nfts = await alchemy.nft.getNftsForOwner(stringAdd);
		const nftList = nfts["ownedNfts"];

		for (let nft of nftList) {
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

	return (
		<div className="flex h-screen items-center justify-center text-center text-lg text-white">
			<div>
				<button onClick={getList}>Fetch Next Page</button>
			</div>
			<div>
				{list.length > 0 ? (
					<>
						{console.log(perm)}
						{perm.map((nft: any) => {
							return (
								<div key={nft.id}>
									<h2>id: {nft.title}</h2>
									<hr />
								</div>
							);
						})}
					</>
				) : null}
			</div>
		</div>
	);
};

export default Collection;
