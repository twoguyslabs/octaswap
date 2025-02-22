import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, bsc, sepolia } from "@reown/appkit/networks";
import { monadTestnet, octaspace } from "./chains";

export const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const networks = isDevelopment ? [octaspace, mainnet, bsc, sepolia, monadTestnet] : [octaspace, bsc];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
