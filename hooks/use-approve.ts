import { erc20Abi, parseEther } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";
import useDexConfig from "./use-dex-config";

export default function useApprove(tokenAddress: `0x${string}` | undefined, amount: string | (bigint | undefined)) {
  const { ROUTER_ADDRESS } = useDexConfig();

  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount || BigInt(0);

  const { data: simulateApprove } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [ROUTER_ADDRESS, parsedAmount],
  });

  const { writeContract, isPending: isApprovePending } = useWriteContract();
  const handleApprove = () => writeContract(simulateApprove!.request);

  return { handleApprove, isApprovePending };
}
