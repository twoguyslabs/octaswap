import { getTokenAddress } from "@/lib/utils";
import { Token as UniToken } from "@uniswap/sdk-core";

export function uniTokenClass(token: Token | Native | undefined): UniToken | undefined {
  if (!token) return undefined;
  const tokenAddress = getTokenAddress(token);
  const uniToken = new UniToken(token.chainId, tokenAddress, token.decimals, token.name, token.symbol);
  return uniToken;
}
