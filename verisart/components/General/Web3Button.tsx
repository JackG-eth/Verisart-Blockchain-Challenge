import React from "react";
import { useWeb3Context } from "../../context/";

const ConnectButton = ({ connect }) => {
	return connect ? (
		<button onClick={connect}>Connect</button>
	) : (
		<button>Loading...</button>
	);
};

const DisconnectButton = ({ disconnect }) => {
	return disconnect ? (
		<button onClick={disconnect}>Disconnect</button>
	) : (
		<button>Loading...</button>
	);
};

export function Web3Button() {
	const { web3Provider, connect, disconnect } = useWeb3Context();

	return web3Provider ? (
		<DisconnectButton disconnect={disconnect} />
	) : (
		<ConnectButton connect={connect} />
	);
}
