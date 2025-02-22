import { useReadContract } from "wagmi";
import usePairAddress from "./use-pair-address";
import { PAIR_ABI } from "@/contracts/octaspace/dex/pair";

export default function usePairReserves(t0: UnionToken | undefined, t1: UnionToken | undefined) {
  const { pairAddress } = usePairAddress(t0, t1);

  const { data: reserves } = useReadContract({
    abi: PAIR_ABI,
    address: pairAddress,
    functionName: "getReserves",
  });

  return reserves;
}
