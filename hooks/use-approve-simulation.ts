import { erc20Abi, parseEther } from "viem";
import { useSimulateContract } from "wagmi";
import useDexConfig from "./use-dex-config";

export default function useApproveSimulation(
  token: UnionToken | undefined,
  amount: string | (bigint | undefined),
  balance: bigint | undefined,
) {
  const { ROUTER_ADDRESS } = useDexConfig();

  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount || BigInt(0);
  const isExceedBalance = balance ? parsedAmount > balance : false;

  const { data: approveSimulation } = useSimulateContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "approve",
    args: [ROUTER_ADDRESS, parsedAmount],
    query: {
      enabled: !token?.isNative && !isExceedBalance,
    },
  });

  return approveSimulation;
}
