import { erc20Abi, parseEther } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";

export default function useApprove(tokenAddress: `0x${string}`, spender: `0x${string}`, amount: string) {
  const parsedAmount = parseEther(amount);

  const { data: simulateApprove } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, parsedAmount],
  });

  const { writeContract: writeApprove } = useWriteContract();
  const handleApprove = () => writeApprove(simulateApprove!.request);

  return handleApprove;
}
