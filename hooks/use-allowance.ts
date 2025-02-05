import useAddress from "./use-address";
import { useReadContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import useDexConfig from "./use-dex-config";

export default function useAllowance(token: UnionToken | undefined, amount: string) {
  const address = useAddress();
  const { ROUTER_ADDRESS } = useDexConfig();

  const amounts = parseEther(amount);
  const isWrapped = token?.isNative ? true : false;

  const { data: allowance } = useReadContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, ROUTER_ADDRESS],
  });

  const isAllowance = !isWrapped ? (allowance ? (allowance >= amounts ? true : false) : false) : true;

  return { allowance, isAllowance };
}
