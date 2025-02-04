import { Token } from "@uniswap/sdk-core";

export function tokenClass(token: UnionToken): Token {
  const uniToken = new Token(token.chainId, token.address, token.decimals, token.name, token.symbol);
  return uniToken;
}
