import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, bsc, sepolia } from "@reown/appkit/networks";
import { octaspace } from "./chains";

// Get projectId from https://cloud.reown.com
export const projectId = "746a2937d30938bc999b7f8f4c21d4ca";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [octaspace, mainnet, bsc, sepolia];

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
