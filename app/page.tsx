"use client";

import DexBox from "@/app/components/dex-box";
import SwapSettings from "@/app/components/swap-settings";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Card, CardContent } from "@/components/ui/card";
import useAllowance from "@/hooks/use-allowance";
import useAmount from "@/hooks/use-amount";
import usePairReserves from "@/hooks/use-pair-reserves";
import useSwapRate from "@/hooks/use-swap-rate";
import useSwapSimulation from "@/hooks/use-swap-simulation";
import useToken from "@/hooks/use-token";
import { swap } from "@/lib/swap";
import dynamic from "next/dynamic";
import useApproveSimulation from "@/hooks/use-approve-simulation";
import { useState } from "react";
import TxConfirm from "./components/tx-confirm";
import ReviewButton from "./components/review-button";
import useTokenBalance from "@/hooks/use-token-balance";
import SwapData from "./components/swap-data";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [openTxConfirm, setOpenTxConfirm] = useState(false);
      const [collapsible, setCollapsible] = useState(false);

      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, swapAmountValue, resetAmount } = useAmount(token0, token1);

      const [slippage, setSlippage] = useState("50"); // in bps - default to 0.5%
      const [deadline, setDeadline] = useState("5"); // default to 5 minutes

      const balance0 = useTokenBalance(token0);
      const balance1 = useTokenBalance(token1);

      const { getAmountsOut, getAmountsIn, flatAmountsOut, flatAmountsIn } = useSwapRate(token0, token1, amount.amount0, amount.amount1);

      const reserves = usePairReserves(token0, token1);
      const { isAllowance } = useAllowance(token0, amount.amount0 || getAmountsIn);

      const approveSimulation = useApproveSimulation(token0, amount.amount0 || getAmountsIn, isAllowance);
      const { swapExactInput, swapExactOutput } = swap(token0, token1, amount.amount0, amount.amount1, reserves);
      const { swapSimulation, amountOutMin, amountInMax, priceImpactOut, priceImpactIn } = useSwapSimulation(token0, token1, slippage, deadline, swapExactInput, swapExactOutput);

      const isSwapData = !token0?.chainId || !token1?.chainId || (!amount.amount0 && !amount.amount1) || (!getAmountsOut && !getAmountsIn);

      return (
        <main className="grow">
          <TxConfirm
            openTxConfirm={openTxConfirm}
            onOpenTxConfirm={setOpenTxConfirm}
            t0Amount={amount.amount0 || getAmountsIn}
            t0Symbol={token0?.symbol}
            t0Logo={token0?.logoURI}
            t1Amount={amount.amount1 || getAmountsOut}
            t1Symbol={token1?.symbol}
            t1Logo={token1?.logoURI}
            isAllowance={isAllowance}
            approveSimulation={approveSimulation}
            swapSimulation={swapSimulation}
            onResetAmount={resetAmount}
          />
          <div className="mx-auto min-h-full max-w-[29rem] px-4 sm:py-10 md:px-0">
            <div className="space-y-2">
              <SwapSettings onSetSlippage={setSlippage} onSetDeadline={setDeadline} />
              <Card>
                <CardContent className="px-4 py-5">
                  <DexBox label="From" token={token0} onSetToken={setToken0} amount={amount.amount0} onSetAmount={setAmount0} tokenBalance={balance0} rateAmounts={getAmountsIn} />
                  <SwapTokenPlace token0={token0} token1={token1} onSetToken0={setToken0} onSetToken1={setToken1} onSwapAmountValue={swapAmountValue} />
                  <DexBox label="To" token={token1} onSetToken={setToken1} amount={amount.amount1} onSetAmount={setAmount1} tokenBalance={balance1} rateAmounts={getAmountsOut} />
                  <ReviewButton
                    onOpenTxConfirm={setOpenTxConfirm}
                    t0={token0}
                    t1={token1}
                    t0Amount={amount.amount0 || getAmountsIn}
                    t1Amount={amount.amount1 || getAmountsOut}
                    balance0={balance0}
                    approveSimulation={approveSimulation}
                    swapSimulation={swapSimulation}
                  />
                </CardContent>
              </Card>
              {!isSwapData && (
                <SwapData
                  collapsible={collapsible}
                  onSetCollapsible={setCollapsible}
                  t0Symbol={token0.symbol}
                  t1Symbol={token1.symbol}
                  a0={amount.amount0}
                  slippage={slippage}
                  priceImpact={priceImpactOut || priceImpactIn}
                  minimumMaximum={amountOutMin || amountInMax}
                  flatAmountsOut={flatAmountsOut}
                  flatAmountsIn={flatAmountsIn}
                />
              )}
            </div>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Swap;
