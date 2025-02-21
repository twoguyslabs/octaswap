import { useReadContract } from "wagmi";
import usePairAddress from "./use-pair-address";
import usePairReserves from "./use-pair-reserves";
import { PAIR_ABI } from "@/contracts/octaspace/dex/pair";
import { createPair, createToken, getLiquidityMinted } from "@/lib/swap";
import { CurrencyAmount } from "@uniswap/sdk-core";
import { formatEther, parseEther } from "viem";

export default function usePoolShare(t0: UnionToken | undefined, t1: UnionToken | undefined, a0: string | bigint | undefined, a1: string | bigint | undefined) {
  const pairAddress = usePairAddress(t0, t1);
  const reserves = usePairReserves(t0, t1);

  const { data: pairTotalSupply } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: "totalSupply",
    query: {
      refetchInterval: 1000,
    },
  });

  const token0 = createToken(t0);
  const token1 = createToken(t1);
  const amount0 = a0 ? (typeof a0 === "string" ? parseEther(a0).toString() : a0.toString()) : undefined;
  const amount1 = a1 ? (typeof a1 === "string" ? parseEther(a1).toString() : a1.toString()) : undefined;

  const pair = t0 && t1 && reserves ? createPair(token0, token1, reserves) : undefined;

  const totalSupply = pair && pairTotalSupply ? CurrencyAmount.fromRawAmount(pair.liquidityToken, pairTotalSupply.toString()) : undefined;
  const tokenAmountA = token0 && amount0 ? CurrencyAmount.fromRawAmount(token0, amount0) : undefined;
  const tokenAmountB = token1 && amount1 ? CurrencyAmount.fromRawAmount(token1, amount1) : undefined;

  const liquidityMinted = getLiquidityMinted(pair, totalSupply, tokenAmountA, tokenAmountB);
  const newTotalSupply = pairTotalSupply && liquidityMinted ? pairTotalSupply + parseEther(liquidityMinted.toExact()) : undefined;

  const poolShare = liquidityMinted && newTotalSupply ? Number(liquidityMinted.toExact()) / Number(formatEther(newTotalSupply)) : undefined;

  return poolShare;
}
