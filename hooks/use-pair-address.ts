import { useReadContract } from "wagmi";
import useDexConfig from "./use-dex-config";
import { zeroAddress } from "viem";

export default function usePairAddress(t0: UnionToken | undefined, t1: UnionToken | undefined) {
  const { FACTORY_ADDRESS, FACTORY_ABI } = useDexConfig();

  const { data: pairAddress } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "getPair",
    // @ts-expect-error 'undefined' is not assignable to type '`0x${string}`
    args: [t0?.address, t1?.address],
  });

  const isPairExist = pairAddress ? pairAddress !== zeroAddress : undefined;

  return { pairAddress, isPairExist };
}
