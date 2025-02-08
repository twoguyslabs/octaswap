import { Trade } from "@uniswap/v2-sdk";
import { useSimulateContract } from "wagmi";
import { Percent, Token, TradeType } from "@uniswap/sdk-core";
import { parseEther } from "viem";
import useAddress from "./use-address";
import { useMemo } from "react";
import useDexConfig from "./use-dex-config";

export default function useSwapSimulation(
  t0: UnionToken | undefined,
  t1: UnionToken | undefined,
  slippage: string,
  deadline: string,
  swapExactInput: Trade<Token, Token, TradeType.EXACT_INPUT> | undefined,
  swapExactOutput: Trade<Token, Token, TradeType.EXACT_OUTPUT> | undefined,
) {
  const address = useAddress();
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();

  const txSlippage = useMemo(() => new Percent(slippage, "10000"), [slippage]);
  const txDeadline = BigInt(Math.floor(Date.now() / 1000) + 60 * +deadline);

  const { inputAmount, amountOutMin, inputPath, priceImpactOut } = useMemo(() => {
    if (!t0 || !t1 || !swapExactInput) {
      return { inputAmount: BigInt(0), amountOutMin: BigInt(0), inputPath: [], priceImpactOut: "" };
    }

    const inputAmount = parseEther(swapExactInput.inputAmount.toExact());
    const amountOutMin = parseEther(swapExactInput.minimumAmountOut(txSlippage).toExact());
    const inputPath = [t0.address, t1.address];

    const priceImpactOut = swapExactInput.priceImpact.toFixed();

    return { inputAmount, amountOutMin, inputPath, priceImpactOut };
  }, [t0, t1, txSlippage, swapExactInput]);

  const { outputAmount, amountInMax, outputPath, priceImpactIn } = useMemo(() => {
    if (!t0 || !t1 || !swapExactOutput) {
      return { outputAmount: BigInt(0), amountInMax: BigInt(0), outputPath: [], priceImpactIn: "" };
    }

    const outputAmount = parseEther(swapExactOutput.outputAmount.toExact());
    const amountInMax = parseEther(swapExactOutput.maximumAmountIn(txSlippage).toExact());
    const outputPath = [t0.address, t1.address];

    const priceImpactIn = swapExactOutput.priceImpact.toFixed();

    return { outputAmount, amountInMax, outputPath, priceImpactIn };
  }, [t0, t1, txSlippage, swapExactOutput]);

  const { data: simulateExactTokensForTokens } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactTokensForTokens",
    args: [inputAmount, amountOutMin, inputPath, address, txDeadline],
    query: {
      enabled: !t0?.isNative && !t1?.isNative,
    },
  });

  const { data: simulateTokensForExactTokens } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapTokensForExactTokens",
    args: [outputAmount, amountInMax, outputPath, address, txDeadline],
    query: {
      enabled: !t0?.isNative && !t1?.isNative,
    },
  });

  const { data: simulateExactETHForTokens } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactETHForTokens",
    args: [amountOutMin, inputPath, address, txDeadline],
    value: inputAmount,
  });

  const { data: simulateTokensForExactETH } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapTokensForExactETH",
    args: [outputAmount, amountInMax, outputPath, address, txDeadline],
  });

  const { data: simulateExactTokensForETH } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapExactTokensForETH",
    args: [inputAmount, amountOutMin, inputPath, address, txDeadline],
  });

  const { data: simulateETHForExactTokens } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "swapETHForExactTokens",
    args: [outputAmount, outputPath, address, txDeadline],
    value: amountInMax,
  });

  const swapSimulation =
    simulateExactTokensForTokens ||
    simulateTokensForExactTokens ||
    simulateExactETHForTokens ||
    simulateTokensForExactETH ||
    simulateExactTokensForETH ||
    simulateETHForExactTokens;

  return { swapSimulation, amountOutMin, amountInMax, priceImpactOut, priceImpactIn };
}
