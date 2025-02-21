import { useReadContract } from "wagmi";
import useDexConfig from "./use-dex-config";
import usePairReserves from "./use-pair-reserves";
import { parseEther } from "viem";

export default function useLiquidityRate(t0: UnionToken | undefined, t1: UnionToken | undefined, a0: string, a1: string) {
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();
  const reserves = usePairReserves(t0, t1);

  // Sort tokens by address to match reserves order
  const [r0, r1] = t0 && t1 && t0.address.toLowerCase() > t1.address.toLowerCase() ? [reserves?.[1], reserves?.[0]] : [reserves?.[0], reserves?.[1]];

  const { data: quoteOut } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "quote",
    args: r0 && r1 ? [parseEther(a0), r0, r1] : undefined,
  });

  const { data: quoteIn } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "quote",
    args: r0 && r1 ? [parseEther(a1), r1, r0] : undefined,
  });

  const { data: flatQuoteOut } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "quote",
    args: r0 && r1 ? [parseEther("1"), r0, r1] : undefined,
  });

  const { data: flatQuoteIn } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "quote",
    args: r0 && r1 ? [parseEther("1"), r1, r0] : undefined,
  });

  return { quoteOut, quoteIn, flatQuoteOut, flatQuoteIn };
}
