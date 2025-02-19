import { useReadContract } from "wagmi";
import useDexConfig from "./use-dex-config";
import usePairReserves from "./use-pair-reserves";
import { parseEther } from "viem";

export default function useLiquidityRate(t0: UnionToken | undefined, t1: UnionToken | undefined, amount: string) {
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();
  const reserves = usePairReserves(t0, t1);

  const [r0, r1] = reserves ?? [];

  const { data: quote } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "quote",
    args: r0 && r1 ? [parseEther(amount), r0, r1] : undefined,
  });

  return quote;
}
