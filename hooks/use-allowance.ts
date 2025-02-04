import useAddress from "./use-address";
import { useReadContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import { OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";

export default function useAllowance(token: UnionToken, amount: string) {
  const address = useAddress();
  const amounts = parseEther(amount);

  const isWrapped = token.isNative ? true : false;

  const { data: allowance } = useReadContract({
    address: token.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, OCTA_V2_ROUTER_ADDRESS],
    query: {
      refetchInterval: 1000,
    },
  });

  const isAllowance = !isWrapped ? (allowance ? (allowance >= amounts ? true : false) : false) : true;

  return { allowance, isAllowance };
}
