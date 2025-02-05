import { OCTA_V2_FACTORY_ABI, OCTA_V2_FACTORY_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-factory";
import { useReadContract } from "wagmi";

export default function usePairAddress(t0: UnionToken | undefined, t1: UnionToken | undefined) {
  const { data: pairAddress } = useReadContract({
    address: OCTA_V2_FACTORY_ADDRESS,
    abi: OCTA_V2_FACTORY_ABI,
    functionName: "getPair",
    // @ts-expect-error 'undefined' is not assignable to type '`0x${string}`
    args: [t0?.address, t1?.address],
  });

  return pairAddress;
}
