import { type Chain } from "viem";

const octaspace = {
  id: 800001,
  name: "Octa Space",
  nativeCurrency: { name: "Octa Space", symbol: "OCTA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.octa.space/"] },
  },
  blockExplorers: {
    default: {
      name: "Octa Explorer",
      url: "https://scan.octa.space",
    },
  },
} as const satisfies Chain;

const monadTestnet = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad Testnet", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz/"] },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "http://testnet.monadexplorer.com/",
    },
  },
} as const satisfies Chain;

export { octaspace, monadTestnet };
