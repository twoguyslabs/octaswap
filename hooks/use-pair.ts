import { CurrencyAmount } from "@uniswap/sdk-core";
import { Pair } from "@uniswap/v2-sdk";
import { getTokenAddress } from "@/lib/utils";
import usePairReserves from "./use-pair-reserves";
import { uniTokenClass } from "@/constants/token";
import { useEffect, useMemo } from "react";
import { formatEther } from "viem";

export default function useCreatePair(token0: Token | Native | undefined, token1: Token | Native | undefined) {
  const token0Address = getTokenAddress(token0);
  const token1Address = getTokenAddress(token1);

  const { reserve0, reserve1 } = usePairReserves(token0Address, token1Address);
  const reserveZero = reserve0 ? parseInt(formatEther(reserve0)) : "0";
  const reserveOne = reserve1 ? parseInt(formatEther(reserve1)) : "0";

  const TOKEN0 = uniTokenClass(token0);
  const TOKEN1 = uniTokenClass(token1);

  const tokens = [TOKEN0, TOKEN1];
  const [tokenZero, tokenOne] = TOKEN0 && TOKEN1 ? (TOKEN0.sortsBefore(TOKEN1) ? tokens : [tokens[1], tokens[0]]) : [TOKEN0, TOKEN1];

  const pair = useMemo(() => {
    if (!tokenZero || !tokenOne) {
      return undefined;
    }

    return new Pair(CurrencyAmount.fromRawAmount(tokenZero, reserveZero), CurrencyAmount.fromRawAmount(tokenOne, reserveOne));
  }, [tokenZero, tokenOne, reserveZero, reserveOne]);

  useEffect(() => {
    console.log("pair", pair);
  }, [pair]);

  return pair;
}
