import { OCTA_V2_ROUTER_ABI, OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import { parseUnits } from "viem";
import { useReadContract } from "wagmi";

export default function useSwapRate(token0: UnionToken, token1: UnionToken, amount0: string, amount1: string) {
  const { data: getAmountsOut } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [parseUnits(amount0, 18), [token0.address, token1.address]],
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: getAmountsIn } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsIn",
    args: [parseUnits(amount1, 18), [token0.address, token1.address]],
    query: {
      refetchInterval: 1000,
    },
  });

  const amountsOut = getAmountsOut?.[1];
  const amountsIn = getAmountsIn?.[0];

  return { getAmountsOut: amountsOut, getAmountsIn: amountsIn };
}
