import { erc20Abi, parseEther } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";

export default function useApprove(
  tokenAddress: `0x${string}` | undefined,
  spender: `0x${string}`,
  amount: string | (bigint | undefined),
) {
  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount || BigInt(0);

  const { data: simulateApprove } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, parsedAmount],
  });

  const { writeContract } = useWriteContract();
  const handleApprove = () => writeContract(simulateApprove!.request);

  return handleApprove;
}
