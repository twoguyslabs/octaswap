"use client";

import SwapBox from "@/app/components/swap-box";
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

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [openTxConfirm, setOpenTxConfirm] = useState(false);

      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, swapAmountValue, resetAmount } = useAmount();

      const { getAmountsOut, getAmountsIn } = useSwapRate(token0, token1, amount.amount0, amount.amount1);
      const reserves = usePairReserves(token0, token1);
      const { isAllowance } = useAllowance(token0, amount.amount0 || getAmountsIn);

      const approveSimulation = useApproveSimulation(token0?.address, amount.amount0 || getAmountsIn);
      const { swapExactInput, swapExactOutput } = swap(token0, token1, amount.amount0, amount.amount1, reserves);
      const swapSimulation = useSwapSimulation(token0, token1, swapExactInput, swapExactOutput);

      return (
        <main>
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
          <div className="mx-auto max-w-[29rem] px-4 sm:pt-10 md:px-0">
            <div className="space-y-2">
              <SwapSettings />
              <Card>
                <CardContent className="px-4 py-5">
                  <SwapBox
                    token={token0}
                    onSetToken={setToken0}
                    amount={amount.amount0}
                    onSetAmount={setAmount0}
                    rateAmounts={getAmountsIn}
                  />
                  <SwapTokenPlace
                    token0={token0}
                    token1={token1}
                    onSetToken0={setToken0}
                    onSetToken1={setToken1}
                    onSwapAmountValue={swapAmountValue}
                  />
                  <SwapBox
                    token={token1}
                    onSetToken={setToken1}
                    amount={amount.amount1}
                    onSetAmount={setAmount1}
                    rateAmounts={getAmountsOut}
                  />
                  <ReviewButton
                    t0Amount={amount.amount0}
                    t1Amount={amount.amount1}
                    onOpenTxConfirm={setOpenTxConfirm}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Swap;
