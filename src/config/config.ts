interface Config {
	serverIpAddress: string;
}

const config: Config = { serverIpAddress: import.meta.env.VITE_SERVER_URL || '' };

export default config;
