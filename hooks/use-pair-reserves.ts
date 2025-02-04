import { useReadContract } from "wagmi";
import usePairAddress from "./use-pair-address";
import { PAIR_ABI } from "@/contracts/octaspace/dex/pair";

export default function usePairReserves(
  token0Address: `0x${string}` | undefined,
  token1Address: `0x${string}` | undefined,
) {
  const pairAddress = usePairAddress(token0Address, token1Address);

  const { data: reserves } = useReadContract({
    abi: PAIR_ABI,
    address: pairAddress,
    functionName: "getReserves",
  });

  return reserves;
}
