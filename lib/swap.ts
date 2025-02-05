import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { parseEther } from "viem";

function createPair(t0: Token, t1: Token, reserves: readonly [bigint, bigint, number]) {
  const tokens = [t0, t1];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

  const [r0, r1] = reserves;
  const reserve0 = r0.toString();
  const reserve1 = r1.toString();

  const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1));
  return pair;
}

export function swap(
  t0: UnionToken | undefined,
  t1: UnionToken | undefined,
  a0: string,
  a1: string,
  reserves: readonly [bigint, bigint, number] | undefined,
) {
  if (!t0 || !t1 || !reserves) {
    return {
      swapExactInput: undefined,
      swapExactOutput: undefined,
    };
  }

  const token0 = new Token(t0.chainId, t0.address, t0.decimals, t0.name, t0.symbol);
  const token1 = new Token(t1.chainId, t1.address, t1.decimals, t1.name, t1.symbol);

  const amount0 = parseEther(a0).toString();
  const amount1 = parseEther(a1).toString();

  const pair = createPair(token0, token1, reserves);
  const route = new Route([pair], token0, token1);

  const swapExactInput =
    amount0 && amount0 !== "0"
      ? new Trade(route, CurrencyAmount.fromRawAmount(token0, amount0), TradeType.EXACT_INPUT)
      : undefined;

  const swapExactOutput =
    amount1 && amount1 !== "0"
      ? new Trade(route, CurrencyAmount.fromRawAmount(token1, amount1), TradeType.EXACT_OUTPUT)
      : undefined;

  return { swapExactInput, swapExactOutput };
}
