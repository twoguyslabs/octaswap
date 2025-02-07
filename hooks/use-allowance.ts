import useAddress from "./use-address";
import { useReadContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import useDexConfig from "./use-dex-config";

export default function useAllowance(token: UnionToken | undefined, amount: string | (bigint | undefined)) {
  const address = useAddress();
  const { ROUTER_ADDRESS } = useDexConfig();

  const amounts = typeof amount === "string" ? parseEther(amount) : (amount ?? BigInt(0));
  const isWrapped = token?.isNative ? true : false;

  const { data: allowance } = useReadContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, ROUTER_ADDRESS],
    query: {
      refetchInterval: 1000,
    },
  });

  const isAllowance = !isWrapped ? (allowance ? (allowance >= amounts ? true : false) : false) : true;

  return { allowance, isAllowance };
}
