import { OCTA_V2_ROUTER_ABI, OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import { getTokenAddress } from "@/lib/utils";
import { parseUnits } from "viem";
import { useReadContract } from "wagmi";

export default function useSwapRate(token0: Token | Native | undefined, token1: Token | Native | undefined, amount0: string, amount1: string) {
  const token0Address = getTokenAddress(token0);
  const token1Address = getTokenAddress(token1);

  const { data: getAmountsOut } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [parseUnits(amount0, 18), [token0Address, token1Address]],
    query: {
      enabled: !!amount0,
    },
  });

  const { data: getAmountsIn } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsIn",
    args: [parseUnits(amount1, 18), [token0Address, token1Address]],
    query: {
      enabled: !!amount1,
    },
  });

  const amountsOut = getAmountsOut?.[1];
  const amountsIn = getAmountsIn?.[0];

  return { getAmountsOut: amountsOut, getAmountsIn: amountsIn };
}
