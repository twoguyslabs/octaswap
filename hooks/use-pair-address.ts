import { OCTA_V2_FACTORY_ABI, OCTA_V2_FACTORY_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-factory";
import { useReadContract } from "wagmi";

export default function usePairAddress(
  token0Address: `0x${string}` | undefined,
  token1Address: `0x${string}` | undefined,
) {
  const { data: pairAddress } = useReadContract({
    address: OCTA_V2_FACTORY_ADDRESS,
    abi: OCTA_V2_FACTORY_ABI,
    functionName: "getPair",
    args: [token0Address!, token1Address!],
  });

  return pairAddress;
}
