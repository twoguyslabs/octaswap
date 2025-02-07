import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { parseEther } from "viem";

export function swap(
  t0: UnionToken | undefined,
  t1: UnionToken | undefined,
  a0: string,
  a1: string,
  reserves: readonly [bigint, bigint, number] | undefined,
) {
  // Validate input parameters
  if (!t0 || !t1 || !reserves) {
    return {
      error: "Invalid tokens or reserves",
      swapExactInput: undefined,
      swapExactOutput: undefined,
    };
  }

  try {
    const token0 = new Token(t0.chainId, t0.address, t0.decimals, t0.name, t0.symbol);
    const token1 = new Token(t1.chainId, t1.address, t1.decimals, t1.name, t1.symbol);

    const amount0 = parseEther(a0).toString();
    const amount1 = parseEther(a1).toString();

    // Validate amounts
    if (amount0 === "0" && amount1 === "0") {
      return {
        error: "Swap amounts cannot both be zero",
        swapExactInput: undefined,
        swapExactOutput: undefined,
      };
    }

    const tokens = [token0, token1];
    const [sortedToken0, sortedToken1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

    const [r0, r1] = reserves;
    const reserve0 = r0.toString();
    const reserve1 = r1.toString();

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(sortedToken0, reserve0),
      CurrencyAmount.fromRawAmount(sortedToken1, reserve1),
    );

    const route = new Route([pair], sortedToken0, sortedToken1);

    const swapExactInput =
      amount0 && amount0 !== "0"
        ? new Trade(route, CurrencyAmount.fromRawAmount(token0, amount0), TradeType.EXACT_INPUT)
        : undefined;

    const swapExactOutput =
      amount1 && amount1 !== "0"
        ? new Trade(route, CurrencyAmount.fromRawAmount(token1, amount1), TradeType.EXACT_OUTPUT)
        : undefined;

    return {
      error: null,
      swapExactInput,
      swapExactOutput,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unexpected error during swap",
      swapExactInput: undefined,
      swapExactOutput: undefined,
    };
  }
}
