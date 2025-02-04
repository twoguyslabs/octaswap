import { CurrencyAmount } from "@uniswap/sdk-core";
import { Pair } from "@uniswap/v2-sdk";
import usePairReserves from "./use-pair-reserves";
import { tokenClass } from "@/constants/token";
import { formatEther } from "viem";

export default function useCreatePair(token0: UnionToken, token1: UnionToken) {
  const { reserve0, reserve1 } = usePairReserves(token0.address, token1.address);

  const r0 = reserve0 ? formatEther(reserve0).split(".")[0] : "0";
  const r1 = reserve1 ? formatEther(reserve1).split(".")[0] : "0";

  const tc0 = tokenClass(token0);
  const tc1 = tokenClass(token1);

  const tokens = [tc0, tc1];
  const [t0, t1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

  const pair = new Pair(CurrencyAmount.fromRawAmount(t0, r0), CurrencyAmount.fromRawAmount(t1, r1));

  return pair;
}
