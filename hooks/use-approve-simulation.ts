import { erc20Abi, parseEther } from "viem";
import { useSimulateContract } from "wagmi";
import useDexConfig from "./use-dex-config";

export default function useApproveSimulation(
  token: UnionToken | undefined,
  amount: string | (bigint | undefined),
  isAllowance: boolean,
) {
  const { ROUTER_ADDRESS } = useDexConfig();

  const parsedAmount = typeof amount === "string" ? parseEther(amount) : amount;

  const { data: approveSimulation } = useSimulateContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "approve",
    // @ts-expect-error undefiend type
    args: [ROUTER_ADDRESS, parsedAmount],
    query: {
      enabled: !token?.isNative && !isAllowance,
    },
  });

  return approveSimulation;
}
