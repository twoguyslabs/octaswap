import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { parseEther } from "viem";

export function createToken(t: UnionToken | undefined) {
  if (!t) {
    return undefined;
  }
  const token = new Token(t.chainId, t.address, t.decimals, t.name, t.symbol);
  return token;
}

export function createPair(t0: Token | undefined, t1: Token | undefined, reserves: readonly [bigint, bigint, number] | undefined) {
  if (!t0 || !t1 || !reserves) {
    return undefined;
  }

  const tokens = [t0, t1];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

  const [r0, r1] = reserves;
  const reserve0 = r0.toString();
  const reserve1 = r1.toString();

  const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1));

  return pair;
}

export function swap(t0: UnionToken | undefined, t1: UnionToken | undefined, a0: string, a1: string, reserves: readonly [bigint, bigint, number] | undefined) {
  // Validate input parameters
  if (!t0 || !t1 || !reserves) {
    return {
      error: "Invalid tokens or reserves",
      swapExactInput: undefined,
      swapExactOutput: undefined,
    };
  }

  try {
    // Convert tokens
    const token0 = createToken(t0);
    const token1 = createToken(t1);

    if (!token0 || !token1) {
      return {
        error: "Failed to create tokens",
        swapExactInput: undefined,
        swapExactOutput: undefined,
      };
    }

    // Validate amounts
    const amount0 = parseEther(a0).toString();
    const amount1 = parseEther(a1).toString();

    if (amount0 === "0" && amount1 === "0") {
      return {
        error: "Both swap amounts cannot be zero",
        swapExactInput: undefined,
        swapExactOutput: undefined,
      };
    }

    // Create pair and route
    const pair = createPair(token0, token1, reserves);

    if (!pair) {
      return {
        error: "Invalid tokens or reserves",
        swapExactInput: undefined,
        swapExactOutput: undefined,
      };
    }

    const route = new Route([pair], token0, token1);

    // Create swap trades
    const swapExactInput = amount0 && amount0 !== "0" ? new Trade(route, CurrencyAmount.fromRawAmount(token0, amount0), TradeType.EXACT_INPUT) : undefined;

    const swapExactOutput = amount1 && amount1 !== "0" ? new Trade(route, CurrencyAmount.fromRawAmount(token1, amount1), TradeType.EXACT_OUTPUT) : undefined;

    return { error: null, swapExactInput, swapExactOutput };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unexpected error in swap lib",
      swapExactInput: undefined,
      swapExactOutput: undefined,
    };
  }
}

export function getLiquidityMinted(
  pair: Pair | undefined,
  totalSupply: CurrencyAmount<Token> | undefined,
  tokenAmountA: CurrencyAmount<Token> | undefined,
  tokenAmountB: CurrencyAmount<Token> | undefined,
) {
  if (!pair || !totalSupply || !tokenAmountA || !tokenAmountB) {
    return undefined;
  }

  try {
    return pair.getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return undefined;
  }
}
