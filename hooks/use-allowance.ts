import useAddress from "./use-address";
import { useChainId, useReadContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import useDexConfig from "./use-dex-config";
import { WETH9 } from "@/constants/native";

export default function useAllowance(tokenAddress: `0x${string}` | undefined, amount: string | (bigint | undefined)) {
  const chainId = useChainId();
  const address = useAddress();
  const { ROUTER_ADDRESS } = useDexConfig();

  const amounts = typeof amount === "string" ? parseEther(amount) : (amount ?? BigInt(0));
  const isWrapped = tokenAddress === WETH9[chainId].address;

  const { data: allowance } = useReadContract({
    address: tokenAddress,
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
