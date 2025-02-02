export const NATIVE: Native = {
  1: {
    chainId: 1,
    address: null,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURL: "/eth-logo.png",
  },
  56: {
    chainId: 56,
    address: null,
    name: "BNB Smart Chain",
    symbol: "BNB",
    decimals: 18,
    logoURL: "/bnb-logo.svg",
  },
  800001: {
    chainId: 800001,
    address: null,
    name: "Octa Space",
    symbol: "OCTA",
    decimals: 18,
    logoURL: "/octa-logo.svg",
  },
  11155111: {
    chainId: 11155111,
    address: null,
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    logoURL: "/eth-logo.png",
  },
};

export function native(chainId: number | undefined): Token | undefined {
  if (!chainId) return undefined;

  return NATIVE[chainId];
}
