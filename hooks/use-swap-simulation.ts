import { OCTA_V2_ROUTER_ABI, OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import { Trade } from "@uniswap/v2-sdk";
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Percent, Token, TradeType } from "@uniswap/sdk-core";
import { parseEther } from "viem";
import useAddress from "./use-address";
import { useMemo } from "react";

export default function useSwapSimulation(
  t0: UnionToken | undefined,
  t1: UnionToken | undefined,
  swapExactInput: Trade<Token, Token, TradeType.EXACT_INPUT> | undefined,
  swapExactOutput: Trade<Token, Token, TradeType.EXACT_OUTPUT> | undefined,
) {
  const address = useAddress();
  const slippage = useMemo(() => new Percent("500", "10000"), []);
  const deadline = useMemo(() => BigInt(Math.floor(Date.now() / 1000) + 60 * 20), []);

  const { inputAmount, amountOutMin, inputPath } = useMemo(() => {
    if (!t0 || !t1 || !swapExactInput) {
      return { inputAmount: BigInt(0), amountOutMin: BigInt(0), inputPath: [] };
    }

    const inputAmount = parseEther(swapExactInput.inputAmount.toExact());
    const amountOutMin = parseEther(swapExactInput.minimumAmountOut(slippage).toExact());
    const inputPath = [t0.address, t1.address];

    return { inputAmount, amountOutMin, inputPath };
  }, [t0, t1, slippage, swapExactInput]);

  const { outputAmount, amountInMax, outputPath } = useMemo(() => {
    if (!t0 || !t1 || !swapExactOutput) {
      return { outputAmount: BigInt(0), amountInMax: BigInt(0), outputPath: [] };
    }

    const outputAmount = parseEther(swapExactOutput.outputAmount.toExact());
    const amountInMax = parseEther(swapExactOutput.maximumAmountIn(slippage).toExact());
    const outputPath = [t0.address, t1.address];

    return { outputAmount, amountInMax, outputPath };
  }, [t0, t1, slippage, swapExactOutput]);

  const { data: simulateExactTokensForTokens } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapExactTokensForTokens",
    args: [inputAmount, amountOutMin, inputPath, address, deadline],
    query: {
      enabled: !t0?.isNative && !t1?.isNative,
    },
  });

  const { data: simulateTokensForExactTokens } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapTokensForExactTokens",
    args: [outputAmount, amountInMax, outputPath, address, deadline],
    query: {
      enabled: !t0?.isNative && !t1?.isNative,
    },
  });

  const { data: simulateExactETHForTokens } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapExactETHForTokens",
    args: [amountOutMin, inputPath, address, deadline],
    value: inputAmount,
  });

  const { data: simulateTokensForExactETH } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapTokensForExactETH",
    args: [outputAmount, amountInMax, outputPath, address, deadline],
  });

  const { data: simulateExactTokensForETH } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapExactTokensForETH",
    args: [inputAmount, amountOutMin, inputPath, address, deadline],
  });

  const { data: simulateETHForExactTokens } = useSimulateContract({
    address: OCTA_V2_ROUTER_ADDRESS,
    abi: OCTA_V2_ROUTER_ABI,
    functionName: "swapETHForExactTokens",
    args: [outputAmount, outputPath, address, deadline],
    value: amountInMax,
  });

  const simulation =
    simulateExactTokensForTokens ||
    simulateTokensForExactTokens ||
    simulateExactETHForTokens ||
    simulateTokensForExactETH ||
    simulateExactTokensForETH ||
    simulateETHForExactTokens;

  const { writeContract, isPending, data: hash } = useWriteContract();

  const { isLoading: isSwapConfirming, isSuccess: isSwapConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // @ts-expect-error mixing simulation with OR
  const handleSwap = () => writeContract(simulation!.request);

  return { handleSwap, isPending, isSwapConfirming, isSwapConfirmed };
}
