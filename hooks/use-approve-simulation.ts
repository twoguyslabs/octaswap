import { erc20Abi, parseEther } from "viem";
import { useChainId, useSimulateContract } from "wagmi";
import useDexConfig from "./use-dex-config";
import { WETH9 } from "@/constants/native";

export default function useApproveSimulation(tokenAddress: `0x${string}` | undefined, amount: string | (bigint | undefined), isAllowance: boolean) {
  const chainId = useChainId();
  const { ROUTER_ADDRESS } = useDexConfig();

  const isWrapped = tokenAddress === WETH9[chainId].address;
  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount;

  const { data: approveSimulation } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    // @ts-expect-error undefiend type
    args: [ROUTER_ADDRESS, parsedAmount],
    query: {
      enabled: !isWrapped && !isAllowance,
    },
  });

  return approveSimulation;
}
