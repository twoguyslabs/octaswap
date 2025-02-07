import { erc20Abi, parseEther } from "viem";
import { useSimulateContract } from "wagmi";
import useDexConfig from "./use-dex-config";

export default function useApproveSimulation(
  tokenAddress: `0x${string}` | undefined,
  amount: string | (bigint | undefined),
) {
  const { ROUTER_ADDRESS } = useDexConfig();

  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount || BigInt(0);

  const { data: approveSimulation } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [ROUTER_ADDRESS, parsedAmount],
  });

  return approveSimulation;
}
