import { parseEther } from "viem";
import { useReadContract } from "wagmi";
import useDexConfig from "./use-dex-config";

export default function useSwapRate(token0: UnionToken | undefined, token1: UnionToken | undefined, amount0: string, amount1: string) {
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();

  const { data: getAmountsOut } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther(amount0), [token0?.address, token1?.address]],
  });

  const { data: getAmountsIn } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getAmountsIn",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther(amount1), [token0?.address, token1?.address]],
  });

  const { data: flatGetAmountsOut } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther("1"), [token0?.address, token1?.address]],
  });

  const { data: flatGetAmountsIn } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getAmountsIn",
    // @ts-expect-error undefined not assignable to `0x${string}`
    args: [parseEther("1"), [token0?.address, token1?.address]],
  });

  const amountsOut = getAmountsOut?.[1];
  const amountsIn = getAmountsIn?.[0];

  const flatAmountsOut = flatGetAmountsOut?.[1];
  const flatAmountsIn = flatGetAmountsIn?.[0];

  return { getAmountsOut: amountsOut, getAmountsIn: amountsIn, flatAmountsOut, flatAmountsIn };
}
