/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		INFURA_ID: process.env.INFURA_ID,
		SECRET_KEY: process.env.SECRET_KEY,
	},
};

module.exports = nextConfig;
