import { useReadContract } from "wagmi";
import usePairAddress from "./use-pair-address";
import { PAIR_ABI } from "@/contracts/octaspace/dex/pair";

export default function usePairReserves(token0Address: `0x${string}`, token1Address: `0x${string}`) {
  const pairAddress = usePairAddress(token0Address, token1Address);

  const { data: reserves } = useReadContract({
    abi: PAIR_ABI,
    address: pairAddress,
    functionName: "getReserves",
  });

  const [reserve0, reserve1] = reserves ?? [];

  return { reserve0, reserve1 };
}
