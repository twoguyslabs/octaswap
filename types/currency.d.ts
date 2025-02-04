interface Token {
  chainId: number;
  address: string | null;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

interface TokenListIndex {
  [chainId: number]: Token[];
}

interface Native extends Token {
  wrapped: string;
}

interface NativeData {
  [chainId: number]: Native;
}
