import { getTokenAddress } from "@/lib/utils";
import useAddress from "./use-address";
import { useReadContract } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";

export default function useAllowance(token: Token | Native | undefined, amount: string) {
  const address = useAddress();
  const tokenAddress = getTokenAddress(token);

  const amt = parseUnits(amount, 18);

  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, OCTA_V2_ROUTER_ADDRESS],
    query: {
      enabled: !!token?.address,
    },
  });

  const isAllowance = token?.address ? (allowance ? (allowance >= amt ? true : false) : false) : true;

  return { allowance, isAllowance };
}
