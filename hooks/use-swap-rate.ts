import { OCTA_V2_ROUTER_ABI, OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import { parseEther } from "viem";
import { useReadContract } from "wagmi";

export default function useSwapRate(
  token0: UnionToken | undefined,
  token1: UnionToken | undefined,
  amount0: string,
  amount1: string,
) {
  const { data: getAmountsOut } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsOut",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther(amount0), [token0?.address, token1?.address]],
  });

  const { data: getAmountsIn } = useReadContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "getAmountsIn",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther(amount1), [token0?.address, token1?.address]],
  });

  const amountsOut = getAmountsOut?.[1];
  const amountsIn = getAmountsIn?.[0];

  return { getAmountsOut: amountsOut, getAmountsIn: amountsIn };
}
