interface Token {
  chainId: number;
  address: string | null;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}
