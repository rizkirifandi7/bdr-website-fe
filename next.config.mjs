/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},
	images: {
		domains: ["localhost", "res.cloudinary.com"],
	},
};

export default nextConfig;

