import { useState, useEffect, useRef } from "react";
import Container from "../components/General/Container/Container";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { useWeb3Context } from "../context/";

const Mint = () => {
	const { address, web3Provider } = useWeb3Context();
	const [imageURL, setImageUrl] = useState("");
	const [selectedImage, setSelectedImage] = useState(false);
	const [uploadImage, UploadImage] = useState(false);

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

	async function getData(hash: string) {
		let ipfs = await ipfsClient();

		let asyncitr = ipfs.get(hash);

		for await (const itr of asyncitr) {
			let data = Buffer.from(itr).toString();
			console.log(data);
		}
	}

	useEffect(() => {
		getData("QmZR6Lj8wXEUbZTrqzivtpKfDomiYjijrSWtDssufX2axC");
	}, []);
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
										<input className="w-full bg-transparent" required />
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
										<input className="w-full bg-transparent" required />
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
										/>
									</div>
								</div>
							</div>
							<div>
								<input
									className="pt-4"
									type="file"
									name="myImage"
									required
									onChange={(event) => {
										// @ts-ignore: Object is possibly 'null'.
										console.log(event.target.files[0]);
										// @ts-ignore: Object is possibly 'null'.
										setImageUrl(event.target.files[0]);
										setSelectedImage(true);
									}}
								/>
							</div>

							<div className="pt-4">
								{selectedImage ? (
									<>
										<button
											className=" pt-4flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-white text-white transition-colors duration-300 hover:bg-white hover:text-black"
											onClick={saveImage}
										>
											Upload
										</button>
									</>
								) : null}
							</div>
							<div className="pt-4">
								{uploadImage ? (
									<>
										<button className=" pt-4flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-white text-white transition-colors duration-300 hover:bg-white hover:text-black">
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
