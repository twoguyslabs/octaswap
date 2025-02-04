import { Token } from "@uniswap/sdk-core";

export const NATIVE: { [chainId: number]: UnionToken } = {
  800001: {
    chainId: 800001,
    address: "0x05f1f289A97B2b4032e76c6de4aD746f02F20d9A",
    name: "Octa Space",
    symbol: "OCTA",
    decimals: 18,
    logoURI: "/octa-logo.svg",
    isNative: true,
  },
  1: {
    chainId: 1,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
    isNative: true,
  },
  56: {
    chainId: 56,
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    name: "BNB Smart Chain",
    symbol: "BNB",
    decimals: 18,
    logoURI: "/bnb-logo.svg",
    isNative: true,
  },
  11155111: {
    chainId: 11155111,
    address: "0x6b56522087b63a9623320f6d03095Df3C618faB2",
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
    isNative: true,
  },
};

export const WETH9: { [chainId: number]: Token } = {
  [800001]: new Token(800001, "0x05f1f289A97B2b4032e76c6de4aD746f02F20d9A", 18, "WOCTA", "Wrapped OCTA"),
  [1]: new Token(1, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "WETH", "Wrapped Ether"),
  [56]: new Token(56, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 18, "WBNB", "Wrapped BNB"),
};
