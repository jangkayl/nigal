/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.im2015.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "manage.im2015.com",
				pathname: "**",
			},
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
