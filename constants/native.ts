export const NATIVE: NativeData = {
  800001: {
    chainId: 800001,
    address: null,
    name: "Octa Space",
    symbol: "OCTA",
    decimals: 18,
    logoURI: "/octa-logo.svg",
    wrapped: "0x05f1f289A97B2b4032e76c6de4aD746f02F20d9A",
  },
  1: {
    chainId: 1,
    address: null,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
    wrapped: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  56: {
    chainId: 56,
    address: null,
    name: "BNB Smart Chain",
    symbol: "BNB",
    decimals: 18,
    logoURI: "/bnb-logo.svg",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  11155111: {
    chainId: 11155111,
    address: null,
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
    wrapped: "0x6b56522087b63a9623320f6d03095Df3C618faB2",
  },
};

export function native(chainId: number | undefined): Native | undefined {
  if (!chainId) return undefined;

  return NATIVE[chainId];
}
